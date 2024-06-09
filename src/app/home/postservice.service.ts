import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  private apiURL = 'https://backend-423211.ue.r.appspot.com/api/';
  constructor(private http: HttpClient) { }


  getPosts(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiURL + endpoint, { responseType: 'json' });
  }
  getSearch(endPoint: string, searchTerm: string): Observable<any> {
    return this.http.get<any>(this.apiURL + endPoint + "?query=" + searchTerm)
  }
}
