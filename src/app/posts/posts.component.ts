
import { MockPost } from './../mock-posts';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts$: Observable<MockPost[]>;
  posts: MockPost[];

  constructor(postService$: PostService) { 
    this.posts = postService$.getMockPosts();
  }

  ngOnInit() {
  }

}
