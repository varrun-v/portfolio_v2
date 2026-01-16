'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Act 1: Entrance Animation
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

      // Act 2: Philosophy Scroll Triggers
      const philosophySentences = gsap.utils.toArray(".philosophy-text");

      philosophySentences.forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true // Debug
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={comp} className="relative flex flex-col items-center bg-[var(--background)] overflow-x-hidden">

      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-0" />

      {/* --- ACT 1: HERO --- */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 z-10">
        <div className="flex flex-col items-center text-center">
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

        <div className="scroll-hint absolute bottom-12 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--muted-foreground)] to-transparent" />
        </div>
      </section>

      {/* --- ACT 2: PHILOSOPHY --- */}
      <section className="relative w-full max-w-4xl mx-auto px-6 py-24 md:py-48 flex flex-col gap-32 z-10">
        <div className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-center text-[var(--foreground)]">
          <span className="block text-[var(--muted-foreground)] text-lg uppercase tracking-widest mb-4">Philosophy</span>
          I build <span className="text-[var(--accent)]">scalable</span> and performant apps with a focus on engineering.
        </div>

        <div className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-center text-[var(--foreground)]">
          I craft user experiences using <span className="text-white">modern architecture</span> and clean design.
        </div>

        <div className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-center text-[var(--foreground)]">
          An obsession for <span className="text-[var(--accent)]">attention to detail</span> defines my work.
        </div>
      </section>

      {/* Placeholder for Act 3 */}
      <div className="h-screen w-full flex items-center justify-center opacity-30">
        Act 3: Projects (Coming Soon)
      </div>

    </main>
  );
}
