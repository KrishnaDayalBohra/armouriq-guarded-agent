export interface Policy {
  id: string;
  name: string;
  type: "block" | "approval_required";
  toolName: string | null;
  serverId: string | null;
  configJson: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}