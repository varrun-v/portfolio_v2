'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/ui/Loader';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Exotic Trade",
    category: "Development",
    year: "2024",
    description: "An e-commerce website to sell auctionable items."
  },
  {
    id: 2,
    title: "RE-DACT",
    category: "Design System",
    year: "2024",
    description: "A text-redaction tool that detects and masks sensitive entities."
  },
  {
    id: 3,
    title: "Multi-tenant PMS",
    category: "Experience",
    year: "2025",
    description: "A multi-tenant property management system."
  }
];

const SKILLS = {
  languages: ["HTML", "CSS", "Javascript", "Typescript", "Java", "C++"],
  libraries: ["React", "Next.js", "Redux", "TailwindCSS"],
  backend: ["Node.js", "Express", "MongoDB", "MySQL", "Git"]
};

export default function Home() {
  const comp = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Loading Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return; // Wait for loading to finish

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Act 1: Entrance Animation
        tl.from(".hero-char", {
          z: -400,
          opacity: 0,
          duration: 1.4,
          stagger: {
            amount: 0.6,
            from: "center"
          },
          ease: "power4.out"
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

      // Act 4: Skills Reveal
      const skillCategories = gsap.utils.toArray(".skill-category");
      skillCategories.forEach((cat, i) => {
        gsap.from(cat, {
          scrollTrigger: {
            trigger: cat,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out"
        });
      });

      // Act 5: Contact Reveal
      gsap.from(".contact-section", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      });

    }, comp);

    return () => ctx.revert();
    return () => ctx.revert();
  }, [isLoading]);

  // Interactive Hover Effect
  const handleHover = (e) => {
    gsap.to(e.target, {
      scale: 1.3,
      color: "var(--accent)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleLeave = (e) => {
    gsap.to(e.target, {
      scale: 1,
      color: "var(--foreground)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Show Loader if loading
  // Note: We're not unmounting the main content, just covering it or returning early.
  // Actually returning early is safer for GSAP context initialization timeline.
  // BUT SEO-wise, we might want content in DOM. 
  // For a portfolio, a simple condition is fine.

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main ref={comp} className="relative flex flex-col items-center bg-[var(--background)] overflow-x-hidden">

      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-0" />

      {/* --- ACT 1: HERO --- */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="overflow-hidden mb-2 perspective-1000">
            <h1 className="hero-text text-[15vw] leading-[0.8] font-bold tracking-tighter text-[var(--foreground)] mix-blend-difference select-none flex perspective-text">
              {"VARUN".split("").map((char, index) => (
                <span
                  key={index}
                  className="hero-char inline-block cursor-default transform-style-3d text-[var(--foreground)]"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          <div className="overflow-hidden flex flex-col items-center">
            <h2 className="hero-sub text-2xl md:text-3xl font-medium tracking-tight text-[var(--foreground)] mt-8">
              Full-Stack Engineer
            </h2>
            <p className="hero-sub text-lg md:text-xl font-light tracking-wide text-[var(--muted-foreground)] mt-4 max-w-lg">
              Designing <span className="text-[var(--accent)]">scalable systems</span> and thoughtful user experiences
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
          Building <span className="text-[var(--accent)]">scalable</span> and performant apps with a focus on engineering.
        </div>

        <div className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-center text-[var(--foreground)]">
          Crafting user experiences using <span className="text-white">modern architecture</span> and clean design.
        </div>

        <div className="philosophy-text text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-center text-[var(--foreground)]">
          Focused on <span className="text-[var(--accent)]">detail</span>, clarity, and continuous improvement.
        </div>
      </section>

      {/* --- ACT 3: SELECTED WORK --- */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-24 space-y-32 z-10">
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
          <span className="hidden md:block text-[var(--muted-foreground)] text-sm uppercase tracking-wider">(2023 — 2025)</span>
        </div>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="project-card group relative cursor-pointer">
              <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[var(--muted)] rounded-lg overflow-hidden relative mb-8">
                <div className="absolute inset-0 bg-neutral-800 group-hover:bg-neutral-700 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <span className="text-6xl font-bold tracking-tighter mix-blend-overlay">{index + 1}</span>
                </div>
              </div>

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

      {/* --- ACT 4: SKILLS --- */}
      <section className="relative w-full max-w-5xl mx-auto px-6 py-32 z-10">
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Capabilities</h2>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl">
            A holistic approach to building digital products, balancing technical foundations with thoughtful execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="skill-category">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-6">Languages</h3>
            <ul className="space-y-3">
              {SKILLS.languages.map(skill => (
                <li key={skill} className="text-lg text-[var(--foreground)] opacity-80 hover:opacity-100 transition-opacity">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-6">Libraries</h3>
            <ul className="space-y-3">
              {SKILLS.libraries.map(skill => (
                <li key={skill} className="text-lg text-[var(--foreground)] opacity-80 hover:opacity-100 transition-opacity">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="skill-category">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-6">Backend & Tools</h3>
            <ul className="space-y-3">
              {SKILLS.backend.map(skill => (
                <li key={skill} className="text-lg text-[var(--foreground)] opacity-80 hover:opacity-100 transition-opacity">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- ACT 5: CONTACT --- */}
      <section className="contact-section relative w-full h-[70vh] flex flex-col items-center justify-center text-center p-6 z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Let's work together.</h2>
        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] max-w-2xl mb-12">
          Currently available for freelance work and open to full-time roles.
        </p>

        <a
          href="mailto:varunsvmg@gmail.com"
          className="text-2xl md:text-3xl font-medium border-b border-[var(--accent)] hover:text-[var(--accent)] transition-colors pb-1 mb-16"
        >
          varunsvmg2@gmail.com
        </a>

        <div className="flex gap-8 text-[var(--muted-foreground)] uppercase tracking-widest text-sm">
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[var(--foreground)] transition-colors">Instagram</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[var(--muted-foreground)] opacity-50 z-10 relative">
        <p>&copy; {new Date().getFullYear()} Varun. All rights reserved.</p>
        <p className="mt-2 text-[10px] opacity-70">
          Music: <a href="https://soundcloud.com/agusalvarez" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">The Feeling by AgusAlvarez & Luke Bergs</a>
        </p>
      </footer>

    </main>
  );
}
