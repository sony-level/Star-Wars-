import { Component , OnInit, HostListener} from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  categories: string[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
  selectedCategory: string = 'films'; // Catégorie sélectionnée par défaut
  searchTerm: string = '';
  searchResults: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();
  showSuggestions: boolean = false; // Déclaration de showSuggestions
  suggestions: string[] = [];

  constructor(private apiService: APIService , private http: HttpClient) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.suggestions.includes(target.toString())) {
      this.showSuggestions = false;
    }
  }

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.apiService.searchByCategory(this.selectedCategory, this.searchTerm).subscribe({
      next: (results: any[]) => {
        console.log("le terme recherché est : " , results)
        this.searchResults = results;
      },
      error: (error: any) => {
        console.error('Erreur lors de la recherche :', error);
        this.searchResults = [];
      }
    });
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.search();
  }
  
  onInputChange(): void {
    if (this.searchTerm.trim() === '') {
      this.showSuggestions = false;
    } else {
      this.showSuggestions = true;
      this.suggestions = this.generateSuggestions(this.searchTerm, this.selectedCategory); // Assigner les suggestions générées à this.suggestions
    }
  }

  generateSuggestions(searchTerm: string, dataType: string): string[] {
    const suggestions: string[] = []; 
    if (searchTerm.trim() === '') {
      this.suggestions = [];
      return suggestions; 
    }
  
    const apiUrl = `https://swapi.dev/api/${dataType}/?search=${searchTerm}`;
  
    this.http.get(apiUrl).subscribe((data: any) => {
      
      let results: string[] = [];
  
      if (dataType === 'people') {
        results = data.results.map((character: any) => character.name);
      } else if (dataType === 'films') {
        results = data.results.map((film: any) => film.title);
      } else if (dataType === 'planets') {
        results = data.results.map((planet: any) => planet.name);
      } else if (dataType === 'species') {
        results = data.results.map((specie: any) => specie.name);
      } else if (dataType === 'starships') {
        results = data.results.map((starship: any) => starship.name);
      } else if (dataType === 'vehicles') {
        results = data.results.map((vehicle: any) => vehicle.name);
      }
  
      this.suggestions = results;
    });
  
    return suggestions; 
  }
  
  ngOnInit(): void {
    this.categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
    this.selectedCategory = 'films'; // Catégorie sélectionnée par défaut
    this.searchTerm = '';
    this.searchResults = [];
    this.searchSubject.pipe(
      debounceTime(3), // Attendre 30ms après que l'utilisateur ait arrêté de taper
      filter((term: string) => !!term),
      distinctUntilChanged(), // Ne pas faire de requête si le terme de recherche n'a pas changé
      switchMap((term: string) => this.apiService.searchByCategory(this.selectedCategory, term))
    ).subscribe({
      next: (results: any[]) => {
        console.log("le terme recherché est $results : ", results)
        this.searchResults = results;
      },
      error: (error: any) => {
        console.error('Erreur lors de la recherche :', error);
        this.searchResults = [];
      }
    });
  }
  

}
