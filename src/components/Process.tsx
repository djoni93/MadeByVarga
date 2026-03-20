"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useI18n } from "@/i18n/context";

function ProcessStep({
  step,
  index,
  total,
}: {
  step: { label: string; description: string };
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative grid grid-cols-1 gap-6 border-t border-walnut/8 py-16 md:grid-cols-12 md:gap-12 md:py-24"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {/* Step number */}
      <div className="md:col-span-2">
        <motion.span
          className="text-display text-5xl text-bark/8 md:text-7xl"
          initial={{ y: 40 }}
          animate={isInView ? { y: 0 } : { y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Step label */}
      <div className="md:col-span-3">
        <motion.h3
          className="text-display text-3xl text-bark md:text-4xl"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.label}
        </motion.h3>
      </div>

      {/* Step description */}
      <div className="md:col-span-5 md:col-start-7">
        <motion.p
          className="text-lg leading-relaxed text-grain md:text-xl"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-0 top-16 hidden md:block md:top-24">
        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= index ? "w-6 bg-oak" : "w-2 bg-bark/8"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="sawdust-texture relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48"
    >
      {/* Vertical progress line */}
      <div className="absolute left-6 top-0 h-full w-px bg-bark/5 md:left-12">
        <motion.div
          className="w-full bg-oak/25 origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Section header */}
      <div ref={titleRef} className="mb-20 md:mb-32">
        <motion.span
          className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-oak"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {t.process.subtitle}
        </motion.span>
        <div className="overflow-hidden pb-3">
          <motion.h2
            className="text-display text-5xl text-bark md:text-8xl"
            initial={{ y: 100 }}
            animate={titleInView ? { y: 0 } : { y: 100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.process.title}
          </motion.h2>
        </div>
      </div>

      {/* Steps */}
      <div>
        {t.process.steps.map((step, i) => (
          <ProcessStep
            key={i}
            step={step}
            index={i}
            total={t.process.steps.length}
          />
        ))}
      </div>
    </section>
  );
}
