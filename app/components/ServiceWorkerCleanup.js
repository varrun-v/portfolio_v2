'use client';
import { useEffect } from 'react';

export default function ServiceWorkerCleanup() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    console.log('Unregistering old SW:', registration);
                    registration.unregister();
                }
            });
        }
    }, []);

    return null;
}
