'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef(null); // Small dot (Primary)
    const followerRef = useRef(null); // Large circle (Follower)

    useEffect(() => {
        // Media Query Check (Hide on Mobile / Reduced Motion)
        const isDesktop = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isDesktop || prefersReducedMotion) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Initial State: Visible, centered via xPercent/yPercent
        gsap.set([cursor, follower], {
            opacity: 1,
            scale: 1,
            xPercent: -50,
            yPercent: -50
        });

        // Mouse Position Tracker
        const mouse = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 }; // Follower position (lagged)

        // --- LOOP: Inertia (Follower Lag Only) ---
        const speed = 0.15;

        const loop = () => {
            // 1. Follower Inertia (Lag)
            pos.x += (mouse.x - pos.x) * speed;
            pos.y += (mouse.y - pos.y) * speed;

            // Update positions
            // IMPORTANT: We use xPercent/yPercent: -50 in initialization, 
            // so 'x' and 'y' can just be the mouse coordinates.
            gsap.set(follower, { x: pos.x, y: pos.y });
            gsap.set(cursor, { x: mouse.x, y: mouse.y });

            requestAnimationFrame(loop);
        };
        loop();

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        // --- Hover Effects ---
        const onMouseEnter = (e) => {
            gsap.to(follower, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
        };

        const onMouseLeave = (e) => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
        };

        // Delegation
        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button');
            if (target) onMouseEnter({ target });
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button');
            if (target) onMouseLeave({ target });
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(loop);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] opacity-0 mix-blend-difference"
            />
        </>
    );
}
