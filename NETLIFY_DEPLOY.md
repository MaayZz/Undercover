# 🚀 Déploiement sur Netlify

Ce document explique comment déployer l'application Undercover sur Netlify.

## ⚙️ Configuration des Variables d'Environnement

### 1. Dans Netlify Dashboard

1. Allez sur votre site dans Netlify
2. **Site settings** → **Build & deploy** → **Environment**
3. Cliquez sur **"Add a variable"**
4. Ajoutez les variables suivantes :

```
NEXT_PUBLIC_SUPABASE_URL=https://dylpaumlhmjvjwocutdx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bHBhdW1saG1qdmp3b2N1dGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODU3MjEsImV4cCI6MjA1MTA2MTcyMX0.W6vFy8vqKM_2jLrS_LqzADYH8GU94QOu7UUXMwF--S0
```

⚠️ **Important** : Ces variables doivent commencer par `NEXT_PUBLIC_` pour être accessibles côté client.

### 2. Via Netlify CLI (Alternative)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Lier le projet
netlify link

# Définir les variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://dylpaumlhmjvjwocutdx.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bHBhdW1saG1qdmp3b2N1dGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0ODU3MjEsImV4cCI6MjA1MTA2MTcyMX0.W6vFy8vqKM_2jLrS_LqzADYH8GU94QOu7UUXMwF--S0"
```

## 📦 Configuration Build

Le fichier `netlify.toml` devrait contenir :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 🔨 Build Local Test

Avant de déployer, testez le build localement :

```bash
# Build de production
npm run build

# Tester le build
npm start
```

## 🚀 Déploiement

### Option 1 : Git Push (Automatique)

```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

Netlify détectera automatiquement le push et déclenchera un build.

### Option 2 : Netlify CLI

```bash
# Déploiement draft
netlify deploy

# Déploiement en production
netlify deploy --prod
```

### Option 3 : Netlify Dashboard

1. Allez dans **Deploys**
2. Cliquez sur **"Trigger deploy"**
3. Sélectionnez **"Deploy site"**

## ✅ Vérification Post-Déploiement

Après le déploiement :

1. ✅ Vérifiez que l'app se charge correctement
2. ✅ Testez la connexion Supabase (démarrer une partie)
3. ✅ Vérifiez que la PWA est installable
4. ✅ Testez sur mobile

## 🐛 Dépannage

### Erreur: "supabaseUrl is required"

**Cause** : Variables d'environnement manquantes.

**Solution** :
1. Vérifiez que les variables sont bien configurées dans Netlify
2. Assurez-vous qu'elles commencent par `NEXT_PUBLIC_`
3. Redéployez après avoir ajouté les variables

### Erreur: Build failed

**Vérifier** :
```bash
# Localement
npm run build

# Si ça marche localement mais pas sur Netlify
# Vérifiez Node version dans netlify.toml:
```

Ajoutez dans `netlify.toml` :
```toml
[build.environment]
  NODE_VERSION = "18"
```

### Problème de Cache

```bash
# Dans Netlify Dashboard
# Deploys → Options → Clear cache and retry deploy
```

## 📱 PWA sur Netlify

La PWA fonctionnera automatiquement grâce à :
- ✅ Manifest.json servi statiquement
- ✅ Service Worker dans `/public/sw.js`
- ✅ HTTPS fourni par Netlify
- ✅ Meta tags PWA dans le layout

## 🔐 Sécurité

⚠️ **Ne commitez JAMAIS les clés Supabase dans le repo !**

- Utilisez uniquement les variables d'environnement Netlify
- La clé `ANON_KEY` est publique et sécurisée par les RLS de Supabase
- Pour une sécurité supplémentaire, configurez les RLS (Row Level Security) dans Supabase

## 🌐 Custom Domain

Pour ajouter un domaine personnalisé :

1. **Netlify Dashboard** → **Domain settings**
2. **Add custom domain**
3. Suivez les instructions pour configurer les DNS
4. Attendez la propagation DNS (peut prendre jusqu'à 48h)
5. Netlify fournira automatiquement un certificat SSL

## 📊 Analytics & Monitoring

Netlify fournit :
- ✅ Analytics intégrés
- ✅ Build logs
- ✅ Deploy previews pour les PR
- ✅ Rollback facile

---

## 🎉 C'est tout !

Votre app Undercover devrait maintenant être déployée et accessible via votre URL Netlify !

URL par défaut : `https://[votre-site-name].netlify.app`
