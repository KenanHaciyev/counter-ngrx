import {initialState, SharedState} from './shared.state'
import {createReducer, on} from '@ngrx/store'
import {setErrorMessage, setLoadingSpinner} from './shared.actions'

export const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state: any, action) => ({
    ...state,
    showLoading: action.status
  })),
  on(setErrorMessage, (state: SharedState, action) => ({
    ...state,
    errorMessage: action.message
  }))
)

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action)
}
