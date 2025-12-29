import { supabase } from './supabase';
import type { WordPair, Player, PlayerRole, VictoryCondition } from '@/types/game';

/**
 * Fetches a random word pair from the Supabase word_pairs table
 * Avoids recently used pairs (last 10 games)
 */
export async function getRandomWordPair(): Promise<WordPair | null> {
    try {
        // Get all word pairs
        const { data: allPairs, error } = await supabase
            .from('word_pairs')
            .select('*');

        if (error || !allPairs || allPairs.length === 0) {
            console.error('Error fetching word pairs:', error);
            return null;
        }

        // Import word history manager (dynamic to avoid SSR issues)
        const { getWordHistory, isInRecentHistory, addToWordHistory } = await import('./scoreManager');

        // Filter out recently used pairs
        const availablePairs = allPairs.filter(pair => !isInRecentHistory(pair.id));

        // If all pairs have been used recently, reset and use all
        const pairsToUse = availablePairs.length > 0 ? availablePairs : allPairs;

        // Get random pair
        const randomIndex = Math.floor(Math.random() * pairsToUse.length);
        const selectedPair = pairsToUse[randomIndex];

        // Add to history
        if (selectedPair.id) {
            addToWordHistory(selectedPair.id);
        }

        return selectedPair as WordPair;
    } catch (error) {
        console.error('Exception in getRandomWordPair:', error);
        return null;
    }
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Calculates role distribution based on player count
 * 3-4 players: 1 Undercover
 * 5-6 players: 1 Undercover + 1 Mr. White
 * 7+ players: 2 Undercover + 1 Mr. White
 */
function getRoleDistribution(playerCount: number): {
    undercovers: number;
    mrWhites: number;
} {
    if (playerCount <= 4) {
        return { undercovers: 1, mrWhites: 0 };
    } else if (playerCount <= 6) {
        return { undercovers: 1, mrWhites: 1 };
    } else {
        return { undercovers: 2, mrWhites: 1 };
    }
}

/**
 * Assigns roles to players based on manual configuration or game rules
 */
export function assignRoles(
    playerNames: string[],
    wordPair: WordPair,
    manualConfig?: { undercovers: number; mrWhites: number }
): Player[] {
    if (playerNames.length < 3) {
        throw new Error('Minimum 3 players required');
    }

    const { undercovers, mrWhites } = manualConfig || getRoleDistribution(playerNames.length);
    const civils = playerNames.length - undercovers - mrWhites;

    // Validate configuration
    if (civils < 1) {
        throw new Error('Il doit y avoir au moins 1 civil');
    }
    if (undercovers + mrWhites >= playerNames.length) {
        throw new Error('Trop d\'intrus par rapport au nombre de joueurs');
    }

    // Create role array
    const roles: PlayerRole[] = [
        ...Array(civils).fill('civil'),
        ...Array(undercovers).fill('undercover'),
        ...Array(mrWhites).fill('mrwhite'),
    ];

    // Shuffle roles using Fisher-Yates - IMPORTANT for randomness
    const shuffledRoles = shuffleArray(roles);

    // Debug log to verify randomization
    console.log('Roles after shuffle:', shuffledRoles);

    // Create player objects with unique IDs
    const players: Player[] = playerNames.map((name, index) => {
        const role = shuffledRoles[index];
        let word: string | null = null;

        if (role === 'civil') {
            word = wordPair.civil_word;
        } else if (role === 'undercover') {
            word = wordPair.undercover_word;
        }
        // Mr. White gets null word

        return {
            id: typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `player-${name}-${index}-${Math.random()}-${Date.now()}`,
            name,
            role,
            word,
            isAlive: true,
            hasRevealed: false,
        };
    });

    console.log('Players assigned:', players.map(p => ({ name: p.name, role: p.role })));

    return players;
}

/**
 * Checks victory conditions and returns game result
 */
export function checkVictoryConditions(players: Player[]): VictoryCondition {
    const alivePlayers = players.filter(p => p.isAlive);
    const aliveCivils = alivePlayers.filter(p => p.role === 'civil');
    const aliveIntrus = alivePlayers.filter(p => p.role === 'undercover' || p.role === 'mrwhite');

    // Civils win if all intrus are eliminated
    if (aliveIntrus.length === 0) {
        return {
            isGameOver: true,
            winner: 'civils',
            message: '🎉 Les Civils ont gagné ! Tous les intrus ont été éliminés !',
        };
    }

    // Intrus win if only 1 civil remains
    if (aliveCivils.length <= 1) {
        return {
            isGameOver: true,
            winner: 'intrus',
            message: '🕵️ Les Intrus ont gagné ! Il ne reste plus assez de civils !',
        };
    }

    // Game continues
    return {
        isGameOver: false,
        winner: null,
        message: '',
    };
}

/**
 * Generates randomized turn order for players
 */
export function generateTurnOrder(players: Player[]): string[] {
    const alivePlayers = players.filter(p => p.isAlive);
    const shuffled = shuffleArray(alivePlayers);
    return shuffled.map(p => p.id);
}

/**
 * Checks if Mr. White's guess is correct
 */
export function checkMrWhiteGuess(guess: string, civilWord: string): boolean {
    return guess.trim().toLowerCase() === civilWord.trim().toLowerCase();
}
