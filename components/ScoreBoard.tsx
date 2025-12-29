'use client';

import React from 'react';
import Card from './Card';
import type { PlayerScore } from '@/lib/scoreManager';

interface PlayerScoreBoardProps {
    scores: PlayerScore[];
    onReset?: () => void;
}

export default function PlayerScoreBoard({ scores, onReset }: PlayerScoreBoardProps) {
    if (scores.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">🏆 Classement des Joueurs</h2>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="text-white/70 hover:text-white text-sm px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Réinitialiser
                    </button>
                )}
            </div>

            <div className="space-y-2">
                {scores.map((score, index) => {
                    const winRate = score.gamesPlayed > 0
                        ? Math.round((score.wins / score.gamesPlayed) * 100)
                        : 0;
                    const isTopPlayer = index === 0 && score.wins > 0;

                    return (
                        <div
                            key={score.name}
                            className={`flex items-center justify-between p-3 rounded-lg ${isTopPlayer
                                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                                    : 'bg-white/5 border border-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-white/50 w-8">
                                    {index + 1}
                                </span>
                                {isTopPlayer && <span className="text-2xl">👑</span>}
                                <span className="text-white font-semibold">{score.name}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-lg font-bold text-white">
                                        {score.wins} 🏆
                                    </div>
                                    <div className="text-xs text-white/50">
                                        {score.gamesPlayed} {score.gamesPlayed === 1 ? 'partie' : 'parties'}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-primary-violet">
                                        {winRate}%
                                    </div>
                                    <div className="text-xs text-white/50">
                                        victoires
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
