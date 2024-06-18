import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosteditService {


  private apiURL = 'https://backend-423211.ue.r.appspot.com/api/';

  constructor(private http: HttpClient) { }

  getPosts(endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiURL + endpoint, { responseType: 'json' });
  }



  deletePost(endpoint: string, id: string): Observable<any> {
    const header_obj = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.delete(this.apiURL + endpoint + id, { headers: header_obj }).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    console.log(
      "Error Encountered", err
    );

    return throwError(() => new Error("Something Went Wrong"));
  }

}
