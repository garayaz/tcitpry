import { Component, EventEmitter, Output } from '@angular/core';
import { PostInterface } from '../../interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PostComponent, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent {

  form!: FormGroup;
  postList:PostInterface[]=[];
  newPost: PostInterface = { id: 0, name: '', description: '' };
  @Output() nuevoPost = new EventEmitter<boolean>();

  constructor(
    private postComponent: PostComponent,
    private postService: PostService
  ) {}

onAddPost(event: Event) {
  event.preventDefault();
  console.log('onAddPost: ', this.newPost);
  // Crear un objeto con los datos a enviar en formato JSON
  const postData = {
    id: this.newPost.id,
    name: this.newPost.name,
    description: this.newPost.description
  };
  
  this.postService.createPost(postData).subscribe((post) => {
    this.postList.push(post);
    this.newPost = { id: 0, name: '', description: '' };
    this.nuevoPost.emit(true);
  }, (error) => {
    console.error('ERROR AL CREAR POST:', error);

    
  });
}

ngOnInit(): void {
  this.form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', Validators.required)
  });
}

get f(){
  return this.form.controls;
}

submit(){
  this.postService.create(this.newPost).subscribe((res:any) => {
       console.log('Post created successfully!');
  })
}

}
