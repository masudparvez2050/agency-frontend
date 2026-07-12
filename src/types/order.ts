export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  price: string;
  date: string;
  paymentMethod: "bkash" | "nagad" | "rocket";
  senderPhone: string;
  transactionId: string;
  status: "pending" | "approved" | "cancelled";
  downloadLink: string;
  licenseKey: string;
  imageGradient: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: "Billing" | "Technical" | "General" | "Bespoke Request";
  message: string;
  status: "open" | "resolved" | "replied";
  date: string;
}

export interface DownloadLog {
  id: string;
  appId: string;
  appTitle: string;
  version: string;
  date: string;
  platform: string;
}
