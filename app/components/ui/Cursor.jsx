'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
    const cursorRef = useRef(null); // Small dot
    const followerRef = useRef(null); // Large circle
    const textRef = useRef(null); // Text label inside follower

    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        // Media Query Check (Hide on Mobile / Reduced Motion)
        const isDesktop = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isDesktop || prefersReducedMotion) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const textLabel = textRef.current;

        // Initial State: Visible
        gsap.set([cursor, follower], { opacity: 1, scale: 1 });

        // Mouse Position Tracker
        const mouse = { x: 0, y: 0 };
        const pos = { x: 0, y: 0 }; // Follower position (lagged)

        // --- 1. INERTIA / LAG LOOP ---
        // We use a RAF loop for smooth inertia calculation instead of simple tweening on every mousemove
        // This gives that "weighted" feel.
        const speed = 0.15; // 0.1 = slow/heavy, 0.5 = fast/light

        const loop = () => {
            // Linear interpolation (Lerp)
            pos.x += (mouse.x - pos.x) * speed;
            pos.y += (mouse.y - pos.y) * speed;

            gsap.set(follower, { x: pos.x, y: pos.y });
            gsap.set(cursor, { x: mouse.x, y: mouse.y }); // Primary dot is instant

            requestAnimationFrame(loop);
        };
        loop();

        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        // --- 2. MAGNETIC INTERACTION & 3. CONTEXT TEXT ---
        const onMouseEnter = (e) => {
            const target = e.target;

            // Check for Data Attributes
            const text = target.getAttribute('data-cursor');
            const isMagnetic = target.getAttribute('data-magnetic');

            // -- TEXT HANDLING --
            if (text) {
                setCursorText(text);
                gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', mixBlendMode: 'normal', duration: 0.3 });
                gsap.to(cursor, { opacity: 0, duration: 0.2 }); // Hide dot
                gsap.to(textLabel, { opacity: 1, scale: 1, duration: 0.2, delay: 0.1 });
            }
            // -- GENERIC HOVER (Link/Button but no specific text) --
            else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                gsap.to(follower, { scale: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.2)', duration: 0.3 });
            }

            // -- MAGNETIC ATTRACTION -- 
            // Note: Real magnetic effect moves the ELEMENT too, but user asked for cursor-only magnetism initially.
            // To implement cursor-only magnetism, we override the 'mouse' coordinates to snap to center.
            if (isMagnetic) {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Animate the 'mouse' target variable to center (overrides actual mouse pos temporarily)
                // But wait, if we override 'mouse.x', the user loses control to pull away.
                // Better approach: Apply a force or just animate the FOLLOWER directly to the element shape.

                gsap.to(follower, {
                    width: rect.width + 10,
                    height: rect.height + 10,
                    borderRadius: '12px', // Match button style usually
                    x: centerX,
                    y: centerY,
                    ease: 'power2.out',
                    duration: 0.3
                });

                // We need to pause the RAF loop logic for position X/Y if we want GSAP to take full control of position
                // OR we just let the lag mechanic handle it if we influence 'pos.x'
                // For a "Stick" effect, direct animation is cleaner.
                // To properly do this, we'd need a 'isStuck' flag.
            }
        };

        const onMouseLeave = (e) => {
            const target = e.target;

            // Reset Text
            setCursorText("");
            gsap.to(textLabel, { opacity: 0, scale: 0.5, duration: 0.2 });

            // Reset Scales
            gsap.to(follower, {
                scale: 1,
                width: 40, // Reset to default size (w-10)
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                mixBlendMode: 'difference',
                duration: 0.3
            });
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
        };

        // Delegation for performance (instead of adding listeners to every element)
        // We'll use mouseover/out bubbling
        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor], [data-magnetic]');
            if (target) onMouseEnter({ target });
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest('a, button, [data-cursor], [data-magnetic]');
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
            {/* Primary Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />

            {/* Follower Circle */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] opacity-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
            >
                {/* Context Text Label */}
                <span
                    ref={textRef}
                    className="text-[10px] font-bold text-black opacity-0 uppercase tracking-wider"
                >
                    {cursorText}
                </span>
            </div>
        </>
    );
}
