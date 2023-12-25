import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit{

  people: any[] = [];
  currentIndex: number = 0
 

  constructor(private peopleService: APIService){
  }

 
ngOnInit() {

  this.peopleService.getPeople().subscribe((data: any) => {
    this.people = data.results;
    console.log('People:', this.people);
  });


}
showNextUser() {
  if (this.currentIndex < this.people.length - 1) {
    this.currentIndex++;
  } else {
    this.currentIndex = 0;
  }
}
}
