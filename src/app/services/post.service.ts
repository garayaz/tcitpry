import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
