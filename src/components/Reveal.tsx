"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";

/*
  The one reveal effect: a slow fade + rise as a block enters the viewport.

  ABSOLUTE RULE followed here — content is fully visible by default in CSS.
  Only after mount, and only when motion is allowed, does JS set the hidden
  baseline (opacity 0, y 24) and animate FROM it. So:
    · JS disabled          → content is visible (CSS baseline).
    · prefers-reduced-motion → we never hide it; content is visible.
    · JS on, motion allowed → graceful fade + rise.
  The site can never launch blank.
*/
type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /* Seconds of delay, for light staggering of sibling blocks. */
  delay?: number;
  id?: string;
};

export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const animate = () =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        });

      // Older engines without IntersectionObserver keep the visible CSS
      // baseline — never hide what we cannot reliably reveal.
      if (typeof IntersectionObserver === "undefined") return;

      // Hide only now (post-mount, motion allowed), then reveal on enter.
      // IntersectionObserver delivers an initial callback for every observed
      // target, so in-view blocks animate immediately and below-the-fold
      // blocks wait for scroll — no timer needed.
      gsap.set(el, { opacity: 0, y: 24 });

      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

      io.observe(el);

      return () => io.disconnect();
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
