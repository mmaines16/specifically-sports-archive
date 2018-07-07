import { PostService } from './../../post.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MockPost } from '../../mock-posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  posts$: Observable<MockPost[]>;
  posts: MockPost[];

  constructor(postService$: PostService) { 
    this.posts = postService$.getMockPosts();
  }

  ngOnInit() {
  }

}
