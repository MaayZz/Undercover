'use client';

import React, { useState } from 'react';
import type { Player } from '@/types/game';

interface PlayerRevealCardProps {
    player: Player;
    onReveal: (playerId: string) => void;
}

const getRoleEmoji = (role: Player['role']): string => {
    switch (role) {
        case 'civil':
            return '👤';
        case 'undercover':
            return '🕵️';
        case 'mrwhite':
            return '❓';
    }
};

export default function PlayerRevealCard({ player, onReveal }: PlayerRevealCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        if (!player.hasRevealed) {
            setIsFlipped(true);
            onReveal(player.id);
        }
    };

    const handleHide = () => {
        setIsFlipped(false);
    };

    return (
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
                {/* Front - Hidden */}
                <div className="flip-card-front">
                    <div
                        onClick={handleFlip}
                        className="glass-card h-full flex flex-col items-center justify-center cursor-pointer
                       hover:bg-white/15 transition-all active:scale-95 p-6"
                    >
                        <div className="text-6xl mb-4">🎴</div>
                        <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                        <p className="text-white/70 text-sm">👆 Tap to reveal</p>
                    </div>
                </div>

                {/* Back - Revealed */}
                <div className="flip-card-back">
                    <div className="glass-card h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary-violet/20 to-primary-blue/20">
                        <div className="text-7xl mb-4">{getRoleEmoji(player.role)}</div>
                        <h3 className="text-xl font-bold text-white mb-4">{player.name}</h3>

                        {player.word ? (
                            <div className="text-center mb-6">
                                <p className="text-white/70 text-sm mb-2">Votre mot :</p>
                                <p className="text-3xl font-bold gradient-text">{player.word}</p>
                            </div>
                        ) : (
                            <div className="text-center mb-6">
                                <p className="text-white/70 text-sm mb-2">Mr. White</p>
                                <p className="text-4xl font-bold text-white">???</p>
                                <p className="text-white/60 text-xs mt-2">Vous n&apos;avez pas de mot</p>
                            </div>
                        )}

                        <button
                            onClick={handleHide}
                            className="btn-secondary text-sm"
                        >
                            👁️ Hide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
