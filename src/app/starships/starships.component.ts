import { Component  , OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit{


  starships: any[] = [];
  currentPage: number = 1;
  selectedStarship: any = null;
  films: any[] = [];
  people: any[] = [];
  planets: any[] = [];
 
  constructor(private starshipService: APIService) { }

  ngOnInit(): void {
    this. starshipService.getStarships().subscribe((data: any) => {
      this.starships = data.results;
      console.log('les starships:' , data)
    });

    this.loadData(this.currentPage);
  }
  loadData(pageNumber :number){
    this.starshipService.getStarships(pageNumber).subscribe((data: any) => {
      this.starships = data.results;
    });
  }
  loadNextPage(): void {
    this.currentPage++;
    this.loadData(this.currentPage);
  }

 
  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData(this.currentPage);
    }
  }

  displayConnections(starship: any): void {
    this.films = [];
    this.people = [];
    this.planets = [];
  
    // Récupérer les détails des films, des pilotes et des planètes en utilisant une seule méthode
    const filmUrls = starship.films;
    const pilotUrls = starship.pilots;
    const planetUrls = starship.planets;
  
    this.getpeopleAndFilms(pilotUrls, filmUrls, planetUrls);
  }
  
  getpeopleAndFilms(peopleUrls: string[], filmsUrls: string[], planetUrls: string[]): void {
    this.people = [];
    this.films = [];
    this.planets = [];
  
    // Récupérer les détails des personnes
    peopleUrls.forEach((peopleUrl: string) => {
      this.starshipService.getData(peopleUrl).subscribe((peopleData: any) => {
        this.people.push(peopleData);
      });
    });
  
    // Récupérer les détails des films
    filmsUrls.forEach((filmUrl: string) => {
      this.starshipService.getData(filmUrl).subscribe((filmData: any) => {
        this.films.push(filmData);
      });
    });
  }
  
  showStarshipDetails(starship: any): void {
    this.selectedStarship = starship;
    if (starship) {
      this.displayConnections(starship);
    }
  }


  }



