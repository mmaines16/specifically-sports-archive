import { PostService, Post } from './../../post.service';
import { MockPost } from './../../mock-posts';
import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

import Quill from 'quill';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ViewChild } from '@angular/core';

// add image resize module
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);

// // add mention module
// import 'quill-mention';

// override p with div tag
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

// Block.tagName = 'DIV';
// // or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
// Quill.register(Block /* or NewBlock */, true);

// import Counter from './counter';
// Quill.register('modules/counter', Counter)

// Add fonts to whitelist
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);

// TO-DO: inested of using the service directly and updating the view manually in the componet create a store/reducer flow

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class AdminPostComponent implements OnInit {

  post: Post = new Post();
  isNewPost: boolean;
  @ViewChild('editor') quillEditor;

  constructor(private postService$: PostService, private route: ActivatedRoute, private router: Router) { 

    //this.posts = postService$.getMockPosts();

    this.route.params.subscribe(params => {

      if(params.id) {
        this.isNewPost = false;

        postService$.getPost(params.id).then(res=> {
          var editPost = new Post();
          editPost.title = res.data.title;
          editPost.id = res.data._id;
          editPost.description = res.data.description;
          editPost.category = res.data.category;
          editPost.author = res.data.author;
          editPost.imageUrl = res.data.imageUrl;
          editPost.likes = res.data.likes;
          editPost.dateCreated = res.data.dateCreated;
          editPost.delta = res.data.delta;

          this.post = editPost;

          console.log("imageUrl: ", this.post.imageUrl);

          this.populateEditor(this.quillEditor);
        });
      }
      else {
        this.post = new Post();
        this.isNewPost = true;
      }
    });
  }

  populateEditor(editor) {
    if(!this.isNewPost) editor.quillEditor.setContents(this.post.delta);
  }

  save(form, editor) {
    console.log("Form Saved...", form);

    this.post.title = form.value.title;
    this.post.description = form.value.description;
    this.post.category = form.value.category;
    this.post.author = form.value.author;
    this.post.imageUrl = form.value.imageUrl;
    this.post.delta = editor.quillEditor.getContents();

    console.log("----->Post: ", this.post);
    console.log("----->Post.Delta: ", this.post.delta);

    this.postService$.updatePost(this.post.id, this.post).then(() => {
      this.router.navigateByUrl('/admin/posts');
    });
    //implement saving here using post service / firebase
  }

  create(form, editor) {
    console.log("Post Created...", form);
    console.log("----->Post: ", form.value);
    console.log("----->Delta: ", editor.quillEditor.getContents());

    var newPost: Post = new Post();
    newPost.title = form.value.title;
    newPost.description = form.value.description;
    newPost.category = form.value.category;
    newPost.author = form.value.author;
    this.post.imageUrl = form.value.imageUrl;
    newPost.delta = editor.quillEditor.getContents();

    this.postService$.newPost(newPost).then(() => {
      this.router.navigateByUrl('/admin/posts');
    });
    //implement saving here using post service / firebase
  }

  delete(form) {
    console.log('post deleted...', form);

    this.postService$.deletePost(this.post).then(() => {
      this.router.navigateByUrl('/admin/posts');
    });
    //implement deletion here using post service / firebase
  }

  ngOnInit() {}

}
