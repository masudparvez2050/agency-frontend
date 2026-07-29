import React from "react";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";
import { FileText, Key, Code, ShieldAlert, Cpu, Scale, Check } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Plaxora Group",
  description: "Official Terms of Service and End User License Agreements for Plaxora Group software products and services.",
};

export default function TermsOfServicePage() {
  const summaryItems = [
    {
      title: "Commercial Licensing",
      desc: "Clear usage rights for UI kits, software templates, and mobile boilerplates.",
      icon: <Key className="w-4 h-4 text-purple-600" />,
    },
    {
      title: "IP Rights Reserved",
      desc: "Plaxora Group retains sole ownership of core source code and design systems.",
      icon: <Code className="w-4 h-4 text-blue-600" />,
    },
    {
      title: "Fair Enterprise Usage",
      desc: "Transparent SLAs and non-disclosure protections for custom clients.",
      icon: <Scale className="w-4 h-4 text-amber-600" />,
    },
  ];

  const sections: LegalSection[] = [
    {
      id: "agreement-acceptance",
      title: "1. Agreement & Binding Acceptance",
      badge: "Binding Terms",
      content: (
        <div className="space-y-3">
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you (individually or on behalf of an entity) and <strong>Plaxora Group</strong> regarding your access to and use of our web applications, SaaS products, source code templates, UI design assets, and custom engineering services.
          </p>
          <p className="text-xs text-slate-500">
            By purchasing, downloading, installing, or interacting with any software asset provided by Plaxora Group, you signify that you have read, understood, and agreed to be bound by these Terms in full.
          </p>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "2. Intellectual Property & Code Ownership",
      badge: "Copyright",
      content: (
        <div className="space-y-4">
          <p>
            All technology, brand assets, source code repositories, graphic interfaces, proprietary algorithms, database schemas, and documentation produced by Plaxora Group remain the sole intellectual property of Plaxora Group.
          </p>
          <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs space-y-2">
            <strong className="text-purple-900 font-bold block">Restrictions on Resale & Distribution:</strong>
            <p className="text-purple-800">
              You may not redistribute, repackage, sub-license, host as a competing marketplace, or resell our uncompiled template source files or UI kits, regardless of modifications, unless explicitly authorized under an Enterprise Partner License.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "license-terms",
      title: "3. Digital Product Licensing Tiers",
      badge: "License Scope",
      content: (
        <div className="space-y-4">
          <p>When purchasing products from the Plaxora digital marketplace, usage is governed by the selected license tier:</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px] uppercase tracking-wider">
                Standard License
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Single End Product</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Use for 1 commercial or personal project</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Lifetime access to product updates</li>
                <li className="flex items-center gap-1.5 text-slate-400">✗ No sub-licensing or template resale</li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-purple-200 shadow-2xs space-y-2">
              <span className="px-2.5 py-1 rounded-md bg-purple-600 text-white font-bold text-[10px] uppercase tracking-wider">
                Extended / Agency License
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Unlimited Client Projects</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Build unlimited end-products for clients</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Access to Figma raw design source files</li>
                <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Priority developer support line</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "custom-engineering",
      title: "4. Custom Enterprise Engineering Services",
      badge: "Services SLA",
      content: (
        <div className="space-y-3">
          <p>
            For bespoke software development, mobile app projects, and dedicated enterprise engineering, terms are supplemented by an executed Master Services Agreement (MSA) or Statement of Work (SOW).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Upon final payment settlement, clients receive full ownership rights to custom-built application code, excluding Plaxora Group's pre-existing reusable core libraries and boilerplates.
          </p>
        </div>
      ),
    },
    {
      id: "acceptable-use",
      title: "5. Acceptable Use & Conduct Restrictions",
      badge: "Security & Use",
      content: (
        <div className="space-y-3">
          <p>You agree not to engage in any of the following prohibited activities while using Plaxora platforms or services:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>Attempting reverse engineering, decompilation, or unauthorized vulnerability probing of our infrastructure.</li>
            <li>Using our products to distribute malware, phishing campaigns, or illegal content.</li>
            <li>Automated scraping of our marketplace, documentation portals, or client APIs without explicit authorization.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimers-liability",
      title: "6. Warranty Disclaimers & Liability Limits",
      badge: "Legal Liability",
      content: (
        <div className="space-y-3">
          <p>
            Except as explicitly provided in a written Enterprise SLA, all Plaxora digital products are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            To the maximum extent permitted by applicable law, Plaxora Group shall not be liable for any indirect, incidental, or consequential damages (including lost profits, data corruption, or business interruption) arising out of the use or inability to use our products.
          </p>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Dispute Resolution",
      badge: "Jurisdiction",
      content: (
        <div className="space-y-3">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any legal action or dispute arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Dhaka, Bangladesh.
          </p>
        </div>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="The official rules, usage licensing terms, and conditions governing the use of Plaxora Group products, software templates, and client development services."
      lastUpdated="July 29, 2026"
      readTime="6 min read"
      policyType="terms"
      sections={sections}
      summaryItems={summaryItems}
    />
  );
}
