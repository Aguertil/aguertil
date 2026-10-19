# 🚀 Guide de Déploiement

## Options de Déploiement

Ce guide présente plusieurs options pour déployer le site en production.

---

## Option 1 : Netlify (Recommandé - Gratuit)

### Via l'Interface Web (Drag & Drop)

1. **Build local**
   ```bash
   cd frontend
   npm run build
   ```

2. **Connexion à Netlify**
   - Créer un compte sur https://netlify.com
   - Cliquer sur "Add new site" → "Deploy manually"

3. **Upload**
   - Glisser-déposer le dossier `frontend/dist/` dans l'interface

4. **Configuration**
   - Le site est en ligne immédiatement !
   - URL par défaut : `random-name.netlify.app`
   - Possibilité de personnaliser le sous-domaine

### Via Git (Déploiement Continu)

1. **Connecter le Repository**
   - Dans Netlify : "Add new site" → "Import an existing project"
   - Sélectionner GitHub et autoriser l'accès au repo

2. **Configuration du Build**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

3. **Variables d'environnement** (si nécessaire)
   - Pas de variables requises pour ce projet

4. **Déploiement automatique**
   - Chaque push sur `main` déclenche un nouveau déploiement

### Configuration React Router sur Netlify

Créer `frontend/public/_redirects` :
```
/*    /index.html   200
```

---

## Option 2 : Vercel (Gratuit)

### Déploiement via CLI

1. **Installation**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Déploiement**
   ```bash
   cd frontend
   vercel
   ```

4. **Configuration interactive**
   - Suivre les prompts
   - Le build est automatiquement détecté (Vite)

### Configuration via GitHub

1. **Connexion**
   - Aller sur https://vercel.com
   - "Add New Project" → Import Git Repository

2. **Configuration**
   ```
   Root Directory: frontend
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Déploiement continu**
   - Preview automatique pour chaque PR
   - Production déployée sur chaque merge

---

## Option 3 : GitHub Pages (Gratuit)

### Configuration

1. **Installer gh-pages**
   ```bash
   cd frontend
   npm install -D gh-pages
   ```

2. **Ajouter les scripts dans `package.json`**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://votre-username.github.io/nom-du-repo"
   }
   ```

3. **Configuration Vite pour GitHub Pages**
   
   Modifier `vite.config.js` :
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/nom-du-repo/', // Nom du repository
   });
   ```

4. **Déploiement**
   ```bash
   npm run deploy
   ```

5. **Activer GitHub Pages**
   - Aller dans Settings → Pages
   - Source: `gh-pages` branch
   - Le site sera sur `https://username.github.io/nom-du-repo/`

### Via GitHub Actions (Automatique)

Créer `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          cd frontend
          npm ci
          npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

---

## Option 4 : Cloudflare Pages (Gratuit)

1. **Connexion Git**
   - Aller sur https://pages.cloudflare.com
   - "Create a project" → Connect to Git

2. **Configuration**
   ```
   Build command: npm run build
   Build output directory: dist
   Root directory: frontend
   ```

3. **Variables d'environnement**
   ```
   NODE_VERSION=18
   ```

4. **Performance**
   - CDN mondial Cloudflare
   - Excellente vitesse de chargement

---

## Option 5 : Serveur VPS (DigitalOcean, AWS, etc.)

### Avec Nginx

1. **Build**
   ```bash
   npm run build
   ```

2. **Copier les fichiers sur le serveur**
   ```bash
   scp -r dist/* user@serveur:/var/www/html/
   ```

3. **Configuration Nginx** (`/etc/nginx/sites-available/default`)
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;
       root /var/www/html;
       index index.html;

       # React Router - Toutes les routes vers index.html
       location / {
           try_files $uri $uri/ /index.html;
       }

       # Cache des assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

4. **SSL avec Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d votre-domaine.com
   ```

---

## Configuration DNS

Pour un domaine personnalisé :

### Netlify/Vercel/Cloudflare
1. Ajouter un enregistrement CNAME :
   ```
   www.votre-domaine.com → nom-du-site.netlify.app
   ```
   
2. Pour l'apex (sans www), utiliser un enregistrement A ou ALIAS selon le provider

### GitHub Pages
Créer `frontend/public/CNAME` :
```
votre-domaine.com
```

Puis configurer les DNS :
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

---

## Optimisations pour la Production

### 1. Minification et Compression

Vite fait déjà la minification. Pour activer Brotli :

**Netlify** : Automatique

**Nginx** :
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. CDN pour les Assets

Pour améliorer les performances, héberger les images sur un CDN :
- Cloudinary (gratuit jusqu'à 25GB)
- imgix
- Cloudflare Images

### 3. Analyse de Bundle

```bash
cd frontend
npm run build -- --mode analyze
```

Identifier les dépendances lourdes et optimiser si nécessaire.

### 4. Service Worker (PWA)

Pour un site installable et fonctionnant hors ligne :

```bash
npm install -D vite-plugin-pwa
```

Modifier `vite.config.js` :
```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Observatoire Citoyen',
        short_name: 'Obs Citoyen',
        description: 'Dette publique et cartographie des influences',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

## Monitoring et Analytics

### Google Analytics (Gratuit)

1. **Créer une propriété GA4**
   - https://analytics.google.com

2. **Ajouter le script dans `index.html`**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Plausible Analytics (Alternative Privacy-Friendly)

```html
<script defer data-domain="votre-domaine.com" src="https://plausible.io/js/script.js"></script>
```

### Netlify Analytics

Intégré automatiquement (payant après 1M de vues)

---

## Vérification Post-Déploiement

### Checklist

- [ ] Le site se charge correctement
- [ ] La navigation entre pages fonctionne
- [ ] Le compteur de la dette s'anime
- [ ] Le graphe de réseau s'affiche
- [ ] Les modales s'ouvrent au clic
- [ ] Le site est responsive (mobile/tablette/desktop)
- [ ] Les performances sont bonnes (Lighthouse > 90)
- [ ] Le SEO est correct (meta tags, sitemap)
- [ ] Le certificat SSL est actif (HTTPS)

### Tests de Performance

```bash
# Lighthouse via CLI
npm install -g lighthouse
lighthouse https://votre-site.com --view
```

**Cibles recommandées :**
- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 90

### Tests Multi-navigateurs

- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)
- Mobile (Android/iOS)

---

## Rollback en Cas de Problème

### Netlify/Vercel
- Interface web : "Deployments" → Cliquer sur un déploiement précédent → "Publish deploy"

### GitHub Pages
```bash
git revert HEAD
git push
npm run deploy
```

### VPS
Garder une copie de l'ancien `dist/` :
```bash
cp -r dist dist.backup
# En cas de problème :
rm -rf dist && mv dist.backup dist
```

---

## Maintenance Continue

### Mises à Jour de Sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix

# Mise à jour des dépendances
npm update
```

### Monitoring des Erreurs

Intégrer Sentry (gratuit jusqu'à 5K events/mois) :

```bash
npm install @sentry/react
```

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## Coûts Estimés

| Plateforme       | Gratuit    | Payant (si dépassement)       |
|------------------|------------|-------------------------------|
| Netlify          | 100GB/mois | $19/mois (Pro)               |
| Vercel           | 100GB/mois | $20/mois (Pro)               |
| Cloudflare Pages | Illimité   | Toujours gratuit             |
| GitHub Pages     | Illimité   | Toujours gratuit             |
| VPS              | N/A        | $5-20/mois (DigitalOcean)    |

**Recommandation** : Cloudflare Pages (gratuit + CDN puissant) ou Netlify (facilité d'usage)

---

**Bon déploiement ! 🚀**
