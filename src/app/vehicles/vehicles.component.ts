import { Component, OnInit } from '@angular/core';
import { APIService } from 'services/api.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit{

  vehiclesData: any[] = [];
  currentPage: number = 1;
  pilots: any[] = [];
  films: any[] = [];
  selectedVehicle: any | null = null;


  constructor( private vehiculeService : APIService) {}

  ngOnInit(): void {
    this.vehiculeService.getVehicles().subscribe((data: any) => {
      this.vehiclesData = data.results;
      console.log('les vehicules:' , data)
    });

    this.loadData(this.currentPage);
  }

  showVehicleDetails(vehicle: any): void {
    this.selectedVehicle = vehicle;
    if (vehicle) {
      this.getRelatedData(vehicle.pilots, vehicle.films);
    }
  }

  loadData(page : any): void {
    this.vehiculeService.getVehicles(page).subscribe((data: any) => {
      this.vehiclesData = data.results;
    });
  }
  loadNextPage(): void {
    this.currentPage++;
    this.loadData(this.currentPage);
  }

  loadPreviousPage(): void{
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData(this.currentPage);
    }

  }

  getRelatedData(pilotUrls: string[], filmUrls: string[]): void {
    this.pilots = [];
    this.films = [];

    pilotUrls.forEach((pilotUrl: string) => {
      this.vehiculeService.getData(pilotUrl).subscribe((pilotData: any) => {
        this.pilots.push(pilotData);
      });
    });

    filmUrls.forEach((filmUrl: string) => {
      this.vehiculeService.getData(filmUrl).subscribe((filmData: any) => {
        this.films.push(filmData);
      });
    });
  }

}
