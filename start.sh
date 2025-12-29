#!/bin/bash

# Script d'installation et de démarrage pour Undercover
# Ce script contourne les problèmes de permissions npm

echo "🎮 Installation de l'application Undercover..."
echo ""

# Vérifier si node_modules existe déjà
if [ -d "node_modules" ]; then
  echo "✅ Les dépendances sont déjà installées"
else
  echo "📦 Installation des dépendances..."
  echo ""
  echo "⚠️  Si vous rencontrez des erreurs de permissions npm, exécutez d'abord :"
  echo "   sudo chown -R \$(whoami) ~/.npm"
  echo ""
  npm install
fi

echo ""
echo "🚀 Démarrage du serveur de développement..."
echo ""
echo "📱 Ouvrez http://localhost:3000 dans votre navigateur"
echo ""

npm run dev
