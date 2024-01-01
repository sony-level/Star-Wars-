import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent {

  
  planets: any[] = [];
  id: number = 0; 
  selectedPlanet: any = null;
  residents: any[] = [];
  films: any[] = [];

  constructor(private planetService: APIService) { }

  ngOnInit(): void {
    this.planetService.getPlanets(this.id).subscribe((data: any) => {
      this.planets = data.results;
      console.log('Planets:', this.planets);
    });
  }
 

  getPlanetDetails(url: string): void {
    this.planetService.getData(url).subscribe((planetData: any) => {
      this.selectedPlanet = planetData;
      this.getResidentsAndFilms(planetData.residents, planetData.films);
    });
}


getResidentsAndFilms(residentsUrls: string[], filmsUrls: string[]): void {
  this.residents = [];
  this.films = [];

  // Récupérer les détails des résidents
  residentsUrls.forEach((residentUrl: string) => {
    this.planetService.getData(residentUrl).subscribe((residentData: any) => {
      this.residents.push(residentData);
    });
  });

  // Récupérer les détails des films
  filmsUrls.forEach((filmUrl: string) => {
    this.planetService.getData(filmUrl).subscribe((filmData: any) => {
      this.films.push(filmData);
    });
  });
}

}
