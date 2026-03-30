export interface KnowledgeBaseItem {
  id: string;
  title: string;
  description: string;
  createdOn: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface CreateKnowledgeBaseFormData {
  name: string;
  description: string;
  vectorStore: string;
  llmEmbeddingModel: string;
}