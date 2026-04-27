import { AnimatedNav } from "@/components/animated-nav";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedNav />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Booking />
      <Footer />
    </main>
  );
}
