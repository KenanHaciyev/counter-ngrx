import {initialState, PostsState} from './posts.state';
import {createReducer, on} from '@ngrx/store';
import {addPost, deletePost, updatePost} from './posts.actions';
import {Post} from '../../models/posts.model';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state: PostsState, action) => {
    const post = {...action.post};
    const idArr: any = [];
    state.posts.forEach((item) => {
      return idArr.push(item.id);
    });
    post.id = (Math.max(...idArr) + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePost, (state: PostsState, action): any => {
    const updatesPosts = state.posts.map((post) =>
      post.id != action.post.id ? post : action.post
    );
    return {
      ...state,
      posts: updatesPosts
    };
  }),
  on(deletePost, (state: PostsState, action) => {
    const updatedPosts = state.posts.filter((post: Post) => {
      return post.id !== action.id;
    });
    return {
      ...state,
      posts: updatedPosts
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
