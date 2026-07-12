import React from 'react';
import Hero from "./_components/Hero";
import TrustedBy from "./_components/TrustedBy";
import FeaturedApps from "./_components/FeaturedApps";
import FeaturedProducts from "./_components/FeaturedProducts";
import SaaSPreview from "./_components/SaaSPreview";
import Services from "./_components/Services";
import PortfolioCaseStudies from "./_components/PortfolioCaseStudies";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";
import FAQs from "./_components/FAQs";
import CTASection from "./_components/CTASection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <TrustedBy />
      <FeaturedApps />
      <FeaturedProducts />
      <SaaSPreview />
      <Services />
      <PortfolioCaseStudies />
      <Pricing />
      <Testimonials />
      <FAQs />
      <CTASection />
    </div>
  );
}