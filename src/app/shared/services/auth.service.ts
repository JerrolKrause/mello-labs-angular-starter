import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { merge, interval, BehaviorSubject, fromEvent } from 'rxjs';
import { throttleTime, tap, switchMap, filter, map, distinctUntilChanged, startWith, take } from 'rxjs/operators';

import { DialogService } from 'primeng/api';

import { environment } from '$env';
import { DomainService } from '$domain';
import { SettingsService } from '$settings';

import { LogoutModalComponent } from 'src/app/components/modals/logout/logout-modal.component';

export enum AuthState {
  initial,
  loggedIn,
  loggedOut,
  sessionExpired,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Auth status based on authstate */
  public authState$ = new BehaviorSubject<AuthState>(AuthState.initial);

  /** Holds reference to logout modal */
  public logOutModal: any | null | undefined;

  /** How often to refresh the token after user interaction */
  private tokenRefreshInterval = 60 * 1000; // 60 seconds default, 60 * 1000
  /** How long should the user be idle before loading the modal */
  private idleDuration = 5 * 60; // 5 minutes default, 5 * 60
  /** Is the current timer expired */
  private logoutModalVisible = false;

  /** User interaction events. Watches mouse movement, clicks and key presses */
  private refreshEvent$ = merge(fromEvent(document, 'keypress'), fromEvent(document, 'mousemove'), fromEvent(document, 'click')).pipe(
    throttleTime(1000), // Throttle to every one second
    startWith(0),
  ); // 10 seconds

  /** Logout timer that resets after every user interaction event */
  private logoutTimerExpired$ = this.refreshEvent$.pipe(
    switchMap(() => interval(1000)), // Reset interval everytime refresh fires
    // tap(val => console.log(val, this.idleDuration)), // Test auth functionality
    filter(() => !!this.settings.token), // Only capture refresh events if token present
    map(val => (val > this.idleDuration ? true : false)), // If val is greater than duration, convert to true or false
    startWith(false),
    distinctUntilChanged(),
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private settings: SettingsService,
    public dialogService: DialogService,
    private domain: DomainService,
  ) {
    // Manage logout timer
    // Only fire events when timer expires and is not inactive (IE the logout modal is active)
    this.logoutTimerExpired$.pipe(filter(expired => expired && !this.logoutModalVisible)).subscribe(() => {
      this.launchLogoutModal();
      this.logoutModalVisible = true;
    });

    // If an endpoint for auth refresh provided
    if (true || environment.endpoints.authTokenRefresh) {
      this.refreshEvent$
        .pipe(
          filter(() => !!this.settings.token), // Only capture refresh events if token present
          throttleTime(this.tokenRefreshInterval), // Throttle time using refresh interval
          filter(() => !this.logoutModalVisible), // Only refresh token if timer not expired
        )
        .subscribe(() => this.refreshToken()); // Refresh token
    }

    // If a token was passed in via query param
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params.token) {
        this.settings.token = params.token;
      }
    });

    /** Extract a token passed in via matrix notation
    // If a token is passed in via matrix notation params, update app settings.
    // Need to use matrix notation /#/route;token=123456456456
    this.router.events.subscribe(val => {
      if (
        val &&
        val instanceof RoutesRecognized &&
        val.state &&
        val.state.root &&
        val.state.root.firstChild &&
        val.state.root.firstChild.params.token
      ) {
        this.settings.token = val.state.root.firstChild.params.token;
        this.setTimer(this.setTimerDefaultSeconds); // Start the session timer with the default time
      }
    });
     */
  }

  /**
   * Log the user in
   * @param data
   */
  public logIn(data: any) {
    // Determine if valid auth endpoint available. If not use stubbed out one
    const authApi =
      environment.endpoints.apiUrl && environment.endpoints.authLogin
        ? this.http.post<Models.Auth>(environment.endpoints.apiUrl + environment.endpoints.authLogin, data)
        : this.http.get<Models.Auth>('assets/mock-data/login.json');
    return authApi.pipe(
      tap(response => {
        this.settings.token = response.data.token;
        this.authState$.next(AuthState.loggedIn);
        // Override default idle duration if specified in the api response
        if (response.data.expirationSeconds) {
          this.idleDuration = response.data.expirationSeconds;
        }
      }),
    );
  } // end LogIn

  /**
   * Refresh the token
   */
  public refreshToken() {
    // Null check against env files
    if (!environment.endpoints.apiUrl || !environment.endpoints.authTokenRefresh) {
      return false;
    }
    const refreshApi = this.http.post<Models.Auth>(environment.endpoints.apiUrl + environment.endpoints.authLogin, {});

    refreshApi.subscribe(
      response => {
        if (this.settings.token) {
          // Make sure a token is present before it is replaced
          this.authState$.next(AuthState.loggedIn);
          this.settings.token = response.data.token;
        }
      },
      () => this.logOut(AuthState.sessionExpired),
    );
    // Return observable if needed by a component
    return refreshApi;
  } // end RefreshToken

  /**
   * Launch a modal window which gives the user a chance to continue working
   */
  private launchLogoutModal(): void {
    // Open log out modal window
    const ref = this.dialogService.open(LogoutModalComponent, {
      data: 60,
      header: 'Warning',
      width: '70%',
      dismissableMask: true,
    });
    // When modal closes
    ref.onClose.subscribe(reason => {
      if (reason) {
        this.logOut(AuthState.loggedOut);
      } else {
        this.logoutModalVisible = false;
        this.refreshToken(); // Immediately refresh token
      }
    });
  }

  /**
   * Log the user out. Clear stored data and redirect to login page
   */
  public logOut(authState: AuthState): void {
    this.settings.token = null;
    this.logoutModalVisible = false;
    this.authState$.next(authState);
    this.domain.resetAll(); // Clear out all API data on log out for security
    // Don't throw a redirect url if this is the dashboard since that is default on login
    const returnUrl = this.router.url !== '/' && this.router.url !== '/login' ? this.router.url.split('?')[0] : null;
    this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
  } // end LogOut
}
