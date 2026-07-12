export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  niche: string;
  category: "Web Dev" | "Mobile Apps" | "UI/UX" | "Enterprise";
  description: string;
  challenge: string;
  solution: string;
  results: ProjectResult[];
  techStack: string[];
  testimonial: ProjectTestimonial;
  imageGradient: string; // CSS gradient e.g. "from-purple-600 via-indigo-650 to-pink-500"
}
