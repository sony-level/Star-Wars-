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
