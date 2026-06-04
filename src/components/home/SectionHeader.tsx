"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, copy, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-red-700/75">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-[-0.06em] text-[#15130f] sm:text-5xl lg:text-7xl">
        {title}
      </h2>
      <p className="mt-6 text-base leading-8 text-[#5f5a50] sm:text-lg">{copy}</p>
    </motion.div>
  );
}
