# 🇫🇷 Observatoire Citoyen - Site d'Actualité Politique et Économique

Site web interactif moderne dédié à l'actualité politique et économique française pour l'élection présidentielle.

## 🎯 Aperçu du Projet

Ce projet comprend **deux sections principales** :

### 1️⃣ Compteur en Direct de la Dette Publique Française
Un tableau de bord dynamique affichant en temps réel la dette publique française avec :
- Compteur animé qui augmente à chaque seconde
- Statistiques clés (dette par habitant, par actif, ratio PIB, intérêts)
- Calculateur personnel de contribution aux intérêts
- Graphique d'évolution historique (2014-2023)
- Sections pédagogiques expliquant les enjeux

### 2️⃣ Cartographie Interactive des Think Tanks, Médias et Milliardaires
Une visualisation en réseau montrant les liens d'influence entre :
- Les principaux think tanks français
- Les milliardaires et groupes financiers
- Les médias majeurs
- Avec filtres de recherche, fiches détaillées et légende explicative

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ et npm

### Installation

```bash
# Cloner le projet
git clone <repo-url>
cd <repo-name>

# Installer les dépendances
cd frontend
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:5173**

### Build pour la Production

```bash
npm run build
npm run preview
```

## 🛠️ Stack Technique

- **Frontend Framework** : React 18 avec Vite
- **Routing** : React Router DOM
- **Styling** : Tailwind CSS
- **Visualisation** :
  - Recharts pour les graphiques statistiques
  - Vis-network pour le graphe de réseau interactif
- **Icônes** : Lucide React

## 📂 Structure du Projet

```
/
├── frontend/                    # Application React
│   ├── src/
│   │   ├── components/          # Composants réutilisables
│   │   │   ├── Navigation.jsx
│   │   │   ├── DebtCounter.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── Calculator.jsx
│   │   │   ├── HistoricalChart.jsx
│   │   │   ├── NetworkGraph.jsx
│   │   │   └── EntityDetails.jsx
│   │   ├── pages/               # Pages principales
│   │   │   ├── DebtPage.jsx
│   │   │   └── NetworkPage.jsx
│   │   ├── data/                # Données JSON mockées
│   │   │   ├── debtData.json
│   │   │   └── networkData.json
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md                    # Ce fichier
```

## ✨ Fonctionnalités Détaillées

### Page Dette Publique

#### Compteur en Temps Réel
- Affichage de la dette totale (~3 100 milliards €)
- Incrémentation automatique (+2 733 € par seconde)
- Design imposant avec animation fluide

#### KPIs (Key Performance Indicators)
- **Dette par habitant** : ~45 600 €
- **Dette par actif** : ~103 600 €
- **Ratio Dette/PIB** : ~111 % (critère de Maastricht : 60%)
- **Intérêts annuels** : 52,4 milliards € (~1 661 € par seconde)

#### Calculateur Personnel
Outil interactif permettant à l'utilisateur de :
- Saisir son revenu annuel
- Indiquer le nombre de personnes dans son foyer
- Calculer sa contribution théorique aux intérêts de la dette
- Résultats affichés en montant annuel, mensuel et % du revenu

#### Graphique Historique
- Courbe d'évolution 2014-2023
- Mise en évidence du pic COVID-19 (+270 Mds € en 2020)
- Calcul de l'augmentation totale sur 10 ans

#### Section Pédagogique
Explications accessibles sur :
- Qu'est-ce que la dette publique ?
- Pourquoi augmente-t-elle ?
- Les enjeux et débats économiques

### Page Cartographie des Influences

#### Graphe de Réseau Interactif
Visualisation dynamique avec :
- **Nœuds bleus (rectangles)** : Think Tanks
- **Nœuds oranges (losanges)** : Milliardaires / Groupes
- **Nœuds verts (ellipses)** : Médias

#### Types de Liens
- **Liens oranges pleins** : Financement
- **Liens bleus pointillés** : Présence médiatique
- **Liens rouges épais** : Propriété/Contrôle

#### Fonctionnalités Interactives
- **Clic sur un nœud** : Ouvre une modale avec tous les détails
- **Zoom et pan** : Navigation fluide dans le graphe
- **Recherche** : Filtre par nom ou description
- **Filtres par type** : Afficher uniquement think tanks, médias ou milliardaires

#### Données Incluses

**Think Tanks (8 entités)**
- Institut Montaigne
- Fondation Jean-Jaurès
- Fondapol
- Terra Nova
- Institut Molinari
- Institut de l'Entreprise
- Fondation Nicolas Hulot
- Génération Libre

**Milliardaires (7 acteurs majeurs)**
- Bernard Arnault (LVMH)
- François Pinault (Kering)
- Vincent Bolloré (Vivendi)
- Rodolphe Saadé (CMA CGM)
- Xavier Niel (Free)
- Patrick Drahi (Altice)
- Pierre Bergé (Fondations)

**Médias (8 groupes)**
- Les Échos / Le Parisien
- Le Monde
- Le Point
- Libération / L'Express / BFM TV
- La Tribune / La Provence
- Europe 1
- Radio Classique
- CNews / Canal+

## 🎨 Design et UX

- **Design moderne** : Style data journalism épuré
- **Responsive** : Optimisé mobile-first (smartphone, tablette, desktop)
- **Palette professionnelle** : Tons bleu/rouge avec accents colorés
- **Animations fluides** : Transitions CSS et animations JavaScript
- **Accessibilité** : Contrastes respectés, navigation au clavier
- **Performance** : Optimisé avec Vite, lazy loading des composants

## 📊 Sources des Données

### Dette Publique
- INSEE (Institut National de la Statistique et des Études Économiques)
- Banque de France
- Ministère de l'Économie et des Finances
- Données consolidées au sens du traité de Maastricht

### Think Tanks et Influences
- Rapports annuels publics des organisations
- Base de données HATVP (Haute Autorité pour la Transparence de la Vie Publique)
- Articles de presse vérifiés (Le Monde, Mediapart, Les Échos)
- Sites officiels des groupes médias
- Registre des représentants d'intérêts

## ⚠️ Méthodologie et Limites

Ce site est un **prototype pédagogique** à visée d'information citoyenne.

**Points importants :**
- Les données de la dette sont basées sur des chiffres officiels 2023-2024
- La cartographie des influences présente des liens factuels et documentés
- Les connexions affichées ne préjugent pas de l'indépendance réelle des acteurs
- Certaines nuances sont nécessairement simplifiées pour la visualisation
- Le projet encourage l'esprit critique, pas la stigmatisation

**Objectif :** Rendre visible et compréhensible des informations publiques dispersées pour favoriser un débat démocratique éclairé.

## 🚧 Améliorations Futures

- [ ] Connexion à des APIs en temps réel (INSEE, Banque de France)
- [ ] Export des données en PDF/CSV
- [ ] Section "Actualités" avec flux RSS
- [ ] Ajout de plus d'entités (fondations, lobbies, parlementaires)
- [ ] Timeline historique des rapprochements médias/finance
- [ ] Version multilingue (anglais)
- [ ] Mode sombre/clair
- [ ] Partage social avec aperçus enrichis

## 📝 Licence

Ce projet est fourni à des fins éducatives et citoyennes.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :
1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout de...'`)
4. Poussez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

**Types de contributions appréciées :**
- Ajout ou mise à jour de données (avec sources)
- Amélioration du design et de l'UX
- Correction de bugs
- Optimisations de performance
- Ajout de tests
- Documentation

## 🙏 Remerciements

Ce projet s'inspire des initiatives de data journalism et de transparence démocratique.

---

**Fait avec ❤️ pour la transparence et la démocratie citoyenne**

🇫🇷 Liberté • Égalité • Fraternité
