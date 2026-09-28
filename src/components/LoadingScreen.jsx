import { motion } from "framer-motion";
import { Plane, Ticket, Compass, Luggage, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const loadingSteps = [
  "Curating your flight selections...",
  "Securing your preferred seating...",
  "Finalizing terminal and gate details...",
  "Printing your virtual boarding pass...",
  "Ready for takeoff. Enjoy your trip!",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 35);

    const stepTimer = setInterval(() => {
      setStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#0c0a09] px-4 text-stone-100"
    >
      {/* =====================================================
          WARM SUNSET / ORGANIC BACKGROUND GLOWS
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Amber Glow */}
        <motion.div
          className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-rose-500/10 blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>


      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1">
            <Sparkles size={13} className="text-amber-400" />
            <span className="text-[11px] font-medium tracking-widest text-amber-300">
              PREMIER TRAVEL
            </span>
          </div>

          <h1 className="text-4xl font-light tracking-[0.2em] sm:text-5xl">
            SKY<span className="font-semibold text-amber-400">BOOK</span>
          </h1>
        </motion.div>

       

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 90 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Top route row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-[10px] font-medium tracking-wider text-stone-400">
                ORIGIN
              </p>
              <p className="mt-0.5 text-xl font-bold tracking-wide text-stone-100">
                NYC
              </p>
            </div>

            <div className="flex flex-col items-center px-4">
              <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-amber-400"
              >
                <Plane size={22} className="rotate-90" />
              </motion.div>
              <div className="mt-1 h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            </div>

            <div className="text-right">
              <p className="text-[10px] font-medium tracking-wider text-stone-400">
                DESTINATION
              </p>
              <p className="mt-0.5 text-xl font-bold tracking-wide text-stone-100">
                TYO
              </p>
            </div>
          </div>

          {/* Progress Header & Counter */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Ticket size={16} />
              </div>
              <div>
                <p className="text-xs font-medium text-stone-200">
                  Preparing Ticket
                </p>
                <p className="text-[10px] text-stone-400">Gate synchronization</p>
              </div>
            </div>

            <span className="font-mono text-lg font-semibold text-amber-400">
              {progress}%
            </span>
          </div>

          {/* Smooth Progress Bar */}
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>

          {/* Dynamic Status Text */}
          <div className="mt-4 flex min-h-[20px] items-center gap-2">
            <Compass size={14} className="shrink-0 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
            <AnimateStatus step={step} />
          </div>

          {/* Mini Info Footer Grid */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniInfo label="SEAT" value="12A (PREMIUM)" />
            <MiniInfo label="CLASS" value="BUSINESS" />
            <MiniInfo label="BAGGAGE" value="2x CHECKED" />
          </div>
        </motion.div>

        {/* FOOTER BADGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] tracking-wide text-stone-500"
        >
          <MapPin size={12} className="text-amber-400/80" />
          <span>Global flight network ready • Secure booking channel</span>
        </motion.div>
      </div>
    </motion.div>
  );
}



function AnimateStatus({ step }) {
  return (
    <motion.p
      key={step}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-xs text-stone-300 font-light"
    >
      {loadingSteps[step]}
    </motion.p>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-stone-900/40 px-3 py-2 text-center">
      <p className="text-[8px] font-semibold tracking-wider text-stone-500">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[10px] font-medium text-stone-300">
        {value}
      </p>
    </div>
  );
}