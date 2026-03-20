"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/context";

const px = (id: number, w = 800, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

const materialImages = [
  px(129731),
  px(2387793),
  px(1323712),
  px(3651820),
  px(326311),
  px(2469107),
];

function MaterialCard({
  material,
  index,
  image,
}: {
  material: { name: string; description: string; trend: string };
  index: number;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      {/* Material swatch */}
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-sm bg-bark/5">
        <img
          src={image}
          alt={material.name}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
        />

        {/* Trend badge */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block rounded-full bg-sawdust-light/90 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] text-bark backdrop-blur-sm">
            {material.trend}
          </span>
        </motion.div>
      </div>

      {/* Material info */}
      <h3 className="text-display text-xl text-bark">{material.name}</h3>
      <motion.div
        className="overflow-hidden"
        animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mt-2 text-base leading-relaxed text-grain">
          {material.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Materials() {
  const { t } = useI18n();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section
      id="materials"
      className="wood-grain relative py-32 md:py-48"
      style={{
        background:
          "linear-gradient(180deg, var(--color-sawdust-light) 0%, var(--color-sawdust) 30%, var(--color-sawdust-dark) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <motion.span
            className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-oak"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {t.materials.subtitle}
          </motion.span>
          <div className="overflow-hidden pb-3">
            <motion.h2
              className="text-display text-5xl text-bark md:text-8xl"
              initial={{ y: 100 }}
              animate={titleInView ? { y: 0 } : { y: 100 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.materials.title}
            </motion.h2>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {t.materials.items.map((material, i) => (
            <MaterialCard
              key={i}
              material={material}
              index={i}
              image={materialImages[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
