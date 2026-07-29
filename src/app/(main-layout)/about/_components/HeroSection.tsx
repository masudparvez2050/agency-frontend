"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Terminal } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!parallaxRef.current) return;
    const rect = parallaxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    const elements = parallaxRef.current.querySelectorAll('.parallax-element');
    elements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed') || '1');
      const rotation = el.getAttribute('data-rotation') || '0deg';
      const moveX = (x * speed) / 50;
      const moveY = (y * speed) / 50;
      (el as HTMLElement).style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${rotation})`;
    });
  };

  const handleMouseLeave = () => {
    if (!parallaxRef.current) return;
    const elements = parallaxRef.current.querySelectorAll('.parallax-element');
    elements.forEach(el => {
      const rotation = el.getAttribute('data-rotation') || '0deg';
      (el as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${rotation})`;
    });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden mesh-bg font-sans" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <Reveal>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        About Plaxora Group
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900">
                        Building the <br />
                        <span className="text-gradient">Future</span> of <br />
                        Digital Products.
                    </h1>
                    <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl">
                        Plaxora Group creates software products, SaaS platforms, mobile applications, websites and digital ecosystems that help businesses grow through technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                            Start a Project
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link href="/products" className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-medium rounded-full text-slate-900 bg-white hover:bg-gray-50 shadow-sm transition-all hover:-translate-y-1">
                            Explore Products
                        </Link>
                    </div>
                </Reveal>

                {/* Abstract Illustration */}
                <div 
                    className="relative h-[400px] lg:h-[600px] w-full hidden lg:block" 
                    id="parallax-container"
                    ref={parallaxRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Glass Orbs / Shapes */}
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-tr from-blue-600 to-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                    <div className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-gradient-to-tr from-violet-600 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-delayed"></div>
                    
                    {/* Floating Cards */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full" style={{ perspective: '1000px' }}>
                        <div 
                            className="absolute w-48 h-56 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-5 animate-float parallax-element" 
                            data-speed="2" 
                            data-rotation="-5deg"
                            style={{ transform: 'translate(-50%, -50%) rotate(-5deg)', left: '30%', top: '30%' }}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Code2 className="text-blue-600 w-5 h-5" />
                            </div>
                            <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-3"></div>
                            <div className="w-1/2 h-2 bg-gray-200 rounded-full mb-6"></div>
                            <div className="w-full h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"></div>
                        </div>
                        
                        <div 
                            className="absolute w-64 h-48 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-5 animate-float-delayed z-10 parallax-element" 
                            data-speed="-1.5" 
                            data-rotation="3deg"
                            style={{ transform: 'translate(-50%, -50%) rotate(3deg)', left: '80%', top: '50%' }}
                        >
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"></div>
                                <div>
                                    <div className="w-20 h-2 bg-gray-800 rounded-full mb-1"></div>
                                    <div className="w-12 h-2 bg-gray-400 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-1/3 h-20 bg-gray-100 rounded-lg"></div>
                                <div className="w-2/3 h-20 bg-indigo-50 rounded-lg border border-indigo-100"></div>
                            </div>
                        </div>

                        <div 
                            className="absolute w-40 h-40 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 p-5 animate-float parallax-element" 
                            data-speed="1" 
                            data-rotation="-10deg"
                            style={{ transform: 'translate(-50%, -50%) rotate(-10deg)', left: '40%', top: '80%' }}
                        >
                            <Terminal className="text-green-400 w-6 h-6 mb-4" />
                            <div className="w-full h-1 bg-gray-700 rounded-full mb-2"></div>
                            <div className="w-5/6 h-1 bg-gray-700 rounded-full mb-2"></div>
                            <div className="w-4/6 h-1 bg-green-900 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
