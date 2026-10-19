# 📊 API Observatoire Citoyen

API REST pour accéder aux données de la dette publique française, des présidents et du réseau d'influence.

## 🚀 Démarrage rapide

### Installation

```bash
cd backend
npm install
```

### Lancement

```bash
# Mode production
npm start

# Mode développement (auto-reload)
npm run dev
```

L'API sera accessible sur `http://localhost:3001`

## 📚 Documentation des endpoints

### 🏠 Base

#### `GET /`
Informations sur l'API et liste de tous les endpoints disponibles.

**Réponse :**
```json
{
  "message": "Bienvenue sur l'API Observatoire Citoyen",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

## 💰 Dette Publique

### `GET /api/debt/current`
Récupère la dette publique actuelle en temps réel.

**Réponse :**
```json
{
  "debt": 3342567891234,
  "debtFormatted": "3 342 567 891 234",
  "debtPerSecond": 2733,
  "timestamp": "2026-10-19T15:30:00.000Z",
  "referenceDate": "2024-01-01T00:00:00.000Z",
  "referenceDebt": 3100000000000
}
```

### `GET /api/debt/stats`
Statistiques complètes sur la dette publique.

**Réponse :**
```json
{
  "currentDebt": 3342567891234,
  "population": 67800000,
  "activePopulation": 30500000,
  "gdp": 2950000000000,
  "annualInterest": 52000000000,
  "calculations": {
    "debtPerCapita": 49301,
    "debtPerActive": 109592,
    "debtToGdpPercent": "113.31",
    "debtPerMinute": 163980,
    "debtPerHour": 9838800,
    "debtPerDay": 236131200,
    "debtPerYear": 86217888000
  }
}
```

### `GET /api/debt/historical`
Données historiques de la dette de 2014 à 2023.

**Réponse :**
```json
{
  "data": [
    {
      "year": 2014,
      "debt": 2037000000000,
      "gdpRatio": 94.9
    },
    ...
  ],
  "summary": {
    "startYear": 2014,
    "endYear": 2023,
    "startDebt": 2037000000000,
    "endDebt": 3100000000000,
    "totalIncrease": 1063000000000,
    "percentIncrease": "52.18"
  }
}
```

### `GET /api/debt/projections?years=5`
Projections de la dette pour les années futures.

**Paramètres :**
- `years` (optionnel, défaut: 5) - Nombre d'années à projeter

**Réponse :**
```json
{
  "baseDebt": 3342567891234,
  "baseYear": 2026,
  "projections": [
    {
      "year": 2027,
      "projectedDebt": 3428785779234,
      "projectedGdpRatio": "116.23"
    },
    ...
  ]
}
```

---

## 👑 Présidents

### `GET /api/presidents?sortBy=debtIncrease&order=desc`
Liste de tous les présidents depuis 1947.

**Paramètres :**
- `sortBy` (optionnel) - Critère de tri : `startYear`, `debtIncrease`, `debtPerYear`, `years`
- `order` (optionnel) - Ordre : `asc` ou `desc`

**Réponse :**
```json
{
  "count": 10,
  "presidents": [
    {
      "id": 10,
      "name": "Emmanuel Macron",
      "party": "LREM puis RE (Centre)",
      "period": "2017-2026 (en cours)",
      "years": 9.4,
      "debtStart": 2260000000000,
      "debtEnd": 3342000000000,
      "debtIncrease": 1082000000000,
      "debtPerYear": 115106382979,
      "gdpRatioStart": 98,
      "gdpRatioEnd": 116,
      "context": "COVID-19, crise énergétique, inflation",
      "image": "⚡"
    },
    ...
  ],
  "summary": {
    "totalDebtAccumulated": 3082000000000,
    "averageDebtPerYear": 44571428571,
    "periodCovered": "1947-2026"
  }
}
```

### `GET /api/presidents/:id`
Détails d'un président spécifique.

**Exemple :** `/api/presidents/10`

**Réponse :**
```json
{
  "id": 10,
  "name": "Emmanuel Macron",
  "party": "LREM puis RE (Centre)",
  "period": "2017-2026 (en cours)",
  "years": 9.4,
  "debtStart": 2260000000000,
  "debtEnd": 3342000000000,
  "debtIncrease": 1082000000000,
  "debtPerYear": 115106382979,
  "gdpRatioStart": 98,
  "gdpRatioEnd": 116,
  "context": "COVID-19, crise énergétique, inflation",
  "image": "⚡"
}
```

### `GET /api/presidents/ranking/:field`
Classement des présidents selon un critère.

**Critères valides :**
- `debtIncrease` - Dette totale accumulée
- `debtPerYear` - Dette par an
- `gdpRatioEnd` - Ratio dette/PIB final
- `years` - Durée du mandat

**Exemple :** `/api/presidents/ranking/debtIncrease`

**Réponse :**
```json
{
  "field": "debtIncrease",
  "ranking": [
    {
      "rank": 1,
      "name": "Emmanuel Macron",
      "period": "2017-2026 (en cours)",
      "value": 1082000000000,
      "party": "LREM puis RE (Centre)"
    },
    ...
  ]
}
```

---

## 🔗 Réseau d'Influence

### `GET /api/network`
Toutes les données du réseau d'influence (think tanks, milliardaires, médias).

**Réponse :**
```json
{
  "thinktanks": [...],
  "billionaires": [...],
  "media": [...],
  "summary": {
    "totalThinktanks": 9,
    "totalBillionaires": 11,
    "totalMedia": 11
  }
}
```

### `GET /api/network/thinktanks`
Liste des think tanks.

**Réponse :**
```json
{
  "count": 9,
  "thinktanks": [
    {
      "id": "montaigne",
      "name": "Institut Montaigne",
      "type": "thinktank",
      "orientation": "Centre-droit, libéral",
      "budget": "5.5 millions €",
      ...
    },
    ...
  ]
}
```

### `GET /api/network/billionaires`
Liste des milliardaires influents.

**Réponse :**
```json
{
  "count": 11,
  "billionaires": [
    {
      "id": "arnault",
      "name": "Bernard Arnault",
      "type": "billionaire",
      "fortune": "211 milliards $ (2023)",
      "company": "LVMH",
      ...
    },
    ...
  ]
}
```

### `GET /api/network/media`
Liste des médias.

**Réponse :**
```json
{
  "count": 11,
  "media": [
    {
      "id": "les-echos",
      "name": "Les Échos / Le Parisien",
      "type": "media",
      "mediaType": "Presse écrite, numérique",
      "owner": "Bernard Arnault (LVMH)",
      ...
    },
    ...
  ]
}
```

### `GET /api/network/entity/:id`
Détails d'une entité spécifique (think tank, milliardaire ou média).

**Exemple :** `/api/network/entity/montaigne`

**Réponse :**
```json
{
  "type": "thinktank",
  "entity": {
    "id": "montaigne",
    "name": "Institut Montaigne",
    "type": "thinktank",
    "orientation": "Centre-droit, libéral",
    ...
  }
}
```

---

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du dossier `backend` :

```env
PORT=3001
```

### CORS

L'API est configurée pour accepter les requêtes de toutes les origines. Pour restreindre l'accès :

```javascript
app.use(cors({
  origin: 'https://observatoire-citoyen.netlify.app'
}));
```

---

## 📦 Déploiement

### Avec Node.js

```bash
npm install
npm start
```

### Avec Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

```bash
docker build -t observatoire-api .
docker run -p 3001:3001 observatoire-api
```

### Sur des plateformes cloud

- **Heroku** : Créer un `Procfile` avec `web: node server.js`
- **Railway** : Push directement depuis GitHub
- **Render** : Sélectionner le dossier `backend` et définir `npm start`
- **Vercel/Netlify** : Configurer comme fonction serverless

---

## 🧪 Tests

### Tester avec curl

```bash
# Dette actuelle
curl http://localhost:3001/api/debt/current

# Liste des présidents
curl http://localhost:3001/api/presidents

# Classement par dette
curl http://localhost:3001/api/presidents/ranking/debtIncrease

# Réseau d'influence
curl http://localhost:3001/api/network
```

### Tester avec un navigateur

Ouvrez simplement : `http://localhost:3001/api/debt/current`

---

## 📝 Licence

MIT
