import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyLAL from "@/components/sections/WhyLAL";
import Impact from "@/components/sections/Impact";
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
        <WhyLAL />
        <Impact />
        <GetInvolved />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
