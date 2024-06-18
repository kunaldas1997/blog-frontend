import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  postData = new FormGroup({
    title: new FormControl(''),
    excerpt: new FormControl(''),
    post_content: new FormControl(''),
    post_category: new FormControl(''),
  })

  jsonData: any;
  constructor(private create: CreateService) { }
  text: string = '';
  onSubmit(): void {
    try {
      console.log(this.postData.value);
      this.create.setPost('posts/', this.postData.value).subscribe((data: any) => {
        this.jsonData = data;

        this.postData.reset();
        console.log(this.jsonData.message);
      })
    } catch (err) {
      console.log(err);
    }
  }

  onInput(): void {
    const textArea = document.getElementById("content") as HTMLTextAreaElement;
    if (textArea.scrollHeight > 1118.5) {
      textArea.style.height = '1118.5px';
    }
  }
}
