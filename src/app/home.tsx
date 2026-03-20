"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Materials from "@/components/Materials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Process />
        <Projects />
        <Materials />
      </main>
      <Footer />
    </>
  );
}
