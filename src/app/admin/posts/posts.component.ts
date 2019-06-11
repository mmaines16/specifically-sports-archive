import { PostService, Post } from './../../post.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { MockPost } from '../../mock-posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class AdminPostsComponent implements OnInit, OnChanges {

  posts$: Observable<MockPost[]>;
  posts: Post[];

  constructor(private postService$: PostService) { 
    postService$.getPosts().then(res=> {
      this.posts = res.data.map(post=>{
        var newPost = new Post();
        newPost.title = post.title;
        newPost.id = post._id;
        newPost.description = post.description;
        newPost.category = post.category;
        newPost.author = post.author;
        newPost.imageUrl = post.imageUrl;
        newPost.likes = post.likes;
        newPost.dateCreated = post.dateCreated;
        newPost.delta = post.delta;

        return newPost;
      });
    });
  }

  deletePost(targetPost: Post) {

    // TO-DO: Make a confirmation dialog component later
    let confirmDelete: boolean = confirm("Are you sure you want to delete this post?");
    if(!confirmDelete) return;

    this.postService$.deletePost(targetPost)
    .then(() => {
      this.posts = this.posts.filter(p => p.id != targetPost.id);
    })
    .catch((err) => {
      console.log(`Error Deleting Post: ${targetPost} > ${err}`);
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("Changes Detected");
  }

}
