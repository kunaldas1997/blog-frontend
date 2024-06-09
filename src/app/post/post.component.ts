import { Component } from '@angular/core';
import { PageRouterService } from '../page-router.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  jsonData: any;
  id: any;
  mobile: any;
  constructor(private postRedirector: PageRouterService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.getData();

  }

  getData(): void {
    if (!this.postRedirector.jsonData) {
      this.getParamater();
    } else {
      this.jsonData = this.postRedirector.jsonData;
    }
  }

  private getParamater(): void {
    this.id = this.storage.get('id');
    this.postRedirector.apiFetch(this.id).subscribe((data: any) => {
      this.jsonData = data;
    });

  }

  back(): void {
    this.router.navigate(['/']);
  }
  open(): void {
    this.router.navigate(['/about']);
  }
}
