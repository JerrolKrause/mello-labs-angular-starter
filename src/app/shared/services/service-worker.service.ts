import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { interval, Observable } from 'rxjs';
import { UiStateService } from '$ui';
import { delay } from 'helpful-decorators';
import { environment } from '$env';
import { HttpClient } from '@angular/common/http';

export type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}

export interface PushResponse {
  notification: Notification;
  event: Event;
  type: 'show' | 'click';
}

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  /** Is the service worker enabled */
  public isEnabled = this.sw.isEnabled;
  /** Does this app have permission to send push notifications */
  private permission = 'Notification' in window ? Notification.permission : 'denied';

  constructor(private sw: SwUpdate, private push: SwPush, private http: HttpClient, private ui: UiStateService) {}

  /**
   * Ask the user for permission to send push notifications
   */
  public requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission(status => (this.permission = status));
    }
  }

  /**
   * Send a notification from the browser window
   * @param title
   * @param options
   */
  public sendNotification(title: string, options?: PushNotification): Observable<PushResponse> {
    return new Observable<PushResponse>(obs => {
      // Check if notification api is available
      if (!('Notification' in window)) {
        obs.error('Notifications are not available in this environment');
        obs.complete();
      }

      // Check if permission was granted
      if (this.permission !== 'granted') {
        this.requestPermission(); // Ask for permission
        obs.error(`The user hasn't granted you permission to send push notifications`);
        obs.complete();
      }

      // Create new notification
      const n = new Notification(title, options);
      // Handle responses to notification popup
      n.onshow = e => obs.next({ notification: n, event: e, type: <'show'>e.type });
      n.onclick = e => obs.next({ notification: n, event: e, type: <'click'>e.type });
      n.onerror = e => obs.error({ notification: n, event: e, type: e.type });
      n.onclose = () => obs.complete();
    });
  }

  /**
   * Start polling for SW/app changes based on the supplied interval
   * @param intervalTime Default 5 minutes, 5 * 60 * 1000
   */
  @delay(100) // Ensures app is loaded
  public pollforUpdates(intervalTime = 5 * 60 * 1000) {
    if (this.sw.isEnabled) {
      // If an update is available, notify the app. Called before checkForUpdate so it will fire if update available on load
      this.sw.available.subscribe(() => this.ui.updateAvailable$.next(true));
      // Immediately check for an update when service loads
      // Otherwise SW will always serve old version of app
      this.sw.checkForUpdate();
      // Poll for updates
      interval(intervalTime).subscribe(() => this.sw.checkForUpdate());
    }
  }

  /**
   * Get a push subscription, pass to the backend for use with web push
   * NOT TESTED
   */
  public getPushSubscription(pathToApi: string, callback?: Function) {
    // Check that a VAPID licenses was found
    if (!environment.licenses.vapid) {
      console.error('No VAPID public key found in environment.licenses.vapid.publicKey');
      return;
    }

    // Throw a warning if the dev vapid licenses was used
    if (
      environment.licenses.vapid.publicKey === 'BIZ-IPJrxKxtdL9O9CnK42-XWcepJDPMQDfj8pb_vCfQxa7j1LoC4exdzZ5MhPWaF_5eWPglkj3V32xRswQEm6Q'
    ) {
      console.warn('Please change your VAPID keys to one unique to this environment');
      console.warn(`Generate new key with 'npm install web-push -g' then 'web-push generate-vapid-keys --json'`);
    }

    this.push
      .requestSubscription({ serverPublicKey: environment.licenses.vapid.publicKey })
      .then(sub => {
        // When subscription comes back from request, pass subscription to backend, execute callback
        this.http.post(pathToApi, sub).subscribe(res => {
          if (callback) {
            callback(res);
          }
        });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  /**
   * Unregister and remove all service workers
   * @param callback Function to execute after sw has been unregistered
   */
  public remove(callback?: Function) {
    navigator.serviceWorker.getRegistrations().then(registrations => registrations.forEach(reg => reg.unregister()));
    if (callback) {
      callback();
    }
  }
}
