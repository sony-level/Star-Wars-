import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent {

  
  planets: any[] = [];
 

  constructor(private planetService: APIService) { }

  ngOnInit(): void {
    this.planetService.getPlanets(this.id).subscribe((data: any) => {
      this.planets = data.results;
      console.log('Planets:', this.planets);
    });
  }
  id: number = 0; // Change the type of 'id' to 'number'
}
