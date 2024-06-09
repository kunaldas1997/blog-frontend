import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  name: String = "Kunal Das";
  email: String = " Will be Added Later";
  contact: String = "+91123456789";
  linkedin: String = "https://www.linkedin.com/in/kunal-d-6274b5207/";
  instagram: String = "https://www.instagram.com/iri_descentderp/";
  constructor(private router: Router) { }

  back() {
    this.router.navigate(['/']);

  }
}
