# BFF Salon — Site 11ty + Sveltia CMS

## Stack
- **11ty v3** — générateur statique
- **Nunjucks** — templates
- **Sveltia CMS** — interface d'édition en ligne (compatible GitHub Pages)
- **GitHub Actions** — build + déploiement automatique

---

## 🚀 Mise en route initiale (à faire une seule fois)

### 1. Pousser le repo sur GitHub

```bash
git init
git add .
git commit -m "init 11ty + Sveltia CMS"
git remote add origin https://github.com/TON-USER/TON-REPO.git
git push -u origin main
```

### 2. Activer GitHub Pages avec GitHub Actions

Dans ton repo GitHub :
`Settings → Pages → Source → GitHub Actions`

Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement à chaque push sur `main`.

### 3. Créer l'OAuth App GitHub (pour le CMS)

1. Va sur https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
2. Remplis :
   - **Application name** : `BFF Salon CMS`
   - **Homepage URL** : `https://bridgeflowfolk.github.io/Salon/`
   - **Authorization callback URL** : `https://sveltia-cms-auth.pages.dev/callback`
3. Clique **Register application**
4. Copie le **Client ID**
5. Clique **Generate a new client secret** → copie le secret (une seule fois visible)

### 4. Mettre le Client ID dans config.yml

Ouvre `src/admin/config.yml` et ajoute la ligne `app_id` :

```yaml
backend:
  name: github
  repo: bridgeflowfolk/Salon   # ← adapter
  branch: main
  base_url: https://sveltia-cms-auth.pages.dev
  app_id: TON_CLIENT_ID_ICI    # ← coller le Client ID GitHub OAuth
```

> Le Client Secret ne va PAS dans le repo. Il n'est pas nécessaire
> avec le proxy public de Sveltia (`sveltia-cms-auth.pages.dev`).

### 5. Accéder au CMS

Une fois déployé : `https://bridgeflowfolk.github.io/Salon/admin/`

Connexion avec ton compte GitHub → autoriser l'app → interface d'édition.

---

## ✏️ Utiliser le CMS au quotidien

### Modifier une page existante
1. Va sur `/Salon/admin/`
2. **Pages du site** → choisir la page
3. Modifie les champs → **Publier**
4. GitHub Actions rebuild automatiquement (~1 min)

### Ajouter une photo à la galerie
1. **Médias** dans la sidebar → **Upload**
2. Les photos vont dans `src/static/photos/`
3. Puis **Pages du site → Galerie** → ajoute les entrées dans la liste "Fichiers"

### Ajouter une page au menu sans toucher au code
1. **Navigation** dans le CMS → ajoute une entrée (label, url, emoji)
2. Le menu desktop + mobile se met à jour automatiquement

### Ajouter une nouvelle page (nécessite une intervention code)
1. Crée `src/ma-page.njk` :
```yaml
---
layout: base.njk
permalink: /Salon/ma-page/
title: "Titre SEO"
description: "Description SEO"
---
Contenu HTML/Nunjucks ici
```
2. Déclare-la dans `src/admin/config.yml` sous `collections → pages → files` pour l'éditer via CMS

---

## 🧩 Composants Nunjucks réutilisables

Tous dans `src/_includes/composants/`. Import en tête de page :

```nunjucks
{% from "composants/sep.njk"       import sep %}
{% from "composants/carte.njk"     import carte %}
{% from "composants/hero.njk"      import hero %}
{% from "composants/footer.njk"    import footer_bloc %}
{% from "composants/badge.njk"     import badge %}
{% from "composants/bloc-info.njk" import bloc_info %}
```

### sep — séparateur décoratif
```nunjucks
{{ sep() }}
{{ sep(couleur="sauge") }}   {# or | sauge | lotus #}
```

### carte — carte glassmorphism
```nunjucks
{{ carte(titre="Yoga", desc="Aurélie Bonnet", emoji="🧘", couleur="sauge", delay="0.4s") }}
{{ carte(titre="Savon Bélier", prix="5 €") }}
```

### hero — bloc titre de page
```nunjucks
{{ hero(tag="Mon tag", titre="Mon titre", titreEm="en italique", sousTitre="Sous-titre") }}
```

### footer_bloc — footer Facebook + copyright
```nunjucks
{{ footer_bloc() }}
{{ footer_bloc(label="Suivre l'aventure BFF", delay="1s") }}
```

### badge — pill coloré
```nunjucks
{{ badge("✨ Entrée libre") }}
{{ badge("5 €", couleur="or") }}
{{ badge("🏆 Prix", couleur="lotus", small=true) }}
```

### bloc_info — encadré info / citation
```nunjucks
{{ bloc_info("Ouvert 10h–18h.") }}
{{ bloc_info("Notre citation...", couleur="arc-en-ciel", italic=true, delay="1s") }}
```

---

## 📁 Structure du projet

```
.github/
  workflows/
    deploy.yml              ← build + deploy automatique
src/
  _data/
    navigation.json         ← SOURCE UNIQUE du menu
  _includes/
    base.njk                ← layout commun
    composants/
      sep.njk
      carte.njk
      hero.njk
      footer.njk
      badge.njk
      bloc-info.njk
  admin/
    index.html              ← interface Sveltia CMS
    config.yml              ← mapping CMS ↔ fichiers YAML
  assets/
    css/commun.css
    js/commun.js
  static/                   ← logo, preview.jpg, photos/
  index.njk
  programme.njk
  tombola.njk
  savon.njk
  buvette.njk
  foodtruck.njk
  galerie.njk
  apropos.njk
.eleventy.js
package.json
```

---

## 🛠 Commandes locales

```bash
npm install        # installer les dépendances
npm run dev        # serveur local → http://localhost:8080
npm run build      # build production → _site/
```
