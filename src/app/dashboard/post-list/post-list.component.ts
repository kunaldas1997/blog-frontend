import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashServiceService } from '../dash-home/dash-service.service';
import { PosteditService } from './postedit.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  jsonData: any;
  message: any;
  constructor(private postEdit: PosteditService) { }


  getData(): void {
    this.postEdit.getPosts("posts").subscribe(data => {
      this.jsonData = data;
    });
  }

  deletePost(id: string): void {
    this.postEdit.deletePost("posts/s?id=", id).subscribe(data => {
      this.message = data;
      this.getData();

    });
  }


  ngOnInit() {
    this.getData();
  }
}
