import { TeamMember, CompanyValue } from "@/types/about";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Masud Parvez",
    role: "Founder & Lead Architect",
    bio: "Full stack engineer specializing in Next.js App Router, web security, and payment integrations. Architect of the core Plaxora software systems.",
    github: "https://github.com/masudparvez00019",
    avatarInitials: "MP",
    accent: "from-blue-600 via-indigo-650 to-cyan-500",
  },
  {
    name: "Tahmid Reza",
    role: "Cloud DevOps Specialist",
    bio: "Configures scalable Docker containers, automated CI/CD actions workflows, and Nginx reverse proxy routes across Ubuntu servers.",
    github: "https://github.com",
    avatarInitials: "TR",
    accent: "from-purple-600 via-pink-650 to-rose-500",
  },
  {
    name: "Sultana Yasmin",
    role: "Database Architect",
    bio: "Designs PostgreSQL relational schema systems, caches database responses with Redis, and optimizes IndexedDB store caches.",
    github: "https://github",
    avatarInitials: "SY",
    accent: "from-teal-600 to-emerald-500",
  },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: "Strict User Privacy",
    description: "Our pre-built templates and native app store bundles contain zero hidden tracking codes, metrics logs, or interstitial pop-up ads.",
    iconName: "ShieldAlert",
  },
  {
    title: "Clean Engineering",
    description: "Every file follows TypeScript configurations, uses semantic HTML layouts, and passes Next.js production compilations cleanly.",
    iconName: "FileCode",
  },
  {
    title: "Manual Verification Audits",
    description: "We verify manual bKash/Nagad transactions manually to maintain authentic accounting histories, preventing billing system glitches.",
    iconName: "CheckCircle",
  },
  {
    title: "Open Source Advocate",
    description: "We actively maintain developers tools (Plexora CLI), publish guides on our blog, and release free template packages.",
    iconName: "Globe",
  },
];
