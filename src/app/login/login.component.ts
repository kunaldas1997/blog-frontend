import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginserviceService } from './loginservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteGuardService } from '../route-guard.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginserviceService, private router: Router, private routeGuard: RouteGuardService) { }
  jsonData: any;


  onSubmit(): void {

    try {
      this.loginService.getToken('user/login', this.login.value).subscribe((data: any) => {
        this.jsonData = data;
        console.log(this.routeGuard.auth);
        if (this.jsonData.hasOwnProperty('token')) {
          sessionStorage.setItem('token', this.jsonData.token);
          this.routeGuard.setAuth(true);
          this.router.navigate(['/db']);
        } else {
          console.log(this.jsonData);
        }
      });
    }
    catch (err) {

      console.log(err);
    }

  }


  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });




}
