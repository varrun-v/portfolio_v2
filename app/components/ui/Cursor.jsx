'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        // Only run on desktop to avoid issues on touch devices
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        if (!isDesktop) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (cursor && follower) {
            // Unhide cursors when logic runs
            gsap.set(cursor, { opacity: 1 });
            gsap.set(follower, { opacity: 1 });

            const moveCursor = (e) => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out',
                });
                gsap.to(follower, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const handleHover = () => {
                gsap.to(cursor, { scale: 0.5, duration: 0.3 });
                gsap.to(follower, { scale: 3, duration: 0.3, backgroundColor: 'rgba(255, 255, 255, 0.1)' });
            };

            const handleUnHover = () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(follower, { scale: 1, duration: 0.3, backgroundColor: 'transparent' });
            };

            document.addEventListener('mousemove', moveCursor);

            // Attach listeners to interactive elements
            // Using a MutationObserver could be better for dynamic content, 
            // but for now we'll restart listeners on route changes if needed.
            // A simple delegation or re-querying approach:
            const addHoverListeners = () => {
                const hoverables = document.querySelectorAll('.link, a, button');
                hoverables.forEach((el) => {
                    el.addEventListener('mouseenter', handleHover);
                    el.addEventListener('mouseleave', handleUnHover);
                });
            };

            addHoverListeners();

            // Re-run listener attachment periodically or on mutation if this were a complex app
            // For this portfolio, we might need a more robust solution later if pages transition dynamically
            // without full reloads (which Next.js does). 
            // A global event delegation is safer:

            const delegateHover = (e) => {
                if (e.target.closest('.link') || e.target.closest('a') || e.target.closest('button')) {
                    handleHover();
                }
            };

            const delegateUnHover = (e) => {
                if (e.target.closest('.link') || e.target.closest('a') || e.target.closest('button')) {
                    handleUnHover();
                }
            };

            // Actually, simple mouseover/mouseout bubbling works best for delegation
            const handleMouseOver = (e) => {
                if (e.target.closest('.link') || e.target.closest('a') || e.target.closest('button')) {
                    handleHover();
                }
            };

            const handleMouseOut = (e) => {
                if (e.target.closest('.link') || e.target.closest('a') || e.target.closest('button')) {
                    handleUnHover();
                }
            };

            document.addEventListener('mouseover', handleMouseOver);
            document.addEventListener('mouseout', handleMouseOut);


            return () => {
                document.removeEventListener('mousemove', moveCursor);
                document.removeEventListener('mouseover', handleMouseOver);
                document.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] opacity-0 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 mix-blend-difference"
            />
        </>
    );
}
