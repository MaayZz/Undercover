import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    type = 'button',
}: ButtonProps) {
    const variantClass = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
    }[variant];

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variantClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}
