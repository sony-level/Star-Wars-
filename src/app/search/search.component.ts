import { Component , OnInit} from '@angular/core';
import { APIService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';


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

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.categories = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
    this.selectedCategory = 'films'; // Catégorie sélectionnée par défaut
    this.searchTerm = '';
    this.searchResults = [];
    this.searchSubject.pipe(
      debounceTime(300), // Attendre 300ms après que l'utilisateur ait arrêté de taper
      filter((term: string) => !!term),
      distinctUntilChanged(), // Ne pas faire de requête si le terme de recherche n'a pas changé
      switchMap((term: string) => this.apiService.searchByCategory(this.selectedCategory, term))
    ).subscribe({
      next: (results: any[]) => {
        console.log("le terme recherché est : ", results)
        this.searchResults = results;
      },
      error: (error: any) => {
        console.error('Erreur lors de la recherche :', error);
        this.searchResults = [];
      }
    });
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
  

}
