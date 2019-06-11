import { mockPosts, MockPost } from './mock-posts';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import axios, { AxiosPromise } from 'axios';
import { ParseSourceFile } from '@angular/compiler';
// import { Rxios } from 'rxios';


export class Post {
  id: string;
  title: string;
  author: string;
  delta: object;
  description: string;
  category: string;
  imageUrl: string;
  dateCreated: Date;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private mockPosts$: Observable<MockPost[]>;
  // private rxHttp: Rxios;
  
  constructor(private http: HttpClient) { 
    this.mockPosts$ = Observable.create(mockPosts);

    // this.rxHttp = new Rxios();
  }

  getMockPosts(): MockPost[] {
    return mockPosts;
  }

  getMockPost(id: number): MockPost {
    if(!mockPosts[id]) return null;

    return mockPosts[id];

  }

  getPosts() {
    return axios.get('http://localhost:5000/api/posts');
  }

  // getPostsRX(): Observable<Post[]> {
  //   return this.rxHttp.get<Post[]>('http://localhost:5000/api/posts');
  // }

  getPost(id: String) {
    return axios.get(`http://localhost:5000/api/posts/${id}`);
  }

  newPost(post: Post) {
    return axios.post('http://localhost:5000/api/posts/', {
      id: post.id,
      title: post.title,
      author: post.author,
      delta: post.delta,
      description: post.description,
      category: post.category,
      imageUrl: post.imageUrl,
      dateCreated: Date.now,
      likes: 0
    });
  }

  updatePost(id: string, post: Post) {
    return axios.put(`http://localhost:5000/api/posts/${id}`,
    {
      id: post.id,
      title: post.title,
      author: post.author,
      delta: post.delta,
      description: post.description,
      category: post.category,
      imageUrl: post.imageUrl,
      dateCreated: post.dateCreated,
      likes: post.likes
    });
  }

  deletePost(post: Post) {
    return axios.delete(`http://localhost:5000/api/posts/${post.id}`);
  }
}

