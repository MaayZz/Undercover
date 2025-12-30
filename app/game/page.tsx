'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import PlayerRevealCard from '@/components/PlayerRevealCard';
import PlayerList from '@/components/PlayerList';
import MrWhiteGuessModal from '@/components/MrWhiteGuessModal';
import Card from '@/components/Card';
import Confetti from '@/components/Confetti';
import {
    getRandomWordPair,
    assignRoles,
    checkVictoryConditions,
    generateTurnOrder,
} from '@/lib/gameLogic';
import type { Player, GamePhase, WordPair } from '@/types/game';

// Force dynamic rendering to avoid SSR issues with Supabase
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function GamePage() {
    const router = useRouter();
    const [phase, setPhase] = useState<GamePhase>('setup');
    const [playerNames, setPlayerNames] = useState<string[]>(['', '', '']);
    const [players, setPlayers] = useState<Player[]>([]);
    const [wordPair, setWordPair] = useState<WordPair | null>(null);
    const [turnOrder, setTurnOrder] = useState<string[]>([]);
    const [currentRound, setCurrentRound] = useState(1);
    const [winner, setWinner] = useState<'civils' | 'intrus' | null>(null);
    const [showMrWhiteModal, setShowMrWhiteModal] = useState(false);
    const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    // Manual role configuration
    const [numUndercovers, setNumUndercovers] = useState(1);
    const [numMrWhites, setNumMrWhites] = useState(0);

    // Setup Phase - Add/Remove Players
    const handleAddPlayer = () => {
        setPlayerNames([...playerNames, '']);
    };

    const handleRemovePlayer = (index: number) => {
        if (playerNames.length > 3) {
            const newNames = playerNames.filter((_, i) => i !== index);
            setPlayerNames(newNames);
        }
    };

    const handleNameChange = (index: number, value: string) => {
        const newNames = [...playerNames];
        newNames[index] = value;
        setPlayerNames(newNames);
    };

    // Start Game - Fetch words and assign roles
    const handleStartGame = async () => {
        // Validate player names
        const validNames = playerNames.filter(name => name.trim() !== '');
        if (validNames.length < 3) {
            setError('Minimum 3 joueurs requis !');
            return;
        }

        // Check for duplicate names
        const uniqueNames = new Set(validNames);
        if (uniqueNames.size !== validNames.length) {
            setError('Les noms des joueurs doivent être uniques !');
            return;
        }

        // Validate role configuration
        const totalIntrus = numUndercovers + numMrWhites;
        if (totalIntrus >= validNames.length) {
            setError('Trop d\'intrus ! Il doit y avoir au moins 1 civil.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Fetch word pair from Supabase
            const fetchedWordPair = await getRandomWordPair();
            if (!fetchedWordPair) {
                setError('Erreur lors du chargement des mots. Vérifiez votre connexion.');
                setLoading(false);
                return;
            }

            setWordPair(fetchedWordPair);

            // Assign roles with manual configuration
            const assignedPlayers = assignRoles(validNames, fetchedWordPair, {
                undercovers: numUndercovers,
                mrWhites: numMrWhites,
            });
            setPlayers(assignedPlayers);

            // Generate turn order
            const order = generateTurnOrder(assignedPlayers);
            setTurnOrder(order);

            setPhase('reveal');
        } catch (err) {
            console.error('Error starting game:', err);
            setError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    // Reveal Phase
    const handlePlayerReveal = (playerId: string) => {
        setPlayers(prev =>
            prev.map(p =>
                p.id === playerId ? { ...p, hasRevealed: true } : p
            )
        );
    };

    const allPlayersRevealed = players.length > 0 && players.every(p => p.hasRevealed);

    const handleProceedToDiscussion = () => {
        setPhase('discussion');
    };

    // Discussion Phase
    const handleProceedToVote = () => {
        setPhase('vote');
    };

    // Vote Phase
    const handleEliminatePlayer = (player: Player) => {
        if (!player.isAlive) return;

        // Check if Mr. White
        if (player.role === 'mrwhite') {
            setEliminatedPlayer(player);
            setShowMrWhiteModal(true);
        } else {
            eliminateAndCheckVictory(player);
        }
    };

    const eliminateAndCheckVictory = (player: Player) => {
        // Mark player as eliminated
        const updatedPlayers = players.map(p =>
            p.id === player.id ? { ...p, isAlive: false } : p
        );
        setPlayers(updatedPlayers);

        // Check victory conditions
        const result = checkVictoryConditions(updatedPlayers);
        if (result.isGameOver) {
            setWinner(result.winner);

            // Show confetti for civils win
            if (result.winner === 'civils') {
                setShowConfetti(true);
            }

            setPhase('end');
        } else {
            // Generate new turn order and go back to discussion
            const newOrder = generateTurnOrder(updatedPlayers);
            setTurnOrder(newOrder);
            setCurrentRound(prev => prev + 1);
            setPhase('discussion');
        }
    };

    // Mr. White Guess
    const handleMrWhiteGuess = (guess: string, isCorrect: boolean) => {
        setShowMrWhiteModal(false);

        if (isCorrect) {
            // Mr. White wins! All intrus win
            setWinner('intrus');
            setPhase('end');
        } else {
            // Continue game, eliminate Mr. White
            if (eliminatedPlayer) {
                eliminateAndCheckVictory(eliminatedPlayer);
            }
        }
    };

    // New game (keep player names for quick rematch)
    const handleNewGame = () => {
        // Save current player names to reuse
        const currentPlayerNames = players.map(p => p.name);

        setPhase('setup');
        setPlayerNames(currentPlayerNames); // Keep the same names
        setPlayers([]);
        setWordPair(null);
        setTurnOrder([]);
        setCurrentRound(1);
        setWinner(null);
        setEliminatedPlayer(null);
        setError(null);
        setShowConfetti(false);
    };

    // Restart (go home)
    const handleGoHome = () => {
        router.push('/');
    };

    // Render based on phase
    return (
        <main className="min-h-screen p-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Setup Phase */}
                {phase === 'setup' && (
                    <div className="space-y-6 animate-slide-in">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Configuration
                            </h1>
                            <p className="text-white/70">Configurez la partie</p>
                        </div>

                        {error && (
                            <Card className="bg-red-500/20 border-red-500/50">
                                <p className="text-red-200 text-center">⚠️ {error}</p>
                            </Card>
                        )}

                        {/* Players */}
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                👥 Joueurs (minimum 3)
                            </h3>
                            <div className="space-y-3">
                                {playerNames.map((name, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                            placeholder={`Joueur ${index + 1}`}
                                            className="input-field flex-1"
                                        />
                                        {playerNames.length > 3 && (
                                            <button
                                                onClick={() => handleRemovePlayer(index)}
                                                className="btn-danger px-4"
                                            >
                                                ❌
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <Button
                                    variant="secondary"
                                    onClick={handleAddPlayer}
                                    className="w-full"
                                >
                                    ➕ Ajouter joueur
                                </Button>
                            </div>
                        </Card>

                        {/* Role Configuration */}
                        <Card>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                🎭 Configuration des Rôles
                            </h3>
                            <div className="space-y-4">
                                {/* Undercovers */}
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">
                                        🕵️ Nombre d&apos;Undercover
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setNumUndercovers(Math.max(0, numUndercovers - 1))}
                                            className="btn-secondary px-4 py-2"
                                        >
                                            −
                                        </button>
                                        <span className="text-2xl font-bold text-white w-12 text-center">
                                            {numUndercovers}
                                        </span>
                                        <button
                                            onClick={() => setNumUndercovers(numUndercovers + 1)}
                                            className="btn-secondary px-4 py-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Mr. Whites */}
                                <div>
                                    <label className="block text-white/70 text-sm mb-2">
                                        ❓ Nombre de Mr. White
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setNumMrWhites(Math.max(0, numMrWhites - 1))}
                                            className="btn-secondary px-4 py-2"
                                        >
                                            −
                                        </button>
                                        <span className="text-2xl font-bold text-white w-12 text-center">
                                            {numMrWhites}
                                        </span>
                                        <button
                                            onClick={() => setNumMrWhites(numMrWhites + 1)}
                                            className="btn-secondary px-4 py-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="pt-3 border-t border-white/10">
                                    <p className="text-white/70 text-sm">
                                        Civils : {Math.max(0, playerNames.filter(n => n.trim()).length - numUndercovers - numMrWhites)}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Button
                            variant="primary"
                            onClick={handleStartGame}
                            disabled={loading}
                            className="w-full text-xl py-4"
                        >
                            {loading ? '⏳ Chargement...' : '▶️ Commencer la partie'}
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleGoHome}
                            className="w-full"
                        >
                            ← Retour
                        </Button>
                    </div>
                )}

                {/* Reveal Phase */}
                {phase === 'reveal' && (
                    <div className="space-y-6 animate-slide-in">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Pass & Play
                            </h1>
                            <p className="text-white/70">
                                Chaque joueur découvre son mot en privé
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {players.map((player) => (
                                <PlayerRevealCard
                                    key={player.id}
                                    player={player}
                                    onReveal={handlePlayerReveal}
                                />
                            ))}
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleProceedToDiscussion}
                            disabled={!allPlayersRevealed}
                            className="w-full text-xl py-4"
                        >
                            Continuer
                        </Button>
                    </div>
                )}

                {/* Discussion Phase */}
                {phase === 'discussion' && (
                    <div className="space-y-6 animate-slide-in">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Discussion - Tour {currentRound}
                            </h1>
                            <p className="text-white/70">
                                Chaque joueur donne un indice à tour de rôle
                            </p>
                        </div>

                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">
                                🎯 Ordre de parole :
                            </h2>
                            <PlayerList players={players} turnOrder={turnOrder} />
                        </Card>

                        <Button
                            variant="primary"
                            onClick={handleProceedToVote}
                            className="w-full text-xl py-4"
                        >
                            🗳️ Passer au vote
                        </Button>
                    </div>
                )}

                {/* Vote Phase */}
                {phase === 'vote' && (
                    <div className="space-y-6 animate-slide-in">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Vote
                            </h1>
                            <p className="text-white/70">
                                Cliquez sur un joueur pour l&apos;éliminer
                            </p>
                        </div>

                        <Card>
                            <PlayerList
                                players={players}
                                onPlayerClick={handleEliminatePlayer}
                                showRoles={true}
                            />
                        </Card>

                        <Button
                            variant="secondary"
                            onClick={() => setPhase('discussion')}
                            className="w-full"
                        >
                            ← Retour à la discussion
                        </Button>
                    </div>
                )}

                {/* End Phase */}
                {phase === 'end' && (
                    <div className="space-y-6 animate-slide-in text-center">
                        <div className="text-8xl mb-4">
                            {winner === 'civils' ? '🎉' : '🕵️'}
                        </div>

                        <h1 className="text-5xl font-bold gradient-text mb-4">
                            {winner === 'civils'
                                ? 'Les Civils ont gagné !'
                                : 'Les Intrus ont gagné !'}
                        </h1>

                        <Card>
                            <h2 className="text-xl font-semibold text-white mb-4">
                                👥 Récapitulatif des rôles :
                            </h2>
                            <PlayerList players={players} showRoles={true} />
                        </Card>

                        {wordPair && (
                            <Card>
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    📝 Les mots :
                                </h2>
                                <div className="space-y-2">
                                    <p className="text-white/70">
                                        <strong className="text-primary-blue">Civils :</strong>{' '}
                                        {wordPair.civil_word}
                                    </p>
                                    <p className="text-white/70">
                                        <strong className="text-primary-violet">Undercover :</strong>{' '}
                                        {wordPair.undercover_word}
                                    </p>
                                    <p className="text-white/50 text-sm mt-2">
                                        Catégorie : {wordPair.category}
                                    </p>
                                </div>
                            </Card>
                        )}

                        <Button
                            variant="primary"
                            onClick={handleNewGame}
                            className="w-full text-xl py-4"
                        >
                            🔄 Rejouer
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleGoHome}
                            className="w-full"
                        >
                            ← Retour à l&apos;accueil
                        </Button>
                    </div>
                )}
            </div>

            {/* Mr. White Guess Modal */}
            <MrWhiteGuessModal
                isOpen={showMrWhiteModal}
                civilWord={wordPair?.civil_word || ''}
                onGuess={handleMrWhiteGuess}
            />

            {/* Confetti Animation */}
            <Confetti
                active={showConfetti}
                onComplete={() => setShowConfetti(false)}
            />
        </main>
    );
}
