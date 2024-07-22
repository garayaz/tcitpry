import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostInterface } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{

  postList:PostInterface[]=[];
  constructor(private postService: PostService){}
  ngOnInit(): void {
    this.getPosts();
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
}
}
