# Targeet - Site Vitrine

Un projet développé dans le cadre de ma formation à **Metz Numeric School**. Ce site vitrine vise à connecter talents et entreprises grâce à une présentation claire et intuitive des offres et services de Targeet.

---

## Table des matières

- [Targeet - Site Vitrine](#targeet---site-vitrine)
  - [Table des matières](#table-des-matières)
- [Contexte](#contexte)
- [Fonctionnalités clés](#fonctionnalités-clés)
- [Stack](#stack)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Nomenclature des classes HTML (BEM)](#nomenclature-des-classes-html-bem)
  - [Qu'est-ce que BEM ?](#quest-ce-que-bem-)
  - [Structure des noms de classes](#structure-des-noms-de-classes)
  - [Règles et conventions](#règles-et-conventions)
  - [Exemples de classes avec BEM](#exemples-de-classes-avec-bem)
      - [Pour un formulaire :](#pour-un-formulaire-)
    - [Pour un bouton :](#pour-un-bouton-)
- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Étapes](#étapes)
    - [1️⃣ **Installer Node.js**](#1️⃣-installer-nodejs)
    - [2️⃣ **Initialiser le projet Node.js**](#2️⃣-initialiser-le-projet-nodejs)
    - [3️⃣ **Installer Sass en tant que dépendance**](#3️⃣-installer-sass-en-tant-que-dépendance)
    - [4️⃣ **Vérifier la structure des dossiers**](#4️⃣-vérifier-la-structure-des-dossiers)
    - [5️⃣ **Ajouter une commande de compilation dans package.json**](#5️⃣-ajouter-une-commande-de-compilation-dans-packagejson)
    - [6️⃣ **Compiler automatiquement Sass**](#6️⃣-compiler-automatiquement-sass)
      - [🛠️ Dépannage](#️-dépannage)
- [**Auteurs:**](#auteurs)

---

# Contexte

Dans le cadre de mon stage de formation chez **Metz Numeric School**, je développe un site internet pour **Targeet**.  
L'objectif est de fournir une plateforme :

-   Où les talents peuvent découvrir de nouvelles missions.
-   Où les entreprises peuvent trouver leurs futurs talents.

Le site comprendra les sections suivantes :

1. **Présentation de Targeet :**  
   Une présentation animée avec le logo et les valeurs de Targeet.  
   Quatre fenêtres entoureront le logo pour rappeler la spécialité Microsoft de Targeet.  
   Chaque fenêtre présentera un aspect ou une valeur de l'entreprise.

2. **Offres d'emplois/missions :**  
   Une section pour afficher toutes les offres d'emplois et de missions sous forme de carrousel interactif.

3. **Entreprises :**  
   Une section présentant les talents disponibles, également sous forme de carrousel.

4. **Formulaire de contact :**  
   **WIP**
   Un formulaire permettant à toutes les personnes intéressées d'envoyer un message.  
   Ce message sera transmis directement par email.

---

# Fonctionnalités clés

-   **Site vitrine responsive** : Une expérience optimale sur tous les écrans.
-   **Carrousels interactifs** : Pour naviguer dans les offres et les talents.
-   **Animation du logo** : Une introduction dynamique pour capter l'attention.
-   **Formulaire de contact sécurisé** : Permet d'envoyer des emails via un serveur SMTP.
-   **Stack moderne** : Sass pour la gestion des styles, Flask pour le back-end.
-   **Déploiement optimisé** : Utilisation de Nginx comme serveur web performant.

---

# Stack

## Front-end

-   **HTML 5** : Structure du site.
-   **CSS 3** : Styles de base.
-   **SASS (v1.81.0)** : Gestion avancée des styles (variables, mixins, etc.).
-   **JavaScript (ES6)** : Fonctionnalités dynamiques et interactions utilisateur.
-   **Slick JS** : Fonctionnalités permettant d'avoir un carousel
-   **Node.js (v22.11.0 LTS)** : Utilisé pour la compilation Sass.

## Back-end

-   **Nginx** : Serveur web et reverse proxy.

---

# Nomenclature des classes HTML (BEM)

Ce projet utilise la méthodologie **BEM** (_Block, Element, Modifier_) pour assurer une structure cohérente et modulaire des classes CSS.

## Qu'est-ce que BEM ?

**BEM** est une méthodologie pour nommer les classes CSS afin de rendre le code :

-   Facile à lire et à maintenir.
-   Compréhensible pour d'autres développeurs.
-   Adapté à des styles modulaires et réutilisables.

## Structure des noms de classes

1. **Block (B)** : Représente un composant indépendant.  
   Exemple : `.header`, `.form`, `.button`.

2. **Element (E)** : Représente un sous-élément du composant, relié à son bloc parent avec deux underscores `__`.  
   Exemple : `.header__title`, `.form__input`.

3. **Modifier (M)** : Représente une variation ou un état d'un bloc ou d'un élément, relié avec un double tiret `--`.  
   Exemple : `.button--disabled`, `.header__title--large`.

## Règles et conventions

1. Chaque classe doit respecter cette structure pour rester consistante.
2. Les noms de blocs doivent être en minuscules, avec des tirets pour séparer les mots (.nav-bar, .main-content).
3. Les éléments et modificateurs suivent leur bloc parent sans espaces ni hiérarchie DOM. Exemple :

```html
<div class="card">
    <div class="card__header card__header--highlighted">
        <h2 class="card__title">Titre</h2>
    </div>
</div>
```

4. Les classes doivent être descriptives et représenter leur rôle ou leur état.

## Exemples de classes avec BEM

#### Pour un formulaire :

```html
<div class="form">
    <label class="form__label" for="email">Email</label>
    <input class="form__input" id="email" type="email" placeholder="Votre email" />
    <button class="form__button form__button--primary">Envoyer</button>
</div>
```

### Pour un bouton :

```html
<button class="button button--primary">Valider</button>
<button class="button button--disabled">Désactivé</button>
```

---

# Installation

## Prérequis

-   Node.js pour gérer Sass.
-   Un environnement de développement (VS Code, PyCharm, etc.).
-   Git pour la gestion du versionning

## Étapes

### 1️⃣ **Installer Node.js**

Sass nécessite **Node.js** pour fonctionner.  
Si Node.js n'est pas encore installé, suivez ces étapes :

1. Rendez-vous sur [nodejs.org](https://nodejs.org/).
2. Téléchargez la version **LTS (Long Term Support)** recommandée.
3. Suivez les instructions d'installation selon votre système d'exploitation (Windows, macOS, Linux).
4. Pour vérifier l'installation, exécutez la commande suivante dans votre terminal :

```bash
node -v
```

### 2️⃣ **Initialiser le projet Node.js**

1. Ouvrez un terminal à la racine de votre projet.
2. Exécutez la commande suivante pour créer un fichier package.json :

```bash
npm init -y
```

Cela crée un fichier package.json contenant la configuration de base du projet.

### 3️⃣ **Installer Sass en tant que dépendance**

1. Exécutez la commande suivante pour installer Sass en tant que dépendance de développement :

```bash
npm install --save-dev sass
```

2. Vérifiez que Sass est bien installé :

```bash
npx sass --version
```

Vous devriez voir s'afficher un numéro de version similaire à 1.81.0.

### 4️⃣ **Vérifier la structure des dossiers**

La structure doit être:

└── public/
    └── css/ (fichiers compilés ici)
└── sass/ (fichiers sources Sass ici)
    └── main.scss

### 5️⃣ **Ajouter une commande de compilation dans package.json**

Pour éviter de devoir taper manuellement la commande Sass à chaque fois, ajoutez un script personnalisé dans le fichier package.json.

1. Ouvrez le fichier package.json.
2. Dans la section "scripts", ajoutez la commande suivante :

```json
"scripts": {
    "sass": "sass --watch ./sass/main.scss:./public/css/style.css  --style compressed"
  },
```

Explication du script :

- sass/main.scss : Fichier source Sass.
- public/css/main.css : Fichier de sortie CSS généré.
- --watch : Sass surveille en continu les modifications du fichier main.scss et les compile automatiquement.
- --style compressed : permet de générer un fichier css compressé. A supprimer si vous souhaitez avoir un fichier css classique

### 6️⃣ **Compiler automatiquement Sass**
Pour lancer la compilation automatique de Sass, vous devez systématiquement exécutez la commande suivante dans le terminal lorsque vous débutez le développement:

```bash
npm run sass
```

Sass va surveiller les modifications des fichiers dans le dossier sass/ et générer automatiquement le fichier public/css/main.css

#### 🛠️ Dépannage
- Problème : "npx : commande introuvable"
  👉 Solution : Assurez-vous que Node.js est bien installé et que la variable d'environnement PATH est configurée.

- Problème : Sass ne compile pas automatiquement les modifications.
  👉 Solution : Vérifiez que la commande npm run sass est bien en cours d'exécution dans un terminal actif.
  👉 Solution : Vérifiez le chemin des fichiers dans le fichier package.json.

---

# <u>**Auteurs:**</u>

Tristan THOUVENOT  
création: 18/11/2024
dernière mise à jour: 08/12/2024
Étudiant développeur chez Metz Numeric School. Passionné par le développement front-end et back-end.
