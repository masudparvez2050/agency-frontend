export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Detailed content paragraphs separated by newlines
  category: "Next.js" | "DevOps" | "Fintech" | "Case Study";
  date: string;
  readTime: string; // e.g. "5 min read"
  author: string;
  authorRole: string;
  accent: string; // e.g. "from-blue-600 to-indigo-650"
}
