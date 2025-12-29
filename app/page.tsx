'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import RulesModal from '@/components/RulesModal';
import InstallPrompt from '@/components/InstallPrompt';

export default function Home() {
    const [showRules, setShowRules] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 15,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="particles">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.left}%`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-md w-full space-y-8 animate-slide-in">
                {/* Logo/Title */}
                <div className="text-center float-animation">
                    <div className="text-8xl mb-6">🕵️</div>
                    <h1 className="text-5xl font-black mb-2">
                        <span className="gradient-text">UNDERCOVER</span>
                    </h1>
                    <p className="text-white/70 text-lg">
                        Le jeu de déduction sociale
                    </p>
                </div>

                {/* Main Menu */}
                <div className="space-y-4">
                    <Link href="/game">
                        <Button variant="primary" className="w-full text-xl py-4">
                            🎮 Nouvelle Partie
                        </Button>
                    </Link>

                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => setShowRules(true)}
                    >
                        📖 Règles du Jeu
                    </Button>
                </div>

                {/* Info */}
                <div className="text-center text-white/50 text-sm">
                    <p>3 joueurs minimum • Mode Pass & Play</p>
                </div>
            </div>

            {/* Rules Modal */}
            <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />

            {/* Install Prompt */}
            <InstallPrompt />
        </main>
    );
}
