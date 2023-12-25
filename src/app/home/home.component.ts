import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIService } from '../../../services/api.service'
import { DataserviceService } from '../../../services/dataservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
data: any;

  constructor(private DataService: DataserviceService) { 

  };

  ngOnInit() {
    this.DataService.sharedData.subscribe((data: any) => {
      if (data) {
        this.data = data;
      }
    });
  }
  }


