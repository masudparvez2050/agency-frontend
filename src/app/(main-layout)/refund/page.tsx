import React from "react";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";
import { RotateCcw, CheckCircle, AlertTriangle, CreditCard, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Refund & Return Policy | Plaxora Group",
  description: "Official Refund and Return Policy for Plaxora Group templates, SaaS platforms, and custom software engineering.",
};

export default function RefundPolicyPage() {
  const summaryItems = [
    {
      title: "14-Day Product Window",
      desc: "Eligible refunds for defective or misleading digital products within 14 days.",
      icon: <Clock className="w-4 h-4 text-pink-600" />,
    },
    {
      title: "7-Day SaaS Guarantee",
      desc: "Full money-back guarantee on initial SaaS software subscription upgrades.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: "Transparent Milestones",
      desc: "Fair pro-rata billing and milestone settlements for custom enterprise code.",
      icon: <CreditCard className="w-4 h-4 text-blue-600" />,
    },
  ];

  const sections: LegalSection[] = [
    {
      id: "overview",
      title: "1. Refund Policy Overview",
      badge: "Policy Philosophy",
      content: (
        <div className="space-y-3">
          <p>
            Plaxora Group is dedicated to engineering top-tier digital assets, SaaS tools, and bespoke software solutions. Because digital source code, downloadable templates, and developer licenses are non-tangible assets, our refund terms vary depending on the category of product or service purchased.
          </p>
          <p className="text-xs text-slate-500">
            We aim to resolve all billing issues with complete fairness and transparency. Please review our specific policies below.
          </p>
        </div>
      ),
    },
    {
      id: "digital-products",
      title: "2. Digital Products (Templates, UI Kits & Boilerplates)",
      badge: "Digital Goods",
      content: (
        <div className="space-y-4">
          <p>
            Because digital code files can be copied once downloaded, purchases are generally final once access links are delivered. However, we honor refund requests within <strong>14 days of purchase</strong> under the following valid conditions:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 my-2">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Technical Defects
              </span>
              <p className="text-emerald-800">
                The product is non-functional, contains major broken dependencies, or has fatal errors that our engineering team cannot fix within 3 business days.
              </p>
            </div>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Material Misrepresentation
              </span>
              <p className="text-emerald-800">
                The delivered code repository differs fundamentally from the features advertised in the official live demo or documentation.
              </p>
            </div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ineligibility Exclusions:</strong> Refunds will not be granted for change-of-mind, lack of developer expertise to configure Node/React environments, or failure to read tech stack requirements listed on the product page.
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "saas-subscriptions",
      title: "3. SaaS Platform Subscriptions",
      badge: "SaaS Guarantee",
      content: (
        <div className="space-y-3">
          <p>
            For recurring SaaS products hosted by Plaxora Group, you are free to cancel your subscription at any time via your account billing portal.
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600 mt-2 shrink-0" />
              <span><strong>7-Day Money-Back Guarantee:</strong> New subscribers to any paid SaaS plan can request a 100% refund within the first 7 days of their initial upgrade.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-600 mt-2 shrink-0" />
              <span><strong>Cancellation Effect:</strong> Upon cancellation, your subscription remains active until the end of your current billing cycle without further charges.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "custom-services",
      title: "4. Custom Enterprise Engineering Projects",
      badge: "Bespoke Services",
      content: (
        <div className="space-y-3">
          <p>
            Custom development contracts, mobile application engineering, and dedicated team retainers operate under milestone-based Statements of Work (SOW):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Discovery & Deposit:</strong> Initial deposits are non-refundable once architectural discovery and design sprints have commenced.</li>
            <li><strong>Milestone Cancellations:</strong> If a project is cancelled prior to completion, billing will be adjusted pro-rata based on approved milestones. Any unearned advance payments will be promptly refunded.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "process-timeline",
      title: "5. How to Request a Refund",
      badge: "Step-by-Step",
      content: (
        <div className="space-y-4">
          <p>Submitting a refund request is straightforward. Follow these steps to ensure quick processing:</p>
          <ol className="space-y-3 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <span>Send an email to <a href="mailto:info@plaxora.com" className="text-pink-600 font-bold hover:underline">info@plaxora.com</a> with the subject line <strong>"Refund Request - Order #[Order ID]"</strong>.</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <span>Provide your purchase receipt, registered email address, and specific technical details or reasons for the request.</span>
            </li>
            <li className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
              <span>Our support & engineering team will review your ticket within 24 to 48 hours.</span>
            </li>
          </ol>
        </div>
      ),
    },
    {
      id: "processing-time",
      title: "6. Processing Timelines & Disbursement",
      badge: "Payouts",
      content: (
        <div className="space-y-3">
          <p>
            Once a refund is approved by our billing department, credit is issued back to the original payment method (Stripe card, PayPal account, or bank transfer).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Please allow <strong>5 to 10 business days</strong> for the refunded amount to reflect on your bank or credit card statement, depending on your financial institution's processing times.
          </p>
        </div>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Refund & Return Policy"
      subtitle="Clear, fair, and transparent guidelines regarding refunds, billing guarantees, and cancellations across Plaxora products and services."
      lastUpdated="July 29, 2026"
      readTime="4 min read"
      policyType="refund"
      sections={sections}
      summaryItems={summaryItems}
    />
  );
}
