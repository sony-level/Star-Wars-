import { Component , OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Observable, forkJoin, map } from 'rxjs';
import { DataserviceService } from '../../services/dataservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'my-swapi-project';
  films: any;
  people: any;
  planets: any;
  starships: any;
  vehicles: any;
  species: any;
  data: any;

  constructor(private Service: APIService
    , private DataService: DataserviceService) {
    this.getAllData();
  }

  getAllData(): Observable<any> {
    return forkJoin([
      this.Service.getFilms(),
      this.Service.getPeople(),
      this.Service.getPlanets(1),
      this.Service.getStarships(),
      this.Service.getVehicles(),
      this.Service.getSpecies(1)
    ]).pipe(
      map(([films, people, planets, starships, vehicles, species]: [any, any, any, any, any, any]) => {
        console.log('Films:', films);
        console.log('People:', people);
        console.log('Planets:', planets);
        console.log('Starships:', starships);
        console.log('Vehicles:', vehicles);
        console.log('Species:', species);
        this.films = films.results;
        this.people = people.results;
        this.planets = planets.results;
        this.starships = starships.results;
        this.vehicles = vehicles.results;
        this.species = species.results;

        this.DataService.updateData({
          films: this.films,
          people: this.people,
          planets: this.planets,
          starships: this.starships,
          vehicles: this.vehicles,
          species: this.species
        });

        // Return the data after mapping
        return {
          films: this.films,
          people: this.people,
          planets: this.planets,
          starships: this.starships,
          vehicles: this.vehicles,
          species: this.species
        };
      })
    );
  }



  ngOnInit() {
    this.getAllData().subscribe((data) => {
      this.data = data; 
  });

}

}
