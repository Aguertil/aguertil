# 🇫🇷 Observatoire Citoyen - Politique et Économie

Site web interactif dédié à l'actualité politique et économique française pour l'élection présidentielle.

## 📊 Fonctionnalités

### 1. Compteur de la Dette Publique en Direct
- **Compteur en temps réel** : Affichage dynamique de la dette française qui augmente chaque seconde
- **Statistiques clés (KPIs)** :
  - Dette par habitant (~47 000 €)
  - Dette par actif (~103 000 €)
  - Ratio Dette/PIB (~111%)
  - Intérêts de la dette (52,4 Mds € par an)
- **Calculateur personnel** : Estimez votre contribution théorique aux intérêts de la dette selon votre revenu
- **Graphique historique** : Évolution de la dette de 2014 à 2023
- **Section pédagogique** : Explications sur la dette publique et ses enjeux

### 2. Cartographie des Think Tanks, Médias et Milliardaires
- **Visualisation en réseau interactif** : Graphe explorable montrant les liens entre :
  - Think Tanks français (Institut Montaigne, Fondation Jean-Jaurès, Fondapol, Terra Nova, etc.)
  - Milliardaires et groupes financiers (Arnault, Bolloré, Pinault, Niel, Drahi, etc.)
  - Principaux médias français (Le Monde, Les Échos, BFM TV, CNews, Libération, etc.)
- **Filtres et recherche** : Trouvez facilement une entité spécifique
- **Fiches détaillées** : Cliquez sur un nœud pour afficher :
  - Description complète
  - Financeurs et propriétaires
  - Présences médiatiques
  - Orientations politiques/économiques
- **Légende interactive** : Comprendre les types de liens (financement, propriété, influence)

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

## 🛠️ Technologies utilisées

- **React 18** : Framework JavaScript moderne
- **Vite** : Build tool ultra-rapide
- **React Router** : Navigation entre les pages
- **Tailwind CSS** : Framework CSS utility-first pour un design moderne
- **Recharts** : Bibliothèque de graphiques React
- **Vis-network** : Visualisation de réseaux interactifs
- **Lucide React** : Icônes SVG modernes

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Barre de navigation
│   │   ├── DebtCounter.jsx         # Compteur animé de la dette
│   │   ├── StatsCard.jsx           # Carte de statistique réutilisable
│   │   ├── Calculator.jsx          # Calculateur personnel
│   │   ├── HistoricalChart.jsx     # Graphique d'évolution historique
│   │   ├── NetworkGraph.jsx        # Graphe de réseau interactif
│   │   └── EntityDetails.jsx       # Modal de détails d'entité
│   ├── pages/
│   │   ├── DebtPage.jsx            # Page du compteur de dette
│   │   └── NetworkPage.jsx         # Page de la cartographie
│   ├── data/
│   │   ├── debtData.json           # Données de la dette publique
│   │   └── networkData.json        # Données des think tanks/médias
│   ├── App.jsx                     # Composant racine avec routeur
│   ├── main.jsx                    # Point d'entrée
│   └── index.css                   # Styles globaux + Tailwind
├── public/                         # Fichiers statiques
├── index.html                      # HTML principal
├── package.json                    # Dépendances
├── vite.config.js                  # Configuration Vite
└── tailwind.config.js              # Configuration Tailwind
```

## 🎨 Design

- **UI/UX moderne** : Design épuré style data journalism
- **Responsive** : Parfaitement adapté mobile, tablette et desktop
- **Palette de couleurs** : Professionnelle avec accents bleu/rouge
- **Animations fluides** : Compteur animé, transitions douces
- **Accessibilité** : Contraste élevé, navigation claire

## 📊 Sources des données

### Dette publique
- INSEE (Institut National de la Statistique et des Études Économiques)
- Banque de France
- Ministère de l'Économie, des Finances et de la Souveraineté industrielle et numérique
- Données consolidées au sens de Maastricht

### Think Tanks et Influences
- Rapports d'activité publics des organisations
- Articles de presse de référence
- Registre des représentants d'intérêts (Haute Autorité pour la Transparence de la Vie Publique)
- Sites officiels des groupes médias

## ⚠️ Avertissement

Ce site est un **prototype pédagogique** créé à des fins d'information citoyenne. Les données sont basées sur des sources publiques et sont présentées de manière simplifiée pour faciliter la compréhension. 

Les connexions affichées dans la cartographie ne préjugent pas :
- De l'indépendance éditoriale des médias
- De la qualité ou de l'objectivité des travaux des think tanks
- De l'influence réelle exercée dans le débat public

Ce projet encourage l'esprit critique et la transparence, pas la stigmatisation.

## 📝 Licence

Ce projet est fourni à des fins éducatives et citoyennes.

## 🤝 Contributions

Les contributions pour améliorer les données, ajouter des sources ou améliorer le code sont les bienvenues.

---

**Fait avec ❤️ pour la démocratie et la transparence**
