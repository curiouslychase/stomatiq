import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { GridCard } from "@/components/ui/grid-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DotDivider } from "@/components/ui/dot-divider";
import { ServiceAccordion } from "@/components/service-accordion";
import { HeroAbstract } from "@/components/hero-abstract";
import { ConcentricCircles, TriangleGrid, OverlappingCircles } from "@/components/illustrations";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden" style={{ paddingTop: "10rem", paddingBottom: "3rem" }}>
        <div className="relative mx-auto max-w-[1440px] px-8">
          <ScrollReveal>
            <SectionLabel>AI-Native Consultancy</SectionLabel>
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              maxWidth: "720px",
            }}>
              Your 10-person team, performing like 100.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p style={{
              marginTop: "1.5rem",
              fontSize: "1.15rem",
              lineHeight: 1.65,
              color: "var(--color-text-secondary)",
              maxWidth: "580px",
              fontWeight: 300,
            }}>
              Stop optimizing. Start running on moonshots. Stomatiq redesigns your workflows, systems, and culture from the ground up&mdash;so AI is woven into how your team thinks, builds, and ships.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ marginTop: "2.5rem" }}>
              <MagneticButton href="#contact">
                FIND YOUR 10X
              </MagneticButton>
            </div>
          </ScrollReveal>
          <div className="hero-visual">
            <HeroAbstract />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-6 md:py-24">
        <div className="mx-auto max-w-[1440px] px-8">
          <ScrollReveal>
            <SectionLabel>Philosophy</SectionLabel>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "3rem",
            }}>
              Think 10x, not 10%
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0}>
              <GridCard
                title="Capabilities, Not Headcount"
                number="001"
                description="Stop hiring for tasks AI can own. Map your team&apos;s real leverage and multiply it."
                variant="featured"
                illustration={<ConcentricCircles />}
              />
            </ScrollReveal>
            <ScrollReveal delay={75}>
              <GridCard
                title="Design for 10x"
                number="002"
                description="What would this workflow look like if you built it today, AI-first, from zero?"
                illustration={<TriangleGrid />}
              />
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GridCard
                title="Ship Systems, Not Decks"
                number="003"
                description="Working AI workflows in production. Implemented alongside your team, not handed off in a PDF."
                illustration={<OverlappingCircles />}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-6 md:py-24">
        <div className="mx-auto max-w-[1440px] px-8">
          <ScrollReveal>
            <SectionLabel>Services</SectionLabel>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "3rem",
            }}>
              Start anywhere. Go exponential.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <ServiceAccordion />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div style={{ marginTop: "3rem" }}>
              <DotDivider animate />
            </div>
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <MagneticButton href="#contact">
                FIND YOUR 10X
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-6 md:py-24">
        <div className="mx-auto max-w-[1440px] px-8">
          <ScrollReveal>
            <SectionLabel>About</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={75}>
            <GridCard variant="minimal">
              <div className="flex flex-col items-center md:flex-row md:items-center" style={{ padding: "1.5rem", gap: "2rem" }}>
                <Image
                  src="/img/avatar.png"
                  alt="Chase Adams"
                  width={120}
                  height={120}
                  style={{ borderRadius: "2px", flexShrink: 0 }}
                />
                <p style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  fontWeight: 300,
                  maxWidth: "640px",
                }}>
                  I&apos;m Chase. I lead engineering teams building AI systems every day.
                  I started Stomatiq because I kept seeing the same pattern: smart teams
                  thinking 10% better when they could be thinking 10x. The problem was never
                  the people&mdash;it was workflows designed before AI existed. I help teams
                  redesign from zero and ship something exponential.
                </p>
              </div>
            </GridCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-6 md:py-24">
        <div className="mx-auto max-w-[1440px] px-8">
          <ScrollReveal>
            <SectionLabel>Get Started</SectionLabel>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "3rem",
            }}>
              Let&apos;s find your 10x.
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-[0.8fr_1fr] items-center">
            <div className="hidden md:flex items-center justify-center" style={{ pointerEvents: "none" }}>
              <HeroAbstract />
            </div>
            <ScrollReveal delay={75}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
