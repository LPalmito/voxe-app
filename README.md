# Latitudes x Vendredi x Voxe x CentraleSupélec

Latitudes est une association ayant pour but de mettre en place des projets à fort impact social au sein des cursus du numérique. Dans le cadre de ce projet, 3 étudiants de CentraleSupélec ont effectués une application pour Voxe.org, une association dans le domaine des civic-tech.

Les 2 fonctionnalités principales de cette application sont les suivantes :
+ Pouvoir s'informer sur la vie politique à partir d'articles proposés par Voxe (http://www.voxe.org/sinformer/)
+ Pouvoir comparer les différents programmes des candidats pour l'élection présidentielle 2017

## Architecture globale

Les frameworks Ionic 2 et Angular 2 ont été utilisé pour le développement de cette application, l'architecture globale respecte le paradigme Redux comme présenté dans l'article suivant : http://onehungrymind.com/build-better-angular-2-application-redux-ngrx/.

Les différents pages de l'application sont les suivantes :
+ `home` : page d'accueil de l'application
+ `archive` : regroupe les cartes archivées par l'utilisateur
+ `favorites` : regroupe les cartes mises en favoris par l'utilisateur
+ `info` : permet d'afficher un article selectionné par l'utilisateur
+ `tuto` : 2 pages de tutoriels avant le premier quizz selectionné par l'utilisateur
+ `swipe` : affiche les propositions de 2 candidats selon un thème donné pour permettre à l'utilisateur de les swiper
+ `stats` : affiche les résultats du quizz effectué par l'utilisateur

Les différents services sont les suivants :
+ `candidates` : regroupe les fonctions relatives aux candidats
+ `propositions` : regroupe les fonctions relatives aux propositions
+ `tags` : regroupe les fonctions relatives aux thèmes
+ `database` : regroupe les fonctions relatives à la gestion de la base de données
+ `info-cards` : regroupe les fonctions relatives aux cartes d'informations
+ `main` : regroupe les fonctions utilisées au sein de plusieurs components

`store.ts` regroupe les différents objets utilisés au sein de l'application. Les "reducers" peremttent quant à eux de mettre à jour ce store au fûr et à mesure de l'utilisation de l'application.

## Perspectives d'évolution

+ `main.service.ts` contient un attribut appelé "electionId". A cette date (23/04/2017), l'electionId choisit est celui correspondant à l'élection des présidentielle française 2017. Il est tout à fait envisageable de changer cet electionId à l'avenir afin d'adapter l'application à de futures élections.
+ Plusieurs utilisateurs nous ont exprimé le souhait de pouvoir choisir les candidats qu'ils souhaitent comparer au sein des quizz, il serait possible d'ajouter cette amélioration à l'avenir.
+ Dans `./src/pages//swipe/swipe.ts` et `./src/pages/stats/stats.ts`, nous utilisons pour le moment un objet `answers` ainsi qu'un objet `displayAnswers`. Ceux deux objets pourraient être mergés en un objet unique afin de simplifier le code dans `./src/pages/stats`

## Contacts

Manon Léger - manon@latitudes.cc
Augustin Courtier - augustin@latitudes.cc
Yannick Morel - yannick@latitudes.cc