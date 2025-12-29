import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    violet: '#8B5CF6',
                    blue: '#3B82F6',
                },
                dark: {
                    900: '#0F172A',
                    800: '#1E293B',
                    700: '#334155',
                },
            },
            animation: {
                'slide-in': 'slideIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.3s ease-out',
                'flip': 'flip 0.6s ease-in-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                flip: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
                },
            },
        },
    },
    plugins: [],
}
export default config
