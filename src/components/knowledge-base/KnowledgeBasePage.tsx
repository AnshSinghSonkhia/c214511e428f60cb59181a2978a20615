"use client";

import React, { useState, useMemo } from "react";
import { Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import KnowledgeBaseGrid from "./KnowledgeBaseGrid";
import CreateKnowledgeBaseModal from "./CreateKnowledgeBaseModal";
import { knowledgeBaseItems } from "@/data/mockData";
import { KnowledgeBaseItem } from "@/types";
import { CreateKnowledgeBaseFormData } from "@/types";

const ROWS_PER_PAGE_OPTIONS = [6, 10, 20, 50];

const KnowledgeBasePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<KnowledgeBaseItem[]>(knowledgeBaseItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtered items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCreate = (data: CreateKnowledgeBaseFormData) => {
    const newItem: KnowledgeBaseItem = {
      id: String(Date.now()),
      title: data.name,
      description: data.description || "No description provided.",
      createdOn: new Date().toLocaleDateString("en-GB"),
    };
    setItems((prev) => [newItem, ...prev]);
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-900">Knowledge Base</h1>

        <div className="flex items-center gap-3">
          <SearchBar
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-56"
            variant="light"
          />
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6 overflow-auto">
        <KnowledgeBaseGrid items={paginatedItems} />
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-8 py-3.5 bg-white border-t border-gray-100 text-sm text-gray-500 shrink-0">
        {/* Row count */}
        <span className="font-medium text-gray-600">
          {filteredItems.length} row{filteredItems.length !== 1 ? "s" : ""}
        </span>

        <div className="flex items-center gap-6">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span className="text-xs">Rows per page</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none pl-2 pr-6 py-1 text-xs rounded border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5] cursor-pointer"
              >
                {ROWS_PER_PAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Page Info */}
          <span className="text-xs">
            page {currentPage} of {totalPages}
          </span>

          {/* Page Controls */}
          <div className="flex items-center gap-1">
            <PaginationButton
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <ChevronsLeft size={14} />
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </PaginationButton>
            <PaginationButton
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight size={14} />
            </PaginationButton>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateKnowledgeBaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

// Small reusable pagination button
interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  disabled,
  ...props
}) => (
  <button
    {...props}
    disabled={disabled}
    className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
  >
    {children}
  </button>
);

export default KnowledgeBasePage;