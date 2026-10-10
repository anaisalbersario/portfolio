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
- le feed EÏA du téléphone et des pochettes (`EIA_FEED`).

Les textes de l'accueil (manifeste, certificat, contact) sont dans **`index.html`**.

Les images sont dans `media/`. Elles sont déjà redimensionnées pour le web : ajoute de nouvelles images en JPG d'environ 1500 px de large maximum.

## Mettre à jour le site en ligne
Après une modification :
```bash
git add -A && git commit -m "Mise à jour" && git push
```
GitHub Pages republie le site en 1 à 2 minutes.

## Les jeux de l'accueil
Ticket à gratter, platine (ma méthode), atelier d'affiche : tout est dans `js/play.js`.
Les morceaux de la platine (titres + phrases) sont en haut de la fonction `turntable`.

## Version anglaise
- Le bouton FR / EN est en haut à droite. Le choix est mémorisé, et `?lang=en` dans l'adresse force l'anglais.
- Textes des projets : dans `js/data.js`, chaque projet a un bloc `en: { ... }` (et `cap_en` pour les légendes).
- Textes de l'accueil : dans `js/i18n.js`.

## Typographies
- Printvetica et FOSS Serif sont dans `fonts/`. Vérifie que leurs licences autorisent l'usage web.
- Geist, Geist Mono et Reenie Beanie viennent de Google Fonts.
