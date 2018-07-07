import { AdminPostComponent } from './admin/post/post.component';
import { AdminPostsComponent } from './admin/posts/posts.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/:id', component: PostComponent},
  {path: 'admin/posts', component: AdminPostsComponent},
  {path: 'admin/post', component: AdminPostComponent},
  {path: 'admin/post/:id', component: AdminPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
