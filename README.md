# Star Wars API (SWAPI) Angular App

Ce projet est une application Angular qui utilise l'API SWAPI (Star Wars API) pour afficher des informations sur les personnages, les vaisseaux spatiaux, les planètes et d'autres éléments de l'univers Star Wars.  Veuillez noter que l'API SWAPI peut être sujette à des délais de réponse variables, en particulier lorsque vous effectuez des requêtes complexes ou lorsque le serveur est très sollicité.

# Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

Node.js :  https://nodejs.org/
Angular CLI : https://angular.io/cli

## Configuration du projet

1. Assurez-vous d'avoir Node.js et npm installés sur votre système. Vous pouvez les télécharger depuis [nodejs.org](https://nodejs.org/).

2. Clonez ce dépôt en utilisant la commande suivante :
 ` git clone https://github.com/sony-level/Star-Wars-.git`

 
3. Naviguez vers le répertoire du projet :
    `cd Star-Wars-/`

4. Installez les dépendances en exécutant la commande suivante :
    `npm install`

5. Une fois les dépendances installées, vous pouvez lancer l'application avec la commande :
    `ng serve` ou `npm start`.

6. Ouvrez votre navigateur web et accédez à l'adresse `http://localhost:4200/` pour voir l'application en action.

## Configuration de l'API SWAPI
L'API SWAPI est utilisée pour obtenir des informations sur l'univers Star Wars. Assurez-vous que votre application Angular ait la configuration nécessaire pour effectuer des requêtes à l'API. Vous pouvez le faire dans un service Angular dédié pour gérer ces appels API.

Exemple de service Angular (../services/api.service.ts) :

` import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getCharacter(characterId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/people/${characterId}`);
  }

  // Ajoutez d'autres méthodes pour récupérer d'autres types de données (vaisseaux spatiaux, planètes, etc.)
}
`

N'oubliez pas d'importer HttpClientModule dans votre module Angular (src/app/app.module.ts) et de configurer les autorisations CORS si nécessaire.

## Utilisation de l'application

L'application est conçue pour être conviviale et intuitive. Vous pouvez utiliser le menu de navigation pour accéder aux différentes sections de l'univers Star Wars, telles que les personnages, les vaisseaux spatiaux, les planètes, etc.

## Affichage des données

L'affichage de certaines données depuis l'API SWAPI peut prendre du temps en raison de la complexité des relations entre les entités Star Wars. Pour optimiser les performances, envisagez de mettre en cache ( Ce qui n'a âs encore ete fait pour le momemt) les données lorsque cela est possible ou d'implémenter une pagination pour réduire la charge de travail sur l'API.


## Fonctionnalités principales

- Affichage de la liste des personnages, vaisseaux spatiaux, planètes, etc., à partir de l'API SWAPI.
- Recherche de personnages par nom.
- Détails détaillés pour chaque élément, y compris les informations de base, les caractéristiques et les connexions.
- Possibilité de filtrer et trier les éléments.

## Contribution

Si vous souhaitez contribuer à l'amélioration de cette application, n'hésitez pas à créer une branche, à apporter vos modifications et à soumettre une demande de fusion (pull request). Nous accueillons avec plaisir les contributions de la communauté.

## Auteur

Ce projet a été créé par [Level sony ](https://github.com/sony-level) et [Paul Estrade](https://github.com/PSTRD).

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Amusez-vous bien à explorer l'univers Star Wars avec cette application Angular ! Si vous avez des questions ou des suggestions, n'hésitez pas à les partager. May the Force be with you!
