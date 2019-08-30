import { Injectable } from '@angular/core';
import { UsersService } from './users';
import { StaticService } from './static';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  // List all store services here
  constructor(
    public staticData: StaticService, // Simple webapi calls that are GET only
    public users: UsersService,
  ) {}

  /**
   * Reset all stores
   */
  public resetAll() {
    Object.keys(this).forEach(key => {
      const dependency = (<any>this)[key];
      if (dependency && dependency.store && dependency.store.reset) {
        dependency.store.reset();
      }
    });
  }
}
