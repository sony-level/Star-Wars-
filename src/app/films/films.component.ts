import { Component , OnInit} from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{

  films: any[] = [];
  currentPage: number = 1;
  selectedFilm: any;
  characters: any[] = [];
  planets: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  species: any[] = [];

  constructor(private apiService: APIService , private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {

    const category = 'films';
    const searchTerm = '';
    const cacheKey = `${category}_${searchTerm}`;

    this.apiService.getFilms(this.currentPage).subscribe(
      (data) => {
        console.log('Films', data)
        this.films = data.results;
      
      },
      (error) => {
        console.error('Erreur lors du chargement des films', error);
      }
    );

    const cachedData = null;

    if (cachedData) {
      // Si les données sont déjà en cache, utilisez-les
      this.films = cachedData;
      console.log('Données récupérées depuis la cache :', this.films);
    } else {
      // Si les données ne sont pas en cache, effectuez la requête HTTP
      this.apiService.searchByCategory(category, searchTerm).subscribe(
        (data) => {
          if (data) {
            this.films = data.results;
            // Mettez en cache les données pour une utilisation ultérieure
            this.apiService.cacheData(cacheKey, this.films);
            console.log('Données récupérées depuis le serveur :', this.films);
          }
        },
        (error) => {
          console.error('Erreur lors du chargement des films', error);
        }
      );
    }
  }
  
  

  // Fonction pour charger la page suivante
  loadNextPage() {
    this.currentPage++;
    this.loadFilms();
  }

  // Fonction pour charger la page précédente
  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFilms();
    }
  }

  extractIdFromUrl(url: string): number {
    const id = url.split('/').filter(Boolean).pop();
    return id ? +id : 0;
  }

   // Fonction pour afficher les détails d'un film sélectionné
   showFilmDetails(film: any) {
    this.selectedFilm = film;
    this.getDetails('characters', film.characters);
    this.getDetails('planets', film.planets);
    this.getDetails('starships', film.starships);
    this.getDetails('vehicles', film.vehicles);
    this.getDetails('species', film.species);
  }

  assignDetails(type: string, details: any[]): void {
    switch (type) {
      case 'characters':
        this.characters = details;
        break;
      case 'planets':
        this.planets = details;
        break;
      case 'starships':
        this.starships = details;
        break;
      case 'vehicles':
        this.vehicles = details;
        break;
      case 'species':
        this.species = details;
        break;
      default:
        break;
    }
  }

  getDetails(type: string, urls: string[]): void {
    const connectionDetails: any[] = [];

    if (urls && urls.length > 0) {
      urls.forEach((url: string) => {
        this.apiService.getData(url).subscribe((data) => {
          connectionDetails.push(data);

          if (connectionDetails.length === urls.length) {
            this.assignDetails(type, connectionDetails);
          }
        });
      });
    } else {
      // Aucune donnée disponible pour cette connexion
      this.assignDetails(type, []);
    }
}

}
