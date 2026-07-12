import { Plan, FeatureRow, FAQItem } from "@/types/pricing";

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: "15,000 BDT",
    period: "Per Project",
    description: "Ideal for basic agency setups, personal portfolios, and single-use digital template packages.",
    features: [
      "Up to 3 pages custom landing UI",
      "Responsive design structure",
      "Manual payment validation setup",
      "1 month free bug fixes support",
      "Standard developer handoff files",
    ],
    accent: "from-blue-600 to-indigo-650",
    ctaText: "Choose Starter Plan",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth Package",
    price: "35,000 BDT",
    period: "Per Project",
    description: "Perfect for online retailers, product shops, and SaaS platforms looking for integrated billing networks.",
    features: [
      "Up to 8 custom styled pages",
      "Dynamic Admin Blog / CMS logs",
      "bKash & Nagad manual checkout portals",
      "3 months free maintenance support",
      "Lighthouse Page Speed audit (90+ score)",
      "Interactive Framer Motion animations",
    ],
    accent: "from-purple-600 via-pink-650 to-rose-500",
    ctaText: "Select Growth Plan",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    price: "85,000 BDT",
    period: "Per Project",
    description: "Engineered for high-volume networks, database systems, native apps, and custom SaaS architectures.",
    features: [
      "Unlimited sub-pages & dynamic routers",
      "Prisma DB integrations (PostgreSQL/MySQL)",
      "Tokenized Stripe/SSLCommerz payments",
      "6 months priority SLA support",
      "Biometric login validation mobile compile",
      "Dockerized container server setups",
    ],
    accent: "from-teal-600 to-emerald-500",
    ctaText: "Order Enterprise Custom",
    popular: false,
  },
];

export const FEATURE_ROWS: FeatureRow[] = [
  {
    featureName: "Page Capacity Limit",
    starter: "Up to 3 Pages",
    growth: "Up to 8 Pages",
    enterprise: "Unlimited",
  },
  {
    featureName: "Custom UI/UX Design System",
    starter: true,
    growth: true,
    enterprise: true,
  },
  {
    featureName: "Database Integrations (PostgreSQL)",
    starter: false,
    growth: "CMS Only",
    enterprise: true,
  },
  {
    featureName: "Checkout Gateway Integrations",
    starter: "Offline Mock Only",
    growth: "Manual bKash/Nagad",
    enterprise: "Tokenized Auto API",
  },
  {
    featureName: "Google Vitals Speed Audit (Lighthouse 90+)",
    starter: false,
    growth: true,
    enterprise: true,
  },
  {
    featureName: "Dedicated Tech SLA Support",
    starter: "1 Month",
    growth: "3 Months",
    enterprise: "6 Months",
  },
  {
    featureName: "Dockerized Container Deployments",
    starter: false,
    growth: false,
    enterprise: true,
  },
];

export const PRICING_FAQS: FAQItem[] = [
  {
    question: "How long does it take for manual bKash or Nagad payments to verify?",
    answer: "Our CMS administrative team audits manual Bkash/Nagad transactions every hour. Once the Transaction ID (TxnID) is matched against our ledger deposits, your digital template download button and license key will activate in your User Dashboard within 1-2 hours.",
  },
  {
    question: "Do you support recurring SaaS subscription plans?",
    answer: "Yes! In our Enterprise Package, we can set up automated recurring billing webhooks integrating Stripe Subscriptions or local SSLCommerz recurring payment checkouts, complete with email notification triggers.",
  },
  {
    question: "What is your refund policy for template purchases?",
    answer: "Since digital products are instantly accessible via source files upon approval, we do not offer refunds once a transaction is verified. However, if your download file is corrupted, please submit a Support Ticket in your dashboard, and our engineers will verify the files.",
  },
  {
    question: "Can I request changes to pre-built templates?",
    answer: "Absolutely! You can choose our template license packages and hire us for custom edits under our hourly developer services. Submit a custom project request in our Contact Form for estimates.",
  },
];
