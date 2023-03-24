import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Env variable
import { environment } from 'src/environments/environment';
//Shared types
import * as fromSharedTypes from '../types/_index'


/*
 * SERVICE TEMPLATE
 * Use this template to create own service. Import your service to SharedModuel through _index.ts
*/

@Injectable({
  providedIn: 'root'
})
export class TmpService {

    constructor(private http: HttpClient) {}
}
