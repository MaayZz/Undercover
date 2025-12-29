'use client';

import React, { useState } from 'react';
import Button from './Button';

interface MrWhiteGuessModalProps {
    isOpen: boolean;
    civilWord: string;
    onGuess: (guess: string, isCorrect: boolean) => void;
}

export default function MrWhiteGuessModal({
    isOpen,
    civilWord,
    onGuess,
}: MrWhiteGuessModalProps) {
    const [guess, setGuess] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isCorrect = guess.trim().toLowerCase() === civilWord.trim().toLowerCase();
        onGuess(guess, isCorrect);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="text-center mb-6">
                    <div className="text-6xl mb-4">❓</div>
                    <h2 className="text-2xl font-bold gradient-text mb-2">
                        Mr. White a été éliminé !
                    </h2>
                    <p className="text-white/70">
                        Il a une dernière chance de deviner le mot des civils...
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="guess" className="block text-white/70 text-sm mb-2">
                            Entrez votre proposition :
                        </label>
                        <input
                            id="guess"
                            type="text"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            placeholder="Votre mot..."
                            className="input-field"
                            autoFocus
                            required
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                        🎯 Valider
                    </Button>
                </form>
            </div>
        </div>
    );
}
