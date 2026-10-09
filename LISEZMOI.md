# Portfolio — Anaïs Albersario

Site statique (HTML / CSS / JS), sans base de données ni étape de compilation.

**En ligne : https://anaisalbersario.github.io/portfolio**

## Voir le site en local
Les animations et la vidéo ont besoin d'un petit serveur (un double-clic sur `index.html` ne suffit pas toujours) :

```bash
cd "site" && python3 -m http.server 5173
```
Puis ouvrir http://localhost:5173

## Modifier les textes et les images
Tout est dans **`js/data.js`** :
- textes de chaque projet (titre, sous-titre, client, rôle, outils, contexte, missions) ;
- liste des images de chaque projet (`blocks`) ;
- calendrier éditorial EÏA (`EIA_CALENDAR`).

Les textes de l'accueil (manifeste, certificat, contact) sont dans **`index.html`**.

Les images sont dans `media/`. Elles sont déjà redimensionnées pour le web : ajoute de nouvelles images en JPG d'environ 1500 px de large maximum.

## Mettre à jour le site en ligne
Après une modification :
```bash
git add -A && git commit -m "Mise à jour" && git push
```
GitHub Pages republie le site en 1 à 2 minutes.

## Typographies
- Printvetica et FOSS Serif sont dans `fonts/`. Vérifie que leurs licences autorisent l'usage web.
- Geist, Geist Mono et Reenie Beanie viennent de Google Fonts.
