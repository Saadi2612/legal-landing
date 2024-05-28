import Hero from "@/components/landing-page/Hero";
import Testimonials from "@/components/landing-page/Testimonials";
import WhyOptillus from "@/components/landing-page/WhyOptillus";
import Navbar from "@/components/landing-page/Navbar";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      style={{ backgroundColor: "white" }}
    >
      <Navbar />
      <Hero />
      <Features />
      <WhyOptillus />
      <Testimonials />
      <Footer />
    </main>
  );
}
