import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostsState} from './posts.state';
import {Post} from '../../models/posts.model';

const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = createSelector(
  getPostsState,
  (state: PostsState, props: any) =>
    state.posts?.find((post: Post) => post.id == props.id)
);
