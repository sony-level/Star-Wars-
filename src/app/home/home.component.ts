import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIService } from '../../../services/api.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor() { }

  ngOnInit() {
  }
}
