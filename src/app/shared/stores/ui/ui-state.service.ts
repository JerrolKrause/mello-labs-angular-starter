import { Injectable } from '@angular/core';
import { UiStateStore } from './ui-state.store';
import { UiStateQuery } from './ui-state.query';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  /** State of current UI store */
  public uiState$ = this.query.select();
  /** Return the active tab of the specified tab instance */
  public tabActive$ = (tabInstanceId: string) =>
    this.query
      .select(state => state.tabsActive)
      .pipe(
        map(val => (val && val[tabInstanceId] ? val[tabInstanceId] : 0)),
        distinctUntilChanged(),
      );
  /** Return the toggle state of the specificed prop */
  public toggles$ = (toggleProp: string) =>
    this.query
      .select(state => state.toggles)
      .pipe(
        map(val => (val && val[toggleProp] !== null ? val[toggleProp] : null)),
        distinctUntilChanged(),
      );

  constructor(private store: UiStateStore, private query: UiStateQuery) {
    // this.query.uiState$.subscribe(state => console.log('UI STATE', state));
  }

  /**
   * Change and persist the visible tab of a tabset
   * Make sure this service is public: constructor(public ui: UIStoreService) and that the first argument matches
   * USAGE
   <mat-tab-group [selectedIndex]="ui.query.tabActive$('home') | async" (selectedTabChange)="ui.tabChange('home', $event)">
   * @param tabInstanceId - A name or unique identifier for this tab instance
   * @param tabEvent - The tabChange event supplied by ng-boostrap
  
  public tabChange(tabInstanceId: string, tabEvent: MatTabChangeEvent) {
    this.store.update(store => {
      const tabsActive = { ...store.tabsActive };
      tabsActive[tabInstanceId] = tabEvent.index;
      return <UIState>{
        ...store,
        tabsActive: tabsActive,
      };
    });
  }
   */

  /**
   * A generic dictionary for simple key/value pair state changes
   * IE: this.ui.toggles('sidebarOpen', true);
   * &&: this.ui.query.toggles$('sidebarOpen');
   * @param toggleProp
   * @param toggleValue
   */
  public toggles(toggleProp: string, toggleValue: any) {
    this.store.update(store => {
      const toggles = { ...store.toggles };
      toggles[toggleProp] = toggleValue;
      return <UIState>{
        ...store,
        toggles: toggles,
      };
    });
  }

  /**
   * Reset store state
   */
  public reset() {
    this.store.reset();
  }
}
