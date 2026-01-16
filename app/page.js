'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Project One",
    category: "Development",
    year: "2025",
    description: "A placeholder description for the first project showcase."
  },
  {
    id: 2,
    title: "Project Two",
    category: "Design System",
    year: "2024",
    description: "Defining visual language and interactive components for a modern brand."
  },
  {
    id: 3,
    title: "Project Three",
    category: "Experience",
    year: "2023",
    description: "Immersive web experience built with WebGL and Next.js."
  }
];

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
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Act 3: Projects Reveal
      const projects = gsap.utils.toArray(".project-card");
      projects.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 60,
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

      {/* --- ACT 3: SELECTED WORK --- */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-24 space-y-32 z-10">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
          <span className="hidden md:block text-[var(--muted-foreground)] text-sm uppercase tracking-wider">(2023 — 2025)</span>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="project-card group relative cursor-pointer">
              {/* Image Placeholder */}
              <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[var(--muted)] rounded-lg overflow-hidden relative mb-8">
                <div className="absolute inset-0 bg-neutral-800 group-hover:bg-neutral-700 transition-colors duration-500" />
                {/* Optional: Add actual image later */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <span className="text-6xl font-bold tracking-tighter mix-blend-overlay">{index + 1}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-transparent group-hover:border-[var(--border)] pb-4 transition-colors duration-300">
                <div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">{project.title}</h3>
                  <p className="text-[var(--muted-foreground)] max-w-xl text-lg">{project.description}</p>
                </div>
                <div className="flex gap-8 text-[var(--muted-foreground)] text-sm font-mono uppercase tracking-widest">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for Act 4 */}
      <div className="h-screen w-full flex items-center justify-center opacity-30">
        Act 4: Skills (Coming Soon)
      </div>

    </main>
  );
}
