import { mockPosts, MockPost } from './mock-posts';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private mockPosts$: Observable<MockPost[]>;
  
  constructor() { 
    this.mockPosts$ = Observable.create(mockPosts);
  }

  getMockPosts() {
    return mockPosts;
  }
}