# Sprint POC/DEMO

Prérequis:
- @angular-devkit/build-angular   15.1.1
- @angular/cli                    15.1.1

## Execution
`npm install`
`ng serve`

Ce projet consiste à créer un site web pour la gestion de signalements de problèmes sur un projet plus large.

Un utilisateur peut:
- Afficher la liste des signalements.
- Créer ou modifier un signalement.
- Supprimer un signalement.

Un utilisateur ne peut pas:
- Ajouter un signalement avec un email qui existe déjà dans la liste.
- Modifier plusieurs signalements en même temps.

## Service
### services/reporting.service.ts
Le service sert comme une Mock API pour le site web. Qui peut être remplacé par un vrai API plus tard pour assurer la persistence des données.
Les données sont contenues dans le service et sont modifiées par les méthodes du service.
La librairie rxjs est utilisée pour envoyer les fausses réponses et l'erreur en cas un utilisateur essaye d'ajouter un signalement avec un email existant dans la liste de signalement.

## Composants
### componenents/report.card
Ce composant correspond à un signalement dans la liste.
Il sert d'affichage et faire de différentes actions dont:
- Modifier le signalement.
- Annuler la modification.
- Supprimer le signalement.

Pour la suppression une modale apparait pour confirmer la suppression, afin que cette modification ne sois pas faite par accident.

### components/report-form
Ce composant permet à la fois d'ajouter et de modifier un signalement. 
Le formulaire comprend la validation des champs. Et l'auto-completion par le navigateur.

### componenents/home
Parent des autres composants, plutôt que gérer tout dans l'app.component afin de pouvoir ajouter plus de fonctionalitées et plusieurs routes.

### Composants simples d'affichage
- components/author-panel
- components/offer-panel
- components/observations-panel

## Bibliothèques additionelles
- moment.js pour la gestion des dates et affichage.

## Evolution non implémentée.
- ScrollTo sur un signalement à l'ajout/modification.






