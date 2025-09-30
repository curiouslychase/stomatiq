import { ComingSection } from "@/components/coming-section";
import { BrandLockup } from "@/components/brand-lockup";

export default function ComingSoon() {
  return (
    <ComingSection
      header={<BrandLockup variant="landing" href={undefined} />}
      description="We’re crafting something new. Check back shortly."
    >
      <p className="text-[15px] leading-7 text-foreground/80">
        At Stomatiq, we believe the future belongs to creators, solopreneurs,
        and visionary small teams who use intelligence—both human and
        artificial—not just to keep up, but to leap ahead. We are builders, not
        watchers. We don’t just explain what’s possible; we help you do what
        matters, shipping AI work-flows, tools, and products that pay you back
        quickly and reliably.
      </p>
      <p className="text-[15px] leading-7 text-foreground/80">
        Stomatiq is your partner in transforming “I wonder if AI can do this”
        into “Here’s how AI already does this for me.” We cut through hype and
        complexity, crafting small, meaningful AI wins that stack up: atomic
        tools that save your time, automations that amplify your influence,
        courses that teach you skills, workshops that change your trajectory,
        consulting that moves the needle, and coaching that shapes the leader in
        you.
      </p>
      <p className="text-[15px] leading-7 text-foreground/80">
        We serve the creator-led, the curious, and the committed. If you want to
        build something real—products that ship, workflows that scale, value
        that compounds—you’re in the right place. With an obsession for impact,
        we help you bridge the gap between tools and results, dreams and income,
        promise and proof.
      </p>
    </ComingSection>
  );
}
