import dotenv from "dotenv";

dotenv.config();
import chatRouter from "./chat/routes";
import express from "express";

import cors from "cors";
import { discoverToolsFromAllServers } from "./mcp/registry";
import { executeToolOnServer } from "./mcp/execute";
import {
  createPolicy,
  deletePolicy,
  listPolicies,
  updatePolicy,
} from "./policies/service";
import {
  createApprovalRequest,
  listApprovalRequests,
  updateApprovalStatus,
} from "./approvals/service";
import { createToolLog, listToolLogs } from "./logs/service";
import { evaluateToolCall, PolicyRecord } from "@armoriq/policy-engine";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/chat", chatRouter);

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "agent-api",
  });
});

app.get("/tools", async (_req, res) => {
  try {
    const tools = await discoverToolsFromAllServers();

    res.json({
      success: true,
      count: tools.length,
      tools,
    });
  } catch (error) {
    console.error("Failed to discover tools:", error);

    res.status(500).json({
      success: false,
      error: "Failed to discover MCP tools",
    });
  }
});

/* -------------------------
   POLICY ROUTES
------------------------- */

app.get("/policies", async (_req, res) => {
  try {
    const policies = await listPolicies();
    res.json({ success: true, policies });
  } catch (error) {
    console.error("Failed to list policies:", error);
    res.status(500).json({ success: false, error: "Failed to list policies" });
  }
});

app.post("/policies", async (req, res) => {
  console.log("BODY =", req.body);
  try {
    const policy = await createPolicy(req.body);
    res.json({ success: true, policy });
 } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    error: error instanceof Error ? error.message : String(error),
  });
}
});

app.patch("/policies/:id", async (req, res) => {
  try {
    const policy = await updatePolicy(req.params.id, req.body);
    res.json({ success: true, policy });
  } catch (error) {
    console.error("Failed to update policy:", error);
    res.status(500).json({ success: false, error: "Failed to update policy" });
  }
});

app.delete("/policies/:id", async (req, res) => {
  try {
    await deletePolicy(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete policy:", error);
    res.status(500).json({ success: false, error: "Failed to delete policy" });
  }
});

/* -------------------------
   APPROVAL ROUTES
------------------------- */

app.get("/approvals", async (_req, res) => {
  try {
    const approvals = await listApprovalRequests();
    res.json({ success: true, approvals });
  } catch (error) {
    console.error("Failed to list approvals:", error);
    res.status(500).json({ success: false, error: "Failed to list approvals" });
  }
});

app.post("/approvals/:id/approve", async (req, res) => {
  try {
    const approval = await updateApprovalStatus(req.params.id, "approved");
    res.json({ success: true, approval });
  } catch (error) {
    console.error("Failed to approve request:", error);
    res.status(500).json({ success: false, error: "Failed to approve request" });
  }
});

app.post("/approvals/:id/reject", async (req, res) => {
  try {
    const approval = await updateApprovalStatus(req.params.id, "rejected");
    res.json({ success: true, approval });
  } catch (error) {
    console.error("Failed to reject request:", error);
    res.status(500).json({ success: false, error: "Failed to reject request" });
  }
});

/* -------------------------
   LOG ROUTE
------------------------- */

app.get("/logs", async (_req, res) => {
  try {
    const logs = await listToolLogs();
    res.json({ success: true, logs });
  } catch (error) {
    console.error("Failed to list logs:", error);
    res.status(500).json({ success: false, error: "Failed to list logs" });
  }
});








app.get("/dashboard", async (_req, res) => {
  try {
    const policies = await listPolicies();
    const approvals = await listApprovalRequests();
    const logs = await listToolLogs();
    const tools = await discoverToolsFromAllServers();

    res.json({
      success: true,
      stats: {
        policies: policies.length,
        allowed: logs.filter(
          (l) => l.decision === "allowed"
        ).length,
        blocked: logs.filter(
          (l) => l.decision === "blocked"
        ).length,
        pending: approvals.filter(
          (a) => a.status === "pending"
        ).length,
        tools: tools.length,
        executions: logs.length,
        recentLogs: logs.slice(0, 5),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to load dashboard",
    });
  }
});




/* -------------------------
   GUARDED TOOL EXECUTION
------------------------- */

app.post("/execute-tool", async (req, res) => {
  try {
    const { serverId, toolName, args, conversationId } = req.body;

    if (!serverId || !toolName) {
      return res.status(400).json({
        success: false,
        error: "serverId and toolName are required",
      });
    }

    const policiesFromDb = await listPolicies();

    const policyDecision = evaluateToolCall({
      conversationId,
      toolName,
      serverId,
      args: args ?? {},
      policies: policiesFromDb as PolicyRecord[],
      toolCallCountInConversation: 0,
    });

    // BLOCK
    if (policyDecision.status === "block") {
      await createToolLog({
        conversationId,
        toolName,
        serverId,
        argsJson: JSON.stringify(args ?? {}),
        decision: "blocked",
        reason: policyDecision.reason,
      });

      return res.status(403).json({
        success: false,
        status: "blocked",
        reason: policyDecision.reason,
      });
    }

    // APPROVAL REQUIRED
    if (policyDecision.status === "approval_required") {
      const approval = await createApprovalRequest({
        conversationId,
        toolName,
        serverId,
        argsJson: JSON.stringify(args ?? {}),
      });

      await createToolLog({
        conversationId,
        toolName,
        serverId,
        argsJson: JSON.stringify(args ?? {}),
        decision: "approval_required",
        reason: policyDecision.reason,
        approvalRequestId: approval.id,
      });

      return res.status(202).json({
        success: false,
        status: "approval_required",
        reason: policyDecision.reason,
        approvalRequestId: approval.id,
      });
    }

    // ALLOW
    const result = await executeToolOnServer({
      serverId,
      toolName,
      args: args ?? {},
    });

    await createToolLog({
      conversationId,
      toolName,
      serverId,
      argsJson: JSON.stringify(args ?? {}),
      decision: "allowed",
      resultJson: JSON.stringify(result),
    });

    res.json({
      success: true,
      status: "allowed",
      result,
    });
  } catch (error) {
    console.error("Failed to execute tool:", error);

    await createToolLog({
      toolName: req.body?.toolName ?? "unknown",
      serverId: req.body?.serverId ?? "unknown",
      argsJson: JSON.stringify(req.body?.args ?? {}),
      decision: "failed",
      error: error instanceof Error ? error.message : "Tool execution failed",
    });

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Tool execution failed",
    });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Agent API running on http://localhost:${PORT}`);
});    


app.get("/dashboard", async (_req, res) => {
  const policies = await listPolicies();
  const approvals = await listApprovalRequests();
  const logs = await listToolLogs();

  res.json({
    success: true,
    stats: {
      policies: policies.length,
      approvals: approvals.length,
      executions: logs.length,
      blocked: logs.filter(
        l => l.decision === "blocked"
      ).length,
      allowed: logs.filter(
        l => l.decision === "allowed"
      ).length,
    },
  });
});





app.get("/dashboard", async (_req, res) => {
  const policies = await listPolicies();
  const approvals = await listApprovalRequests();
  const logs = await listToolLogs();

  res.json({
    success: true,
    stats: {
      policies: policies.length,
      approvals: approvals.length,
      allowed: logs.filter(
        l => l.decision === "allowed"
      ).length,
      blocked: logs.filter(
        l => l.decision === "blocked"
      ).length,
      executions: logs.length,
    },
  });
});