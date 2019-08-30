import { QueryEntity } from '@datorama/akita';
import { TempStore, StoreState } from './temp.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TempQuery extends QueryEntity<StoreState, Models.User> {
  public users$ = this.select();

  constructor(protected store: TempStore) {
    super(store);
  }
}
