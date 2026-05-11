import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Problem } from "@/components/landing/Problem";
import { Showcase } from "@/components/landing/Showcase";
import { Trust } from "@/components/landing/Trust";
import { UseCases } from "@/components/landing/UseCases";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { getWaitlistStats } from "@/lib/waitlist";

export default async function Home() {
  const stats = await getWaitlistStats();

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero stats={stats} />
        <Problem />
        <Showcase />
        <HowItWorks />
        <UseCases />
        <Trust />
        <WaitlistForm />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
