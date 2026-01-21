'use client';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/lottie/Loading.json';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        // In Next.js, importing JSON from public might not work directly with 'import' 
        // depending on config, but normally it's better to fetch it or import if configured.
        // However, since we are using 'lottie-react', we can pass the JSON object directly.
        // Let's assume the import works for now, if not we will fetch it.
        // actually, importing from public via relative path like that is flaky in some setups.
        // Better pattern: fetch it or just import it if it's in the app structure.
        // Given the user said "under public/lottie", I should fetch it or move it.
        // BUT simplest way for public assets is fetching. 

        // Wait, the user said "added loading.json under lottie folder under public".
        // I can just fetch it.

        fetch('/lottie/Loading.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Failed to load lottie", err));

    }, []);

    useEffect(() => {
        // Exit animation when onComplete is called is handled by parent or here?
        // Parent handles unmounting, but we can animate out here.
        // For now, let's just make it a clean centralized component.
    }, []);

    if (!animationData) return <div className="fixed inset-0 bg-[#0a0a0a] z-[100]" />;

    return (
        <div className="loader-container fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-[100]">
            <div className="w-32 h-32 md:w-48 md:h-48">
                <Lottie animationData={animationData} loop={true} />
            </div>
        </div>
    );
}
