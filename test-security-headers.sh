#!/bin/bash

# Test des en-têtes de sécurité HTTP
# Vérifie que tous les en-têtes configurés sont présents

echo "🔒 Test des En-têtes de Sécurité HTTP"
echo "======================================"
echo ""

echo "Récupération des en-têtes depuis http://localhost:3000..."
echo ""

response=$(curl -s -I http://localhost:3000)

echo "$response"
echo ""
echo "-------------------------------------------"
echo "Vérification des en-têtes de sécurité:"
echo "-------------------------------------------"

# Liste des en-têtes attendus
headers=(
  "Strict-Transport-Security"
  "X-Frame-Options"
  "X-Content-Type-Options"
  "X-XSS-Protection"
  "Referrer-Policy"
  "Permissions-Policy"
  "Content-Security-Policy"
)

missing=0
for header in "${headers[@]}"; do
  if echo "$response" | grep -qi "$header"; then
    echo "✅ $header - PRÉSENT"
  else
    echo "❌ $header - MANQUANT"
    missing=$((missing + 1))
  fi
done

echo ""
if [ $missing -eq 0 ]; then
  echo "🎉 Tous les en-têtes de sécurité sont présents !"
else
  echo "⚠️  $missing en-tête(s) manquant(s)"
fi
