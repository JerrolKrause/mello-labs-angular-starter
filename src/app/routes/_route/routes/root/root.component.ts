import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
// import { untilDestroyed } from 'ngx-take-until-destroy';

// Global state
import { DomainService } from '$domain';
import { UiStateService } from '$ui';
import { SettingsService } from '$settings';

// Route State
import { RouteUiStateService } from '../../shared/state/ui';
// import { RouteDomainStateService } from '../../shared/state/domain';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent implements OnInit, OnDestroy {
  public users$ = this.domainState.users.users$;
  public user: Models.User | undefined;

  // private uiState: UiStateService,
  constructor(
    private domainState: DomainService, // Global domain state
    public uiState: UiStateService, // Global UI state
    // private routeDomainState: RouteDomainStateService, // Route only domain state
    private routeUIState: RouteUiStateService, // Route only UI state
    private settings: SettingsService, // App settings/global properties
  ) {}

  ngOnInit() {
    // Load users
    this.domainState.users.get().subscribe();
    // Get set prop from ROUTE UI store
    this.routeUIState.someProp$.subscribe(val => console.log('Someprop Val', val));
    this.routeUIState.updateRouteUIState('Test');

    // Get/set settings both sync and async
    this.settings.userName$.subscribe(userInfo => console.warn(userInfo));
    this.settings.token$.subscribe(token => console.warn(token));
    this.settings.token = 'Test';
    this.settings.userName = 'John';

    // Domain state from simple store
    this.domainState.staticData.todos$.subscribe(val => console.log('Todos', val));
    this.domainState.staticData.todos();
  }

  /**
   * Refresh users
   */
  public usersRefresh() {
    this.domainState.users.get(true).subscribe();
  }

  /**
   * Delete user
   * @param user
   */
  public userDelete(user: Models.User) {
    this.domainState.users.delete(user).subscribe();
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
