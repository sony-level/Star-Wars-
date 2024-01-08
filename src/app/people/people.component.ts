import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

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

  person: any;
  films: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  species: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: APIService) { }

  ngOnInit(): void {
    this.loadPeople();

    this.route.paramMap.subscribe(params => {
      const personId = params.get('id');
      if (personId) {
        this.loadPersonDetails(personId);
      }
    });
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
            this.assignItems(type, personDetails);
          }
        });
      });
    } else {
      // Aucune donnée disponible pour cette personne
      this.assignItems(type, []);
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




  loadPersonDetails(personId: string): void {
    const id: number = parseInt(personId, 10); // Convert personId to a number
    this.apiService.getPerson(id).subscribe(
      (data) => {
        this.person = data;
        this.loadConnections(data);
      },
      (error) => {
        console.error('Error fetching person details:', error);
      }
    );
  }

  loadConnections(person: any): void {
    this.loadItems('films', person.films);
    this.loadItems('starships', person.starships);
    this.loadItems('vehicles', person.vehicles);
    this.loadItems('species', person.species);
  }

  loadItems(type: string, urls: string[]): void {
    const items: any[] = [];
    urls.forEach((url: string) => {
      this.apiService.getData(url).subscribe((data) => {
        items.push(data);

        if (items.length === urls.length) {
          this.assignItems(type, items);
        }
      });
    });
  }

  assignItems(type: string, items: any[]): void {
    switch (type) {
      case 'films':
        this.films = items;
        break;
      case 'starships':
        this.starships = items;
        break;
      case 'vehicles':
        this.vehicles = items;
        break;
      case 'species':
        this.species = items;
        break;
      default:
        break;
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
