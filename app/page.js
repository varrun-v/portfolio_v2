'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance Animation
      tl.from(".hero-text", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      })
        .from(".hero-sub", {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(".scroll-hint", {
          opacity: 0,
          duration: 1,
          delay: 0.5
        }, "-=0.5");

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={comp} className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] overflow-hidden">

      {/* Background Ambience (Optional Subtle Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      {/* Main Typography */}
      <div className="z-10 flex flex-col items-center text-center">
        <div className="overflow-hidden mb-2">
          <h1 className="hero-text text-[15vw] leading-[0.8] font-bold tracking-tighter text-[var(--foreground)] mix-blend-difference select-none">
            VARUN
          </h1>
        </div>

        <div className="overflow-hidden">
          <p className="hero-sub text-xl md:text-2xl font-light tracking-wide text-[var(--muted-foreground)] mt-8 max-w-lg">
            Creative Developer & <span className="text-[var(--accent)]">Designer</span>
          </p>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="scroll-hint absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--muted-foreground)] to-transparent" />
      </div>

      {/* Height spacer for scrolling (Act 2 placeholder) */}
      <div className="h-screen" />
    </main>
  );
}
