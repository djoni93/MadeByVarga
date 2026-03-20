"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/context";
import type { Locale } from "@/i18n/dictionaries";

export default function Navigation() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLanguageSwitch = () => {
    const scrollY = window.scrollY;
    const nextLocale: Locale = locale === "sr" ? "en" : "sr";
    setLocale(nextLocale);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  const navItems = [
    { label: t.nav.process, href: "#process" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.materials, href: "#materials" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-sawdust-light/90 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-display text-2xl tracking-tight transition-colors duration-500"
            style={{ color: scrolled ? "#2c2218" : "#f2ece0" }}
            data-cursor="hover"
          >
            <span className="font-light">Made by</span>{" "}
            <span className="font-semibold">Varga</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex lg:gap-10">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="group relative text-lg tracking-wide transition-colors duration-500"
                style={{ color: scrolled ? "rgba(44,34,24,0.65)" : "rgba(242,236,224,0.75)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = scrolled ? "#2c2218" : "#f2ece0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "rgba(44,34,24,0.65)"
                    : "rgba(242,236,224,0.75)";
                }}
                data-cursor="hover"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: scrolled ? "#8B6914" : "#f2ece0" }}
                />
              </button>
            ))}

            {/* Language switcher */}
            <button
              onClick={handleLanguageSwitch}
              className="ml-2 flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-medium uppercase tracking-widest transition-all duration-500"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: scrolled ? "rgba(44,34,24,0.15)" : "rgba(242,236,224,0.2)",
                color: scrolled ? "rgba(44,34,24,0.55)" : "rgba(242,236,224,0.7)",
              }}
              data-cursor="hover"
            >
              <span
                className="transition-colors duration-500"
                style={{
                  color: locale === "sr"
                    ? scrolled ? "#2c2218" : "#f2ece0"
                    : scrolled ? "rgba(44,34,24,0.3)" : "rgba(242,236,224,0.35)",
                }}
              >
                SRB
              </span>
              <span
                style={{
                  color: scrolled ? "rgba(44,34,24,0.2)" : "rgba(242,236,224,0.25)",
                }}
              >
                /
              </span>
              <span
                className="transition-colors duration-500"
                style={{
                  color: locale === "en"
                    ? scrolled ? "#2c2218" : "#f2ece0"
                    : scrolled ? "rgba(44,34,24,0.3)" : "rgba(242,236,224,0.35)",
                }}
              >
                EN
              </span>
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor="hover"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px w-7 transition-colors duration-500"
              style={{ backgroundColor: scrolled ? "#2c2218" : "#f2ece0" }}
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-px w-7 transition-colors duration-500"
              style={{ backgroundColor: scrolled ? "#2c2218" : "#f2ece0" }}
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-sawdust-light/98 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-display text-3xl text-bark"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  data-cursor="hover"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={handleLanguageSwitch}
                className="mt-4 text-base uppercase tracking-widest text-bark/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                data-cursor="hover"
              >
                {locale === "sr" ? "English" : "Srpski"}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
