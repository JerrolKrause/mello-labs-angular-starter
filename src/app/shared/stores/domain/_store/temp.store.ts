import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface StoreState extends EntityState<Models.User> {}
export const uniqueId = 'id';

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users', idKey: uniqueId, resettable: true }) // , cache: { ttl: null }
export class TempStore extends EntityStore<StoreState, Models.User> {
  constructor() {
    super({ modifying: false, loading: false });
  }
}
