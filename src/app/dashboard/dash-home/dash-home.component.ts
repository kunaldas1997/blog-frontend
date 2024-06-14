import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashServiceService } from './dash-service.service';
import { json } from 'stream/consumers';
import { CommonModule } from '@angular/common';
import { TitleTrunctPipe } from "./title-trunct.pipe";

@Component({
    selector: 'app-dash-home',
    standalone: true,
    templateUrl: './dash-home.component.html',
    styleUrl: './dash-home.component.scss',
    imports: [CommonModule, TitleTrunctPipe]
})
export class DashHomeComponent {

  jsonData: any;
  formattedData: any;
  titleList: string[] = [];
  constructor(private dataFetch: DashServiceService) { }

  getData(): void {
    this.dataFetch.getPosts("posts").subscribe(data => {

      this.formattedData = data.map((post: { publish_date: string; }) => {
        const date = this.formatDate(post.publish_date).toString();
        return { ...post, publish_date: date };
      });

      this.jsonData = this.formattedData;
      this.extractTitle();
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

  extractTitle(): void {
    for (let i in this.jsonData) {
      this.titleList.push(this.jsonData[i].title);
    }
    console.log(this.titleList);
  }

  ngOnInit() {
    this.getData()
    
  }
}
