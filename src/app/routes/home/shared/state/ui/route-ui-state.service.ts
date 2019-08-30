import { RouteUiStateStore } from './route-ui-state.store';
import { RouteUiStateQuery } from './route-ui-state.query';
/**
 * Route only UI state
 * By default route ui state is not persistance. If persistance is needed, add the store prop to add.module in the akita section
 */
export class RouteUiStateService {
  public someProp$ = this.query.select(state => state.someProp);

  constructor(private store: RouteUiStateStore, private query: RouteUiStateQuery) {}

  /**
   * Example of how to update route UI state
   * @param val
   */
  public updateRouteUIState(val: any) {
    this.store.update({ someProp: val });
  }

  /**
   * Reset store state
   */
  public reset() {
    this.store.reset();
  }
}
