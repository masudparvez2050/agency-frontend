import { Order, Ticket, DownloadLog } from "@/types/order";

export const MOCK_USER = {
  name: "Masud Parvez",
  email: "masudparvez00019@gmail.com",
  role: "Developer",
  joinedDate: "2026-01-15",
  avatarInitials: "MP",
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-98217",
    productId: "plaxora-ecommerce-template",
    productTitle: "Plaxora-Shop eCommerce Template",
    price: "1,500 BDT",
    date: "2026-07-01",
    paymentMethod: "bkash",
    senderPhone: "01783-XXXXXX",
    transactionId: "BK8273618",
    status: "approved",
    downloadLink: "#",
    licenseKey: "PLXR-SHOP-F982-A73C-110E",
    imageGradient: "from-indigo-600 via-purple-600 to-pink-500",
  },
  {
    id: "ORD-98334",
    productId: "sass-dashboard-boilerplate",
    productTitle: "Vortex SaaS Admin Boilerplate",
    price: "2,200 BDT",
    date: "2026-07-12",
    paymentMethod: "nagad",
    senderPhone: "01944-XXXXXX",
    transactionId: "NG9283719",
    status: "pending",
    downloadLink: "",
    licenseKey: "",
    imageGradient: "from-blue-600 via-cyan-500 to-indigo-500",
  },
];

export const MOCK_DOWNLOADS: DownloadLog[] = [
  {
    id: "DL-11082",
    appId: "galaxy-games",
    appTitle: "Galaxy Games Hub",
    version: "v1.2.0",
    date: "2026-07-05",
    platform: "Android APK",
  },
  {
    id: "DL-11093",
    appId: "plexora-cli",
    appTitle: "Plexora Developer CLI",
    version: "v1.3.1",
    date: "2026-07-08",
    platform: "Windows Executable",
  },
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "TCK-8721",
    subject: "eCommerce template Tailwind v4 compile errors",
    category: "Technical",
    message: "I am seeing node-sass deprecation logs when building. How do I configure next.config.ts to support sass modules?",
    status: "resolved",
    date: "2026-07-02",
  },
  {
    id: "TCK-8902",
    subject: "Request custom payment gateway API assistance",
    category: "Bespoke Request",
    message: "I need to integrate SSLCommerz as a gateway on my store. Can you estimate development hours for this integration?",
    status: "open",
    date: "2026-07-12",
  },
];
