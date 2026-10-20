# 📰 Guide du Blog - Observatoire Citoyen

## Vue d'ensemble

Le blog de l'Observatoire Citoyen dispose d'un **système de publication automatique programmée**. Vous pouvez rédiger des articles à l'avance et définir une date/heure de publication automatique.

---

## 🚀 Fonctionnalités

### Statuts d'articles
- **`draft`** : Brouillon (non visible)
- **`scheduled`** : Programmé (publié automatiquement à la date définie)
- **`published`** : Publié (visible immédiatement)

### Publication automatique
Le système vérifie automatiquement la date de publication (`publishDate`) :
- Si `publishDate` ≤ date actuelle → l'article est affiché
- Si `publishDate` > date actuelle → l'article reste caché

**Aucune intervention manuelle nécessaire !** Les articles programmés s'affichent automatiquement à la bonne date.

---

## ✍️ Ajouter un nouvel article

### 1. Ouvrir le fichier de données

Éditez le fichier : `frontend/src/data/blogData.json`

### 2. Ajouter un article dans le tableau `articles`

```json
{
  "id": "mon-nouvel-article",
  "title": "Titre de mon article",
  "slug": "mon-nouvel-article",
  "author": "Observatoire Citoyen",
  "publishDate": "2024-11-01T10:00:00Z",
  "status": "scheduled",
  "category": "Investigations",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "image": "https://images.unsplash.com/photo-xxxxx?w=1200",
  "excerpt": "Résumé court de l'article (2-3 phrases)...",
  "content": "# Titre principal\n\n## Sous-titre\n\nContenu de l'article..."
}
```

### 3. Explications des champs

| Champ | Description | Exemple |
|-------|-------------|---------|
| **id** | Identifiant unique (kebab-case) | `"bollore-csa-circuit-ferme"` |
| **title** | Titre de l'article | `"Circuit fermé : Comment Bolloré..."` |
| **slug** | URL-friendly (même que id) | `"bollore-csa-circuit-ferme"` |
| **author** | Auteur | `"Observatoire Citoyen"` |
| **publishDate** | Date de publication (ISO 8601) | `"2024-11-01T10:00:00Z"` |
| **status** | Statut : `draft`, `scheduled`, `published` | `"scheduled"` |
| **category** | Catégorie (voir liste ci-dessous) | `"Investigations"` |
| **tags** | Tableau de mots-clés | `["Bolloré", "CSA", "Sondages"]` |
| **image** | URL image (Unsplash recommandé) | `"https://images.unsplash.com/..."` |
| **excerpt** | Résumé court (150-200 caractères) | `"Vincent Bolloré possède..."` |
| **content** | Contenu complet (Markdown simple) | Voir format ci-dessous |

---

## 📅 Programmer une publication

### Pour publier immédiatement :
```json
{
  "publishDate": "2024-10-20T09:00:00Z",
  "status": "published"
}
```

### Pour programmer dans le futur :
```json
{
  "publishDate": "2024-12-25T12:00:00Z",
  "status": "scheduled"
}
```

L'article sera **automatiquement publié** le 25 décembre 2024 à 12h00 UTC.

### Format de date (ISO 8601)
- **Format** : `YYYY-MM-DDTHH:MM:SSZ`
- **Exemple** : `2024-11-15T14:30:00Z` = 15 novembre 2024, 14h30 UTC
- **UTC** : Temps universel (ajouter +1h pour heure française hiver, +2h été)

**Convertir facilement :**
- Site : https://www.timestamp-converter.com/
- JavaScript : `new Date("2024-11-15T14:30:00Z").toISOString()`

---

## 📝 Format du contenu (Markdown simplifié)

Le champ `content` supporte un Markdown simplifié :

```markdown
# Titre principal

## Sous-titre niveau 2

### Sous-titre niveau 3

Paragraphe normal avec du texte.

**Texte en gras**

- Élément de liste 1
- Élément de liste 2
- Élément de liste 3

---

**Conclusion** : Texte de conclusion en gras.
```

### Conseils de rédaction
- Utilisez `\n\n` pour sauter des lignes
- `**Texte**` pour le gras
- `# Titre` pour les titres (1 à 3 niveaux)
- `- Item` pour les listes
- `---` pour un séparateur horizontal

---

## 🎨 Catégories disponibles

| Slug | Nom | Couleur | Description |
|------|-----|---------|-------------|
| `investigations` | Investigations | 🔴 Rouge | Enquêtes approfondies |
| `scandales` | Scandales | 🟠 Orange | Affaires judiciaires |
| `dette-publique` | Dette publique | 🔵 Bleu | Analyses finances |
| `sondages` | Sondages | 🟣 Violet | Décryptage instituts |

### Ajouter une nouvelle catégorie

Éditez `blogData.json` dans la section `categories` :

```json
{
  "id": "ma-categorie",
  "name": "Ma Catégorie",
  "slug": "ma-categorie",
  "color": "green",
  "description": "Description de ma catégorie"
}
```

**Couleurs disponibles** : `red`, `orange`, `blue`, `purple`, `green`, `yellow`, `pink`, `indigo`, `teal`

---

## 🖼️ Trouver des images

### Unsplash (gratuit, haute qualité)
1. Allez sur https://unsplash.com/
2. Cherchez une image (ex: "economy", "politics", "charts")
3. Ouvrez l'image et ajoutez `?w=1200` à la fin de l'URL
4. Exemple : `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200`

### Dimensions recommandées
- **Largeur** : 1200px
- **Format** : JPG ou PNG
- **Ratio** : 16:9 (paysage)

---

## 🔄 Déploiement automatique

### Après modification du fichier `blogData.json` :

1. **Commitez les changements :**
   ```bash
   git add frontend/src/data/blogData.json
   git commit -m "feat: Add new blog article"
   git push
   ```

2. **Netlify déploie automatiquement** (2-3 minutes)

3. **L'article apparaît automatiquement** à la date programmée !

---

## 📊 API disponible

Le backend expose automatiquement vos articles via API :

| Endpoint | Description |
|----------|-------------|
| `GET /api/blog/articles` | Liste des articles publiés |
| `GET /api/blog/articles/:slug` | Détails d'un article |
| `GET /api/blog/categories` | Catégories avec compteurs |
| `GET /api/blog/tags` | Tags populaires |
| `GET /api/blog/stats` | Statistiques (published, scheduled, drafts) |

**Filtres disponibles :**
- `?category=Investigations` : Filtrer par catégorie
- `?tag=Bolloré` : Filtrer par tag
- `?limit=5&offset=0` : Pagination

**Exemple :**
```
https://observatoire-citoyen.netlify.app/api/blog/articles?category=Investigations&limit=10
```

---

## 📋 Exemple complet d'article

```json
{
  "id": "nouveau-scandale-macron",
  "title": "Nouveau scandale : Les liens cachés entre Macron et les cabinets de conseil",
  "slug": "nouveau-scandale-macron",
  "author": "Observatoire Citoyen",
  "publishDate": "2024-11-10T08:00:00Z",
  "status": "scheduled",
  "category": "Scandales",
  "tags": ["Macron", "McKinsey", "Cabinets conseil", "Conflits d'intérêts"],
  "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
  "excerpt": "Une enquête révèle que l'État a versé plus d'un milliard d'euros aux cabinets de conseil sous Macron. Des liens personnels entre conseillers ministériels et cabinets privés sont documentés.",
  "content": "# Un milliard d'euros de contrats\n\n## Les chiffres qui choquent\n\nEntre 2017 et 2024, l'État français a versé **1,2 milliard d'euros** aux cabinets de conseil privés.\n\n- **McKinsey** : 350 millions €\n- **Boston Consulting Group** : 280 millions €\n- **Accenture** : 200 millions €\n\n## Les liens personnels\n\nPlusieurs anciens employés de McKinsey occupent des postes clés :\n- Alexis Kohler (Secrétaire général Élysée)\n- Karim Tadjeddine (Directeur de cabinet)\n\n## Sources\n\n- Commission d'enquête Sénat (2022)\n- Mediapart, Le Monde\n- Déclarations HATVP\n\n---\n\n**Conclusion** : Ces liens posent la question de l'indépendance de l'État face aux intérêts privés."
}
```

---

## 🛠️ Workflow complet

1. **Rédiger l'article** dans un éditeur de texte
2. **Convertir en JSON** et l'ajouter à `blogData.json`
3. **Définir la date de publication** et le statut `scheduled`
4. **Commiter et pusher**
5. **L'article se publie automatiquement** à la date définie !

---

## ❓ Questions fréquentes

### Comment modifier un article déjà publié ?
Trouvez l'article par son `id` dans `blogData.json`, modifiez le contenu, commitez et pushez.

### Puis-je déprogrammer un article ?
Oui ! Changez le `status` de `scheduled` à `draft`.

### Comment supprimer un article ?
Supprimez l'objet JSON de l'article dans `blogData.json`, commitez et pushez.

### L'article ne s'affiche pas à l'heure prévue
Vérifiez :
- Le format de date (ISO 8601)
- Le fuseau horaire (UTC)
- Le statut (`scheduled` ou `published`)

---

## 📞 Support

Pour toute question, ouvrez une issue sur GitHub : https://github.com/Aguertil/aguertil

---

**Bon blogging ! 🚀**
