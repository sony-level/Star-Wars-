import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private data = new BehaviorSubject<any>(null);
  sharedData = this.data.asObservable();

  constructor() { }

  updateData(data: any) {
    this.data.next(data);
  }

}
