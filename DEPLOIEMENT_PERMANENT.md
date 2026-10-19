# 🚀 Guide de Déploiement Permanent

## 🎯 Votre Site est Prêt !

Le site **Observatoire Citoyen** est maintenant prêt pour un déploiement permanent. Voici **3 options gratuites** pour le mettre en ligne.

---

## ✅ Option 1 : Netlify (RECOMMANDÉ - Le Plus Simple)

### Pourquoi Netlify ?
- ✅ **100% Gratuit** (jusqu'à 100GB/mois)
- ✅ **Deploy en 2 minutes**
- ✅ **HTTPS automatique**
- ✅ **CDN mondial**
- ✅ **Pas de limite de temps**

### 🔧 Étapes :

#### 1. Créer un compte
- Allez sur https://www.netlify.com
- Cliquez sur **"Sign up"**
- Connectez-vous avec **GitHub**

#### 2. Déployer le site
- Une fois connecté, cliquez sur **"Add new site"** → **"Import an existing project"**
- Sélectionnez **GitHub**
- Cherchez le repository **"aguertil"**
- Sélectionnez la branche **`cursor/french-politics-dashboard-81c0`**

#### 3. Configuration automatique
Netlify détectera automatiquement la configuration grâce au fichier `netlify.toml` :
```
✅ Base directory: frontend
✅ Build command: npm run build
✅ Publish directory: frontend/dist
```

#### 4. Déployer
- Cliquez sur **"Deploy site"**
- ⏱️ Attendez 2-3 minutes
- 🎉 **C'est en ligne !**

#### 5. Personnaliser le domaine (optionnel)
- Dans les paramètres du site
- **Site settings** → **Domain management**
- Changez le nom : `observatoire-citoyen.netlify.app`

### 🔗 Votre URL finale
```
https://observatoire-citoyen.netlify.app
```
(ou le nom que vous aurez choisi)

---

## 🔷 Option 2 : Vercel (Alternative Excellente)

### Pourquoi Vercel ?
- ✅ **Gratuit illimité**
- ✅ **Performance optimale**
- ✅ **Déploiement automatique à chaque push**

### 🔧 Étapes :

1. **Créer un compte**
   - https://vercel.com/signup
   - Connectez avec **GitHub**

2. **Import le projet**
   - Cliquez sur **"Add New"** → **"Project"**
   - Sélectionnez le repo **aguertil**
   - Sélectionnez la branche **`cursor/french-politics-dashboard-81c0`**

3. **Configuration**
   ```
   Root Directory: frontend
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Deploy**
   - Cliquez sur **"Deploy"**
   - ⏱️ 2-3 minutes
   - 🎉 **En ligne !**

### 🔗 URL finale
```
https://observatoire-citoyen.vercel.app
```

---

## 🐙 Option 3 : GitHub Pages (100% GitHub)

### Pourquoi GitHub Pages ?
- ✅ **Complètement gratuit**
- ✅ **Hébergé par GitHub**
- ✅ **Déploiement automatique déjà configuré**

### 🔧 Étapes :

#### 1. Merger la Pull Request
- Allez sur https://github.com/Aguertil/aguertil/pull/1
- Cliquez sur **"Merge pull request"**
- Confirmez le merge

#### 2. Activer GitHub Pages
- Dans votre repo, allez dans **Settings** → **Pages**
- Source : **GitHub Actions**
- Sauvegardez

#### 3. Le déploiement se fait automatiquement
- GitHub Actions va builder et déployer automatiquement
- Consultez l'onglet **"Actions"** pour voir la progression
- ⏱️ 3-5 minutes

### 🔗 URL finale
```
https://aguertil.github.io/aguertil/
```

---

## 🌐 Option 4 : Domaine Personnalisé (Optionnel)

Si vous voulez un domaine du type `www.observatoire-citoyen.fr` :

### 1. Acheter un domaine
- **OVH** : ~10€/an pour un .fr
- **Gandi** : ~15€/an
- **Namecheap** : ~12$/an pour un .com

### 2. Configurer le DNS
Une fois le site déployé sur Netlify ou Vercel :
- Allez dans les paramètres du site
- **Domain settings** → **Add custom domain**
- Suivez les instructions pour configurer les DNS

---

## 📊 Comparaison des Options

| Critère | Netlify | Vercel | GitHub Pages |
|---------|---------|--------|--------------|
| **Simplicité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Vitesse** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Gratuit** | 100GB/mois | Illimité | Illimité |
| **Deploy auto** | ✅ | ✅ | ✅ |
| **HTTPS** | ✅ | ✅ | ✅ |
| **Domaine custom** | ✅ | ✅ | ✅ |

---

## 🎯 Ma Recommandation

### Pour vous : **NETLIFY**

**Pourquoi ?**
1. ✅ Le plus simple (2 clics)
2. ✅ Configuration déjà faite (`netlify.toml`)
3. ✅ Interface super claire
4. ✅ Pas de limite

**Temps total : 5 minutes**

---

## 🆘 En Cas de Problème

### Le build échoue ?
```bash
cd frontend
npm install
npm run build
```
Si ça marche localement, ça marchera en ligne.

### Le site affiche "404" sur les pages ?
- Vérifiez que les redirects sont configurés
- Sur Netlify : fichier `_redirects` ou `netlify.toml` (déjà fait ✅)
- Sur Vercel : `vercel.json` (déjà fait ✅)

### Le mot de passe ne marche pas ?
- Les déploiements anonymes Netlify expirent en 60 minutes
- Avec un compte Netlify/Vercel : **Pas de mot de passe** !
- Le site sera public et accessible à tous

---

## 📧 Support

Si vous avez besoin d'aide :
1. Ouvrez une **Issue** sur GitHub
2. Ou contactez le support Netlify/Vercel (très réactifs)

---

## 🎉 Félicitations !

Une fois en ligne, votre site sera :
- ✅ **Accessible 24/7**
- ✅ **Rapide** (CDN mondial)
- ✅ **Sécurisé** (HTTPS)
- ✅ **Gratuit** (0€/mois)
- ✅ **Mis à jour automatiquement** (à chaque push sur main)

**Partagez le lien et contribuez à la transparence démocratique ! 🇫🇷**
