import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class APIService {

  private ApiUrl = 'http://swapi.dev/api/';


  constructor(private http: HttpClient) { }


 
  getAll(): Observable<any> {
    return this.http.get(`${this.ApiUrl}`);
 }

 getFilms(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}films/`);
 }

 getFilm(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/films/${id}/`);
 }

 search(searchTerm: string, type?: string): Observable<any> {
    let url = `${this.ApiUrl}?search=${searchTerm}&format=json`;
    return this.http.get<any>(url);
 }

 getPeople(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}people/`);
 }

 getPerson(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/people/${id}/`);
 }

 addPerson(person: any): Observable<any> {
    const body = JSON.stringify(person);
    return this.http.post('https://us-central1-lab4-85e63.cloudfunctions.net', body);
 }

 getPlanets(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/planets/${id}/`);
 }

 getSpecies(id: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/species/${id}/`);
 }


 getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}vehicles/`);
 }

 getStarships(): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}starships/`);
 }
}