"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer
      id="contact"
      ref={ref}
      className="wood-grain relative text-sawdust"
      style={{
        background:
          "linear-gradient(135deg, #2c2218 0%, #3a2e22 40%, #44382c 70%, #2c2218 100%)",
      }}
    >
      {/* CTA Section */}
      <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          {/* Left: CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-6 block text-sm font-medium uppercase tracking-[0.3em] text-oak-light">
                {t.footer.contact}
              </span>
              <h2 className="text-display text-4xl leading-tight text-sawdust md:text-6xl">
                {t.footer.headline}
                <br />
                <span className="italic text-oak-light">{t.footer.headlineAccent}</span>
              </h2>
            </motion.div>

            <motion.a
              href="mailto:hello@madebyvarga.com"
              className="group mt-12 inline-flex items-center gap-4 border-b border-birch/15 pb-2 text-xl text-birch/60 transition-colors hover:border-birch/40 hover:text-sawdust"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-cursor="hover"
            >
              <Mail className="h-5 w-5" />
              hello@madebyvarga.com
            </motion.a>
          </div>

          {/* Right: Info */}
          <motion.div
            className="flex flex-col justify-end gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-start gap-3 text-birch/35">
              <Phone className="mt-1 h-5 w-5 shrink-0" />
              <span className="text-base">+381 61 212 2201</span>
            </div>
            <div className="flex items-start gap-3 text-birch/35">
              <MapPin className="mt-1 h-5 w-5 shrink-0" />
              <span className="text-base">
              Blok 6A 9, 25230 Kula
                <br />
                Srbija
              </span>
            </div>
            <p className="mt-4 text-base text-birch/25">
              {t.footer.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="relative mx-auto max-w-[1600px] px-6 pb-16 md:px-12">
        <motion.div
          className="overflow-hidden rounded-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Blok+6A+9,+25230+Kula,+Serbia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Made by Varga — Blok 6A 9, 25230 Kula, Srbija"
          />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-birch/5">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-12">
          <span className="text-display text-base text-birch/15">
            <span className="font-light">Made by</span>{" "}
            <span className="font-semibold">Varga</span>
          </span>
          <span className="text-[15px] text-birch/10">
            © {new Date().getFullYear()} Made by Varga. {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
