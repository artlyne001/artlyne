import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AnimationGrid from "@/components/home/AnimationGrid";
import TrustedBy from "@/components/home/TrustedBy";
import Testimonials from "@/components/home/Testimonials";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-brand-pink/30 selection:text-brand-pink">
      <Navbar />
      <Hero />
      <AnimationGrid />
      <TrustedBy />
      <Testimonials />
      <FeatureShowcase /> 
      <Footer />
    </main>
  );
}
