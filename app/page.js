'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/ui/Loader';
import ProjectModal from './components/ui/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Property Management System",
    year: "2026",
    description: "A property management system covering properties, tenants, bookings, guests, pricings, expenses and channel manager. the channel manager synchronizes property availability, bookings, and pricing across various OTA platforms like airbnb, booking.com, etc.",
    techStack: ["Next.js", "Prisma", "MySQL", "Postgres", "Supabase", "Python"],
    links: {
    },
    images: [
      "/projects/td-1.png",
      "/projects/td-2.png",
      "/projects/td-3.png"
    ]
  },
  {
    id: 2,
    title: "Exotic Trade",
    year: "2024",
    description: "Developed a full-stack e-commerce system for auction-based, limited-edition collectibles, with administrative tooling and role-based access control for managing inventory and listings",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "TailwindCSS"],
    links: {
      demo: "https://exotic-chi.vercel.app",
    },
    images: [
      "/projects/et-1.png",
      "/projects/et-2.png",
    ]
  },
  {
    id: 3,
    title: "RE-DACT",
    year: "2025",
    description: "A specialized text-redaction tool that automatically detects and masks sensitive entities like names, dates, and locations within documents. Prioritizes privacy and data security for legal and compliance teams.",
    techStack: ["Next.js", "Python", "SpaCy"],
    links: {
      github: "https://github.com/varrun-v/RE-DACT"
    },
    images: [
      "/projects/rd-1.png",
      "/projects/rd-2.png",
      "/projects/rd-3.png"
    ]
  },
  {
    id: 4,
    title: "Posture Monitoring",
    year: "2026",
    description: "An intelligent posture monitoring system that uses computer vision to detect slouching in real-time, distributed workers to analyze behavior patterns, WebSocket notifications to send alerts and delivers daily reports via email.",
    techStack: ["Java"],
    links: {
      github: "https://github.com/varrun-v/posture"
    },
    images: [
      "https://placehold.co/800x500/222/555?text=RE-DACT+Interface",
      "https://placehold.co/800x500/222/555?text=Redaction+Process"
    ]
  },
  {
    id: 5,
    title: "Lightweight API observability tool",
    year: "2025",
    description: "A Lightweight API Observability Gateway using Node.js, Redis, and Postgres for real-time traffic monitoring, audit logging, and error tracking across distributed microservices.",
    techStack: ["Next.js", "Express", "Redis", "Postgres", "OpenAPI"],
    links: {
      github: "https://github.com/varrun-v/API-Management-System"
    },
    images: [
      "/projects/api-1.png",
    ]
  },
  {
    id: 6,
    title: "System and Network Monitoring Suite",
    year: "2025",
    description: "A centralized device monitoring system with a responsive Next.js–based admin dashboard and a FastAPI backend for secure ingestion and management of system metrics. extracted via tamper-resistant Python agent, packaged as Windows and Linux executables, with secure communication, manual device approval, and authentication workflows inspired by enterprise tool wazuh.",
    techStack: ["Next.js", "Python"],
    links: {
      github: "https://github.com/varrun-v/System-monitoring-suite"
    },
    images: [
      "/projects/sm-1.png",
      "/projects/sm-2.png",
      "/projects/sm-3.png",
      "/projects/sm-4.png",
      "/projects/sm-5.png",
      "/projects/sm-6.png"
    ]
  },
  {
    id: 7,
    title: "CLI Password Manager",
    year: "2026",
    description: "A secure CLI-based password manager built in Java that encrypts and stores credentials locally using AES-256 encryption, SHA-256 key derivation, and clean modular architecture for file storage and vault management.",
    techStack: ["Java"],
    links: {
      github: "https://github.com/varrun-v/PMcli"
    },
    images: [
      "/projects/pm-1.png"
    ]
  }
];

const SKILLS = {
  languages: ["HTML", "CSS", "Javascript", "Java", "C++", "Python"],
  libraries: ["React", "Next.js", "Tailwind"],
  backend: ["Express", "MongoDB", "MySQL", "Git", "Podman", "Docker", "Redis", "Postgres", "Linux"]
};

export default function Home() {
  const comp = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

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
          <span className="hidden md:block text-[var(--muted-foreground)] text-sm uppercase tracking-wider">(2023 — 2026)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="project-card group relative cursor-pointer flex flex-col"
              onClick={() => setSelectedProject(project)}
            >
              <div className="w-full aspect-[16/9] bg-neutral-900 rounded-lg overflow-hidden relative mb-6 border border-white/5">
                {/* 1. Blurred Background Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.images?.[0]}
                    alt=""
                    className="w-full h-full object-cover blur-xl opacity-40 scale-110"
                    aria-hidden="true"
                  />
                </div>

                {/* 2. Main Image Layer (Contained) */}
                <div className="absolute inset-0 z-10 p-4 transition-transform duration-700 group-hover:scale-[1.02]">
                  <img
                    src={project.images?.[0]}
                    alt={project.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="absolute inset-0 z-20 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white text-sm uppercase tracking-widest border border-white/20 shadow-xl">
                    View Project
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-b border-transparent group-hover:border-[var(--border)] pb-4 transition-colors duration-300 flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[var(--accent)] transition-colors duration-300">{project.title}</h3>
                    <span className="text-[var(--muted-foreground)] text-sm font-mono uppercase tracking-widest border border-[var(--border)] px-2 py-1 rounded">{project.year}</span>
                  </div>
                  <p className="text-[var(--muted-foreground)] text-lg line-clamp-2">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ACT 4: SKILLS --- */}
      <section className="relative w-full max-w-5xl mx-auto px-6 py-32 z-10">
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">I Work With</h2>
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
          <a href="https://www.linkedin.com/in/varrun-v" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
          <a href="https://github.com/varrun-v" className="hover:text-[var(--foreground)] transition-colors">GitHub</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-[var(--muted-foreground)] opacity-50 z-10 relative">
        <p>&copy; {new Date().getFullYear()} Varun. All rights reserved.</p>
        <p className="mt-2 text-[10px] opacity-70">
          Music: <a href="https://soundcloud.com/agusalvarez" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">The Feeling by AgusAlvarez & Luke Bergs</a>
        </p>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </main>
  );
}
