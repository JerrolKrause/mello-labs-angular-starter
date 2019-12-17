import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query, Store, StoreConfig } from '@datorama/akita';

interface StaticState {
  todos: any[];
}

/**
 * The simple domain store is for web api requests that are GET only and do not need create/update/delete
 * This is to eliminate the need to have a new store for every web api call
 */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
export class StaticService {
  public todos$ = this.query.select(state => state.todos);

  constructor(
    private simpleStore: StaticStore,
    private http: HttpClient,
    private query: StaticQuery,
  ) {}

  /**
   * Load todos into the store
   */
  public todos() {
    this.http
      .get<any[]>('//jsonplaceholder.typicode.com/todos')
      .subscribe(todos => this.simpleStore.update({ todos: todos }));
  }
}

/** Store */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'static' })
export class StaticStore extends Store<StaticState> {
  constructor() {
    super({ todos: [] });
  }
}

/** Query */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
export class StaticQuery extends Query<StaticState> {
  constructor(protected store: StaticStore) {
    super(store);
  }
}


