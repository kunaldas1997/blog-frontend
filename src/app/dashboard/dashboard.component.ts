import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedDiv: number = 0;
  firstChar: string = '';
  userName: string = 'Kunal Das';
  message: string = '';

  setMessage(): void {
    let time = new Date().getHours();

    if (time >= 0 && time < 12) {
      this.message = `Good Day, ${this.userName}`;
    } else if (time > 12 && time < 23){
      this.message = `Good Night, ${this.userName}`;
    }
  }

  extractFirstChar(): void {
    this.firstChar = this.userName.charAt(0);
  }

  ngOnInit() {
    this.setMessage();
    this.extractFirstChar();
    if (localStorage.getItem('current') != null) {

      this.selectedDiv = (localStorage.getItem('current') as unknown) as number;
    } else {
      this.selectedDiv = 0;
    }

    this.selected(0, 'home');
  }
  
  constructor(private router: Router) { }

  selected(divNum: number, page: string) {

    if (this.selectedDiv !== divNum) {
      localStorage.setItem('current', this.selectedDiv.toString());
      this.selectedDiv = this.selectedDiv === divNum ? 0 : divNum;
      this.router.navigate(
        ['/db', { outlets: { renSec: [page] } }]
      )
    }
  }

}
