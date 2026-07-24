# Portail de Veille CTO Advisory — Prototype Web v2.0

Prototype interactif de l'application **Signal** conçue pour l'activité **CTO Advisory de Wavestone**. 
Bâti entièrement en HTML5, CSS3 standard et JavaScript moderne, ce portail respecte scrupuleusement l'identité visuelle (DA) de Wavestone tout en offrant une interface réactive d'une fluidité parfaite.

---

## 🎨 Caractéristiques & Direction Artistique

- **Fidélité à la DA Wavestone** : Palette de couleurs signature (fonds épurés blanc/lavande, accents violine et vert néon haut de gamme) et typographies soignées (`DM Sans` et `Space Grotesk`).
- **Performance & fluidité** : Version web native (zéro temps de rechargement contrairement au prototype initial sous Streamlit).
- **Parcours de veille complet** :
  - **Vue d'ensemble** : Dashboard stratégique central. Il affiche des métriques clés (sujets actifs, signaux de la semaine, sources connectées), le flux des 3 derniers signaux prioritaires et une infographie dynamique de l'état d'avancement de votre workflow de collecte.
  - **Choix des sujets** : Espace de configuration sur-mesure. Activez d'un clic les axes d'innovation stratégiques suivis d'un côté. Ajustez l'importance de vos flux à l'aide des flèches d'ordonnancement (Ordre de préférence) et des dropdowns de quotas cibles (`MAX / MODÉRÉ / RESTREINT`) de l'autre pour moduler l'intensité du robot de crawling.
  - **Actualités** : Flux de lecture immersif. Conçu pour le scrolling direct façon "fil d'actualité LinkedIn" pour correspondre à vos usages. Il intègre de l'engagement (likes, republier, envoyer) et s'adapte à votre niveau de lecture (`HIGH level` pour des points clés de surface / décisifs OU `LOW level` pour des points clés d'ingénierie technique / profonds).
  - **Contenu & Diffusion** : Module de valorisation et de Personal Branding. Choisissez votre format de diffusion (Post LinkedIn, Newsletter, Note de Synthèse), sélectionnez vos signaux technologiques cibles à inclure, configurez votre consigne de rédaction éditoriale et copiez d'un clic votre brouillon automatisé de haute qualité.
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

---

## ☁️ Déploiement sur GitHub Pages (Showcase)

L'application étant entièrement statique (HTML/CSS/JS sans compilation), elle s'héberge gratuitement en quelques clics via **GitHub Pages** directement à partir de la racine :

1. Allez sur votre dépôt GitHub en ligne : `https://github.com/KinannAlamir/Veille-IA`
2. Cliquez sur l'onglet **Settings** (Paramètres⚙️).
3. Dans le menu de gauche, sous la section *Code and automation*, cliquez sur **Pages**.
4. Sous **Build and deployment** :
   - Source : Sélectionnez **Deploy from a branch**.
   - Branch : Choisissez la branche **`main`** et le dossier **`/ (root)`**.
5. Cliquez sur **Save**.
6. Patientez 1 à 2 minutes. GitHub vous fournira l'URL publique de votre site (généralement : `https://kinannalamir.github.io/Veille-IA/`).

