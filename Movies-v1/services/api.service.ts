import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class APIService {

  ApiUrl = 'http://swapi.dev/api/';


  constructor(private http: HttpClient) { }


  getFilms(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}films/`);
  }

  getPeople(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}people/`);
  }

  getPlanets(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}planets/`);
  }

  getSpecies(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}species/`);
  }

  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}vehicles/`);
  }

  getStarships(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}starships/`);
  }

}
