
import { MockPost } from './../mock-posts';
import { Post } from './../post.service';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  mockPosts$: Observable<MockPost[]>;
  mockPosts: MockPost[];
  posts: Post[];
  posts$: Observable<Post[]>;

  constructor(postService$: PostService) { 
    this.mockPosts = postService$.getMockPosts();

    postService$.getPosts().then(res=> {
      this.posts = res.data.map(post=>{
        var newPost = new Post();
        newPost.title = post.title;
        newPost.id = post._id;
        newPost.description = post.description;
        newPost.category = post.category;
        newPost.author = post.author;
        newPost.imageUrl = post.imageUrl !== "" ? post.imageUrl : "https://i1.wp.com/www.nationalreview.com/wp-content/uploads/2018/07/world-cup-shootout.jpg?resize=987%2C576&ssl=1";
        newPost.likes = post.likes;
        newPost.dateCreated = post.dateCreated;
        newPost.delta = post.delta;

        return newPost;
      });
    });

    // postService$.getPostsRX().subscribe(posts=> {
    //   this.posts = posts;
    // })
  }

  ngOnInit() {
  }

}
