import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { profileReducer } from '../../pages/profile/store/reducers';

export interface AppState {}

export interface State {
  currentUser: any;
}

export const initialState: State = {
  currentUser: {},
};

export const appReducer = createReducer(
  initialState
  // on(AppActions.loadCurrentUser, (state) => ({
  //   ...state,
  //   isLoading: true,
  // }))
);

export const reducers: ActionReducerMap<AppState> = {
  profileReducer,
  appReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
