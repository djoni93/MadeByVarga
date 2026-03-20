"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/i18n/context";

export default function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      className="wood-grain relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#2c2218]"
    >
      {/* Background image */}
      <img
        src="https://images.pexels.com/photos/3637837/pexels-photo-3637837.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="eager"
      />
      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(44,34,24,0.85) 0%, rgba(58,46,34,0.75) 30%, rgba(68,56,44,0.80) 60%, rgba(44,34,24,0.90) 100%)",
        }}
      />
      {/* Warm accent layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(160, 82, 45, 0.12) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(139, 105, 20, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Wood grain line elements */}
      {[12, 25, 75, 88].map((pos, i) => (
        <motion.div
          key={pos}
          className="absolute top-0 h-full w-px"
          style={{
            left: `${pos}%`,
            background:
              "linear-gradient(to bottom, transparent, rgba(212, 196, 168, 0.06), transparent)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.5, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Wood ring decorative element */}
      <div
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.03]"
        style={{
          border: "1px solid rgba(212, 196, 168, 0.3)",
          boxShadow:
            "0 0 0 40px transparent, 0 0 0 41px rgba(212, 196, 168, 0.15), 0 0 0 85px transparent, 0 0 0 86px rgba(212, 196, 168, 0.1), 0 0 0 135px transparent, 0 0 0 136px rgba(212, 196, 168, 0.06)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ y: titleY, opacity, scale }}
      >
        {/* Pre-title badge */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="h-px w-8 bg-oak-light" />
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-oak-light">
            {t.hero.subtitle}
          </span>
          <span className="h-px w-8 bg-oak-light" />
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden pb-2">
          <motion.h1
            className="text-display text-sawdust"
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[clamp(3rem,12vw,11rem)] font-light leading-[1.1]">
              Made by
            </span>
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-4">
          <motion.h1
            className="text-display text-sawdust"
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[clamp(3.5rem,14vw,13rem)] font-semibold italic leading-[1.1]">
              Varga
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-10 max-w-lg text-lg font-light tracking-wide text-birch/50 md:text-xl"
          style={{ y: subtitleY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {t.hero.tagline}
        </motion.p>

        {/* CTA */}
        <motion.button
          className="group mt-12 flex items-center gap-3 text-base uppercase tracking-[0.25em] text-birch/50 transition-colors hover:text-sawdust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          data-cursor="action"
          onClick={() => {
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>{t.hero.cta}</span>
          <motion.span
            className="inline-block"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="h-12 w-px bg-gradient-to-b from-birch/25 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
