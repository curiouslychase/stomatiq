import { ComingSection } from "@/components/coming-section";
import { BrandLockup } from "@/components/brand-lockup";

export default function ComingSoon() {
  return (
    <ComingSection
      header={<BrandLockup variant="landing" href={undefined} />}
      description="We’re crafting something new. Check back shortly."
    />
  );
}
