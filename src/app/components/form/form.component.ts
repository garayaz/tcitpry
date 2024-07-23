import { Component, EventEmitter, Output } from '@angular/core';
import { PostInterface } from '../../interfaces/post.interface';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [PostComponent, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})


export class FormComponent {
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

  this.postService.createPost(postData).subscribe((createdPost) => {
    this.postList.push(createdPost);
    this.newPost = { id: 0, name: '', description: '' };
    this.nuevoPost.emit(true);
  }, (error) => {
    console.error('ERROR AL CREAR POST:', error);
    // Aquí puedes manejar el error de una manera más apropiada,
    // como mostrar un mensaje de error al usuario
  });
}
}
