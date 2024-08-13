import { Injectable } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class PageRouterService {
  private apiUrl = "http://localhost:8080/api/posts";
  jsonData: any;

  constructor(private http: HttpClient, private router: Router, private storage: StorageService) { }

  apiFetch(id: string): any {
    this.storage.set('id', id);
    return this.http.get<any>(this.apiUrl + "/s?id=" + this.storage.get('id'), { responseType: 'json' });
  }

  getData(id: string): void {
    try {
      this.apiFetch(id).subscribe((data: any) => {
        this.jsonData = data;
        let path = "/posts/s?id=" + id;
        this.router.navigate([path]);
      });
    } catch (err) {
      console.log(err);
      this.router.navigateByUrl('/');
    }
  }
}
