import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIService } from '../../../services/api.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  subscription: Subscription;

  All: any[] = []
  films: any[] = [];
  people: any[] = [];
  planets: any[] = [];
  species: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];

  constructor(private apiService: APIService) {
    this.subscription = new Subscription();
  }

  selectedFilm: any; 

showFilmDetails(film: any) {
  this.selectedFilm = film;
}
  ngOnInit(){
  
    this.apiService.getAll().subscribe({
      next: (All) => {
        console.log('All:', All );
        this.All = All.results;
      },
      error: (error) => {
        console.error('Erreur lors de la requête getAll:', error);
      }
    });

    
    this.apiService.getFilms().subscribe({
      next: (films) => {
        console.log('Films:', films)
        this.films = films.results;
      },
      error: (filmsError) => {
        console.error('Erreur lors de la requête getFilms:', filmsError);
      }
    });

    
    this.apiService.getPeople().subscribe((people) => {
      console.log('People:', people);
      this.people = people.results;
    });

    
    this.apiService.getPlanets().subscribe({
      next: (planets) => {
        console.log('Planets:', planets);
        this.planets = planets.results;
      },
      error: (planetsError) => {
        console.error('Erreur lors de la requête getPlanets:', planetsError);
      }
    });

 
    this.apiService.getSpecies().subscribe((species) => {
      console.log('Species:', species);
      this.species = species.results;
    });

  
    this.apiService.getStarships().subscribe({
      next: (starships) => {
        console.log('Starships:', starships);
        this.starships = starships.results;
      },
      error: (starshipsError) => {
        console.error('Erreur lors de la requête getStarships:', starshipsError);
      }
    });

    // Appel à la méthode getVehicles
    this.apiService.getVehicles().subscribe({
      next: (vehicles) => {
        console.log('Vehicles:', vehicles);
        this.vehicles = vehicles.results;
      },
      error: (vehiclesError) => {
        console.error('Erreur lors de la requête getVehicles:', vehiclesError);

      }
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
 }

  }



