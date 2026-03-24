import * as runtime from "react/jsx-runtime";

const sharedComponents = {
  // Add custom MDX components here
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <Component components={sharedComponents} />
    </div>
  );
}
