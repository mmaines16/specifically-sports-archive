import { PostService } from './../../post.service';
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


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class AdminPostComponent implements OnInit {

  post: MockPost;
  editor: QuillEditorComponent;

  constructor(private route: ActivatedRoute, private router: Router, postService$: PostService) { 
    this.route.params.subscribe(params => {
      this.post = postService$.getMockPost([params.id]);
    });
  }

  populateEditor(editor) {
    if(this.post) editor.quillEditor.setContents(this.post.delta);
  }

  ngOnInit() {}


}
