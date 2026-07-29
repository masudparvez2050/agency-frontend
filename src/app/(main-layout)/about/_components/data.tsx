import React from "react";
import {
  Layers, Target, Eye, Heart, LayoutTemplate, Smartphone, Code, Cloud, Package, Bot, Braces, Layout, TerminalSquare, Briefcase, PackageOpen, Database, TrendingUp, ShieldCheck, MessageSquare, LifeBuoy, Handshake, Lightbulb, Shield, Award, Lock, Users, BookOpen
} from "lucide-react";

export const storyData = [
  {
    year: "2026",
    title: "Plaxora Group Founded",
    description: "Established with a vision to build interconnected digital ecosystems for modern businesses.",
    color: "blue",
    dotBorder: "border-blue-600",
    textClass: "text-blue-600",
    hoverBorder: "group-hover:border-blue-200",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-100/50"
  },
  {
    year: "Q2 2026",
    title: "First Client Project",
    description: "Delivered our first enterprise-grade custom software solution, establishing our reputation for quality.",
    color: "violet",
    dotBorder: "border-violet-600",
    textClass: "text-violet-600",
    hoverBorder: "group-hover:border-violet-200",
    gradientFrom: "from-violet-50",
    gradientTo: "to-violet-100/50"
  },
  {
    year: "Q3 2026",
    title: "Launch of Digital Products",
    description: "Released our first suite of UI kits, templates, and developer tools to the global market.",
    color: "violet-500",
    dotBorder: "border-violet-500",
    textClass: "text-violet-500",
    hoverBorder: "group-hover:border-violet-200",
    gradientFrom: "from-violet-50",
    gradientTo: "to-violet-100/50"
  },
  {
    year: "Q4 2026",
    title: "Custom Software Division",
    description: "Expanded our team to form a dedicated division for bespoke, scalable software architecture.",
    color: "blue-400",
    dotBorder: "border-blue-400",
    textClass: "text-blue-500",
    hoverBorder: "group-hover:border-blue-200",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-100/50"
  },
  {
    year: "Future",
    title: "Global Expansion Vision",
    description: "Scaling our operations, launching new SaaS platforms, and serving clients across all continents.",
    color: "purple-600",
    dotBorder: "border-purple-500",
    textClass: "text-purple-600",
    hoverBorder: "group-hover:border-purple-200",
    gradientFrom: "from-purple-50",
    gradientTo: "to-purple-100/50"
  }
];

export const missionData = [
  {
    icon: <Target className="text-blue-600 w-7 h-7" />,
    bg: "bg-blue-100",
    title: "Our Mission",
    desc: "To empower businesses worldwide by delivering exceptional, scalable, and beautifully crafted digital solutions that solve real problems."
  },
  {
    icon: <Eye className="text-violet-600 w-7 h-7" />,
    bg: "bg-purple-100",
    title: "Our Vision",
    desc: "To become the industry standard for digital product creation, known for our ecosystem approach and uncompromising design quality."
  },
  {
    icon: <Heart className="text-violet-500 w-7 h-7" />,
    bg: "bg-indigo-100",
    title: "Our Purpose",
    desc: "We build technology that elevates human potential. We exist to bridge the gap between complex engineering and seamless user experiences."
  }
];

export const whatWeBuildData = [
  {
    icon: <LayoutTemplate className="text-blue-600 w-8 h-8 mb-6" />,
    title: "Website Development",
    desc: "High-performance, SEO-optimized marketing websites built with modern frameworks for maximum conversion."
  },
  {
    icon: <Smartphone className="text-violet-600 w-8 h-8 mb-6" />,
    title: "Mobile Applications",
    desc: "Native and cross-platform mobile experiences designed for iOS and Android, focusing on intuitive UX."
  },
  {
    icon: <Code className="text-violet-500 w-8 h-8 mb-6" />,
    title: "Custom Software",
    desc: "Bespoke enterprise applications tailored to your specific business logic and operational workflows."
  },
  {
    icon: <Cloud className="text-blue-500 w-8 h-8 mb-6" />,
    title: "SaaS Platforms",
    desc: "End-to-end architecture and development for scalable multi-tenant software-as-a-service products."
  },
  {
    icon: <Package className="text-purple-500 w-8 h-8 mb-6" />,
    title: "Digital Products",
    desc: "Creation of premium UI kits, templates, icons, and developer tools for the global creator economy."
  },
  {
    icon: <Bot className="text-indigo-500 w-8 h-8 mb-6" />,
    title: "Business Automation",
    desc: "Integrating APIs and building smart workflows to automate repetitive tasks and increase efficiency."
  }
];

export const whyUsData = [
  {
    icon: <Layers className="text-blue-600 w-5 h-5" />,
    bg: "bg-blue-50",
    title: "Modern Architecture",
    desc: "We utilize microservices, serverless functions, and modern frameworks to ensure your product is built for the future."
  },
  {
    icon: <TrendingUp className="text-violet-600 w-5 h-5" />,
    bg: "bg-purple-50",
    title: "Scalable Systems",
    desc: "Our databases and backend architectures are designed to handle rapid growth without compromising performance."
  },
  {
    icon: <ShieldCheck className="text-green-600 w-5 h-5" />,
    bg: "bg-green-50",
    title: "Secure Development",
    desc: "Security is baked in from day one. We follow strict protocols to protect user data and prevent vulnerabilities."
  },
  {
    icon: <MessageSquare className="text-yellow-600 w-5 h-5" />,
    bg: "bg-yellow-50",
    title: "Transparent Communication",
    desc: "No black boxes. You get regular updates, access to staging environments, and direct lines to our engineers."
  },
  {
    icon: <LifeBuoy className="text-red-500 w-5 h-5" />,
    bg: "bg-red-50",
    title: "Reliable Support",
    desc: "Our relationship doesn't end at launch. We provide ongoing maintenance, monitoring, and dedicated technical support."
  },
  {
    icon: <Handshake className="text-indigo-600 w-5 h-5" />,
    bg: "bg-indigo-50",
    title: "Long-term Partnership",
    desc: "We act as an extension of your team, aligning our technical strategies with your long-term business goals."
  }
];

export const statsData = [
  { target: 150, text: "Projects Delivered", suffix: "+" },
  { target: 98, text: "Happy Clients", suffix: "%" },
  { target: 24, text: "Products Built", suffix: "" },
  { target: 12, text: "Countries Served", suffix: "" },
  { target: 99, text: "Support Satisfaction", suffix: "%" },
  { target: 5, text: "Years of Innovation", suffix: "+" }
];

export const valuesData = [
  { icon: <Lightbulb className="w-6 h-6 text-yellow-500 mx-auto mb-3" />, title: "Innovation" },
  { icon: <Shield className="w-6 h-6 text-green-500 mx-auto mb-3" />, title: "Integrity" },
  { icon: <Award className="w-6 h-6 text-purple-500 mx-auto mb-3" />, title: "Quality" },
  { icon: <Lock className="w-6 h-6 text-gray-700 mx-auto mb-3" />, title: "Privacy" },
  { icon: <Users className="w-6 h-6 text-blue-500 mx-auto mb-3" />, title: "Customer Success" },
  { icon: <BookOpen className="w-6 h-6 text-red-500 mx-auto mb-3" />, title: "Continuous Learning" }
];

export const faqData = [
  { q: "Who is Plaxora Group?", a: "Plaxora Group is a parent technology company that builds custom software solutions, SaaS platforms, and premium digital products. We operate both as a product studio building our own tools and an agency helping other businesses scale." },
  { q: "What services do you provide?", a: "We offer full-cycle development services including Web Development, Mobile App Development (iOS/Android), Custom Enterprise Software, SaaS Platform Architecture, UI/UX Design, and Cloud Infrastructure setup." },
  { q: "Do you work internationally?", a: "Yes, absolutely. We are a globally distributed team and work with clients across North America, Europe, Asia, and Australia. We adapt our communication schedule to fit your timezone." },
  { q: "How long does development take?", a: "Timelines vary greatly based on project scope. A standard marketing website might take 3-4 weeks, while a complex SaaS platform could take 3-6 months. We provide detailed timeline estimates after our discovery phase." },
  { q: "How can we start?", a: "Simply click the \"Start Your Project\" button, fill out the brief form detailing your needs, and our team will schedule a free 30-minute discovery call within 24 hours to discuss your vision." }
];
