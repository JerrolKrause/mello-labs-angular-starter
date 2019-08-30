import { Store, StoreConfig } from '@datorama/akita';
import { storeName } from '../../..';

export function createInitialState(): RouteUIState {
  return <RouteUIState>{
    someProp: null,
  };
}

/**
 * Route UI store
 * Name property needs to be unique for every instance.
 * Change to reflect name of route, IE 'dashboard-uiState' or 'documents-uiState'
 */
@StoreConfig({ name: storeName, resettable: true })
export class RouteUiStateStore extends Store<RouteUIState> {
  constructor() {
    super(createInitialState());
  }
}
