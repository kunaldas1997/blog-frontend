import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateService } from './create.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  @ViewChild('content', { static: true }) editableDiv!: ElementRef;

  jsonData: any;
  contentHTML: any;
  constructor(private create: CreateService, private renderer: Renderer2, private sanitizer: DomSanitizer) { }

  text: string = '';
  selectedText: string = '';
  textArea!: HTMLTextAreaElement;
  sanitizedText: any;

  postData = new FormGroup({
    title: new FormControl(''),
    excerpt: new FormControl(''),
    post_content: new FormControl(''),
    post_category: new FormControl(''),
  })


  onSubmit(): void {

    console.log(this.postData);
    try {
      console.log(this.postData.value);
      this.create.setPost('posts/', this.postData.value).subscribe((data: any) => {
        this.jsonData = data;
        this.postData.reset();
        this.editableDiv.nativeElement.innerHTML = '';
        this.updateContent();
        console.log(this.jsonData.message);
      })
    } catch (err) {
      console.log(err);
    }
  }

  shortcuts(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'p') {
      event.preventDefault();
      this.genPara();
    } else if (event.ctrlKey && event.key === '.') {
      event.preventDefault();
      this.genOL();
    } else if (event.ctrlKey && (event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6')) {
      event.preventDefault();
      this.genHeadTag(event.key);
    } else if (event.ctrlKey && event.key === 'Delete') {
      event.preventDefault();
      this.cleanEmptyTags();
    }
  }



  findParentTag(node: Node): HTMLElement | null {
    if (!node) {
      return null;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      return node as HTMLElement;
    }
    return this.findParentTag(node.parentNode!);
  }

  // Methods to generate paragraph, ordered list, and heading tags (unchanged from previous)
  genPara(): void {
    this.insertTag('p');
  }

  genOL(): void {
    this.insertTag('ol');
  }

  genHeadTag(tag: string): void {
    this.insertTag(`h${tag}`);
  }

  // Helper method to insert tags at selected range (unchanged from previous)
  insertTag(tagName: string): void {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    const selectionText = range.toString();

    const newNode = document.createElement(tagName);
    newNode.textContent = selectionText;

    range.deleteContents();
    range.insertNode(newNode);
    this.updateContent(); // Update content after insertion
  }

  // Helper method to clean empty tags (unchanged from previous)
  cleanEmptyTags(): void {
    const editor = this.editableDiv.nativeElement.innerHTML;
    const emptyTags = editor.querySelectorAll('p:empty, h2:empty, h3:empty, h4:empty, h5:empty, h6:empty');
    emptyTags.forEach((tag: { remove: () => any; }) => tag.remove());
    this.updateContent(); // Update content after cleaning
  }



  updateContent(): void {
    const editorContent = this.editableDiv.nativeElement.innerHTML;
    this.contentHTML = editorContent;

    this.sanitizedText = this.contentHTML ? this.sanitizer.bypassSecurityTrustHtml(this.contentHTML) : '';

    this.postData.get('post_content')?.setValue(this.sanitizedText['changingThisBreaksApplicationSecurity']);
  }
}
