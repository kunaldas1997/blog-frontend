import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostserviceService } from './postservice.service';
import { CommonModule, NgFor } from '@angular/common';
import { PageRouterService } from '../page-router.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  showPanel: boolean = false;
  jsonData: any;
  searchJson: any;
  searchterm: string = '';
  formattedData: any;
  constructor(private postService: PostserviceService, private pageRouter: PageRouterService, private router: Router) { }


  onInput(event: any) {
    this.showPanel = !this.showPanel;
    if (event.data) {
      this.searchterm += event.data;
    } else {
      this.searchterm = this.searchterm.slice(0, -1);
    }

    this.postService.getSearch("posts/search", this.searchterm).subscribe(data => {
      this.searchJson = data;
    });

  }

  handleClick(post_Id: string) {
    this.showPanel = true;
    this.pageRouter.getData(post_Id);
    this.showPanel = false; ''
  }

  getData(): void {
    this.postService.getPosts("posts").subscribe(data => {

      this.formattedData = data.map((post: { publish_date: string; }) => {
        const date = this.formatDate(post.publish_date).toString();
        return { ...post, publish_date: date };
      });

      this.jsonData = this.formattedData;
    });
  }

  formatDate(dateTime: string): string {
    const date: Date = new Date(dateTime);
    const formattedData: string = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedData;
  }

  open(): void {
    this.router.navigate(['/about']);
  }

  ngOnInit() {
    this.getData();

  }
}
