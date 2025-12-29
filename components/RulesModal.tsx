'use client';

import React from 'react';
import Button from './Button';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">📖</div>
                    <h2 className="text-3xl font-bold gradient-text">Règles du Jeu</h2>
                </div>

                <div className="space-y-6 text-white/90">
                    {/* Objective */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                            🎯 Objectif
                        </h3>
                        <p className="text-white/70">
                            Un jeu de déduction sociale où les <strong>Civils</strong> doivent identifier
                            les <strong>Intrus</strong> (Undercover et Mr. White) avant d&apos;être éliminés.
                        </p>
                    </div>

                    {/* Roles */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            👥 Les Rôles
                        </h3>
                        <div className="space-y-3">
                            <div className="glass-card p-4">
                                <h4 className="font-semibold flex items-center gap-2 mb-1">
                                    👤 <span className="text-primary-blue">Civils</span>
                                </h4>
                                <p className="text-sm text-white/70">
                                    Reçoivent le mot commun. Doivent éliminer tous les intrus.
                                </p>
                            </div>

                            <div className="glass-card p-4">
                                <h4 className="font-semibold flex items-center gap-2 mb-1">
                                    🕵️ <span className="text-primary-violet">Undercover</span>
                                </h4>
                                <p className="text-sm text-white/70">
                                    Reçoit un mot similaire mais différent. Doit rester discret et éliminer les civils.
                                </p>
                            </div>

                            <div className="glass-card p-4">
                                <h4 className="font-semibold flex items-center gap-2 mb-1">
                                    ❓ <span className="text-yellow-400">Mr. White</span>
                                </h4>
                                <p className="text-sm text-white/70">
                                    Ne reçoit AUCUN mot. Doit deviner le mot des civils s&apos;il est éliminé.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How to Play */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            🎮 Déroulement
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-white/70">
                            <li>Chaque joueur découvre son mot en mode &quot;Pass & Play&quot;</li>
                            <li>À tour de rôle, chaque joueur donne un indice sur son mot</li>
                            <li>Après un tour de parole, votez pour éliminer un joueur suspect</li>
                            <li>Si Mr. White est éliminé, il peut tenter de deviner le mot des civils</li>
                            <li>Le jeu continue jusqu&apos;à la victoire d&apos;une équipe</li>
                        </ol>
                    </div>

                    {/* Victory Conditions */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            🏆 Conditions de Victoire
                        </h3>
                        <div className="space-y-2">
                            <div className="glass-card p-3">
                                <p className="text-sm">
                                    <strong className="text-primary-blue">Civils gagnent :</strong>{' '}
                                    <span className="text-white/70">
                                        Tous les intrus sont éliminés
                                    </span>
                                </p>
                            </div>
                            <div className="glass-card p-3">
                                <p className="text-sm">
                                    <strong className="text-primary-violet">Intrus gagnent :</strong>{' '}
                                    <span className="text-white/70">
                                        Il ne reste qu&apos;un seul civil OU Mr. White devine le mot correct
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={onClose} variant="primary" className="w-full">
                        ✅ Compris !
                    </Button>
                </div>
            </div>
        </div>
    );
}
