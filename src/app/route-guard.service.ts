import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  auth: boolean = false;
  constructor() { }

  setAuth(bool: boolean): void {
    this.auth = bool;
  }
}
