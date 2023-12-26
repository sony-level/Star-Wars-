import { Component , OnInit} from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{

  films: any[] = [];
  currentPage: number = 1;

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    this.apiService.getFilms(this.currentPage).subscribe(
      (data) => {
        console.log('Films', data)
        this.films = data.results;
        // Si l'API renvoie des informations sur la pagination, vous pouvez ajuster la logique ici
      },
      (error) => {
        console.error('Erreur lors du chargement des films', error);
      }
    );
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
}

