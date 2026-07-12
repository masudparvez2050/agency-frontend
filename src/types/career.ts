export interface JobListing {
  id: string;
  title: string;
  department: "Engineering" | "Design" | "Marketing" | "Operations";
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  perks: string[];
  postedDate: string;
}
