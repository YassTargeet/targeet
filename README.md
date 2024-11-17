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
- [**Auteurs:**](#auteurs)

---

# Contexte

Dans le cadre de mon stage de formation chez **Metz Numeric School**, je développe un site internet pour **Targeet**.  
L'objectif est de fournir une plateforme :
- Où les talents peuvent découvrir de nouvelles missions.
- Où les entreprises peuvent trouver leurs futurs talents.

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
   Un formulaire permettant à toutes les personnes intéressées d'envoyer un message.  
   Ce message sera transmis directement par email.

---

# Fonctionnalités clés
- **Site vitrine responsive** : Une expérience optimale sur tous les écrans.
- **Carrousels interactifs** : Pour naviguer dans les offres et les talents.
- **Animation du logo** : Une introduction dynamique pour capter l'attention.
- **Formulaire de contact sécurisé** : Permet d'envoyer des emails via un serveur SMTP.
- **Stack moderne** : Sass pour la gestion des styles, Flask pour le back-end.
- **Déploiement optimisé** : Utilisation de Nginx comme serveur web performant.

---

# Stack

## Front-end
- **HTML 5** : Structure du site.
- **CSS 3** : Styles de base.
- **SASS (v1.81.0)** : Gestion avancée des styles (variables, mixins, etc.).
- **JavaScript (ES6)** : Fonctionnalités dynamiques et interactions utilisateur.
- **Node.js (v22.11.0 LTS)** : Utilisé pour la compilation Sass.

## Back-end
- **Nginx** : Serveur web et reverse proxy.
- **Python** : Langage principal pour la logique back-end.
- **Flask** : Framework web léger pour gérer les requêtes HTTP et le formulaire de contact.

---

# Nomenclature des classes HTML (BEM)

Ce projet utilise la méthodologie **BEM** (*Block, Element, Modifier*) pour assurer une structure cohérente et modulaire des classes CSS.

## Qu'est-ce que BEM ?
**BEM** est une méthodologie pour nommer les classes CSS afin de rendre le code :
- Facile à lire et à maintenir.
- Compréhensible pour d'autres développeurs.
- Adapté à des styles modulaires et réutilisables.

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
  <input class="form__input" id="email" type="email" placeholder="Votre email">
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
- Python 3.x installé sur votre machine.
- Node.js pour gérer Sass.
- Un environnement de développement (VS Code, PyCharm, etc.).

## Étapes

à venir

---
# <u>**Auteurs:**</u>
Tristan THOUVENOT
novembre 2024
Étudiant développeur chez Metz Numeric School. Passionné par le développement front-end et back-end.