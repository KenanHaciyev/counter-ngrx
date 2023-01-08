import {createAction, props} from '@ngrx/store';

export const increment = createAction('Increment');
export const decrement = createAction('Decrement');
export const reset = createAction('Reset');

export const customIncrement = createAction(
  'customIncrement',
  props<{count: number}>()
);

export const changedMyName = createAction('Changed name');
