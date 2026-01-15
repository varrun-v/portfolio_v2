'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProgressIndicator() {
    const progressRef = useRef(null);

    useEffect(() => {
        // console.log("ProgressIndicator: Mounted"); // Debug log

        const handleScroll = () => {
            const totalScroll = window.scrollY;
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Standardize: 0 to 1
            const progress = windowHeight > 0 ? totalScroll / windowHeight : 0;

            if (progressRef.current) {
                gsap.to(progressRef.current, {
                    scaleX: progress,
                    duration: 0.1,
                    ease: 'none',
                    overwrite: true
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[99999] bg-transparent pointer-events-none mix-blend-difference">
            <div
                ref={progressRef}
                className="w-full h-full bg-cyan-400 origin-left transform scale-x-0"
            />
        </div>
    );
}
