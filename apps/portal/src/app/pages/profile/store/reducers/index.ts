import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const profileFeatureKey = 'profile';

export interface ProfileState extends EntityState<any> {
  currentUser: any;
  isLoading: boolean;
  upcomingGames: any[];
  isLoadingUpcomingGames: boolean;
}

export const adapter = createEntityAdapter<any>({
  selectId: (user: any) => user.id,
});

export const initialProfileState = adapter.getInitialState({
  isLoading: false,
  currentUser: {},
});

export const profileReducer = createReducer(
  initialProfileState
  // on(ProfileActions.updateAboutSection, (state, { intro }) => ({
  //   ...state,
  //   currentUser: {
  //     ...state.currentUser,
  //     intro,
  //   },
  // })),
);

export const { selectAll } = adapter.getSelectors();
