import type { Metadata, Viewport } from 'next'
import './globals.css'
import PWAInstaller from '@/components/PWAInstaller'

export const metadata: Metadata = {
    title: 'Undercover - Jeu de Société',
    description: 'Un jeu de déduction sociale moderne et fun en mode Pass & Play',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Undercover',
    },
    icons: {
        icon: [
            { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    applicationName: 'Undercover',
    other: {
        'mobile-web-app-capable': 'yes',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#8B5CF6' },
        { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body>
                <PWAInstaller />
                {children}
            </body>
        </html>
    )
}
