import { Component , OnInit} from '@angular/core';
import { APIService } from '../../../services/api.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit{

  films: any[] = [];

  constructor(private filmService: APIService) { }

  
    ngOnInit(): void {
      this.filmService.getFilms().subscribe((filmsData: { results: any[] }) => {
        this.films = filmsData.results;
        console.log('Films:', this.films);
    });
  }
}
