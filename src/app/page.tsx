import { Logo } from "@/components/logo";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { GridCard } from "@/components/ui/grid-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { DotDivider } from "@/components/ui/dot-divider";
import { ServiceAccordion } from "@/components/service-accordion";
import { ConcentricCircles, TriangleGrid, OverlappingCircles } from "@/components/illustrations";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden" style={{ paddingTop: "10rem", paddingBottom: "7rem" }}>
        {/* Background animated logo */}
        <div
          className="pointer-events-none absolute hidden md:block"
          style={{ top: "50%", right: "-4%", transform: "translateY(-50%)", opacity: 0.12, color: "var(--color-text)" }}
        >
          <Logo size={400} animated />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <SectionLabel>AI Workflow Consultancy</SectionLabel>
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              maxWidth: "720px",
            }}>
              AI workflows designed from scratch, not bolted on.
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
              I help teams of 10&ndash;50 find and build the AI workflows that actually matter.
              Not chatbots on broken processes. Workflows redesigned around what AI makes possible.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ marginTop: "2.5rem" }}>
              <MagneticButton href={siteConfig.calendly}>
                BOOK A FREE AUDIT
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" style={{ padding: "6rem 0" }}>
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <SectionLabel>Philosophy</SectionLabel>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "3rem",
            }}>
              AI-native, not AI-assisted
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0}>
              <GridCard
                title="Workflow Audit"
                number="001"
                description="Find where AI actually helps vs where it&apos;s theater."
                variant="featured"
                illustration={<ConcentricCircles />}
              />
            </ScrollReveal>
            <ScrollReveal delay={75}>
              <GridCard
                title="Redesign from Scratch"
                number="002"
                description="What would this process look like if AI existed when you built it?"
                illustration={<TriangleGrid />}
              />
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GridCard
                title="Build and Ship"
                number="003"
                description="Working systems, not slide decks. Implemented alongside your team."
                illustration={<OverlappingCircles />}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "6rem 0" }}>
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <SectionLabel>Services</SectionLabel>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "3rem",
            }}>
              Three ways to work together
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
              <MagneticButton href={siteConfig.calendly}>
                LET&apos;S TALK
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "6rem 0" }}>
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <SectionLabel>About</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={75}>
            <GridCard variant="minimal">
              <div style={{ padding: "1.5rem", maxWidth: "640px" }}>
                <p style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}>
                  I&apos;m Chase. I lead engineering teams building AI systems every day.
                  I started Stomatiq because I kept seeing the same pattern: smart teams
                  bolting AI onto workflows that needed to be redesigned from the ground up.
                  I&apos;d rather help you build the right thing.
                </p>
              </div>
            </GridCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
