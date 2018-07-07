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

  getMockPosts(): MockPost[] {
    return mockPosts;
  }

  getMockPost(id): MockPost {
    if(!mockPosts[id]) return null;

    return mockPosts[id];

  }
}