import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginserviceService } from './loginservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private loginService: LoginserviceService) { }
  jsonData: any;


  onSubmit(): void {

    try {
      this.loginService.getToken('user/login', this.login.value).subscribe((data: any) => {
        this.jsonData = data;
        if (this.jsonData.hasOwnProperty('token')) {
          console.log(this.jsonData.token);
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
