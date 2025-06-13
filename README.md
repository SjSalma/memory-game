# Jeu de Mémoire – SEG3525

Ce projet a été réalisé dans le cadre du **cours SEG3525 – Conception et analyse des interfaces usagers**, à l’Université d’Ottawa.


## Objectif du projet

Développer un jeu de mémoire interactif accessible depuis un navigateur, basé sur les principes de la **conception centrée sur l'usager (CCU)**. Le projet met l'accent sur l'adaptation de l'interface selon deux profils d'usagers distincts définis par des **scénarimages détaillés**.


## Personnages cibles

- **Léa Tremblay** : étudiante curieuse et créative, avec une excellente mémoire visuelle mais facilement distraite.
- **Michel Dufresne** : retraité méthodique, ancien professeur de mathématiques, motivé par le maintien de ses capacités cognitives.


## Fonctionnalités principales

- Sélection du **thème des cartes** (animaux, objets, aléatoire)
- Choix du **niveau de difficulté** (nombre de paires)
- Option d'**affichage temporaire des cartes** au début de la partie
- **Feedback visuel immédiat** : bravo, réessayez, victoire
- **Timer** pour suivre la performance


## Design visuel basé sur les scénarimages

Deux designs ont été conçus :
- Une interface **colorée, ludique et arrondie** pour Léa
- Une interface **sobre, structurée et lisible** pour Michel

Le jeu respecte les principes de :
- **Cohérence visuelle**
- **Hiérarchie de l’information**
- **Contraste suffisant pour la lisibilité**
- **Accessibilité pour tous les âges**


## Structure du projet

├── public/             # Fichiers accessibles directement (HTML, manifest, icônes)
│ ├── index.html        # Page HTML principale injectée par React
│ ├── logo.png          # Logo du site
│ ├── manifest.json     # Fichier pour PWA (Progressive Web App)
│ └── robots.txt        # Contrôle d’indexation par les moteurs de recherche

├── src/                # Code source principal
│ ├── assets/           # Images, icônes, sons, fichiers SVG
│ ├── components/       # Composants React réutilisables (Cartes, Grille, etc.)
│ ├── css/              # Fichiers CSS : styles globaux et spécifiques
│ ├── fonts/            # Polices personnalisées
│ ├── App.js            # Composant racine de l'application
│ └── index.js          # Point d’entrée de l’application React (ReactDOM)

├── .gitignore          # Fichiers/dossiers à ignorer par Git
├── package.json        # Dépendances, scripts et métadonnées du projet
├── package-lock.json   # Verrouillage des versions des dépendances
└── README.md           # Ce fichier


## Captures d'écran

Voir le dossier `scenarimages/` pour les maquettes complètes associées à Léa Tremblay et Michel Dufresne.


## Concepts IU appliqués

- Conception centrée sur l’usager (UCD/CCU)
- Prototypage basé sur des scénarios réels
- Principes de perception (Gestalt, mémoire à court terme, attention)
- Accessibilité et simplicité d’utilisation
