import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StickyScrollSection } from "@/components/sticky-scroll-section";
import { ServicesSection } from "@/components/services-section";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ParallaxDivider } from "@/components/section-transition";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <StickyScrollSection />
        <ParallaxDivider className="my-0" />
        <ServicesSection />
        <ProcessSection />
        <ParallaxDivider className="my-0" />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
