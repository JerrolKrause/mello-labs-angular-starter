import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { applyTransaction, EntityState, EntityStore, QueryEntity, StoreConfig } from '@datorama/akita';
import { environment } from '$env';

/**
 * New Domain Store Instructions:
 * 1. Copy/paste this file 
 * 2. Do a case sensitive rename of Temp => NewStoreName
 * 3. Change name of store query from users$ => StoreData
 * 4. Update localization information below
 * 5. An an entry to the api hub file: domain.service.ts
 */

/** BEGIN Localization */
const apiUrl = environment.endpoints.apiUrl + '//jsonplaceholder.typicode.com/users';
const uniqueId = 'id';
const storeName = 'users';
type StoreModel = Models.User;
/** END Localization */

/** Service */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
export class TempService {
  public users$ = this.query.select();

  constructor(public store: TempStore, public query: TempQuery, private http: HttpClient) {}

  /**
   * Get entities and load into store
   * By default requests are cached
   * @param refreshCache Refresh entity data in cache, if false returns data currently in store
   */
  public get(refreshCache = false) {
    // If not cached or refresh cache is specified, make http call and load store
    if (refreshCache || !this.query.getHasCache()) {
      this.store.setLoading(true);
      return this.http.get<StoreModel[]>(apiUrl).pipe(
        tap(entities => this.store.set(entities)), // On success, add response to store
        catchError(err => {
          applyTransaction(() => {
            this.store.setError(err);
            this.store.setLoading(false);
          });
          return throwError(err);
        }),
      );
    }
    // Always return original api response but only once
    return this.query.selectAll().pipe(take(1));
  }

  /**
   * Create new entity
   * @param entity
   */
  public post(entity: StoreModel) {
    applyTransaction(() => {
      this.store.update({ modifying: true });
      this.store.setError(null);
    });
    return this.http.post<StoreModel>(apiUrl, entity).pipe(
      tap(res => {
        applyTransaction(() => {
          this.store.add(res || entity); // If no response, add entity from argument
          this.store.update({ modifying: false });
        });
      }),
      catchError(err => {
        applyTransaction(() => {
          this.store.setError(err);
          this.store.update({ modifying: false });
        });
        return throwError(err);
      }),
    );
  }

  /**
   * Create new entity
   * @param entity
   */
  public put(entity: StoreModel) {
    applyTransaction(() => {
      this.store.update({ modifying: true });
      this.store.setError(null);
    });
    return this.http.put<StoreModel>(apiUrl + '/' + entity[uniqueId], entity).pipe(
      tap(res => {
        applyTransaction(() => {
          this.store.update(entity[uniqueId], res || entity); // If no response, add entity from argument
          this.store.update({ modifying: false });
        });
      }),
      catchError(err => {
        applyTransaction(() => {
          this.store.setError(err);
          this.store.update({ modifying: false });
        });
        return throwError(err);
      }),
    );
  }

  /**
   * Delete entity
   * @param entity
   */
  public delete(entity: StoreModel) {
    applyTransaction(() => {
      this.store.update({ modifying: true });
      this.store.setError(null);
    });
    return this.http.delete<StoreModel>(apiUrl + '/' + entity[uniqueId]).pipe(
      tap(() => {
        applyTransaction(() => {
          this.store.remove(entity[uniqueId]);
          this.store.update({ modifying: false });
        });
      }),
      catchError(err => {
        applyTransaction(() => {
          this.store.setError(err);
          this.store.update({ modifying: false });
        });
        return throwError(err);
      }),
    );
  }

  /**
   * Reset store
   */
  public reset() {
    this.store.reset();
  }
}

/** Store */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: storeName, idKey: uniqueId, resettable: true }) // , cache: { ttl: null }
export class TempStore extends EntityStore<EntityState<StoreModel>, StoreModel> {
  constructor() {
    super({ modifying: false, loading: false });
  }
}

/** Query */
// tslint:disable-next-line:max-classes-per-file
@Injectable({ providedIn: 'root' })
export class TempQuery extends QueryEntity<EntityState<StoreModel>, StoreModel> {
  constructor(protected store: TempStore) {
    super(store);
  }
}
