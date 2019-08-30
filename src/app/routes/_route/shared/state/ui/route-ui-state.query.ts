import { Query } from '@datorama/akita';
import { RouteUiStateStore } from './route-ui-state.store';

export class RouteUiStateQuery extends Query<RouteUIState> {
  public someProp$ = this.select(state => state.someProp);

  constructor(protected store: RouteUiStateStore) {
    super(store);
  }
}
