export interface WordPair {
    id?: number;
    civil_word: string;
    undercover_word: string;
    category: string;
}

export type PlayerRole = 'civil' | 'undercover' | 'mrwhite';

export interface Player {
    id: string;
    name: string;
    role: PlayerRole;
    word: string | null;
    isAlive: boolean;
    hasRevealed: boolean;
}

export type GamePhase = 'home' | 'setup' | 'reveal' | 'discussion' | 'vote' | 'end';

export interface GameState {
    phase: GamePhase;
    players: Player[];
    wordPair: WordPair | null;
    turnOrder: string[]; // Player IDs in randomized order
    currentRound: number;
    eliminatedPlayers: Player[];
    winner: 'civils' | 'intrus' | null;
}

export interface VictoryCondition {
    isGameOver: boolean;
    winner: 'civils' | 'intrus' | null;
    message: string;
}
