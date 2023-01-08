import {createReducer, on} from '@ngrx/store';
import {CounterState, initialState} from './counter.state';
import {
  changedMyName,
  customIncrement,
  decrement,
  increment,
  reset
} from './counter.actions';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state: any, action) => {
    console.log('State is', state);
    console.log('action is', action);
    return {
      ...state,
      counter: state.counter + 1
    };
  }),
  on(decrement, (state: any, action) => {
    console.log('State is', state);
    console.log('action is', action);
    return {
      ...state,
      counter: state.counter - 1
    };
  }),
  on(reset, (state: any) => {
    return {
      ...state,
      counter: 0
    };
  }),
  on(customIncrement, (state: any, action) => {
    return {
      ...state,
      counter: state.counter + +action.count
    };
  }),
  on(changedMyName, (state: CounterState) => {
    return {
      ...state,
      myName: 'Hajiyev Kanan'
    };
  })
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
