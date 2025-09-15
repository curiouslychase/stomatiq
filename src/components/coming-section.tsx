import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

type ComingSectionProps = {
  title?: string;
  description?: string;
  header?: React.ReactNode;
};

export function ComingSection({
  title,
  description,
  header,
}: ComingSectionProps) {
  return (
    <main
      className={`${lora.variable} mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6`}
    >
      <div className="text-center">
        {header ? (
          <div className="flex items-center justify-center pb-4">{header}</div>
        ) : title ? (
          <h1 className="font-[var(--font-lora)] text-4xl sm:text-5xl tracking-tight">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="mt-3 text-[15px] leading-7 text-black/70 dark:text-white/70">
            {description}
          </p>
        ) : null}
      </div>
    </main>
  );
}
