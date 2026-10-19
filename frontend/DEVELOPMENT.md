# 🔧 Guide de Développement

## Architecture du Projet

### Vue d'Ensemble

```
frontend/
├── public/              # Fichiers statiques
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          # Images et ressources
│   ├── components/      # Composants réutilisables
│   ├── pages/           # Composants de pages
│   ├── data/            # Données JSON mockées
│   ├── App.jsx          # Composant racine + Router
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux + Tailwind
├── index.html           # Template HTML
├── package.json         # Dépendances
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind
└── postcss.config.js    # Configuration PostCSS
```

### Flux de Données

```
main.jsx
  └─> App.jsx (BrowserRouter)
       ├─> Navigation (toujours visible)
       └─> Routes
            ├─> DebtPage
            │    ├─> DebtCounter (état local pour animation)
            │    ├─> StatsCard × 4
            │    ├─> Calculator (état local)
            │    └─> HistoricalChart
            └─> NetworkPage
                 ├─> NetworkGraph (Vis.js)
                 └─> EntityDetails (modal conditionnelle)
```

### Gestion de l'État

**Pas de Redux/Context** : Le projet utilise uniquement l'état local React (`useState`, `useEffect`)

**Pourquoi ?**
- Application simple avec peu d'état partagé
- Pas de besoin de synchronisation complexe
- Performance optimale

**Composants avec État :**
- `DebtCounter` : Compteur animé (setInterval)
- `Calculator` : Formulaire et résultats
- `NetworkPage` : Entité sélectionnée, recherche, filtres

### Patterns Utilisés

#### Composition de Composants
```jsx
// ✅ Bon : Composants découplés et réutilisables
<StatsCard 
  title="Dette par habitant"
  value="45 600 €"
  icon={Users}
  color="blue"
/>
```

#### Props Drilling Limité
```jsx
// NetworkPage passe les callbacks directement
<NetworkGraph onNodeClick={handleNodeClick} />
<EntityDetails entity={selected} onClose={handleClose} />
```

## 🧩 Guide des Composants

### Navigation (`components/Navigation.jsx`)

**Responsabilités :**
- Afficher les liens vers les deux pages
- Mettre en surbrillance la page active

**Props :** Aucune

**Hooks :**
- `useLocation()` : Détection de la page active

### DebtCounter (`components/DebtCounter.jsx`)

**Responsabilités :**
- Afficher la dette avec animation en temps réel
- Formater les grands nombres

**Props :**
```typescript
interface Props {
  initialDebt: number;      // Dette de départ
  debtPerSecond: number;    // Augmentation par seconde
}
```

**Hooks :**
- `useState(initialDebt)` : Dette actuelle
- `useEffect()` : setInterval pour l'incrémentation

**Optimisations :**
- Cleanup du setInterval au démontage
- Formatage avec `Intl.NumberFormat` (optimisé)

### StatsCard (`components/StatsCard.jsx`)

**Responsabilités :**
- Afficher une statistique avec icône et couleur

**Props :**
```typescript
interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}
```

**Caractéristiques :**
- Hautement réutilisable
- Pas d'état interne
- Classes Tailwind dynamiques

### Calculator (`components/Calculator.jsx`)

**Responsabilités :**
- Collecter les entrées utilisateur
- Calculer la contribution théorique
- Afficher les résultats

**État Local :**
```javascript
const [income, setIncome] = useState('');
const [householdSize, setHouseholdSize] = useState('1');
const [result, setResult] = useState(null);
```

**Logique de Calcul :**
```javascript
const interestPerPerson = annualInterest / population;
const householdShare = interestPerPerson * size;
const percentOfIncome = (householdShare / annualIncome) * 100;
```

### HistoricalChart (`components/HistoricalChart.jsx`)

**Responsabilités :**
- Afficher le graphique d'évolution temporelle
- Formater les axes et tooltips

**Props :**
```typescript
interface Props {
  data: Array<{
    year: number;
    debt: number;
    gdpPercent: number;
  }>;
}
```

**Librairie :** Recharts
- `ResponsiveContainer` : Adaptation automatique
- `LineChart` : Graphique en ligne
- Formatage custom des axes Y

### NetworkGraph (`components/NetworkGraph.jsx`)

**Responsabilités :**
- Construire et afficher le graphe de réseau
- Gérer les interactions (zoom, pan, clic)

**Props :**
```typescript
interface Props {
  data: NetworkData;          // Think tanks, billionaires, media
  onNodeClick: (nodeId: string) => void;
}
```

**Librairie :** Vis-network
- Initialisation dans `useEffect`
- Destruction du réseau au démontage
- Configuration de la physique et du layout

**Structure des Données :**
```javascript
{
  nodes: [
    { id, label, group, shape, color }
  ],
  edges: [
    { from, to, color, arrows, dashes, title }
  ]
}
```

**Types de Nœuds :**
- Think Tanks : `shape: 'box'`, couleur bleue
- Milliardaires : `shape: 'diamond'`, couleur orange
- Médias : `shape: 'ellipse'`, couleur verte

### EntityDetails (`components/EntityDetails.jsx`)

**Responsabilités :**
- Afficher les détails d'une entité en modal
- Montrer les relations avec les autres entités

**Props :**
```typescript
interface Props {
  entity: ThinkTank | Billionaire | Media | null;
  data: NetworkData;
  onClose: () => void;
}
```

**Fonctionnalités :**
- Détection du type d'entité (id prefix: tt/b/m)
- Recherche des entités liées
- Affichage conditionnel selon le type
- Modal avec overlay

## 📊 Format des Données

### debtData.json

```json
{
  "currentDebt": number,           // Dette totale (€)
  "debtPerSecond": number,          // Augmentation/sec
  "population": number,             // Population totale
  "activePopulation": number,       // Population active
  "gdp": number,                    // PIB (€)
  "annualInterest": number,         // Intérêts annuels (€)
  "interestPerSecond": number,      // Intérêts/sec
  "historicalData": [
    {
      "year": number,
      "debt": number,
      "gdpPercent": number
    }
  ]
}
```

### networkData.json

```json
{
  "thinkTanks": [
    {
      "id": "tt{N}",
      "name": string,
      "type": "thinkTank",
      "orientation": string,
      "description": string,
      "keyFigures": string[],
      "fundedBy": string[],          // IDs des billionaires
      "mediaPresence": string[]      // IDs des media
    }
  ],
  "billionaires": [
    {
      "id": "b{N}",
      "name": string,
      "type": "billionaire",
      "fortune": string,
      "sector": string,
      "mediaOwned": string[],        // IDs des media
      "description": string
    }
  ],
  "media": [
    {
      "id": "m{N}",
      "name": string,
      "type": "media",
      "category": string,
      "ownedBy": string[],           // IDs des billionaires
      "description": string
    }
  ]
}
```

## 🎨 Système de Design

### Palette de Couleurs

```javascript
// Tailwind Config
colors: {
  primary: {
    500: '#3b82f6',  // Bleu principal
    600: '#2563eb',  // Bleu foncé
  }
}

// Couleurs Sémantiques
debt: '#dc2626'      // Rouge (danger)
thinkTank: '#3b82f6' // Bleu (info)
billionaire: '#f59e0b' // Orange (warning)
media: '#10b981'     // Vert (success)
```

### Classes Utilitaires Personnalisées

```css
/* index.css */
.card {
  @apply bg-white rounded-lg shadow-lg p-6 border border-gray-200;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white 
         font-semibold py-2 px-4 rounded-lg 
         transition-colors duration-200;
}
```

### Responsive Design

**Breakpoints Tailwind :**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

**Utilisation :**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
</div>
```

## 🔄 Cycle de Vie et Performances

### Optimisations Actuelles

1. **Formatage des nombres :**
```javascript
// ✅ Créer une fois, réutiliser
const formatter = new Intl.NumberFormat('fr-FR');
formatter.format(123456789); // "123 456 789"
```

2. **Cleanup des effets :**
```javascript
useEffect(() => {
  const interval = setInterval(() => {...}, 1000);
  return () => clearInterval(interval); // ✅ Nettoyage
}, []);
```

3. **Conditionnels de rendu :**
```javascript
// ✅ Pas de rendu inutile
{selectedEntity && <EntityDetails entity={selectedEntity} />}
```

### Optimisations Futures

1. **Mémoisation des calculs lourds :**
```javascript
const processedData = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

2. **Lazy loading des pages :**
```javascript
const NetworkPage = lazy(() => import('./pages/NetworkPage'));
```

3. **Debouncing de la recherche :**
```javascript
const debouncedSearch = useMemo(
  () => debounce(setSearchTerm, 300),
  []
);
```

## 🧪 Tests (À implémenter)

### Configuration Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/user-event jsdom
```

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

### Exemples de Tests

**Test unitaire :**
```javascript
// DebtCounter.test.jsx
test('increments debt every second', async () => {
  render(<DebtCounter initialDebt={1000} debtPerSecond={10} />);
  
  await waitFor(() => {
    expect(screen.getByText(/1,010/)).toBeInTheDocument();
  }, { timeout: 1100 });
});
```

**Test d'intégration :**
```javascript
// NetworkPage.test.jsx
test('filters think tanks correctly', () => {
  render(<NetworkPage />);
  
  fireEvent.change(screen.getByLabelText(/filtre/i), {
    target: { value: 'thinkTank' }
  });
  
  expect(screen.queryByText(/Milliardaire/i)).not.toBeInTheDocument();
});
```

## 🚀 Workflow de Développement

### 1. Nouvelle Fonctionnalité

```bash
# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Développer
npm run dev

# Vérifier le code
npm run lint

# Tester manuellement
# ...

# Commit
git commit -m "feat: description"

# Push et PR
git push origin feature/nouvelle-fonctionnalite
```

### 2. Correction de Bug

```bash
git checkout -b fix/nom-du-bug
# ... développement ...
git commit -m "fix: description du correctif"
```

### 3. Amélioration de Performance

```bash
git checkout -b perf/optimisation-graphe
# ... optimisation ...
git commit -m "perf: réduction du temps de rendu du graphe"
```

## 📝 Conventions de Code

### Nommage

- **Composants** : PascalCase (`DebtCounter.jsx`)
- **Fonctions** : camelCase (`handleNodeClick`)
- **Constantes** : UPPER_SNAKE_CASE (`MAX_DEBT_VALUE`)
- **Fichiers CSS** : kebab-case (`debt-counter.css`)

### Structure d'un Composant

```jsx
// 1. Imports
import { useState } from 'react';
import { Icon } from 'lucide-react';

// 2. Composant
export default function MyComponent({ prop1, prop2 }) {
  // 3. État
  const [state, setState] = useState(initial);
  
  // 4. Effets
  useEffect(() => {
    // ...
  }, [dependencies]);
  
  // 5. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Rendu
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Commentaires

```javascript
// ✅ Bon : Expliquer le "pourquoi"
// On utilise setInterval plutôt que requestAnimationFrame
// car la précision à la seconde est suffisante

// ❌ Mauvais : Narrer le code
// Créer un état pour stocker la valeur
const [value, setValue] = useState(0);
```

## 🔐 Sécurité et Bonnes Pratiques

### Sanitization des Données

```javascript
// ✅ Valider les entrées utilisateur
const handleCalculate = () => {
  const income = parseFloat(inputValue);
  if (isNaN(income) || income <= 0) {
    alert('Valeur invalide');
    return;
  }
  // ...
};
```

### Éviter les Injections

```jsx
// ✅ React échappe automatiquement
<div>{userInput}</div>

// ⚠️ Dangereux (à éviter)
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### Gestion des Erreurs

```javascript
// ✅ Gestion d'erreurs pour les APIs futures
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Erreur:', error);
  setError('Impossible de charger les données');
}
```

## 📚 Ressources

### Documentation Officielle
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Vis-network](https://visjs.github.io/vis-network/)

### Tutoriels Recommandés
- [React Hooks en profondeur](https://react.dev/reference/react)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Bon développement ! 💻**
