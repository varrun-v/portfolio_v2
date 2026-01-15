'use client';
import { useState, useRef, useEffect } from 'react';

export default function SoundBar() {
    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const newState = !isPlaying;
        setIsPlaying(newState);

        if (newState) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    };

    return (
        <div
            className="fixed top-24 right-8 lg:right-12 cursor-pointer z-50 flex items-center gap-1"
            onClick={togglePlay}
        >
            <audio ref={ref} src="/sounds/song.mp3" loop />

            {/* Visualizer Bars */}
            {[1, 2, 3, 4, 5].map((bar, i) => (
                <div
                    key={i}
                    className={`w-[2px] h-4 bg-white transition-all duration-300 ${isPlaying ? 'animate-music-bar' : ''
                        }`}
                    style={{
                        animationDelay: `${0.1 * i}s`,
                        height: isPlaying ? '1rem' : '0.2rem',
                        // We'll need to add a keyframe animation in global css for the 'dance' effect 
                        // or use inline styles/GSAP for specific heights if we want precise control.
                        // For now, let's use a simple distinct state.
                    }}
                />
            ))}
            <span className="sr-only">Toggle Music</span>

            <style jsx>{`
        @keyframes music-bar {
          0% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
          100% { transform: scaleY(0.5); }
        }
        .animate-music-bar {
          animation: music-bar 1s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}
