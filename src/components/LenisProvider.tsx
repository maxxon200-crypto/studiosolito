"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
  Gentle smooth scroll. Lenis drives the real page scroll, so window.scrollY
  and native "scroll" events keep working (the nav relies on them).

  Disabled entirely when the user asks for reduced motion, and torn down on
  unmount so navigations don't stack instances.
*/
export default function LenisProvider() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
