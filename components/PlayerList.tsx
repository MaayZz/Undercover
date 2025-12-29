'use client';

import React from 'react';
import type { Player } from '@/types/game';

interface PlayerListProps {
    players: Player[];
    onPlayerClick?: (player: Player) => void;
    showRoles?: boolean;
    turnOrder?: string[];
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

const getRoleName = (role: Player['role']): string => {
    switch (role) {
        case 'civil':
            return 'Civil';
        case 'undercover':
            return 'Undercover';
        case 'mrwhite':
            return 'Mr. White';
    }
};

export default function PlayerList({
    players,
    onPlayerClick,
    showRoles = false,
    turnOrder = [],
}: PlayerListProps) {
    const getTurnNumber = (playerId: string): number | null => {
        if (turnOrder.length === 0) return null;
        const index = turnOrder.indexOf(playerId);
        return index !== -1 ? index + 1 : null;
    };

    return (
        <div className="space-y-3">
            {players.map((player) => {
                const turnNumber = getTurnNumber(player.id);
                const isClickable = onPlayerClick && player.isAlive;

                return (
                    <div
                        key={player.id}
                        onClick={() => isClickable && onPlayerClick(player)}
                        className={`
              player-card
              ${!player.isAlive ? 'eliminated' : ''}
              ${isClickable ? 'cursor-pointer' : 'cursor-default'}
            `}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {turnNumber && (
                                    <div className="w-8 h-8 rounded-full bg-primary-violet flex items-center justify-center font-bold">
                                        {turnNumber}
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {player.name}
                                    </h3>
                                    {showRoles && !player.isAlive && (
                                        <p className="text-sm text-white/70">
                                            {getRoleEmoji(player.role)} {getRoleName(player.role)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {!player.isAlive && (
                                    <span className="text-2xl">💀</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
