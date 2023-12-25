import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  peopleData: any; // Declare the peopleData property

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.apiService.getPeople().subscribe((data) => {
      this.peopleData = data.results;
    });
  }
}
