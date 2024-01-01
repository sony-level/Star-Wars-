import { Component } from '@angular/core';
import { APIService } from 'services/api.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent {

  speciesData: any[] = [];
  currentPage: number = 1;
  selectedSpecie: any = null;
  films: any[] = [];
  people: any[] = [];
  planets: any[] = [];
  homeworldName: string = '';


  constructor(private specieService: APIService) { }

  ngOnInit(): void {
    this. specieService.getSpecies().subscribe((data: any) => {
      this.speciesData = data.results;
      console.log('les especes:' , data)
    });

    this.loadData(this.currentPage);
  }

  loadData(page: number): void {
    this.specieService.getSpecies(page).subscribe((data: any) => {
      this.speciesData = data.results;
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

  showSpecieDetails(specie: any): void {
    this.selectedSpecie = specie;
    if (specie) {
      this.getpeopleAndFilms(specie.people, specie.films , specie.planet);
  }
}
  getpeopleAndFilms(peopleUrls: string[], filmsUrls: string[] , planetUrls: string[]): void {
    this.people = [];
    this.films = [];
    this.planets = [];
  
    peopleUrls.forEach((peopletUrl: string) => {
      this.specieService.getData(peopletUrl).subscribe((peopleData: any) => {
        this.people.push(peopleData);
      });
    });
  
    // Récupérer les détails des films
    filmsUrls.forEach((filmUrl: string) => {
      this.specieService.getData(filmUrl).subscribe((filmData: any) => {
        this.films.push(filmData);
      });
    });

    planetUrls.forEach((planetUrl: string) => {
      this.specieService.getData(planetUrl).subscribe((planetData: any) => {
        this.planets.push(planetData);
        if (planetData.homeworld) {
          this.homeworldName = planetData.homeworld;
        }
      });
    });
  }

}
