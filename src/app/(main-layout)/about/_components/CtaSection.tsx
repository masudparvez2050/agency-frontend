import React from "react";
import Link from "next/link";
import { Reveal } from "./ui/Reveal";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 bg-white font-sans" id="cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="cta-gradient rounded-[2.5rem] p-10 md:p-16 text-center border border-blue-100 shadow-xl shadow-blue-900/5">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Let's Build Something <br /> <span className="text-gradient">Amazing</span> Together.</h2>
                    <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">Whether you need a custom enterprise solution, a new mobile app, or a scalable SaaS platform, our team is ready to turn your vision into reality.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                            Start Your Project
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-full text-slate-900 bg-white hover:bg-gray-50 shadow-sm transition-all hover:-translate-y-1">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
  );
}
