import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer } from '@ngrx/store';

export const homeFeatureKey = 'home';

export interface HomeState extends EntityState<any> {
  isLoading: boolean;
}

export const adapter = createEntityAdapter<any>({
  selectId: (user: any) => user.id,
});

export const initialUserShortState = adapter.getInitialState({
  isLoading: false,
});

export const searchPartnersReducer = createReducer(
  initialUserShortState
  // on(HomeActions.loadSearchPartnersResults, (state) => ({
  //   ...state,
  //   isLoading: true,
  // })),
  // on(
  //   HomeActions.searchPartnersResultsLoaded,
  //   (state, { users }) => adapter.setAll(users, { ...state, isLoading: false })
  // ),
  // on(
  //   HomeActions.hidePartnerFromResults,
  //   (state, { partner }) => adapter.removeOne(partner.id, state)
  // )
);

export const { selectAll } = adapter.getSelectors();
