# 🕵️ Undercover - Jeu de Société

Une application web moderne de jeu de société "Undercover" avec mode **Pass & Play** (un seul appareil partagé).

## ✨ Caractéristiques

- 🎨 **Design moderne** avec dark mode et effets glassmorphiques
- 🎮 **Mode Pass & Play** - Un seul téléphone pour tous les joueurs
- 🔄 **Animations fluides** avec transitions et effets 3D
- 📱 **Mobile-first** - Optimisé pour smartphone
- 🗄️ **Intégration Supabase** - Base de données de mots en ligne
- 🎯 **Logique de jeu complète** avec distribution automatique des rôles
- 📲 **Progressive Web App (PWA)** - Installable sur iOS et Android
- 🚀 **Mode Standalone** - S'ouvre en plein écran sans barre de navigation
- 💾 **Mode Offline** - Fonctionne sans connexion internet une fois installée

## 🎭 Rôles du Jeu

- **👤 Civils** : Reçoivent le mot commun
- **🕵️ Undercover** : Reçoit un mot similaire mais différent
- **❓ Mr. White** : Ne reçoit aucun mot, doit deviner

## 📋 Distribution des Rôles

- **3-4 joueurs** : 1 Undercover
- **5-6 joueurs** : 1 Undercover + 1 Mr. White
- **7+ joueurs** : 2 Undercover + 1 Mr. White

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📲 Installation PWA (Progressive Web App)

L'application peut être installée sur votre écran d'accueil pour une expérience native :

### iOS (Safari)
1. Ouvrez l'app dans Safari
2. Appuyez sur le bouton de partage
3. Sélectionnez "Sur l'écran d'accueil"
4. L'app s'ouvrira en mode plein écran standalone

### Android (Chrome)
1. Chrome affichera automatiquement "Installer l'application"
2. Ou via le menu ⋮ > "Installer l'application"
3. L'app apparaîtra sur votre écran d'accueil

📖 **Documentation complète**: Voir [PWA_INSTALLATION.md](./PWA_INSTALLATION.md)

## ⚙️ Configuration

Créez un fichier `.env.local` avec vos identifiants Supabase :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_publique
```

## 🗄️ Structure de la Base de Données

Table `word_pairs` :
- `id` : Identifiant unique
- `civil_word` : Mot des civils
- `undercover_word` : Mot des undercover
- `category` : Catégorie du mot

## 🎮 Comment Jouer

1. **Configuration** : Ajoutez les noms des joueurs (minimum 3)
2. **Révélation** : Chaque joueur découvre son mot en privé (Pass & Play)
3. **Discussion** : À tour de rôle, donnez des indices sur votre mot
4. **Vote** : Éliminez un joueur suspect
5. **Victoire** : Les civils gagnent si tous les intrus sont éliminés

## 🏆 Conditions de Victoire

### Civils gagnent si :
- Tous les Undercover et Mr. White sont éliminés

### Intrus gagnent si :
- Il ne reste qu'un seul civil
- Mr. White devine correctement le mot des civils

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **Supabase** - Base de données PostgreSQL
- **Framer Motion** - Animations (prêt pour utilisation future)

## 📱 Optimisations Mobile

- Boutons larges (min 44px) pour faciliter le toucher
- Interface responsive et adaptative
- Animations optimisées pour les performances mobiles
- Design en mode portrait pour smartphone

## 🎨 Design System

- **Couleurs primaires** : Violet (#8B5CF6) et Bleu électrique (#3B82F6)
- **Backgrounds** : Dégradés sombres (#0F172A, #1E293B)
- **Effets** : Glassmorphisme avec `backdrop-filter: blur()`
- **Animations** : Slide-in, fade-in, flip 3D, pulse-glow

## 📄 License

Usage personnel uniquement.
