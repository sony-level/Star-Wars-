import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit{

  
  peopleList: any[] = [];
  currentPage: number = 1;
  personFilms: any[] = [];
  personStarships: any[] = [];
  personVehicles: any[] = [];
  personSpecies: any[] = [];
  selectedPerson: any;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.apiService.getPeople(this.currentPage).subscribe(
      (data) => {
        console.log('People:', data)
        this.peopleList = data.results;
      },
      (error) => {
        console.error('Error fetching people:', error);
      }
    );
  }

  getPersonDetails(type: string, urls: string[]): void {
    const personDetails: any[] = [];
  
    if (urls && urls.length > 0) {
      urls.forEach((url: string) => {
        this.apiService.getData(url).subscribe((data) => {
          personDetails.push(data);
  
          if (personDetails.length === urls.length) {
            this.assignPersonDetails(type, personDetails);
          }
        });
      });
    } else {
      // Aucune donnée disponible pour cette personne
      this.assignPersonDetails(type, []);
    }
  }
  
  assignPersonDetails(type: string, details: any[]): void {
    switch (type) {
      case 'films':
        this.personFilms = details;
        break;
      case 'starships':
        this.personStarships = details;
        break;
      case 'vehicles':
        this.personVehicles = details;
        break;
      case 'species':
        this.personSpecies = details;
        break;
      // Ajoutez d'autres cas au besoin
      default:
        break;
    }
  }

  showPersonDetailsByFilm(film: any) {
    // Réinitialisez les détails des personnes
    this.personFilms = [];
    this.personStarships = [];
    this.personVehicles = [];
    this.personSpecies = [];
  
    // Parcourez la liste des personnes
    for (const person of this.peopleList) {
      // Vérifiez si la personne est présente dans les characters du film
      if (film.characters.includes(person.url)) {
        // Chargez les détails des connexions pour cette personne
        this.getPersonDetails('films', person.films);
        this.getPersonDetails('starships', person.starships);
        this.getPersonDetails('vehicles', person.vehicles);
        this.getPersonDetails('species', person.species);
      }
    }
  }
  nextPage(): void {
    this.currentPage++;
    this.loadPeople();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPeople();
    }
  }
}
