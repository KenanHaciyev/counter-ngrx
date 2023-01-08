import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostsListComponent} from './posts-list/posts-list.component';
import {AddPostComponent} from './add-post/add-post.component';
import {EditPostsComponent} from './edit-posts/edit-posts.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {postsReducer} from './state/posts.reducer';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent
      },
      {
        path: 'edit/:id',
        component: EditPostsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('posts', postsReducer)
  ]
})
export class PostsModule {}
