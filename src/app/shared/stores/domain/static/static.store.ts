import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export function createInitialState(): StaticState {
  return {
    todos: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'static' })
export class StaticStore extends Store<StaticState> {
  constructor() {
    super(createInitialState());
  }
}
