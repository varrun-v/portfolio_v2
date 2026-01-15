'use client';
import { useEffect, useRef } from 'react';

export default function ProgressIndicator() {
    const progressRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = totalScroll / windowHeight;

            if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${scrolled})`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-transparent">
            <div
                ref={progressRef}
                className="w-full h-full bg-blue-500 origin-left transform scale-x-0 transition-transform duration-100 ease-out"
            // TODO: Allow color customization via props or global theme
            />
        </div>
    );
}
