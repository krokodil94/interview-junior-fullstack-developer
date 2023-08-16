import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../city.model'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  searchCities(query: string, page: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/cities/search?query=${query}&page=${page}`
    );
  }
}


