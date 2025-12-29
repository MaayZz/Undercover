'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        // Vérifier si l'app est déjà installée
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return; // App déjà installée
        }

        // Écouter l'événement beforeinstallprompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Attendre 30 secondes avant de montrer la bannière
            setTimeout(() => {
                setShowInstallPrompt(true);
            }, 30000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Afficher le prompt d'installation
        deferredPrompt.prompt();

        // Attendre la réponse de l'utilisateur
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);

        // Réinitialiser
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in">
            <div className="glass-card p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">📱</span>
                    <div>
                        <p className="text-white font-semibold text-sm">
                            Installer Undercover
                        </p>
                        <p className="text-white/70 text-xs">
                            Ajouter à l&apos;écran d&apos;accueil
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleDismiss}
                        className="text-white/70 hover:text-white px-3 py-2 text-sm"
                    >
                        Plus tard
                    </button>
                    <Button onClick={handleInstallClick} variant="primary" className="text-sm py-2">
                        Installer
                    </Button>
                </div>
            </div>
        </div>
    );
}
