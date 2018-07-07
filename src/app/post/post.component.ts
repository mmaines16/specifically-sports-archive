import { MockPost } from './../mock-posts';
import { PostService } from './../post.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

import Quill from 'quill';
import { ActivatedRoute, Router } from '@angular/router';


// override p with div tag
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

// import Counter from './counter';
// Quill.register('modules/counter', Counter)

// Add fonts to whitelist
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: MockPost[];
  post: MockPost;
  @ViewChild('editor') editor: QuillEditorComponent;

  constructor(private postService$: PostService, private route: ActivatedRoute, private router: Router) { 

    this.posts = postService$.getMockPosts();

    this.route.params.subscribe(params => {
      if(! params.id || params.id >= this.posts.length ) router.navigateByUrl('/posts'); // redirect if no id in params or if id is invalid

      this.post = postService$.getMockPosts()[params.id];
  
    });
  }

  populateEditor() {
    this.editor.quillEditor.setContents(this.post.delta);

  }

  ngOnInit() {
  }

}
