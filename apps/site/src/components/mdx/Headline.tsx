interface HeadlineProps {
  children: React.ReactNode;
}

export default function Headline({ children }: HeadlineProps) {
  return (
    <div data-mdx-component="Headline" className="my-8">
      <p className="text-xl font-semibold text-foreground/90 leading-8 md:text-2xl">
        {children}
      </p>
    </div>
  );
}
