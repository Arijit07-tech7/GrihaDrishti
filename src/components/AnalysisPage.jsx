import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function AnalysisPage({ propertyData, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Database,
      title: "Processing property data",
      text: "Preparing submitted property information",
    },
    {
      icon: MapPin,
      title: "Analyzing location",
      text: "Evaluating location-based market signals",
    },
    {
      icon: TrendingUp,
      title: "Studying market patterns",
      text: "Comparing property characteristics",
    },
    {
      icon: BrainCircuit,
      title: "Running AI valuation",
      text: "Generating estimated property value",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 1, 100);

        if (next < 25) {
          setActiveStep(0);
        } else if (next < 50) {
          setActiveStep(1);
        } else if (next < 75) {
          setActiveStep(2);
        } else {
          setActiveStep(3);
        }

        if (next === 100) {
          clearInterval(interval);

          setTimeout(() => {
            onComplete();
          }, 900);
        }

        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030409] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[130px]"
        />

        <div className="absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute bottom-[-180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      {/* Main */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full max-w-3xl">

          {/* AI Orb */}
          <div className="mb-10 flex justify-center">
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* Outer rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-blue-400/20"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-3 rounded-full border border-purple-400/20 border-dashed"
              />

              {/* Glow */}
              <motion.div
                animate={{
                  scale: [0.9, 1.15, 0.9],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute h-20 w-20 rounded-full bg-blue-500/20 blur-xl"
              />

              {/* Core */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-[0_0_60px_rgba(59,130,246,0.2)] backdrop-blur-xl">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles
                    size={30}
                    className="text-blue-200"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Sparkles size={16} className="text-amber-300" />

                <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-200/70">
                  GrihaDrishti AI
                </span>

                <Sparkles size={16} className="text-amber-300" />
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Analyzing Your Property
              </h1>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/40">
                Our intelligence engine is studying your property
                characteristics to prepare an estimated market valuation.
              </p>
            </motion.div>
          </div>

          {/* Property Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10">
                <Building2 size={19} className="text-blue-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white/80">
                  {propertyData?.propertyType || "Property"}
                </p>

                <p className="mt-1 truncate text-xs text-white/35">
                  {propertyData?.location || "Location"}{" "}
                  {propertyData?.area
                    ? `• ${propertyData.area} sq ft`
                    : ""}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-white/30">
                  Progress
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {progress}%
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-white/35">
                AI analysis
              </span>

              <span className="text-white/50">
                {progress}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mx-auto mt-8 max-w-xl space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const completed =
                progress >= (index + 1) * 25;

              const active = activeStep === index;

              return (
                <motion.div
                  key={step.title}
                  animate={{
                    opacity:
                      index <= activeStep ? 1 : 0.35,
                  }}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                    active
                      ? "border-blue-400/20 bg-blue-400/[0.05]"
                      : "border-white/5 bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      completed
                        ? "bg-emerald-400/10"
                        : active
                        ? "bg-blue-400/10"
                        : "bg-white/5"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2
                        size={18}
                        className="text-emerald-300"
                      />
                    ) : (
                      <Icon
                        size={18}
                        className={
                          active
                            ? "text-blue-300"
                            : "text-white/30"
                        }
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/75">
                      {step.title}
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      {step.text}
                    </p>
                  </div>

                  {active && !completed && (
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className="h-2 w-2 rounded-full bg-blue-300"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[11px] tracking-wide text-white/20">
            Preparing intelligent property insights...
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;