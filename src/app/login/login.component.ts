import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginserviceService } from './loginservice.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteGuardService } from '../route-guard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashService } from '../dashboard/dash.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginserviceService, private router: Router, private routeGuard: RouteGuardService, private dash: DashService) { }
  jsonData: any;


  onSubmit(): void {

    try {
      this.loginService.getToken('user/login', this.login.value).subscribe((data: any) => {
        this.jsonData = data;
        if (this.jsonData.hasOwnProperty('token')) {
          sessionStorage.setItem('token', this.jsonData.token);
          this.dash.userNickName = this.jsonData.user.nickname;
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
