import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../models/posts.model';
import {PostsState} from '../state/posts.state';
import {Store} from '@ngrx/store';
import {getPosts} from '../state/posts.selectors';
import {deletePost} from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private store: Store<PostsState>) {}

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure for deleting?')) {
      this.store.dispatch(deletePost({id}));
    }
  }
}
