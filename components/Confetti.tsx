'use client';

import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
    active: boolean;
    onComplete?: () => void;
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const confettiPieces: Array<{
            x: number;
            y: number;
            w: number;
            h: number;
            color: string;
            rotation: number;
            speed: number;
            vx: number;
            vy: number;
            rotationSpeed: number;
        }> = [];

        const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981'];

        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -10,
                w: Math.random() * 10 + 5,
                h: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                speed: Math.random() * 3 + 2,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 + 3,
                rotationSpeed: Math.random() * 10 - 5,
            });
        }

        let animationFrame: number;
        let startTime = Date.now();
        const duration = 3000; // 3 seconds

        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confettiPieces.forEach((piece) => {
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate((piece.rotation * Math.PI) / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
                ctx.restore();

                piece.y += piece.vy;
                piece.x += piece.vx;
                piece.rotation += piece.rotationSpeed;
                piece.vy += 0.1; // gravity
            });

            // Check if animation should continue
            if (Date.now() - startTime < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                onComplete?.();
            }
        }

        animate();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [active, onComplete]);

    if (!active) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
