"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  subtext?: string;
  yes: string;
  no: string;
}

interface Result {
  quadrant: number;
  title: string;
  description: string;
  actionItems: string[];
  warning?: string;
}

const questions: Record<string, Question> = {
  start: {
    id: "start",
    text: "Is this change happening slowly or rapidly?",
    subtext: "If you're not sure, it's probably faster than you think.",
    yes: "speed-rapid",
    no: "speed-slow",
  },
  "speed-rapid": {
    id: "speed-rapid",
    text: "Does this primarily affect you, or is it reshaping the system for everyone?",
    subtext: "Is it personal adaptation or systemic transformation?",
    yes: "result-q4",
    no: "result-q2",
  },
  "speed-slow": {
    id: "speed-slow",
    text: "Does this primarily affect you, or is it reshaping the system for everyone?",
    subtext: "Is it personal learning or institutional change?",
    yes: "result-q3",
    no: "result-q1",
  },
};

const results: Record<string, Result> = {
  "result-q1": {
    quadrant: 1,
    title: "Personal Stability",
    description: "You're in the comfortable zone. Focus on incremental improvement and building deep expertise.",
    actionItems: [
      "Optimize and refine your current approach",
      "Invest in depth and mastery",
      "Build compounding skills over time",
      "Think in years, not months",
    ],
    warning: "This quadrant is shrinking fast in the AI era. Don't mistake temporary calm for permanent ground.",
  },
  "result-q2": {
    quadrant: 2,
    title: "Personal Disruption",
    description: "Rapid changes are hitting you directly. Speed and adaptability are critical.",
    actionItems: [
      "Move faster than the disruption",
      "Build resilience and optionality",
      "Experiment rapidly: try, fail, adjust",
      "Learn just-in-time, not just-in-case",
      "Hold your plans lightly",
    ],
    warning: "Don't get so focused on survival that you miss bigger systemic shifts. Look up periodically.",
  },
  "result-q3": {
    quadrant: 3,
    title: "Systemic Stability",
    description: "You're operating within stable institutions. Patience and depth are your advantages.",
    actionItems: [
      "Play the long game",
      "Build institutional knowledge",
      "Invest in credentials and reputation",
      "Master the existing rules",
    ],
    warning: "Many 'stable' systems are starting to shift. Ask: How long will this hold, and what will transfer?",
  },
  "result-q4": {
    quadrant: 4,
    title: "Systemic Volatility",
    description: "You're at the frontier. The rules are being rewritten. Maximum leverage and uncertainty.",
    actionItems: [
      "Think in ecosystems, not individuals",
      "Position for multiple futures",
      "Build infrastructure others will use",
      "Shape the transition, don't just react",
      "Participate in defining new norms",
    ],
  },
};

export default function DiagnosticFlow() {
  const [currentStep, setCurrentStep] = useState<string>("start");
  const [history, setHistory] = useState<string[]>(["start"]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (nextStep: string) => {
    setHistory([...history, nextStep]);
    setCurrentStep(nextStep);
    if (nextStep.startsWith("result-")) {
      setIsComplete(true);
    }
  };

  const restart = () => {
    setCurrentStep("start");
    setHistory(["start"]);
    setIsComplete(false);
  };

  const currentQuestion = questions[currentStep];
  const currentResult = results[currentStep];

  return (
    <div data-mdx-component="DiagnosticFlow" className="my-12 max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-mono font-bold uppercase text-foreground">
          Diagnostic Tool
        </h3>
        <p className="text-sm text-foreground/60">
          Answer two questions to identify your quadrant
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2].map((step) => (
          <div
            key={step}
            className={`h-1.5 w-12 rounded-full transition-colors ${
              history.length > step ? "bg-accent" : "bg-foreground/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete && currentQuestion ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-background-alt border border-foreground/10 space-y-4">
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {currentQuestion.text}
                </p>
                {currentQuestion.subtext && (
                  <p className="text-sm text-foreground/60 italic">
                    {currentQuestion.subtext}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => handleAnswer(currentQuestion.no)}
                  className="group relative p-6 rounded-xl bg-background border-2 border-foreground/10 hover:border-foreground/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono uppercase text-foreground/60">
                      Option A
                    </span>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {currentQuestion.no === "speed-slow" ? "Slowly" : "Affects Me"}
                  </p>
                </button>

                <button
                  onClick={() => handleAnswer(currentQuestion.yes)}
                  className="group relative p-6 rounded-xl bg-background border-2 border-foreground/10 hover:border-foreground/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono uppercase text-foreground/60">
                      Option B
                    </span>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {currentQuestion.yes === "speed-rapid" ? "Rapidly" : "Affects the System"}
                  </p>
                </button>
              </div>
            </div>
          </motion.div>
        ) : currentResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-xs font-mono uppercase text-foreground/60">
                    Quadrant {currentResult.quadrant}
                  </div>
                  <h4 className="text-xl font-mono font-bold uppercase text-foreground">
                    {currentResult.title}
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {currentResult.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-foreground/10">
                <div className="text-sm font-mono uppercase text-foreground/60">
                  Recommended Actions:
                </div>
                <ul className="space-y-2">
                  {currentResult.actionItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-mono text-foreground/60 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {currentResult.warning && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    <span className="font-semibold">Warning:</span> {currentResult.warning}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-mono text-sm uppercase hover:bg-foreground/90 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isComplete && (
        <div className="text-center">
          <button
            onClick={restart}
            disabled={currentStep === "start"}
            className="text-sm text-foreground/60 hover:text-foreground/80 font-mono uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
