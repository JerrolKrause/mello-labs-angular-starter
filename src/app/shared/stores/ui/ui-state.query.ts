import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStateStore } from './ui-state.store';
@Injectable({ providedIn: 'root' })
export class UiStateQuery extends Query<UIState> {
  constructor(protected store: UiStateStore) {
    super(store);
  }
}
