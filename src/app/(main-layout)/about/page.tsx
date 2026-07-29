"use client";

import React from "react";
import "./_components/about.css";
import HeroSection from "./_components/HeroSection";
import StorySection from "./_components/StorySection";
import MissionSection from "./_components/MissionSection";
import CapabilitiesSection from "./_components/CapabilitiesSection";
import EcosystemSection from "./_components/EcosystemSection";
import ProcessSection from "./_components/ProcessSection";
import TechStackSection from "./_components/TechStackSection";
import WhyUsSection from "./_components/WhyUsSection";
import StatsSection from "./_components/StatsSection";
import TeamSection from "./_components/TeamSection";
import ValuesSection from "./_components/ValuesSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import FaqSection from "./_components/FaqSection";
import CtaSection from "./_components/CtaSection";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MissionSection />
      <CapabilitiesSection />
      <EcosystemSection />
      <ProcessSection />
      <TechStackSection />
      <WhyUsSection />
      <StatsSection />
      <TeamSection />
      <ValuesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
