import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 API_URL: string = 'http://localhost:5052/Posts/'
  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<any>
  {
    return this.httpClient.get(this.API_URL).pipe(res=>res);
  }
 
  createPost(post: PostInterface): Observable<PostInterface> {
    console.log('Enviando post a la API:', post);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post<PostInterface>(this.API_URL, JSON.stringify(post), {headers}).pipe(
      res=>res
    );
  }

  getPostById(id: string): Observable<PostInterface> {
    return this.httpClient.get<PostInterface>(`${this.API_URL}/${id}`);
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`).pipe(res=>res);
  }
}
