# 📘 Guide d'Utilisation - Observatoire Citoyen

## 🎯 Pour les Visiteurs

### Navigation

Le site comporte deux pages principales accessibles via la barre de navigation en haut :

1. **Dette Publique** (page d'accueil)
2. **Cartographie des Influences**

### Page Dette Publique

#### Compteur en Temps Réel
Le compteur principal affiche la dette publique française et s'incrémente automatiquement chaque seconde pour illustrer la dynamique de la dette.

#### Cartes Statistiques
Quatre indicateurs clés vous informent sur :
- La part de dette que représente chaque habitant
- La charge par personne active
- Le ratio par rapport au PIB (critère européen de Maastricht)
- Le coût des intérêts de la dette

#### Calculateur Personnel
1. Entrez votre revenu annuel dans le premier champ
2. Sélectionnez le nombre de personnes dans votre foyer
3. Cliquez sur "Calculer ma part"
4. Découvrez votre contribution théorique aux intérêts de la dette :
   - Montant annuel
   - Montant mensuel
   - Pourcentage de votre revenu

💡 **Note** : Ce calcul est purement théorique et basé sur une répartition égalitaire. En réalité, la fiscalité est progressive.

#### Graphique Historique
Le graphique montre l'évolution de la dette de 2014 à 2023. Survolez les points pour voir les détails de chaque année.

**Points clés visibles :**
- L'augmentation progressive jusqu'en 2019
- Le bond important en 2020 (crise COVID-19)
- La tendance récente

### Page Cartographie des Influences

#### Comprendre le Graphe

Le réseau visuel présente trois types d'entités :

- **Rectangles bleus** : Think Tanks (laboratoires d'idées)
- **Losanges oranges** : Milliardaires et grands groupes financiers
- **Ellipses vertes** : Médias (presse, TV, radio)

#### Types de Liens

- **Lignes oranges pleines** → Financement/Soutien
- **Lignes bleues pointillées** → Présence médiatique régulière
- **Lignes rouges épaisses** → Propriété/Contrôle

#### Interactions

**Navigation dans le graphe :**
- 🖱️ **Clic + Glisser** : Déplacer la vue
- 🔍 **Molette** : Zoomer/Dézoomer
- 👆 **Clic sur un nœud** : Ouvrir les détails

**Recherche et filtres :**
1. Utilisez la barre de recherche pour trouver une entité par son nom
2. Le menu déroulant permet de filtrer par type :
   - Tous les types
   - Think Tanks uniquement
   - Milliardaires uniquement
   - Médias uniquement

**Détails d'une entité :**

Cliquez sur n'importe quel nœud pour voir :
- Description complète
- Orientation politique/économique (pour les think tanks)
- Secteur d'activité et fortune (pour les milliardaires)
- Propriétaires (pour les médias)
- Toutes les connexions avec les autres entités
- Sources d'information

---

## 👨‍💻 Pour les Développeurs

### Configuration du Projet

#### Installation
```bash
cd frontend
npm install
```

#### Commandes Disponibles
```bash
# Développement local avec hot reload
npm run dev

# Linter (vérification du code)
npm run lint

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

### Structure des Données

#### Modifier les Données de la Dette

Fichier : `src/data/debtData.json`

```json
{
  "currentDebt": 3100000000000,        // Dette totale en €
  "debtPerSecond": 2733,                // Augmentation par seconde
  "population": 67970000,               // Population française
  "activePopulation": 29900000,         // Population active
  "gdp": 2782000000000,                 // PIB en €
  "annualInterest": 52400000000,        // Intérêts annuels en €
  "interestPerSecond": 1661,            // Intérêts par seconde
  "historicalData": [...]               // Données historiques
}
```

#### Ajouter des Entités dans la Cartographie

Fichier : `src/data/networkData.json`

**Ajouter un Think Tank :**
```json
{
  "id": "tt9",                          // ID unique (ttX)
  "name": "Nom du Think Tank",
  "type": "thinkTank",
  "orientation": "Orientation politique",
  "description": "Description...",
  "keyFigures": ["Nom 1", "Nom 2"],
  "fundedBy": ["b1", "b2"],            // IDs des financeurs
  "mediaPresence": ["m1", "m3"]        // IDs des médias
}
```

**Ajouter un Milliardaire :**
```json
{
  "id": "b8",                           // ID unique (bX)
  "name": "Nom de la personne",
  "type": "billionaire",
  "fortune": "~XX milliards €",
  "sector": "Secteur d'activité",
  "mediaOwned": ["m1"],                // IDs des médias possédés
  "description": "Description..."
}
```

**Ajouter un Média :**
```json
{
  "id": "m9",                           // ID unique (mX)
  "name": "Nom du média",
  "type": "media",
  "category": "Type de média",
  "ownedBy": ["b1"],                   // IDs des propriétaires
  "description": "Description..."
}
```

### Personnalisation du Design

#### Couleurs (Tailwind)

Fichier : `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Modifier les tons de bleu ici
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

#### Animations

Fichier : `src/index.css`

Les classes utilitaires `.card`, `.btn-primary`, `.btn-secondary` sont définies ici.

### Ajouter de Nouvelles Pages

1. Créer le composant dans `src/pages/NouvelePage.jsx`
2. Ajouter la route dans `src/App.jsx` :

```jsx
import NouvelePage from './pages/NouvelePage';

// Dans le composant App
<Route path="/nouvelle-page" element={<NouvelePage />} />
```

3. Ajouter le lien dans `src/components/Navigation.jsx`

### Optimisation des Performances

#### Lazy Loading des Composants
```jsx
import { lazy, Suspense } from 'react';

const NetworkPage = lazy(() => import('./pages/NetworkPage'));

<Suspense fallback={<div>Chargement...</div>}>
  <NetworkPage />
</Suspense>
```

#### Mémoisation
```jsx
import { useMemo, memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(/* transformation lourde */);
  }, [data]);
  
  return <div>{processedData}</div>;
});
```

### Déploiement

#### Build de Production
```bash
npm run build
```

Les fichiers optimisés seront dans `dist/`

#### Hébergement Recommandé

**Options gratuites :**
- **Netlify** : Drag & drop du dossier `dist/`
- **Vercel** : Connexion GitHub automatique
- **GitHub Pages** : Via GitHub Actions
- **Cloudflare Pages** : Intégration Git

**Configuration pour Netlify/Vercel :**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Redirection pour React Router (créer `public/_redirects`) :**
```
/* /index.html 200
```

### Tests (À implémenter)

#### Structure Recommandée
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```javascript
// src/components/__tests__/DebtCounter.test.jsx
import { render, screen } from '@testing-library/react';
import DebtCounter from '../DebtCounter';

test('renders debt counter', () => {
  render(<DebtCounter initialDebt={3100000000000} debtPerSecond={2733} />);
  expect(screen.getByText(/Dette Publique/i)).toBeInTheDocument();
});
```

### API et Sources Externes (Future)

Pour connecter à des APIs réelles :

```javascript
// src/services/debtApi.js
export async function fetchLatestDebtData() {
  const response = await fetch('https://api.insee.fr/...');
  return response.json();
}

// Dans le composant
useEffect(() => {
  fetchLatestDebtData().then(setDebtData);
}, []);
```

### Accessibilité

#### Bonnes Pratiques Déjà Implémentées
- Contrastes de couleurs conformes WCAG
- Structure sémantique HTML5
- Navigation au clavier

#### Améliorations Possibles
- Attributs ARIA pour le graphe interactif
- Annonces pour le compteur en temps réel (screen readers)
- Mode haut contraste

### SEO et Métadonnées

Modifier `index.html` :

```html
<head>
  <meta name="description" content="Observatoire citoyen de la dette publique...">
  <meta property="og:title" content="Observatoire Citoyen">
  <meta property="og:description" content="...">
  <meta property="og:image" content="/preview.png">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### Internationalisation (i18n) Future

```bash
npm install react-i18next i18next
```

Structure :
```
src/
  locales/
    fr.json
    en.json
```

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Nettoyer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Le graphe ne s'affiche pas
- Vérifier que `vis-network` est bien installé
- Ouvrir la console du navigateur pour voir les erreurs
- Vérifier que les données JSON sont valides

### Styles Tailwind non appliqués
- Vérifier que `index.css` est bien importé dans `main.jsx`
- S'assurer que le chemin dans `tailwind.config.js` est correct
- Redémarrer le serveur après modification de la config Tailwind

### Build échoue
```bash
# Vérifier la syntaxe
npm run lint

# Build en mode verbose
npm run build -- --debug
```

---

## 📞 Support et Contribution

- **Issues GitHub** : Pour signaler des bugs ou demander des fonctionnalités
- **Pull Requests** : Les contributions sont les bienvenues !
- **Documentation** : Toujours maintenir ce guide à jour

---

**Bonne utilisation ! 🚀**
