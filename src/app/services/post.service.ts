import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 API_URL: string = 'http://localhost:5052/Posts';
   /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<any>
  {
    return this.httpClient.get(this.API_URL).pipe(res=>res);
  };
 
  createPost(post: PostInterface): Observable<any> {
    console.log('Enviando post a la API:', post);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.httpClient.post(this.API_URL, JSON.stringify(post)).pipe(
      res=>res
    );
  };

  create(post:PostInterface): Observable<any> {

    return this.httpClient.post(this.API_URL, JSON.stringify(post), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  };

  getPostById(id: string): Observable<any> {
    return this.httpClient.get<PostInterface>(this.API_URL+'/1');
  };

  deletePost(id: string){

    return this.httpClient.delete(`${this.API_URL}/${id}`)
    .pipe(catchError(this.errorHandler));
  };
    

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 };
}
