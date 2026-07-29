import React from "react";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";
import { ShieldCheck, Lock, Eye, Database, Cookie, Server, UserCheck, FileCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Plaxora Group",
  description: "Learn about how Plaxora Group protects your privacy and handles your data with enterprise-grade security.",
};

export default function PrivacyPolicyPage() {
  const summaryItems = [
    {
      title: "Data Protection",
      desc: "256-bit AES encryption for all data in transit and at rest.",
      icon: <Lock className="w-4 h-4 text-blue-600" />,
    },
    {
      title: "Zero Data Sale",
      desc: "We never sell or monetize your personal or company data.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    },
    {
      title: "GDPR & CCPA Compliant",
      desc: "Full rights to access, export, or delete your personal records anytime.",
      icon: <UserCheck className="w-4 h-4 text-purple-600" />,
    },
  ];

  const sections: LegalSection[] = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      badge: "Scope & Types",
      content: (
        <div className="space-y-4">
          <p>
            Plaxora Group ("we", "our", "us") collects specific information to deliver high-performance software products, mobile applications, templates, and enterprise development services.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600" /> Account & Contact Information
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Name, work email, phone number, billing address, and company details provided when you submit forms, purchase licenses, or open support tickets.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Database className="w-4 h-4 text-violet-600" /> Usage & Telemetry Data
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                IP addresses, browser environment, operating system, pages visited, and interaction metrics gathered via automated cookies and server logs.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Note: Payment card details are processed directly by PCI-DSS compliant gateways (e.g. Stripe, PayPal). Plaxora Group never stores raw credit card numbers on our servers.
          </p>
        </div>
      ),
    },
    {
      id: "how-we-use-data",
      title: "2. How We Use Your Information",
      badge: "Purpose",
      content: (
        <div className="space-y-3">
          <p>We process collected data exclusively for legitimate operational and engineering purposes:</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Product Delivery & Licensing:</strong> Generating software license keys, template access links, and dashboard authorization credentials.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Security & Fraud Prevention:</strong> Monitoring unauthorized software distribution, API abuse, and securing customer accounts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>System Improvements:</strong> Analyzing feature performance and crash reports to optimize application speed and UI responsiveness.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <span><strong>Transactional Updates:</strong> Sending invoice confirmations, security patches, system maintenance advisories, and ticket replies.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "3. Enterprise Security & Encryption",
      badge: "Infrastructure",
      content: (
        <div className="space-y-4">
          <p>
            Security is engineered into our platform architecture from day one. We employ multi-layered technical controls to protect user records against unauthorized access:
          </p>
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 text-xs space-y-3 font-mono">
            <div className="flex items-center justify-between text-blue-400 font-bold border-b border-slate-800 pb-2">
              <span>SECURITY PROTOCOLS</span>
              <span>STATUS: ACTIVE</span>
            </div>
            <p><span className="text-emerald-400">✓ Encryption in Transit:</span> TLS 1.3 with HSTS enforcement for all HTTP requests.</p>
            <p><span className="text-emerald-400">✓ Encryption at Rest:</span> AES-256 standard encryption for all database clusters & AWS S3 buckets.</p>
            <p><span className="text-emerald-400">✓ Access Control:</span> Zero-trust internal network with RBAC (Role-Based Access Control) & mandatory 2FA.</p>
          </div>
        </div>
      ),
    },
    {
      id: "cookies-analytics",
      title: "4. Cookies & Tracking Technology",
      badge: "Preferences",
      content: (
        <div className="space-y-3">
          <p>
            We use essential and performance cookies to enable core website functionalities (such as user authentication and cart storage) and aggregated performance analytics.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            You can modify your browser settings to decline non-essential cookies. Disabling essential session cookies may impair specific features of the dashboard and digital store.
          </p>
        </div>
      ),
    },
    {
      id: "third-party-sharing",
      title: "5. Third-Party Service Integrations",
      badge: "Sub-processors",
      content: (
        <div className="space-y-3">
          <p>
            We strictly limit data sharing to trusted sub-processors who fulfill essential technical infrastructure functions under confidentiality agreements:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 my-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-0.5">Stripe & PayPal</strong>
              <span className="text-slate-500">Secure Billing & Payment Settlement</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-0.5">AWS & Vercel</strong>
              <span className="text-slate-500">Global Cloud Edge & Hosting Infrastructure</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-0.5">Postmark / Resend</strong>
              <span className="text-slate-500">Transactional Email Delivery</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "user-rights",
      title: "6. Your Privacy Rights (GDPR & CCPA)",
      badge: "User Control",
      content: (
        <div className="space-y-3">
          <p>Regardless of your geographic location, Plaxora Group respects your fundamental rights over your personal data:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li><strong>Right to Access:</strong> Request a full copy of the personal information stored in our databases.</li>
            <li><strong>Right to Rectification:</strong> Update or correct inaccurate account records anytime.</li>
            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request complete deletion of your profile and data records.</li>
            <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable JSON format.</li>
          </ul>
          <p className="text-xs text-slate-500 pt-2">
            To submit a formal data inquiry or deletion request, please contact our Data Protection Officer at <a href="mailto:info@plaxora.com" className="text-blue-600 font-bold hover:underline">info@plaxora.com</a>.
          </p>
        </div>
      ),
    },
    {
      id: "data-retention",
      title: "7. Data Retention & Policy Updates",
      badge: "Governance",
      content: (
        <div className="space-y-3">
          <p>
            We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to comply with statutory accounting and legal obligations.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            We reserve the right to revise this Privacy Policy periodically. Significant modifications will be communicated via website notification banners or direct email alerts to active account holders.
          </p>
        </div>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Comprehensive breakdown of how Plaxora Group collects, uses, encrypts, and safeguards customer data across our SaaS platforms and digital products."
      lastUpdated="July 29, 2026"
      readTime="5 min read"
      policyType="privacy"
      sections={sections}
      summaryItems={summaryItems}
    />
  );
}
