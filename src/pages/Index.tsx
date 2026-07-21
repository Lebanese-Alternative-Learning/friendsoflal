import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyLAL from "@/components/sections/WhyLAL";
import HowModel from "@/components/sections/HowModel";
import Impact from "@/components/sections/Impact";
import WhyDonate from "@/components/sections/WhyDonate";
import Stories from "@/components/sections/Stories";
import GetInvolved from "@/components/sections/GetInvolved";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Impact />
        <WhyLAL />
        <HowModel />
        <WhyDonate />
        <Stories />
        <GetInvolved />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
