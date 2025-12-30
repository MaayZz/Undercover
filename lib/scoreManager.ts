// Utility functions for managing player scores and word history

export interface PlayerScore {
    name: string;
    wins: number;
    gamesPlayed: number;
}

export interface WordHistory {
    wordPairs: number[]; // IDs of used word pairs
    lastUsed: number; // timestamp
}

const SCORE_STORAGE_KEY = 'undercover_player_scores';
const LEGACY_SCORE_KEY = 'undercover_scores'; // Legacy key ensure cleanup
const WORD_HISTORY_KEY = 'undercover_word_history';
const WORD_HISTORY_LIMIT = 10;

/**
 * Get all player scores from localStorage
 */
export function getAllPlayerScores(): PlayerScore[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(SCORE_STORAGE_KEY);
    console.log('Loading scores:', stored ? 'Found data' : 'No data');

    if (!stored) return [];

    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error parsing scores:', e);
        return [];
    }
}

/**
 * Update scores for specific players who won
 */
export function updatePlayerScores(winnerNames: string[], allPlayerNames: string[]): PlayerScore[] {
    const scores = getAllPlayerScores();

    // Update or create scores for all players in this game
    allPlayerNames.forEach(playerName => {
        const existingScore = scores.find(s => s.name === playerName);
        const didWin = winnerNames.includes(playerName);

        if (existingScore) {
            existingScore.gamesPlayed++;
            if (didWin) {
                existingScore.wins++;
            }
        } else {
            scores.push({
                name: playerName,
                wins: didWin ? 1 : 0,
                gamesPlayed: 1,
            });
        }
    });

    // Sort by wins descending
    scores.sort((a, b) => b.wins - a.wins);

    if (typeof window !== 'undefined') {
        localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
    }

    return scores;
}

/**
 * Reset all player scores
 */
export function resetPlayerScores(): void {
    if (typeof window !== 'undefined') {
        console.log('Clearing scores from localStorage...');
        localStorage.removeItem(SCORE_STORAGE_KEY);
        // Also clear legacy key just in case
        localStorage.removeItem(LEGACY_SCORE_KEY);
    }
}

/**
 * Get word history from localStorage
 */
export function getWordHistory(): WordHistory {
    if (typeof window === 'undefined') return { wordPairs: [], lastUsed: Date.now() };

    const stored = localStorage.getItem(WORD_HISTORY_KEY);
    if (!stored) return { wordPairs: [], lastUsed: Date.now() };

    try {
        return JSON.parse(stored);
    } catch {
        return { wordPairs: [], lastUsed: Date.now() };
    }
}

/**
 * Add a word pair ID to history
 */
export function addToWordHistory(wordPairId: number): void {
    const history = getWordHistory();

    // Add new ID
    history.wordPairs.push(wordPairId);
    history.lastUsed = Date.now();

    // Keep only last 10
    if (history.wordPairs.length > WORD_HISTORY_LIMIT) {
        history.wordPairs = history.wordPairs.slice(-WORD_HISTORY_LIMIT);
    }

    if (typeof window !== 'undefined') {
        localStorage.setItem(WORD_HISTORY_KEY, JSON.stringify(history));
    }
}

/**
 * Check if a word pair ID is in recent history
 */
export function isInRecentHistory(wordPairId: number): boolean {
    const history = getWordHistory();
    return history.wordPairs.includes(wordPairId);
}

/**
 * Clear word history
 */
export function clearWordHistory(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(WORD_HISTORY_KEY);
    }
}
