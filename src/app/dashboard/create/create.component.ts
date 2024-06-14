import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  post = new FormGroup({
    title: new FormControl(''),
    excerpt: new FormControl(''),
    post_content: new FormControl(''),
    post_category: new FormControl(''),
  })

  text: string = '';
  onSubmit(): void {

  }

  onInput(): void {
    const textArea = document.getElementById("content") as HTMLTextAreaElement;
    // textArea.style.height = 'auto';
    // textArea.style.height = textArea.scrollHeight + 'px';

    if (textArea.scrollHeight > 1118.5) {
      textArea.style.height = '1118.5px';
    }
  }
}
