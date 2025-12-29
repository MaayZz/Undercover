import Script from 'next/script';

export default function PWAHead() {
    return (
        <>
            {/* Meta tags pour PWA qui ne sont pas supportés par Next.js metadata */}
            <meta name="application-name" content="Undercover" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* iOS PWA Meta Tags */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Undercover" />

            {/* Liens PWA */}
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* Favicons */}
            <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />

            {/* Theme colors */}
            <meta name="theme-color" content="#8B5CF6" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0F172A" />
        </>
    );
}
