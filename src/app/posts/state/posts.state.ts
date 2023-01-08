import {Post} from '../../models/posts.model';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    {id: '1', title: 'Title 1', description: 'description 1'},
    {id: '2', title: 'Title 2', description: 'description 2'}
  ]
};
