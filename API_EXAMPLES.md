# 📡 Exemples d'utilisation de l'API Observatoire Citoyen

## 🚀 Démarrage rapide

### 1. Lancer l'API localement

```bash
cd backend
npm install
npm start
```

L'API sera accessible sur `http://localhost:3001`

### 2. Tester avec curl

```bash
# Dette actuelle
curl http://localhost:3001/api/debt/current

# Liste des présidents
curl http://localhost:3001/api/presidents
```

---

## 🌐 Exemples d'intégration

### JavaScript / Fetch API

```javascript
// Récupérer la dette actuelle
async function getCurrentDebt() {
  const response = await fetch('http://localhost:3001/api/debt/current');
  const data = await response.json();
  console.log(`Dette actuelle: ${data.debtFormatted} €`);
  return data;
}

// Récupérer les statistiques
async function getDebtStats() {
  const response = await fetch('http://localhost:3001/api/debt/stats');
  const data = await response.json();
  console.log('Dette par habitant:', data.calculations.debtPerCapita);
  return data;
}

// Liste des présidents triée par dette
async function getPresidentsByDebt() {
  const response = await fetch(
    'http://localhost:3001/api/presidents?sortBy=debtIncrease&order=desc'
  );
  const data = await response.json();
  console.log('Top 3 présidents:', data.presidents.slice(0, 3));
  return data;
}
```

### React / Next.js

```jsx
import { useEffect, useState } from 'react';

function DebtCounter() {
  const [debt, setDebt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebt() {
      try {
        const response = await fetch('http://localhost:3001/api/debt/current');
        const data = await response.json();
        setDebt(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDebt();
    
    // Mettre à jour toutes les secondes
    const interval = setInterval(fetchDebt, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Dette Publique de la France</h2>
      <p className="debt-amount">{debt.debtFormatted} €</p>
      <p className="debt-rate">+{debt.debtPerSecond} € / seconde</p>
    </div>
  );
}

function PresidentsList() {
  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/presidents?sortBy=debtIncrease&order=desc')
      .then(res => res.json())
      .then(data => setPresidents(data.presidents));
  }, []);

  return (
    <div>
      <h2>Classement des Présidents</h2>
      {presidents.map((president, index) => (
        <div key={president.id}>
          <span>{index + 1}. {president.name}</span>
          <span>{(president.debtIncrease / 1e9).toFixed(1)} Mds €</span>
        </div>
      ))}
    </div>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <h2>Dette Publique</h2>
    <div v-if="debt">
      <p class="debt-amount">{{ debt.debtFormatted }} €</p>
      <p class="debt-rate">+{{ debt.debtPerSecond }} € / seconde</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      debt: null,
      interval: null
    }
  },
  mounted() {
    this.fetchDebt();
    this.interval = setInterval(this.fetchDebt, 1000);
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
  },
  methods: {
    async fetchDebt() {
      const response = await fetch('http://localhost:3001/api/debt/current');
      this.debt = await response.json();
    }
  }
}
</script>
```

### Python / Requests

```python
import requests
import time

# Dette actuelle
def get_current_debt():
    response = requests.get('http://localhost:3001/api/debt/current')
    data = response.json()
    print(f"Dette actuelle: {data['debtFormatted']} €")
    return data

# Liste des présidents
def get_presidents():
    response = requests.get('http://localhost:3001/api/presidents')
    data = response.json()
    
    for president in data['presidents']:
        print(f"{president['name']}: {president['debtIncrease']:,.0f} €")
    
    return data

# Statistiques
def get_debt_stats():
    response = requests.get('http://localhost:3001/api/debt/stats')
    data = response.json()
    
    print(f"Dette par habitant: {data['calculations']['debtPerCapita']:,} €")
    print(f"Ratio Dette/PIB: {data['calculations']['debtToGdpPercent']}%")
    
    return data

# Compteur en temps réel
def live_counter(duration=10):
    """Affiche un compteur en temps réel pendant X secondes"""
    for _ in range(duration):
        debt = get_current_debt()
        print(f"\rDette: {debt['debtFormatted']} €", end='', flush=True)
        time.sleep(1)

if __name__ == '__main__':
    get_current_debt()
    get_presidents()
    get_debt_stats()
```

### PHP

```php
<?php
// Dette actuelle
function getCurrentDebt() {
    $url = 'http://localhost:3001/api/debt/current';
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    echo "Dette actuelle: " . $data['debtFormatted'] . " €\n";
    echo "Par seconde: +" . $data['debtPerSecond'] . " €\n";
    
    return $data;
}

// Liste des présidents
function getPresidents() {
    $url = 'http://localhost:3001/api/presidents?sortBy=debtIncrease&order=desc';
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    echo "Top 5 présidents par dette:\n";
    foreach (array_slice($data['presidents'], 0, 5) as $i => $president) {
        $debt = number_format($president['debtIncrease'] / 1e9, 1);
        echo ($i + 1) . ". {$president['name']}: {$debt} Mds €\n";
    }
    
    return $data;
}

getCurrentDebt();
getPresidents();
?>
```

---

## 📊 Exemples de cas d'usage

### 1. Créer un widget de dette pour un site web

```html
<!DOCTYPE html>
<html>
<head>
    <title>Widget Dette Publique</title>
    <style>
        .debt-widget {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            max-width: 400px;
        }
        .debt-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        .debt-rate {
            font-size: 16px;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="debt-widget">
        <h3>Dette Publique de la France</h3>
        <div class="debt-amount" id="debt">Chargement...</div>
        <div class="debt-rate" id="rate"></div>
    </div>

    <script>
        async function updateDebt() {
            const response = await fetch('http://localhost:3001/api/debt/current');
            const data = await response.json();
            
            document.getElementById('debt').textContent = data.debtFormatted + ' €';
            document.getElementById('rate').textContent = 
                `+${data.debtPerSecond.toLocaleString('fr-FR')} € / seconde`;
        }

        updateDebt();
        setInterval(updateDebt, 1000);
    </script>
</body>
</html>
```

### 2. Analyser les présidents dans un notebook Jupyter

```python
import requests
import pandas as pd
import matplotlib.pyplot as plt

# Récupérer les données
response = requests.get('http://localhost:3001/api/presidents')
data = response.json()

# Convertir en DataFrame
df = pd.DataFrame(data['presidents'])

# Visualiser la dette par président
plt.figure(figsize=(12, 6))
plt.bar(df['name'], df['debtIncrease'] / 1e9)
plt.xticks(rotation=45, ha='right')
plt.ylabel('Dette accumulée (Mds €)')
plt.title('Dette publique accumulée par président')
plt.tight_layout()
plt.show()

# Top 5 présidents
print("Top 5 par dette accumulée:")
print(df.nlargest(5, 'debtIncrease')[['name', 'period', 'debtIncrease']])
```

### 3. Créer un bot Discord

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.on('messageCreate', async (message) => {
    if (message.content === '!dette') {
        const response = await fetch('http://localhost:3001/api/debt/current');
        const data = await response.json();
        
        message.reply(
            `💰 Dette publique de la France:\n` +
            `**${data.debtFormatted} €**\n` +
            `+${data.debtPerSecond} € par seconde`
        );
    }
    
    if (message.content === '!presidents') {
        const response = await fetch('http://localhost:3001/api/presidents/ranking/debtIncrease');
        const data = await response.json();
        
        const top5 = data.ranking.slice(0, 5).map(p => 
            `${p.rank}. ${p.name} (${p.period}): ${(p.value / 1e9).toFixed(1)} Mds €`
        ).join('\n');
        
        message.reply(`👑 Top 5 présidents par dette:\n\`\`\`\n${top5}\n\`\`\``);
    }
});

client.login('YOUR_BOT_TOKEN');
```

### 4. Exporter les données en CSV

```python
import requests
import csv

# Récupérer les présidents
response = requests.get('http://localhost:3001/api/presidents')
data = response.json()

# Exporter en CSV
with open('presidents_dette.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=[
        'name', 'party', 'period', 'years', 
        'debtStart', 'debtEnd', 'debtIncrease', 'debtPerYear'
    ])
    writer.writeheader()
    writer.writerows(data['presidents'])

print("✅ Fichier CSV créé: presidents_dette.csv")
```

---

## 🔒 Sécurité et Bonnes Pratiques

### 1. Limitation de débit (Rate Limiting)

```javascript
// Ajout dans server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

app.use('/api/', limiter);
```

### 2. Configuration CORS sécurisée

```javascript
// Production: limiter aux domaines autorisés
app.use(cors({
  origin: [
    'https://observatoire-citoyen.netlify.app',
    'https://mon-site.com'
  ]
}));
```

### 3. Variables d'environnement

```bash
# .env
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://observatoire-citoyen.netlify.app,https://mon-site.com
```

---

## 📈 Performance

L'API est optimisée pour des réponses rapides :
- Temps de réponse moyen : < 10ms
- Capacité : 1000+ req/s sur un serveur standard
- Cache possible avec Redis pour améliorer les performances

---

## 🐛 Support et Contribution

Si vous trouvez un bug ou souhaitez suggérer une amélioration, ouvrez une issue sur GitHub !
