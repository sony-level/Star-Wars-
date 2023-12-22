import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIService } from '../../../services/api.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  films: any;
  people: any;
  planets: any;
  starships: any;
  vehicles: any;
  species: any;
  constructor(private appComponent: AppComponent) { }




  ngOnInit() {
    // Vous pouvez maintenant appeler les fonctions de AppComponent ici
    this.films = this.appComponent['getFilms']();
    this.people = this.appComponent['getPeople']();
    this.planets = this.appComponent['getPlanets']();
    this.starships = this.appComponent['getStarships']();
    this.vehicles = this.appComponent['getVehicles']();
    this.species = this.appComponent['getSpecies']();
  }
}
