import { Component , OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Movies-v1';
  films: any[] = [];

  constructor(private apiService: APIService ) { }

  ngOnInit(): void {
    this.apiService.getFilms().subscribe((data: any) => {
      this.films = data.results;
    });
  }
​

}
