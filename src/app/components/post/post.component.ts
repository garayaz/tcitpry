import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostInterface } from '../../interfaces/post.interface';
import { FormComponent } from '../form/form.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormComponent, FormsModule, FilterComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit{
  postList:PostInterface[]=[];
  newPost: PostInterface = { id: 0, name: '', description: '' };
  @Output() newPostAdded = new EventEmitter<PostInterface>();
  constructor(private postService: PostService){}


  ngOnInit(): void {
    this.getPosts();
    this.postService.getPostById('1');
  }

getPosts(){
  this.postService.getPosts().subscribe({
    next: (result) => {
      this.postList = result;
    }, 
    error: (err)=>{
      console.log(err);
    }
  })
  this.postService.deletePost('5')
}

delPost(id: number){
    this.postService.deletePost(id.toString())
  }

}
