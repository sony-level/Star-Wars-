import { Component , OnInit } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'my-swapi-project';

  ngOnInit() {
    
    M.AutoInit();
  }

}

