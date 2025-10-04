"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Layout, HeadphonesIcon, Palette, ChevronDown } from "lucide-react";

interface Domain {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  humanFocus: string;
  aiHandles: string[];
  interfacesWith: string[];
  meetingFrequency: string;
}

const domains: Domain[] = [
  {
    name: "API",
    icon: <Server className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/30",
    humanFocus: "Architecture, data models, performance",
    aiHandles: ["Code generation", "Testing", "Documentation", "API specs"],
    interfacesWith: ["Interface", "Operations"],
    meetingFrequency: "Weekly",
  },
  {
    name: "Interface",
    icon: <Layout className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
    humanFocus: "UX strategy, interaction design, user flows",
    aiHandles: ["Component code", "Responsive layouts", "Accessibility", "Prototypes"],
    interfacesWith: ["API", "Brand"],
    meetingFrequency: "Weekly",
  },
  {
    name: "Operations",
    icon: <HeadphonesIcon className="w-6 h-6" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
    humanFocus: "Customer journey, success metrics, strategy",
    aiHandles: ["Support drafts", "Onboarding flows", "Documentation", "Email templates"],
    interfacesWith: ["API", "Brand"],
    meetingFrequency: "Weekly",
  },
  {
    name: "Brand",
    icon: <Palette className="w-6 h-6" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/30",
    humanFocus: "Visual strategy, brand voice, creative direction",
    aiHandles: ["Asset generation", "Social content", "Marketing copy", "Design variations"],
    interfacesWith: ["Interface", "Operations"],
    meetingFrequency: "Weekly",
  },
];

export default function FederatedArchitecture() {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  return (
    <div className="my-10 space-y-4">
      <div className="overflow-hidden rounded-xl border border-foreground/10 bg-background-alt/40">
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
          <span>Federated Architecture</span>
          <span>1 Human + AI per Domain</span>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {domains.map((domain) => {
            const isExpanded = expandedDomain === domain.name;

            return (
              <motion.button
                key={domain.name}
                className={`relative overflow-hidden rounded-xl border-2 p-5 text-left transition-all ${domain.bgColor} hover:shadow-lg`}
                onClick={() => setExpandedDomain(isExpanded ? null : domain.name)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={domain.color}>{domain.icon}</div>
                    <div>
                      <div className="font-mono text-sm font-bold uppercase tracking-wide text-foreground">
                        {domain.name}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-foreground/60">
                        {domain.meetingFrequency} check-ins
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-foreground/40" />
                  </motion.div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-foreground/80" />
                    </div>
                    <span className="text-xs text-foreground/50">+</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-5 w-5 rounded-full bg-foreground/20 flex items-center justify-center"
                        >
                          <div className="h-2 w-2 rounded-full bg-foreground/40" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-3 border-t border-foreground/10 pt-4"
                    >
                      <div>
                        <div className="text-xs font-mono uppercase text-foreground/60 mb-1">
                          Human Focus
                        </div>
                        <div className="text-sm text-foreground/80">{domain.humanFocus}</div>
                      </div>

                      <div>
                        <div className="text-xs font-mono uppercase text-foreground/60 mb-1.5">
                          AI Handles
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {domain.aiHandles.map((task) => (
                            <span
                              key={task}
                              className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground/70"
                            >
                              {task}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-mono uppercase text-foreground/60 mb-1">
                          Interfaces With
                        </div>
                        <div className="text-sm text-foreground/70">
                          {domain.interfacesWith.join(", ")}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        <div className="border-t border-foreground/10 px-6 py-3 bg-background-alt/20">
          <p className="text-xs text-foreground/60">
            Click each domain to see how human judgment directs AI execution within clear boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}
