import Image from "next/image";

export const metadata = {
  title: "Aboutique | stomatiq",
};

export default function AboutiquePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-10 space-y-12">
      <div className="space-y-12">
        <section className="space-y-4">
          <p
            className="text-sm uppercase tracking-[0.3em] text-foreground/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            This is Stomatiq
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Aboutique
          </h1>
          <div className="space-y-4 max-w-3xl">
            <p className="text-[15px] leading-7 text-foreground/70">
              The name <em>stomatiq</em> comes from <strong>stomata</strong> +{" "}
              <strong>IQ</strong>.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Stomata are the tiny pores on plant leaves that regulate the
              exchange of gases, opening and closing in response to
              environmental conditions. They&apos;re adaptive interfaces between
              the organism and its environment, constantly adjusting to maintain
              balance.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              IQ, in this context, isn&apos;t about raw intelligence. it&apos;s
              about the quality of perception. The ability to sense what&apos;s
              changing, interpret signals, and adapt your response accordingly.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Together, <em>stomatiq</em> represents an adaptive intelligence:
              sensing the environment, interpreting what matters, and responding
              thoughtfully rather than rigidly. It's a side project where I
              write about what I think the future will look like, especially
              around technology, AI, and how both are reshaping the way we work
              and live.
            </p>
          </div>
        </section>

        <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-2xl border border-foreground/[.08] bg-background/60 backdrop-blur shadow-lg">
          <Image
            src="/images/jelly-1.png"
            alt="Decorative jellyfish illustration"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Vision</h2>
            <p className="text-[15px] leading-7 text-foreground/70">
              AI isn't just a tool for personal efficiency; it's a platform for
              solving problems at scale. By automating routine complexity and
              making advanced workflows accessible, Stomatiq frees problem
              solvers to focus on context, creativity, and human judgment—where
              they add the most value.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Why Now</h2>
            <p className="text-[15px] leading-7 text-foreground/70">
              The AI era has unlocked unprecedented capacity for individuals to
              act at scale. But most problem solvers lack the frameworks and
              workflows to turn AI&apos;s raw power into reliable,
              value-creating systems. Stomatiq fills that gap—helping them move
              from ideas to scalable solutions.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Who It's For
          </h2>
          <ul className="ml-4 list-disc text-[15px] leading-7 text-foreground/70">
            <li>
              People thinking about how AI and technology are reshaping their
              work and industries.
            </li>
            <li>
              Anyone curious about what the future might look like and how to
              navigate it.
            </li>
            <li>
              Folks who appreciate exploring emerging ideas and frameworks
              before they&apos;re fully formed.
            </li>
          </ul>
        </section>
      </div>

      <section className="space-y-6">
        <div>
          <p
            className="text-sm uppercase tracking-[0.25em] text-foreground/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Created by
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Chase Adams</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
          <div className="space-y-4">
            <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl border border-foreground/[.08] bg-background/60">
              <Image
                src="/chase-adams.png"
                alt="Portrait of Chase Adams"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex gap-4 items-center">
              <a
                href="https://threads.net/@curiouslychase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Threads"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 192 192"
                  fill="currentColor"
                >
                  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/curiouslychase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@curiouslychase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://github.com/curiouslychase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[15px] leading-7 text-foreground/70">
              Hey, I&apos;m{" "}
              <a
                href="https://curiouslychase.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chase Adams.
              </a>{" "}
              I created Stomatiq as a side project to explore how people
              navigate change in the AI era. I previously cofounded Plumb, a
              no-code platform for AI automation that empowers consultants and
              workflow creators to build powerful automations for their
              subscribers without writing code.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Before starting Plumb, I built my career at the intersection of
              technology, consulting, and product development. I have worked
              across early-stage startups and fast-moving teams, consistently
              focused on helping people simplify complexity through better
              systems and tools.
            </p>
            <p className="text-[15px] leading-7 text-foreground/70">
              Stomatiq is where I think out loud about technology, AI, and the
              future of work. It&apos;s less about having all the answers and
              more about exploring what&apos;s emerging—sharing frameworks,
              observations, and ideas as they develop.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
