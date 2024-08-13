import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashServiceService {
  private apiURL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPosts(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiURL + endpoint, { responseType: 'json' });
  }
}