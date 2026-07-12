import { SaaSProduct } from "@/types/saas";

export const SAAS_PRODUCTS: SaaSProduct[] = [
  {
    id: "vortex-pos",
    title: "Vortex POS & Inventory Suite",
    niche: "Retail, Wholesale & Shop Management",
    description: "Cloud Point-of-Sale terminal with live barcode scanning, real-time stock notifications, and automated invoice PDF sheets.",
    fullDescription: "Vortex POS is an enterprise-grade retail inventory control application. Built with high-speed indexing search for stock checks, support for multi-register drawer syncing, and custom print layouts for supplier invoices. Features local IndexedDB caches to process sales even during internet blackouts, syncing immediately once network returns.",
    accent: "from-blue-600 via-indigo-650 to-cyan-500",
    tags: ["POS Software", "Stock Alerts", "Invoice PDF Printer"],
    features: [
      "Offline-first sales logging with browser storage synchronization",
      "Instant barcode identification scanner using mobile cameras or USB decoders",
      "Low inventory notification hooks configured via email triggers",
      "Supplier ledger balances tracking and credit logs management",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Prisma ORM", "IndexedDB Cache"],
    stats: [
      { label: "Active Cashiers", value: "1,240+" },
      { label: "Daily Sales processed", value: "32,000+" },
      { label: "Uptime SLA", value: "99.98%" },
    ],
  },
  {
    id: "apex-crm",
    title: "Apex Client & Lead Automation",
    niche: "Fintech, Agencies & Sales Pipeline Management",
    description: "Lead tracking pipeline, visual drag-and-drop kanban deal boards, and automated WhatsApp/Email notification flows.",
    fullDescription: "Apex CRM empowers high-performance sales forces to organize prospects, coordinate appointments, and trigger email responders. Integrates drag-and-drop deals tracking boards, automated client invoice notifications, and deep report analytics charting monthly conversion stats.",
    accent: "from-purple-600 via-pink-650 to-rose-500",
    tags: ["Sales CRM", "Kanban Deal Board", "Notification Trigger"],
    features: [
      "Dynamic Kanban pipelines mapping deal status (Leads, Proposal, Won/Lost)",
      "Automated WhatsApp customer follow-up webhooks integration",
      "Client profile activity logs tracking emails, calls, and files",
      "Sales commission dashboard tracking agent performance logs",
    ],
    techStack: ["React", "Node.js API", "PostgreSQL", "Socket.io"],
    stats: [
      { label: "Active Sales Agents", value: "3,800+" },
      { label: "Deals Automated", value: "120K+" },
      { label: "Conversion Lift", value: "+28% avg" },
    ],
  },
  {
    id: "edulink-lms",
    title: "EduLink Classroom & School Hub",
    niche: "Schools, Coaching Academies & Tutoring Platforms",
    description: "Student enrollment records management, exam result reports generation, and online classroom video meetings.",
    fullDescription: "EduLink LMS is a customized administration panel designed to operate schools, universities, and private coaching academies. Features student database logging, exam grade cards compiler, automated tuition fee SMS alerts, and teacher timetable schedules.",
    accent: "from-teal-600 via-emerald-650 to-amber-500",
    tags: ["School LMS", "Report Card Builder", "Fee SMS Notifier"],
    features: [
      "Student database profile logging with attendance tracking history",
      "Tuition payments monitoring with bKash/Nagad fee payment portals",
      "Online exam portal with automatic quiz grading results compiling",
      "Teacher classes schedules calendar board organizer",
    ],
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Twilio SMS API"],
    stats: [
      { label: "Registered Students", value: "8,500+" },
      { label: "Report Cards Issued", value: "45K+" },
      { label: "Fee Collection rate", value: "98.2%" },
    ],
  },
];
