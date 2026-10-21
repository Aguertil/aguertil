# API Observatoire Citoyen - Backend

API REST pour l'Observatoire Citoyen - Dette publique française en temps réel.

## 🚀 Déploiement sur Render.com

### Prérequis
- Compte GitHub avec le repository `aguertil/aguertil`
- Compte Render.com (gratuit)

### Étapes de déploiement

1. **Connectez-vous à Render.com**
   - Allez sur [https://render.com](https://render.com)
   - Connectez-vous avec votre compte GitHub

2. **Créer un nouveau Web Service**
   - Cliquez sur "New +" → "Web Service"
   - Sélectionnez le repository `aguertil/aguertil`
   - Autorisez l'accès si demandé

3. **Configuration du service**
   - **Name**: `observatoire-citoyen-api` (ou un nom de votre choix)
   - **Region**: Europe (Frankfurt) ou autre
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Variables d'environnement** (optionnel)
   - `NODE_ENV`: `production`

5. **Déployer**
   - Cliquez sur "Create Web Service"
   - Le déploiement prendra 2-3 minutes
   - Vous obtiendrez une URL du type: `https://observatoire-citoyen-api.onrender.com`

### 🔍 Test de l'API

Une fois déployée, testez l'endpoint principal:

```bash
curl https://votre-url.onrender.com/api/debt/current
```

Réponse attendue:
```json
{
  "debt": 3234567890123,
  "debtFormatted": "3 234 567 890 123",
  "debtPerSecond": 2733,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "referenceDate": "2024-01-01T00:00:00.000Z",
  "referenceDebt": 3100000000000
}
```

### 📡 Endpoints disponibles

- `GET /` - Documentation de l'API
- `GET /api/debt/current` - Dette actuelle en temps réel
- `GET /api/debt/stats` - Statistiques détaillées
- `GET /api/debt/historical` - Données historiques
- `GET /api/debt/projections` - Projections futures

Et bien d'autres (présidents, promesses, réseau d'influence, blog...)

### ⚠️ Limitations du plan gratuit

- **750 heures/mois** de fonctionnement
- **Mise en veille** après 15 minutes d'inactivité
- **Premier appel après veille**: ~30 secondes (temps de redémarrage)
- **Appels suivants**: <100ms

### 🔄 Redéploiement automatique

Render redéploie automatiquement à chaque push sur la branche `main` du repository GitHub.

Pour forcer un redéploiement manuel:
1. Allez dans le dashboard Render
2. Sélectionnez votre service
3. Cliquez sur "Manual Deploy" → "Deploy latest commit"

### 📊 Monitoring

Dashboard Render vous donne accès à:
- Logs en temps réel
- Métriques de performance
- Historique des déploiements
- Statut du service

### 🛠️ Développement local

```bash
# Installation
npm install

# Démarrage
npm start

# Développement avec auto-reload
npm run dev
```

L'API sera disponible sur `http://localhost:3001`

### 🔗 Utilisation dans le bot

Une fois déployé, remplacez l'URL locale dans votre bot par l'URL Render:

```javascript
// Avant
const API_URL = "http://localhost:3001";

// Après
const API_URL = "https://observatoire-citoyen-api.onrender.com";
```

### 💡 Alternatives

Si Render ne convient pas:
- **Railway.app**: 500h/mois, pas de mise en veille, nécessite CB
- **Fly.io**: 3 machines gratuites, plus complexe à configurer
- **Netlify Functions**: Serverless, nécessite refactoring

## 📞 Support

En cas de problème, consultez:
- [Documentation Render](https://render.com/docs)
- [Logs du service](https://dashboard.render.com)
