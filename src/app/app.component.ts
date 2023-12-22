import { Component , OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-swapi-project';
  films: any;
  people: any;
  planets: any;
  starships: any;
  vehicles: any;
  species: any;
  data: any;
 
  constructor(private Service: APIService) {
     this.getAllData();
  }
 
  getAllData() {
     this.Service.getFilms().subscribe(data => {
       console.log('Films:', data);
       this.films = data.results; // Fix: Assign the results to the films variable
     });
 
     this.Service.getPeople().subscribe(data => {
       console.log('People:', data);
       this.people = data.results; // Fix: Assign the results to the people variable
     });
 
     this.Service.getPlanets(1).subscribe(data => {
       console.log('Planets:', data);
       this.planets = data.results; // Fix: Assign the results to the planets variable
     });
 
     this.Service.getStarships().subscribe(data => {
       console.log('starships:', data);
       this.starships = data.results; // Fix: Assign the results to the starships variable
     });
 
     this.Service.getVehicles().subscribe(data => {
       console.log('Vehicles:', data);
       this.vehicles = data.results; // Fix: Assign the results to the vehicles variable
     });
 
     this.Service.getSpecies(1).subscribe(data => {
       console.log('Species:', data);
       this.species = data.results; // Fix: Assign the results to the species variable
     });
  }
 
  ngOnInit() {
     this.getAllData();
  }

}
