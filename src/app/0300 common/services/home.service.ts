import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') }

  constructor(private http: HttpClient) { 
    this.initializeValue();
  }

  initializeValue(): void {}

}
