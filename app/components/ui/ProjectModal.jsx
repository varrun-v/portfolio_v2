'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * ProjectModal Component
 * Displays detailed information about a selected project in a modal with an image slider.
 *
 * @param {Object} project - The project object to display.
 * @param {Function} onClose - Callback function to close the modal.
 */
export default function ProjectModal({ project, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (project) {
            setCurrentImageIndex(0); // Reset image index when a new project is opened
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

            // Animate In
            const ctx = gsap.context(() => {
                gsap.fromTo(modalRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, ease: 'power2.out' }
                );
                gsap.fromTo(contentRef.current,
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.2)' }
                );
            });

            return () => {
                ctx.revert();
                document.body.style.overflow = '';
            };
        }
    }, [project]);

    const handleClose = () => {
        // Animate Out
        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                y: 50,
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(modalRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: onClose
                    });
                }
            });
        });
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                if (project?.images?.length > 1) {
                    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
                }
            } else if (e.key === 'ArrowLeft') {
                if (project?.images?.length > 1) {
                    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
                }
            } else if (e.key === 'Escape') {
                if (isFullScreen) {
                    setIsFullScreen(false);
                } else {
                    handleClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project, isFullScreen]);

    const nextImage = (e) => {
        e.stopPropagation();
        if (project?.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (project?.images?.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
        }
    };

    if (!project) return null;

    return createPortal(
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={handleClose}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-5xl bg-[#111] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                {/* Left Side: Image Slider (60%) */}
                <div
                    className="relative w-full md:w-[60%] bg-neutral-900 border-b md:border-b-0 md:border-r border-neutral-800 h-[250px] md:h-auto overflow-hidden group cursor-zoom-in"
                    onClick={() => setIsFullScreen(true)}
                >
                    {project.images && project.images.length > 0 ? (
                        <div className="w-full h-full relative overflow-hidden">
                            {/* Blurred Background Layer */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={project.images[currentImageIndex]}
                                    alt=""
                                    className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
                                />
                            </div>

                            {/* Main Image Layer (Fit) */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8">
                                <img
                                    src={project.images[currentImageIndex]}
                                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-full object-contain drop-shadow-2xl shadow-black pointer-events-none"
                                />
                            </div>

                            {project.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white rounded-full hover:bg-white hover:text-black transition-colors z-20 backdrop-blur-sm border border-white/10"
                                        aria-label="Previous image"
                                    >
                                        <FaChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white rounded-full hover:bg-white hover:text-black transition-colors z-20 backdrop-blur-sm border border-white/10"
                                        aria-label="Next image"
                                    >
                                        <FaChevronRight size={16} />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                        {project.images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                            <span className="text-sm uppercase tracking-widest">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* Right Side: content (40%) */}
                <div className="w-full md:w-[40%] flex flex-col p-6 md:p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)] font-mono uppercase tracking-widest mb-4">
                            <span>{project.category}</span>
                            <span>{project.year}</span>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4 mb-6">
                            {project.links?.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-[var(--accent)] transition-colors shadow-lg shadow-white/10"
                                >
                                    <FaExternalLinkAlt size={12} />
                                    Live
                                </a>
                            )}
                            {project.links?.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-full text-sm font-medium hover:border-[var(--foreground)] transition-colors"
                                >
                                    <FaGithub size={14} />
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-3">About</h3>
                        <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--accent)] mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack?.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-xs text-[var(--muted-foreground)] uppercase tracking-wider"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL SCREEN OVERLAY */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFullScreen(false);
                    }}
                >
                    <button
                        className="absolute top-6 right-6 p-4 text-white hover:text-[var(--accent)] z-50"
                        onClick={() => setIsFullScreen(false)}
                    >
                        <FaTimes size={32} />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={project.images[currentImageIndex]}
                            alt="Full screen project view"
                            className="max-w-full max-h-full object-contain"
                        />

                        {project.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
                                >
                                    <FaChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
                                >
                                    <FaChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}
