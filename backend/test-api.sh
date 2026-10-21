#!/bin/bash

# Script de test de l'API Dette Française
# Usage: ./test-api.sh <URL_API>
# Exemple: ./test-api.sh https://observatoire-citoyen-api.onrender.com

if [ -z "$1" ]; then
  echo "❌ Usage: $0 <URL_API>"
  echo "   Exemple: $0 https://observatoire-citoyen-api.onrender.com"
  exit 1
fi

API_URL=$1
echo "🧪 Test de l'API: $API_URL"
echo "================================"
echo ""

# Test 1: Page d'accueil
echo "📄 Test 1/4: Page d'accueil (GET /)"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Status: $HTTP_CODE OK"
  echo "   Message: $(echo $BODY | grep -o '"message":"[^"]*"' | cut -d'"' -f4)"
else
  echo "❌ Status: $HTTP_CODE FAILED"
  exit 1
fi
echo ""

# Test 2: Dette actuelle
echo "💰 Test 2/4: Dette actuelle (GET /api/debt/current)"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/api/debt/current")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Status: $HTTP_CODE OK"
  DEBT=$(echo $BODY | grep -o '"debtFormatted":"[^"]*"' | cut -d'"' -f4)
  DEBT_PS=$(echo $BODY | grep -o '"debtPerSecond":[0-9]*' | cut -d':' -f2)
  echo "   Dette actuelle: $DEBT €"
  echo "   Dette par seconde: $DEBT_PS €/s"
else
  echo "❌ Status: $HTTP_CODE FAILED"
  echo "   Response: $BODY"
  exit 1
fi
echo ""

# Test 3: Statistiques
echo "📊 Test 3/4: Statistiques (GET /api/debt/stats)"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/api/debt/stats")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Status: $HTTP_CODE OK"
  echo "   Statistiques récupérées avec succès"
else
  echo "❌ Status: $HTTP_CODE FAILED"
  exit 1
fi
echo ""

# Test 4: Présidents
echo "🏛️  Test 4/4: Présidents (GET /api/presidents)"
RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL/api/presidents")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Status: $HTTP_CODE OK"
  COUNT=$(echo $BODY | grep -o '"count":[0-9]*' | cut -d':' -f2)
  echo "   Nombre de présidents: $COUNT"
else
  echo "❌ Status: $HTTP_CODE FAILED"
  exit 1
fi
echo ""

# Résumé
echo "================================"
echo "🎉 TOUS LES TESTS SONT PASSÉS !"
echo "================================"
echo ""
echo "✅ L'API est fonctionnelle et prête à être utilisée"
echo "✅ URL à utiliser dans le bot: $API_URL"
echo ""
echo "📝 Prochaine étape:"
echo "   Mettez à jour votre bot avec cette URL:"
echo "   const API_URL = \"$API_URL\";"
echo ""
