# 📱 Installation de l'Application Undercover (PWA)

## 🍎 Installation sur iOS (iPhone/iPad)

1. **Ouvrir dans Safari**
   - Ouvrez Safari sur votre iPhone ou iPad
   - Accédez à l'URL de l'application (ex: `https://undercover.app` ou `http://localhost:3000` pour le dev)

2. **Ajouter à l'écran d'accueil**
   - Appuyez sur le bouton de partage (icône carré avec flèche vers le haut) en bas de l'écran
   - Faites défiler et appuyez sur **"Sur l'écran d'accueil"** (ou "Add to Home Screen")
   - Personnalisez le nom si vous le souhaitez (par défaut: "Undercover")
   - Appuyez sur **"Ajouter"** en haut à droite

3. **Lancer l'application**
   - L'icône Undercover apparaît maintenant sur votre écran d'accueil
   - Appuyez sur l'icône pour lancer l'app en mode plein écran (standalone)
   - L'app s'ouvrira sans barre Safari, comme une vraie application native

## 🤖 Installation sur Android

### Via Chrome
1. **Ouvrir dans Chrome**
   - Ouvrez Chrome sur votre appareil Android
   - Accédez à l'URL de l'application

2. **Installer l'application**
   - Chrome affichera automatiquement une bannière "Ajouter Undercover à l'écran d'accueil"
   - Appuyez sur **"Installer"** ou **"Ajouter"**
   
   **OU** via le menu:
   - Appuyez sur le menu (⋮) en haut à droite
   - Sélectionnez **"Installer l'application"** ou **"Ajouter à l'écran d'accueil"**
   - Confirmez l'installation

3. **Lancer l'application**
   - L'icône Undercover apparaît sur votre écran d'accueil
   - Appuyez dessus pour lancer l'app en mode standalone

## 💻 Fonctionnalités PWA

### Mode Standalone
- ✅ L'app s'ouvre en **plein écran** sans barre de navigation
- ✅ Barre de statut translucide pour une immersion maximale
- ✅ Icône personnalisée sur l'écran d'accueil
- ✅ Expérience similaire à une app native

### Mode Offline (Service Worker)
- ✅ Fonctionne sans connexion internet une fois installée
- ✅ Cache intelligent des assets statiques
- ✅ Mise à jour automatique en arrière-plan

### Optimisations Mobile
- ✅ Orientation portrait verrouillée (idéal pour le jeu)
- ✅ Pas de zoom intempestif (user-scalable=no)
- ✅ Thème de couleur violet/bleu
- ✅ Splash screen automatique avec l'icône de l'app

## 🎨 Icône de l'Application

L'icône utilise:
- **Design**: Détective avec fond dégradé violet-bleu
- **Tailles**: 192x192px et 512x512px (adaptées à tous les écrans)
- **Format**: PNG avec support maskable pour Android

## 🔧 Configuration Technique

### Manifest.json
```json
{
  "name": "Undercover - Jeu de Société",
  "short_name": "Undercover",
  "display": "standalone",
  "background_color": "#0F172A",
  "theme_color": "#8B5CF6",
  "orientation": "portrait"
}
```

### Meta Tags Clés
```html
<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- Android -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#8B5CF6">
```

## 🚀 Déploiement

Pour déployer la PWA en production:

### Option 1: Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Option 2: Netlify
1. Connectez votre repo GitHub
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Déployez !

### Option 3: Serveur personnel
```bash
# Build de production
npm run build

# Démarrer
npm start
```

## 📱 Vérification PWA

Pour vérifier que votre PWA est correctement configurée:

1. **Chrome DevTools**
   - Ouvrez Chrome DevTools (F12)
   - Allez dans l'onglet **"Application"**
   - Vérifiez:
     - Manifest présent et valide
     - Service Worker enregistré
     - Icônes présentes
     - Mode standalone détecté

2. **Lighthouse Audit**
   - Dans Chrome DevTools, onglet **"Lighthouse"**
   - Cochez "Progressive Web App"
   - Lancez l'audit
   - Score cible: **> 90/100**

## 🎯 Critères PWA Validés

✅ **Installable**: Manifest + icônes + HTTPS (en production)  
✅ **Mode Standalone**: Affichage plein écran  
✅ **Responsive**: Fonctionne sur tous les écrans  
✅ **Offline**: Service Worker avec cache  
✅ **Performance**: Next.js optimisé  
✅ **Icônes**: 192px et 512px (maskable)  

## 🔒 HTTPS Requis

⚠️ **Important**: En production, la PWA nécessite HTTPS pour fonctionner (sauf localhost).

Les hébergeurs comme Vercel et Netlify fournissent HTTPS automatiquement.

## 💡 Astuces

### Tester en local
- L'app fonctionne en PWA même sur `localhost:3000`
- Testez l'installation sur votre téléphone en utilisant l'IP locale:
  ```bash
  # Trouver votre IP locale (affichée par npm run dev)
  # Exemple: http://192.168.1.74:3000
  ```

### Désinstallation
- **iOS**: Maintenez l'icône → "Supprimer l'app"
- **Android**: Maintenez l'icône → "Désinstaller"

## ❓ Dépannage

### L'installation ne s'affiche pas
1. Vérifiez que vous êtes en HTTPS (ou localhost)
2. Vérifiez que le manifest.json est accessible à `/manifest.json`
3. Effacez le cache du navigateur
4. Vérifiez la console pour les erreurs

### L'icône n'apparaît pas
1. Vérifiez que les fichiers sont dans `/public/icons/`
2. Vérifiez les chemins dans le manifest.json
3. Rechargez la page

### Le mode offline ne fonctionne pas
1. Vérifiez que le Service Worker est enregistré (DevTools > Application)
2. Forcez la mise à jour du SW
3. Vérifiez que les URLs sont bien en cache

## 📞 Support

Pour toute question, consultez:
- [Documentation PWA](https://web.dev/progressive-web-apps/)
- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
