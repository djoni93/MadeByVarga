"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/context";

type RoomType = "all" | "kitchen" | "bedroom" | "living" | "bathroom";
type VibeType = "all" | "warmMinimal" | "industrial" | "organicLuxury";

interface Project {
  id: number;
  title: string;
  titleSr: string;
  room: Exclude<RoomType, "all">;
  vibe: Exclude<VibeType, "all">;
  year: string;
  image: string;
  accent: string;
  accentSr: string;
}

const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

const projects: Project[] = [
  {
    id: 1,
    title: "Ember Kitchen",
    titleSr: "Kuhinja \u201eEmber\u201c",
    room: "kitchen",
    vibe: "warmMinimal",
    year: "2026",
    image: px(7533765),
    accent: "Ribbed Oak + Ultra-Matte",
    accentSr: "Frezovani hrast + ultra-mat",
  },
  {
    id: 2,
    title: "Loft Living",
    titleSr: "Loft dnevna soba",
    room: "living",
    vibe: "industrial",
    year: "2025",
    image: px(4352247),
    accent: "Burnished Brass + Concrete",
    accentSr: "Brušeni mesing + beton",
  },
  {
    id: 3,
    title: "Serene Bedroom",
    titleSr: "Mirna spavaća soba",
    room: "bedroom",
    vibe: "organicLuxury",
    year: "2026",
    image: px(6585757),
    accent: "Smoked Eucalyptus + Linen",
    accentSr: "Dimljeni eukaliptus + lan",
  },
  {
    id: 4,
    title: "Atelier Kitchen",
    titleSr: "Atelje kuhinja",
    room: "kitchen",
    vibe: "industrial",
    year: "2025",
    image: px(6970055),
    accent: "Raw Steel + Fluted Glass",
    accentSr: "Sirovi čelik + rebrasto staklo",
  },
  {
    id: 5,
    title: "Haven Bath",
    titleSr: "Kupatilo \u201eHaven\u201c",
    room: "bathroom",
    vibe: "organicLuxury",
    year: "2026",
    image: px(6782431),
    accent: "Fenix Stone + Natural Oak",
    accentSr: "Fenix kamen + prirodni hrast",
  },
  {
    id: 6,
    title: "Terra Living",
    titleSr: "Terra dnevni boravak",
    room: "living",
    vibe: "warmMinimal",
    year: "2025",
    image: px(1669799),
    accent: "Clay Render + Walnut",
    accentSr: "Glineni malter + orah",
  },
];

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-[15px] uppercase tracking-[0.2em] transition-colors ${
        active ? "text-bark" : "text-bark/30 hover:text-bark/55"
      }`}
      data-cursor="hover"
    >
      {label}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-oak"
          layoutId="filter-underline"
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        />
      )}
    </button>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { locale } = useI18n();

  const isWide = index % 3 === 0;

  return (
    <motion.div
      ref={ref}
      className={isWide ? "md:col-span-2" : "md:col-span-1"}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <div
        className="group relative overflow-hidden rounded-sm"
        data-cursor="project"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bark/5">
          <img
            src={project.image}
            alt={locale === "sr" ? project.titleSr : project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-bark/60 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-sawdust/70">
              {locale === "sr" ? project.accentSr : project.accent}
            </span>
          </div>
        </div>

        {/* Project meta */}
        <div className="flex items-start justify-between pt-4">
          <div>
            <h3 className="text-display text-xl text-bark md:text-2xl">
              {locale === "sr" ? project.titleSr : project.title}
            </h3>
            <p className="mt-1 text-[15px] tracking-wide text-grain/60">
              {locale === "sr" ? project.accentSr : project.accent}
            </p>
          </div>
          <span className="text-[15px] text-bark/25">{project.year}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const [activeRoom, setActiveRoom] = useState<RoomType>("all");
  const [activeVibe, setActiveVibe] = useState<VibeType>("all");
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const filtered = projects.filter(
    (p) =>
      (activeRoom === "all" || p.room === activeRoom) &&
      (activeVibe === "all" || p.vibe === activeVibe)
  );

  const roomKeys: RoomType[] = ["all", "kitchen", "bedroom", "living", "bathroom"];
  const vibeKeys: VibeType[] = ["all", "warmMinimal", "industrial", "organicLuxury"];

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48"
    >
      {/* Decorative wood ring */}
      <div
        className="pointer-events-none absolute -left-48 top-1/3 h-[600px] w-[600px] rounded-full opacity-[0.025]"
        style={{
          border: "1px solid rgba(92, 64, 51, 0.4)",
          boxShadow:
            "0 0 0 35px transparent, 0 0 0 36px rgba(92, 64, 51, 0.2), 0 0 0 75px transparent, 0 0 0 76px rgba(92, 64, 51, 0.12), 0 0 0 120px transparent, 0 0 0 121px rgba(92, 64, 51, 0.06)",
        }}
      />

      {/* Section header */}
      <div ref={titleRef} className="mb-16 md:mb-24">
        <motion.span
          className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-oak"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {t.projects.subtitle}
        </motion.span>
        <div className="overflow-hidden pb-3">
          <motion.h2
            className="text-display text-5xl text-bark md:text-8xl"
            initial={{ y: 100 }}
            animate={titleInView ? { y: 0 } : { y: 100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.projects.title}
          </motion.h2>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center md:gap-12">
        <div>
          <span className="mb-3 block text-sm font-medium uppercase tracking-[0.3em] text-bark/25">
            {t.projects.filterRoom}
          </span>
          <div className="flex flex-wrap gap-1">
            {roomKeys.map((key) => (
              <FilterButton
                key={key}
                active={activeRoom === key}
                label={t.projects.rooms[key]}
                onClick={() => setActiveRoom(key)}
              />
            ))}
          </div>
        </div>
        <div className="hidden h-8 w-px bg-walnut/10 md:block" />
        <div>
          <span className="mb-3 block text-sm font-medium uppercase tracking-[0.3em] text-bark/25">
            {t.projects.filterVibe}
          </span>
          <div className="flex flex-wrap gap-1">
            {vibeKeys.map((key) => (
              <FilterButton
                key={key}
                active={activeVibe === key}
                label={t.projects.vibes[key]}
                onClick={() => setActiveVibe(key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          layout
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.p
          className="mt-16 text-center text-lg text-grain/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t.projects.noResults}
        </motion.p>
      )}
    </section>
  );
}
