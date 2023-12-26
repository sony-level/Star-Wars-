import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class APIService {

   private ApiUrl = 'http://swapi.dev/api/';
   
  getAllData: any;

constructor(private http: HttpClient) {}

getAll(): Observable<any> {
   return this.http.get<any>(this.ApiUrl);
 }


 getFilms(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}films/${pageParam}`);
 }

 getFilm(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}films/${id}/`);
 }


 getPeople(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}people/${pageParam}`);
 }

 getPerson(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}people/${id}/`);
 }


 getPlanets(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}planets/${pageParam}`);
 }

 getPlanet(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}planets/${id}/`);
 }


 getSpecies(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}species/${pageParam}`);
 }

 getSpecie(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}species/${id}/`);
 }

 
 getStarships(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}starships/${pageParam}`);
 }

 getStarship(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}starships/${id}/`);
 }


 getVehicles(page?: number): Observable<any> {
   const pageParam = page ? `?page=${page}` : '';
   return this.http.get<any>(`${this.ApiUrl}vehicles/${pageParam}`);
 }

 getVehicle(id: number): Observable<any> {
   return this.http.get<any>(`${this.ApiUrl}vehicles/${id}/`);
 }
}