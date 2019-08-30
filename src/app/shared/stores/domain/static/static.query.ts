import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StaticStore } from './static.store';

@Injectable({ providedIn: 'root' })
export class StaticQuery extends Query<StaticState> {
  constructor(protected store: StaticStore) {
    super(store);
  }
}
