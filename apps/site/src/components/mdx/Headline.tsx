interface HeadlineProps {
  children: React.ReactNode;
}

export default function Headline({ children }: HeadlineProps) {
  return (
    <div data-mdx-component="Headline" className="mb-8">
      <div className="text-xl font-semibold text-foreground/90 leading-10 md:text-3xl">
        {children}
      </div>
    </div>
  );
}
