# Portail de Veille CTO Advisory — Prototype Web v2.0

Prototype interactif de l'application **Signal** conçue pour l'activité **CTO Advisory de Wavestone**. 
Bâti entièrement en HTML5, CSS3 standard et JavaScript moderne, ce portail respecte scrupuleusement l'identité visuelle (DA) de Wavestone tout en offrant une interface réactive d'une fluidité parfaite.

---

## 🎨 Caractéristiques & Direction Artistique

- **Fidélité à la DA Wavestone** : Palette de couleurs signature (fonds épurés blanc/lavande, accents violine et vert néon haut de gamme) et typographies soignées (`DM Sans` et `Space Grotesk`).
- **Performance & fluidité** : Version web native (zéro temps de rechargement contrairement au prototype initial sous Streamlit).
- **Parcours de veille complet** :
  - **Vue d'ensemble** : Dashboard et statistiques clés d'activité et de budget.
  - **Choix des sujets** : Activation dynamique des 12 axes d'innovation stratégiques suivis.
  - **Actualités** : Flux dynamique d'articles analysés, affichant les faits notables extraits par Gemini 3.5 Flash et hashtags générés.
  - **Contenu & Diffusion** : Module de rédaction automatique de livrables ou posts LinkedIn d'aide au personnel branding.
- **Persistance locale** : Sauvegarde automatique de vos sélections de thématiques dans le `localStorage` du navigateur.

---

## 🚀 Comment Lancer l'Application

Vous avez deux manières très simples d'ouvrir le portail :

### Option 1 : Double-clic (Sans installation)

1. Naviguez dans le dossier du projet.
2. Double-cliquez directement sur le fichier [index.html](index.html) pour l'ouvrir dans n'importe quel navigateur internet (Chrome, Edge, Safari, Firefox).

---

### Option 2 : Via un Serveur Local (Recommandé)

Pour bénéficier d'une expérience de développement idéale ou pour utiliser des extensions de partage :

#### Avec Python :
Dans votre terminal à la racine du projet, lancez :
```bash
python -m http.server 8000
```
Puis accédez à l'URL suivante : [http://localhost:8000](http://localhost:8000)

#### Avec VS Code (Live Server) :
Si vous possédez l'extension **Live Server** installée sur VS Code, cliquez simplement sur le bouton **Go Live** au bas de votre éditeur en ayant ouvert le fichier `index.html`.

---

## 📂 Structure du Projet

```
VeilleIA/
├── index.html     # Squelette sémantique et intégration globale Tailwind / Lucide Icons
├── styles.css     # Charte de style customisée, ombres premium et animations de transitions
├── app.js         # Logique d'affichage, filtres dynamiques, modèle d'état et persistance locale
└── README.md      # Le présent guide d'installation et d'utilisation
```
