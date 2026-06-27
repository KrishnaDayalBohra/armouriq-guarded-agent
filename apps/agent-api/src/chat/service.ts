import { getGeminiClient } from "../ai/gemini";
import { buildToolDescriptions } from "../ai/toolLoop";
import { executeToolOnServer } from "../mcp/execute";
import { createConversation } from "./conversation";

import {
  evaluateToolCall,
  PolicyRecord,
} from "@armoriq/policy-engine";

import { listPolicies } from "../policies/service";
import { createApprovalRequest } from "../approvals/service";
import { createToolLog } from "../logs/service";
import { toPolicyRecord } from "../policies/mapper";

export async function chatWithAgent(message: string) {
  const gemini = getGeminiClient();
 
  const conversation = await createConversation();

  // Discover tools
  const tools = await buildToolDescriptions();

  // Load policies
  const policies: PolicyRecord[] =
    (await listPolicies()).map(toPolicyRecord);

  // Build tool descriptions
 const toolPrompt = JSON.stringify(
  tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.inputSchema,
  })),
  null,
  2
);
  // Ask Gemini
const response = await gemini.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `
You are an AI Agent.

Available tools:

${toolPrompt}

If the user's request can be completed using one of the available tools:

Return ONLY valid JSON.

Never wrap the JSON inside markdown.

Never use \`\`\`.

Never explain.

The arguments MUST exactly match the tool schema.

If required arguments are missing, infer them from the user's request whenever possible.

If no tool is appropriate, answer normally.

Return exactly in this format:

{
  "tool": "tool_name",
  "arguments": {}
}

User:

${message}
`,
});   // <-- THIS IS VERY IMPORTANT


const raw = (response.text ?? "").trim();

const text = raw
  .replace(/^```json/i, "")
  .replace(/^```/i, "")
  .replace(/```$/, "")
  .trim();
  
  // Normal response
  let toolCall: any;

 try {
  toolCall = JSON.parse(text);

  if (!toolCall.tool) {
    return {
      success: true,
      reply: text,
    };
  }
} catch {
  return {
    success: true,
    reply: text,
  };
}

  // Find tool
  const tool = tools.find((t) => t.name === toolCall.tool);

if (!tool) {
  return {
    success: false,
    reply: "Requested tool not found.",
  };
}

if (!toolCall.arguments) {
  return {
    success: false,
    reply: "Tool arguments were not generated.",
  };
}

 

  // Policy evaluation

  const decision = evaluateToolCall({
    conversationId: conversation.id,
    toolName: tool.name,
    serverId: tool.serverId,
    args: toolCall.arguments ?? {},
    policies,
    toolCallCountInConversation: 0,
  });

  // Block
  if (decision.status === "block") {
    await createToolLog({
      toolName: tool.name,
      serverId: tool.serverId,
      argsJson: JSON.stringify(toolCall.arguments ?? {}),
      decision: "blocked",
      reason: decision.reason,
    });

    return {
      success: false,
      blocked: true,
      reason: decision.reason,
    };
  }

  // Approval
  if (decision.status === "approval_required") {
   const approval = await createApprovalRequest({
  conversationId: conversation.id,
  toolName: tool.name,
  serverId: tool.serverId,
  argsJson: JSON.stringify(toolCall.arguments ?? {}),
});

await createToolLog({
  conversationId: conversation.id,
  toolName: tool.name,
  serverId: tool.serverId,
  argsJson: JSON.stringify(toolCall.arguments ?? {}),
  decision: "approval_required",
  approvalRequestId: approval.id,
  reason: decision.reason,
});
    return {
      success: false,
      approvalRequired: true,
      approvalId: approval.id,
      reason: decision.reason,
    };
  }

  // Execute MCP tool
  const toolResult = await executeToolOnServer({
    serverId: tool.serverId,
    toolName: tool.name,
    args: toolCall.arguments ?? {},
  });

  // Log execution
await createToolLog({
  conversationId: conversation.id,
  toolName: tool.name,
    serverId: tool.serverId,
    argsJson: JSON.stringify(toolCall.arguments ?? {}),
    decision: "allowed",
    resultJson: JSON.stringify(toolResult),
  });

  // Ask Gemini to summarize tool output
  const finalResponse = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
User request:

${message}

Tool output:

${JSON.stringify(toolResult)}

Respond naturally to the user.
`,
  });

  return {
    success: true,
    reply: finalResponse.text,
    toolExecuted: true,
  };
}