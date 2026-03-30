"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { vectorStoreOptions, llmEmbeddingModelOptions } from "@/data/mockData";
import { CreateKnowledgeBaseFormData } from "@/types";

interface CreateKnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateKnowledgeBaseFormData) => void;
}

const initialFormState: CreateKnowledgeBaseFormData = {
  name: "",
  description: "",
  vectorStore: "qdrant",
  llmEmbeddingModel: "text-embedding-ada-002",
};

const CreateKnowledgeBaseModal: React.FC<CreateKnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] =
    useState<CreateKnowledgeBaseFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<CreateKnowledgeBaseFormData>>(
    {}
  );

  const handleChange = (
    field: keyof CreateKnowledgeBaseFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CreateKnowledgeBaseFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.vectorStore) newErrors.vectorStore = "Vector Store is required";
    if (!formData.llmEmbeddingModel)
      newErrors.llmEmbeddingModel = "LLM Embedding Model is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData(initialFormState);
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Knowledge Base"
      subtitle="Best for quick answers from documents, websites and text files."
      size="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="kb-name"
            className="text-sm font-medium text-gray-700"
          >
            Name (Cannot be edited later)
            <span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            id="kb-name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all placeholder-gray-400 ${
              errors.name ? "border-red-400" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="kb-description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="kb-description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all placeholder-gray-400 resize-none"
          />
        </div>

        {/* Vector Store */}
        <Select
          id="kb-vector-store"
          label="Vector Store"
          required
          options={vectorStoreOptions}
          value={formData.vectorStore}
          onChange={(e) => handleChange("vectorStore", e.target.value)}
        />

        {/* LLM Embedding Model */}
        <Select
          id="kb-embedding-model"
          label="LLM Embedding Model"
          required
          options={llmEmbeddingModelOptions}
          value={formData.llmEmbeddingModel}
          onChange={(e) => handleChange("llmEmbeddingModel", e.target.value)}
        />

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateKnowledgeBaseModal;