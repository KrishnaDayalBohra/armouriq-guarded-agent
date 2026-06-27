import {
  LayoutDashboard,
  Bot,
  Shield,
  CheckCircle2,
  FileText,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agent",
    href: "/chat",
    icon: Bot,
  },
  {
    title: "Policies",
    href: "/policies",
    icon: Shield,
  },
  {
    title: "Approvals",
    href: "/approvals",
    icon: CheckCircle2,
  },
  {
    title: "Audit Logs",
    href: "/logs",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];