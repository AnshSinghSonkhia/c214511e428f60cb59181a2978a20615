import React from "react";
import { KnowledgeBaseItem } from "@/types";
import KnowledgeBaseCard from "./KnowledgeBaseCard";
import { Database } from "lucide-react";

interface KnowledgeBaseGridProps {
  items: KnowledgeBaseItem[];
}

const KnowledgeBaseGrid: React.FC<KnowledgeBaseGridProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 text-gray-400">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
          <Database size={36} className="text-gray-300" />
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-gray-500">
            No Knowledge Bases Found
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Create your first Knowledge Base to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <KnowledgeBaseCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default KnowledgeBaseGrid;