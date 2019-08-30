import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export function createInitialState(): Settings {
  return {
    token: null,
    userName: null,
    version: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings', resettable: true })
export class SettingsStore extends Store<Settings> {
  constructor() {
    super(createInitialState());
  }
}
