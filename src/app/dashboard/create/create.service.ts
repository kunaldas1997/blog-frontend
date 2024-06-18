import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiURL = 'https://backend-423211.ue.r.appspot.com/api/';

  constructor(private http: HttpClient) { }


  setPost(endPoint: string, body: any): Observable<any> {
    const header_obj = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.post(this.apiURL + endPoint, body, { headers: header_obj, responseType: 'json' }).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    console.log(
      "Error Encountered", err
    );

    return throwError(() => new Error("Something Went Wrong"));
  }
}
