"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
  index?: number;
  variant?: "light" | "dark";
};

export function CountUpStat({
  value,
  suffix = "",
  label,
  detail,
  index = 0,
  variant = "light",
}: CountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 55, damping: 18, mass: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (latest) => setDisplay(Math.round(latest)));
  }, [spring]);

  const isDark = variant === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group grid gap-6 border-t py-9 transition duration-500 sm:grid-cols-[0.8fr_1fr] sm:items-center sm:py-11 ${
        isDark
          ? "border-white/10 hover:border-red-600/45"
          : "border-black/10 hover:border-red-700/35"
      }`}
    >
      <div className="overflow-hidden">
        <p
          className={`text-5xl font-bold leading-none tracking-[-0.04em] transition duration-700 group-hover:translate-x-1 sm:text-6xl lg:text-7xl ${
            isDark ? "text-white" : "text-[#111111]"
          }`}
        >
          {display.toLocaleString()}
          {suffix}
        </p>
      </div>
      <div>
        <div className="mb-5 h-px w-14 bg-red-600/70 transition duration-700 group-hover:w-28" />
        <h3
          className={`text-xs font-semibold uppercase tracking-[0.24em] ${
            isDark ? "text-white" : "text-[#111111]"
          }`}
        >
          {label}
        </h3>
        <p
          className={`mt-4 max-w-md text-sm leading-7 ${
            isDark ? "text-white/58" : "font-light text-[#6d675f]"
          }`}
        >
          {detail}
        </p>
      </div>
    </motion.div>
  );
}
