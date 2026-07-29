import React from "react";
import { Reveal } from "./ui/Reveal";
import { Quote, Star } from "lucide-react";

const testimonialsData = [
  {
    quote: "Plaxora transformed our outdated internal tools into a modern, lightning-fast SaaS platform. Their engineering quality is unmatched, and communication was transparent throughout.",
    initials: "JD",
    colorFrom: "from-blue-400",
    colorTo: "to-blue-600",
    name: "James Davidson",
    role: "CTO, TechFlow Inc."
  },
  {
    quote: "Working with Plaxora on our mobile app was seamless. They understood our vision immediately and delivered a product that exceeded our expectations in both design and performance.",
    initials: "SM",
    colorFrom: "from-purple-400",
    colorTo: "to-purple-600",
    name: "Sophia Martinez",
    role: "Product Manager, Nova"
  },
  {
    quote: "The UI templates and digital assets provided by Plaxora Group have saved our development team hundreds of hours. Truly premium quality that sets a new industry standard.",
    initials: "RK",
    colorFrom: "from-green-400",
    colorTo: "to-green-600",
    name: "Robert Kim",
    role: "Lead Developer, Studio X"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white font-sans" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Testimonials</h2>
                    <h3 className="text-3xl font-bold text-slate-900">Loved by Global Teams</h3>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonialsData.map((testimonial, index) => (
                    <Reveal delay={index * 0.1} key={index}>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative hover-lift h-full flex flex-col">
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-gray-200" />
                            <div className="flex space-x-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 italic flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.colorFrom} ${testimonial.colorTo} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-slate-900">{testimonial.name}</h5>
                                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
