import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  private apiURL = 'https://backend-423211.ue.r.appspot.com/';
  constructor(private http: HttpClient) { }

  jsonResponse: any;
  getToken(endPoint: string, body: any): Observable<any> {
    return this.http.post<any>(this.apiURL + endPoint, body, { withCredentials: true, responseType: 'json' }).pipe(catchError(this.handleError));
  }


  handleError(err: HttpErrorResponse) {
    console.log(
      "Error Encountered", err
    );

    return throwError(() => new Error("Something Went Wrong"));
  }
}
