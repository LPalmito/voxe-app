# Projet d'application pour Voxe.org dans le cadre des élections présidentielles 2017

Le but de ce projet a été de réaliser une application IOS & Android pour Voxe.org. Voxe.org a pour but de donner aux citoyens les outils pour s'engager dans la politique (notamment via un comparateur de programmes en ligne, des fiches sur des sujets d'actualité, etc...)

Note :
Ce projet s'est déroulé dans le cadre d'un partenariat entre Voxe.org, ainsi que des startups sociales Vendredi.cc et Latitudes.cc.

Latitudes.cc a pour but de mettre en place des projets à fort impact social au sein des cursus d'écoles d'ingénieur ou d'informatique. Yannick et Augustin, étudiants à CentraleSupélec, ont pu réaliser ce projet dans ce cadre.
Vendredi.cc a pour but de promouvoir l'emploi partagé entre une entreprise et une association. Manon, bénéficiant du concept de Vendredi, a pu réaliser un stage partagé entre Vendredi et Voxe.org.

## Objectifs de l'application
Les 2 fonctionnalités principales de cette application sont les suivantes :
+ Pouvoir s'informer sur la vie politique à partir d'articles proposés par Voxe (http://www.voxe.org/sinformer/)
+ Pouvoir comparer à l'aveugle les différents programmes des candidats pour l'élection présidentielle 2017, afin de ne pas être biaisé lors de la comparaison

## Résultats
Les applications sont disponibles aux liens suivants : 
+ IOS : https://appsto.re/fr/BY_bjb.i
+ Android : https://play.google.com/store/apps/details?id=com.ionicframework.voxeapp

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

`store.ts` regroupe les différents objets utilisés au sein de l'application. Les "reducers" permettent quant à eux de mettre à jour ce store au fûr et à mesure de l'utilisation de l'application.

## Perspectives d'évolution

+ `main.service.ts` contient un attribut appelé "electionId". A cette date (23/04/2017), l'electionId choisit est celui correspondant à l'élection présidentielle française 2017. Il est tout à fait envisageable de changer cet electionId à l'avenir afin d'adapter l'application à de futures élections.
+ Plusieurs utilisateurs nous ont exprimé le souhait de pouvoir choisir les candidats qu'ils souhaitent comparer au sein des quizz, il serait possible d'ajouter cette amélioration à l'avenir. Cela pourrait être fait en créant une nouvelle page "candidate" par exemple, où l'on pourrait à l'aide de sliders, définir quels candidats on souhaite comparer.

## Contacts

Si jamais vous souhaitez avoir plus d'information sur ce projet, n'hésitez pas à nous contacter à l'une des adresses suivantes.
Manon Léger - manon@latitudes.cc
Augustin Courtier - augustin@latitudes.cc
Yannick Morel - yannick@latitudes.cc
