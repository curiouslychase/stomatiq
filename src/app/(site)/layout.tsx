import { SiteHeader } from "@/components/site-header";

export default function SiteGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
