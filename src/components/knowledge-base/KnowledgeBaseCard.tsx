"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { KnowledgeBaseItem } from "@/types";

interface KnowledgeBaseCardProps {
  item: KnowledgeBaseItem;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ item }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#4F46E5] transition-colors">
          {item.title}
        </h3>

        {/* 3-dot Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Card options"
          >
            <MoreHorizontal size={16} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 top-7 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-36 animate-fade-in">
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Eye size={14} />
                View
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <Pencil size={14} />
                Edit
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
        {item.description}
      </p>

      {/* Footer */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          <span className="font-medium">Created On: </span>
          {item.createdOn}
        </p>
      </div>
    </article>
  );
};

export default KnowledgeBaseCard;