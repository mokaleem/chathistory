import ExportShare from "./_components/ExportShare";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";
import SupportedPlatforms from "./_components/SupportedPlatforms";
import Testimonials from "./_components/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SupportedPlatforms />
      <ExportShare />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}
