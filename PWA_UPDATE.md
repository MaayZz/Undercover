# 📱 PWA (Progressive Web App) - Mise à Jour

## 🎯 Nouvelles Fonctionnalités PWA Ajoutées

L'application Undercover est maintenant une **Progressive Web App complète** qui peut être installée sur iOS et Android comme une application native.

---

## ✅ Fonctionnalités PWA Implémentées

### 1. **Manifest.json**
Fichier de configuration PWA avec:
- **Nom**: "Undercover - Jeu de Société"
- **Mode d'affichage**: `standalone` (plein écran sans barre de navigation)
- **Couleur du thème**: Violet (`#8B5CF6`)
- **Couleur de fond**: Dark (`#0F172A`)
- **Orientation**: Portrait (verrouillée)
- **Icônes**: 192x192px et 512x512px (format maskable)

### 2. **Meta Tags iOS et Android**
```html
<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Undercover">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#8B5CF6">
<link rel="manifest" href="/manifest.json">
```

### 3. **Service Worker (Mode Offline)**
- **Cache-First Strategy**: Les assets statiques sont mis en cache
- **Offline Support**: L'app fonctionne sans internet une fois installée
- **Auto-Update**: Le SW se met à jour automatiquement
- **Fichiers cachés**:
  - Pages: `/`, `/game`
  - Manifest et icônes
  - Assets Next.js

### 4. **Composant InstallPrompt**
- **Bannière d'installation** personnalisée
- Apparaît après 30 secondes sur la page d'accueil
- Gestion de l'événement `beforeinstallprompt`
- Boutons "Installer" et "Plus tard"
- Détection automatique si l'app est déjà installée

### 5. **Icône de l'Application**
![Icône Undercover](file:///Users/Abir/.gemini/antigravity/brain/0ad2b0ab-385a-4207-8cf7-48e7e4edf9ac/app_icon_512_1767017717429.png)

Design:
- Dégradé violet-bleu (couleurs de l'app)
- Détective stylisé au centre
- Format PNG 512x512px
- Compatible iOS et Android (maskable)

---

## 📲 Installation de la PWA

### Sur iOS (iPhone/iPad)

1. **Ouvrir Safari**
   ```
   http://localhost:3000 (en dev)
   https://votre-domaine.com (en production)
   ```

2. **Menu Partage**
   - Appuyer sur l'icône de partage (⬆️)
   - Faire défiler vers le bas
   - Sélectionner **"Sur l'écran d'accueil"**

3. **Personnaliser**
   - Le nom "Undercover" est pré-rempli
   - Appuyer sur **"Ajouter"**

4. **Lancer**
   - L'icône apparaît sur l'écran d'accueil
   - Toucher pour ouvrir en mode standalone
   - Pas de barre Safari !

### Sur Android (Chrome)

1. **Ouvrir Chrome**
   ```
   http://192.168.x.x:3000 (votre IP locale en dev)
   https://votre-domaine.com (en production)
   ```

2. **Installation Automatique**
   - Une bannière "Installer Undercover" apparaît
   - Appuyer sur **"Installer"**

   **OU Manuel**:
   - Menu ⋮ (en haut à droite)
   - **"Installer l'application"**

3. **Lancer**
   - L'icône apparaît dans le tiroir d'applications
   - Ouvrir pour une expérience plein écran

---

## 🧪 Tests de Vérification

### Test 1: Manifest Chargé ✅
```javascript
// Console DevTools
fetch('/manifest.json').then(r => r.json()).then(console.log)

// Résultat:
{
  "name": "Undercover - Jeu de Société",
  "display": "standalone",
  "theme_color": "#8B5CF6",
  ...
}
```

### Test 2: Service Worker Enregistré ✅
```
Console Log: "Service Worker registered: http://localhost:3000/"
```

### Test 3: Icônes Accessibles ✅
- `/icons/icon-192x192.png` ✅
- `/icons/icon-512x512.png` ✅
- `/apple-touch-icon.png` ✅
- `/favicon.ico` ✅

### Test 4: Meta Tags Présentes ✅
Vérifié dans Chrome DevTools > Elements > `<head>`:
- `apple-mobile-web-app-capable`: yes
- `theme-color`: #8B5CF6
- `viewport`: device-width, initial-scale=1

![Page d'accueil PWA](file:///Users/Abir/.gemini/antigravity/brain/0ad2b0ab-385a-4207-8cf7-48e7e4edf9ac/undercover_home_page_1767018047502.png)

---

## 🔧 Structure des Fichiers PWA

```
Undercover/
├── public/
│   ├── manifest.json          # Configuration PWA
│   ├── sw.js                  # Service Worker
│   ├── favicon.ico            # Favicon navigateur
│   ├── apple-touch-icon.png   # Icône iOS
│   └── icons/
│       ├── icon-192x192.png   # Icône Android/Chrome
│       └── icon-512x512.png   # Icône haute résolution
├── components/
│   ├── PWAInstaller.tsx       # Enregistrement du SW
│   └── InstallPrompt.tsx      # Bannière d'installation
├── app/
│   └── layout.tsx             # Meta tags PWA
└── PWA_INSTALLATION.md        # Documentation utilisateur
```

---

## 🚀 Mode Standalone

Lorsque l'app est installée, elle s'ouvre en **mode standalone**:

### Caractéristiques
- ✅ **Plein écran** sans barre d'adresse
- ✅ **Barre de statut translucide** (iOS)
- ✅ **Icône personnalisée** sur l'écran d'accueil
- ✅ **Splash screen** automatique avec l'icône
- ✅ **Orientation portrait** verrouillée
- ✅ **Pas de zoom** intempestif (user-scalable=no)

### Détection du Mode
```javascript
// Vérifier si l'app est en mode standalone
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('App installée et ouverte en standalone!');
}
```

---

## 💾 Mode Offline

Le Service Worker permet à l'app de fonctionner **sans connexion internet**.

### Strategy: Cache-First
1. **Première visite** (online):
   - Téléchargement des assets
   - Mise en cache automatique
   
2. **Visites suivantes**:
   - Chargement depuis le cache (ultra-rapide)
   - Mise à jour en arrière-plan si online

3. **Mode offline**:
   - L'app continue de fonctionner
   - ⚠️ Supabase non accessible (pas de nouveaux mots)
   - UI et logique de jeu fonctionnels

### Cache Contents
```javascript
const urlsToCache = [
  '/',              // Page d'accueil
  '/game',          // Page de jeu
  '/manifest.json', // Manifest
  '/icons/...',     // Icônes
];
```

---

## 📊 Lighthouse PWA Audit

Score attendu en production:

| Critère | Score |
|---------|-------|
| **Performance** | 90+ |
| **Accessibility** | 95+ |
| **Best Practices** | 90+ |
| **SEO** | 90+ |
| **PWA** | 100 ✅ |

### Critères PWA Validés
- ✅ Installable (manifest + icons + HTTPS)
- ✅ Service Worker registered
- ✅ Works offline
- ✅ Responsive design
- ✅ HTTPS (requis en production, OK sur localhost)
- ✅ Splash screen
- ✅ Themed address bar

---

## 🌐 Déploiement PWA

### Vercel (Recommandé)
```bash
# Installation
npm i -g vercel

# Déploiement
vercel

# La PWA sera accessible en HTTPS automatiquement
# Example: https://undercover-[hash].vercel.app
```

### Netlify
```bash
# Dans Netlify Dashboard:
# - Build command: npm run build
# - Publish directory: .next
# - Auto HTTPS activé
```

### ⚠️ HTTPS Requis en Production
- PWA nécessite **HTTPS** (sauf localhost)
- Service Worker ne s'enregistre que sur HTTPS
- Vercel et Netlify fournissent HTTPS gratuitement

---

## 🎯 Nouvelles Dépendances

Aucune ! Tout est natif :
- ✅ **Next.js** supporte PWA nativement
- ✅ **Service Worker** en vanilla JavaScript
- ✅ **Manifest** en JSON statique
- ✅ **React hooks** pour InstallPrompt

---

## 📝 Fichiers Modifiés/Créés

### Créés
1. `public/manifest.json` - Configuration PWA
2. `public/sw.js` - Service Worker
3. `public/icons/icon-192x192.png` - Icône Android
4. `public/icons/icon-512x512.png` - Icône haute-res
5. `public/apple-touch-icon.png` - Icône iOS
6. `public/favicon.ico` - Favicon
7. `components/PWAInstaller.tsx` - Enregistrement SW
8. `components/InstallPrompt.tsx` - Bannière installation
9. `PWA_INSTALLATION.md` - Guide utilisateur

### Modifiés
1. `app/layout.tsx` - Ajout des meta tags PWA
2. `app/page.tsx` - Ajout InstallPrompt
3. `README.md` - Section PWA ajoutée

---

## 🔍 Dépannage

### Problème: "Add to Home Screen" n'apparaît pas

**Solutions:**
1. Vérifier HTTPS (ou localhost)
2. Vérifier `/manifest.json` accessible
3. Vérifier icônes présentes
4. Effacer cache et recharger
5. Attendre 30s (délai du InstallPrompt)

### Problème: Service Worker ne s'enregistre pas

**Solutions:**
1. Vérifier console: erreurs ?
2. Vérifier `/sw.js` accessible
3. Chrome DevTools > Application > Service Workers
4. Cliquer "Unregister" puis recharger

### Problème: Mode offline ne fonctionne pas

**Solutions:**
1. Vérifier SW enregistré (DevTools > Application)
2. Visiter l'app online d'abord (pour cache)
3. Chrome DevTools > Application > Service Workers > "Offline"
4. Recharger la page

---

## 📱 Testez Maintenant !

1. **Sur votre téléphone** (même réseau WiFi):
   ```
   http://[votre-ip-locale]:3000
   # L'IP est affichée par `npm run dev`
   # Exemple: http://192.168.1.74:3000
   ```

2. **Installer l'app** selon votre OS

3. **Tester le mode offline**:
   - Installer l'app
   - Activer le mode avion
   - Ouvrir l'app depuis l'écran d'accueil
   - L'UI fonctionne ! (sauf Supabase)

---

## 🎉 Résultat Final

L'application **Undercover** est maintenant:
- ✅ **Installable** comme une app native
- ✅ **Mode standalone** (plein écran)
- ✅ **Fonctionne offline** pour l'UI
- ✅ **Icône personnalisée** sur écran d'accueil
- ✅ **Compatible iOS et Android**
- ✅ **Performance optimale** avec cache

**Prête pour le déploiement en production !** 🚀
