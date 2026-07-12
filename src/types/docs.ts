export interface DocStep {
  instruction: string;
  code?: string;
}

export interface DocArticle {
  id: string;
  category: "Getting Started" | "Products Integration" | "Native Apps Guide";
  title: string;
  description: string;
  prerequisites: string[];
  steps: DocStep[];
  tips: string[];
}
