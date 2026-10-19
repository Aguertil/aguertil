#!/bin/bash

# Script de test simple pour l'API Observatoire Citoyen

API_URL="http://localhost:3001"

echo "🧪 Tests de l'API Observatoire Citoyen"
echo "======================================"
echo ""

# Test 1: Page d'accueil
echo "✅ Test 1: Page d'accueil"
curl -s $API_URL | head -5
echo ""
echo ""

# Test 2: Dette actuelle
echo "✅ Test 2: Dette actuelle"
curl -s $API_URL/api/debt/current
echo ""
echo ""

# Test 3: Statistiques dette
echo "✅ Test 3: Statistiques dette"
curl -s $API_URL/api/debt/stats | head -10
echo ""
echo ""

# Test 4: Liste présidents
echo "✅ Test 4: Liste des présidents"
curl -s "$API_URL/api/presidents?sortBy=debtIncrease&order=desc" | head -20
echo ""
echo ""

# Test 5: Classement présidents
echo "✅ Test 5: Classement par dette"
curl -s $API_URL/api/presidents/ranking/debtIncrease | head -15
echo ""
echo ""

# Test 6: Réseau d'influence
echo "✅ Test 6: Réseau d'influence"
curl -s $API_URL/api/network | head -10
echo ""
echo ""

echo "======================================"
echo "✅ Tous les tests sont terminés !"
