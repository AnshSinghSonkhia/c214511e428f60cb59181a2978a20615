"use client";

import React from "react";
import {
  Bot,
  Cpu,
  Library,
  Globe,
  Monitor,
  ListTodo,
  Zap,
  Briefcase,
  Play,
  Shield,
  Database,
  KeyRound,
  Building2,
  Plug,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "MY PROJECTS",
    items: [
      { label: "Agents", icon: <Bot size={16} /> },
      { label: "AI Models", icon: <Cpu size={16} /> },
      { label: "Library", icon: <Library size={16} /> },
    ],
  },
  {
    title: "ORCHESTRATOR",
    items: [
      { label: "Published", icon: <Globe size={16} /> },
      { label: "Machines", icon: <Monitor size={16} /> },
      { label: "Queues", icon: <ListTodo size={16} /> },
      { label: "Triggers", icon: <Zap size={16} /> },
      { label: "Jobs", icon: <Briefcase size={16} /> },
      { label: "Executions", icon: <Play size={16} /> },
      { label: "Vault", icon: <Shield size={16} /> },
      {
        label: "Knowledge Base",
        icon: <Database size={16} />,
        isActive: true,
      },
      { label: "Key Store", icon: <KeyRound size={16} /> },
    ],
  },
  {
    title: "ADMIN",
    items: [
      { label: "Tenant", icon: <Building2 size={16} /> },
      { label: "Integrations", icon: <Plug size={16} /> },
      { label: "Settings", icon: <Settings size={16} /> },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-52 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto">
      <nav className="flex-1 py-4 px-3">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            {/* Section Title */}
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
              {section.title}
            </p>

            {/* Section Items */}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button
                    className={cn(
                      "sidebar-item w-full text-left",
                      item.isActive && "sidebar-item-active"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        item.isActive ? "text-[#4F46E5]" : "text-gray-500"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;