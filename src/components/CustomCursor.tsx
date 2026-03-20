"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "project" | "text" | "action";

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, visible]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", () => setVisible(true));
    window.addEventListener("mouseleave", () => setVisible(false));

    const handleVariant = () => {
      const hoverables = document.querySelectorAll("[data-cursor]");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setVariant((el.getAttribute("data-cursor") as CursorVariant) || "hover");
        });
        el.addEventListener("mouseleave", () => {
          setVariant("default");
        });
      });
    };

    handleVariant();
    const observer = new MutationObserver(handleVariant);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  const variants: Record<CursorVariant, { width: number; height: number; borderRadius: string }> = {
    default: { width: 12, height: 12, borderRadius: "50%" },
    hover: { width: 48, height: 48, borderRadius: "50%" },
    project: { width: 96, height: 96, borderRadius: "50%" },
    text: { width: 2, height: 32, borderRadius: "1px" },
    action: { width: 64, height: 64, borderRadius: "50%" },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
          style={{ x, y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            animate={{
              width: variants[variant].width,
              height: variants[variant].height,
              borderRadius: variants[variant].borderRadius,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{ backgroundColor: "#faf6ee" }}
          >
            {variant === "project" && (
              <motion.span
                className="text-xs font-medium uppercase tracking-widest text-bark"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                View
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
