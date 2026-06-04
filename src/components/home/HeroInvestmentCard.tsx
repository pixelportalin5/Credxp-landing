"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Award,
  BarChart3,
  Building2,
  HandCoins,
  IndianRupee,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const heroCardFeatures = [
  { label: "Premium Properties", icon: Building2 },
  { label: "Secure Tenants", icon: Shield },
  { label: "Steady Returns", icon: TrendingUp },
  { label: "Zero Hassle", icon: Award },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.22 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const dividerReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

function HeroIconBadge({
  children,
  delay = 0,
  size = "md",
}: {
  children: ReactNode;
  delay?: number;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "size-12" : "size-14";

  return (
    <motion.div
      variants={fadeUp}
      className={`relative grid ${dim} shrink-0 place-items-center rounded-full border border-red-600/40 bg-red-600/15 text-red-600 shadow-[0_0_20px_rgba(239,35,28,0.2)]`}
      animate={{ y: [0, -4, 0] }}
      transition={{
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay },
        default: { duration: 0.65, ease },
      }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 28px rgba(239,35,28,0.45)" }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-red-600/20"
        animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay }}
      />
      <span className="relative">{children}</span>
    </motion.div>
  );
}

const numericSizeClass = "text-[2.75rem] leading-none sm:text-[3.15rem] lg:text-[3.45rem]";

function HeroCountAmount({
  value,
  prefix = "₹",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 48, damping: 16 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return (
    <motion.p
      ref={ref}
      variants={fadeUp}
      className={`hero-numeric-highlight ${numericSizeClass}`}
    >
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </motion.p>
  );
}

function SectionDivider() {
  return (
    <motion.div
      variants={dividerReveal}
      className="my-5 h-px origin-left bg-gradient-to-r from-red-600/45 via-white/12 to-transparent"
    />
  );
}

export function HeroInvestmentCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease }}
      whileHover={{ y: -10, scale: 1.015 }}
      className="hero-glass-card group relative w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border-2 bg-black/55 p-6 backdrop-blur-2xl sm:max-w-[27rem] sm:p-7 lg:max-w-[30rem] lg:p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-60"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(239,35,28,0.35) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <motion.div variants={cardStagger} initial="hidden" animate="visible" className="relative z-10 space-y-0">
        {/* Rental income header — icon + copy in a row */}
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <HeroIconBadge>
            <BarChart3 size={26} strokeWidth={2} />
          </HeroIconBadge>
          <div className="min-w-0 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
              Earn Monthly
            </p>
            <p className="mt-1 text-lg font-bold uppercase tracking-wide text-red-600 sm:text-xl lg:text-2xl">
              Rental Income
            </p>
          </div>
        </motion.div>

        {/* Primary figure — inset panel */}
        <motion.div
          variants={fadeUp}
          className="hero-numeric-panel mt-5 rounded-2xl border px-4 py-5 text-center sm:px-5 sm:py-6"
        >
          <div className="relative mb-4">
            <div className="h-px w-full bg-white/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111111] px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              upto
            </span>
          </div>
          <HeroCountAmount value={450000} />
          <motion.span
            variants={fadeUp}
            className="hero-badge-pulse mt-4 inline-block rounded-full bg-red-600 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white sm:px-6 sm:text-sm"
            whileHover={{ scale: 1.06 }}
          >
            Per Month*
          </motion.span>
        </motion.div>

        <SectionDivider />

        {/* Investment — icon + label row, same numeric panel as rental */}
        <motion.div variants={fadeUp} className="flex items-start gap-4">
          <HeroIconBadge delay={0.35} size="sm">
            <IndianRupee size={22} strokeWidth={2} />
          </HeroIconBadge>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
              Investment Starts at Just
            </p>
            <div className="hero-numeric-panel mt-3 rounded-2xl border px-4 py-4 text-center sm:px-5 sm:py-5">
              <HeroCountAmount value={50} suffix="L*" />
            </div>
          </div>
        </motion.div>

        <SectionDivider />

        {/* Tagline — highlighted strip */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 rounded-xl border border-red-600/20 bg-red-600/[0.07] px-4 py-4 sm:px-5 sm:py-5"
        >
          <HeroIconBadge delay={0.55} size="sm">
            <HandCoins size={22} strokeWidth={2} />
          </HeroIconBadge>
          <p className="text-left text-xs font-semibold uppercase leading-relaxed tracking-wide text-white/90 sm:text-sm">
            Make <span className="text-red-600">Passive Income</span> as your{" "}
            <span className="text-red-600">Active Income</span>.
          </p>
        </motion.div>

        {/* Features — 2×2 on small screens, icon + label rows */}
        <motion.div
          variants={fadeUp}
          className="mt-6 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-5 sm:gap-3"
        >
          {heroCardFeatures.map(({ label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + index * 0.07, duration: 0.5, ease }}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-3 sm:px-3.5 sm:py-3.5"
            >
              <motion.span
                className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-red-600"
                whileHover={{ borderColor: "rgba(239,35,28,0.55)", backgroundColor: "rgba(239,35,28,0.12)" }}
              >
                <Icon size={16} strokeWidth={2} />
              </motion.span>
              <p className="text-left text-[10px] font-semibold uppercase leading-snug tracking-wide text-white/65 sm:text-xs">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
