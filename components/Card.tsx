import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            className={`glass-card p-6 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
