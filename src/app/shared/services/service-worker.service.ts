import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval, Observable } from 'rxjs';
import { UiStateService } from '$ui';
import { delay } from 'helpful-decorators';

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

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  /** Is the service worker enabled */
  public isEnabled = this.sw.isEnabled;

  private permission = 'Notification' in window ? Notification.permission : 'denied';

  constructor(private sw: SwUpdate, private ui: UiStateService) {
  }

  /**
   * Ask the user for permission to send push notifications
   */
  public requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission(status => (this.permission = status));
    }
  }


  public sendPushNotification(title: string, options?: PushNotification) {

    return new Observable((obs: any) => {

      if (!('Notification' in window)) {
        obs.error('Notifications are not available in this environment');
        obs.complete();
      }

      if (this.permission !== 'granted') {
        obs.error(`The user hasn't granted you permission to send push notifications`);
        obs.complete();
      }

      const n = new Notification(title, options);

      n.onshow = (e: any) => obs.next({notification: n, event: e});
      n.onclick = (e: any) => obs.next({notification: n, event: e});
      n.onerror = (e: any) => obs.error({notification: n, event: e});
      n.onclose = () => obs.complete();
    });
  }

  /**
   * Start polling for SW/app changes based on the supplied interval
   * @param intervalTime Default 1 hour, 1 * 60 * 60 * 1000
   */
  @delay(100) // Ensures app is loaded
  public pollforUpdates(intervalTime = 10 * 1000) {
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
   *
  
  public subscribeToNotifications() {
    if (!environment.licenses.vapid) {
      console.error('No VAPID public key found in environment.licenses.vapid.publicKey');
      return;
    }

    if (!this.pushNotifications$) {
      this.push
        .requestSubscription({ serverPublicKey: environment.licenses.vapid.publicKey })
        .then(sub => {
          console.log('then', sub);
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
      this.pushNotifications$ = this.push.subscription;
      return this.pushNotifications$;
    } else {
      return this.pushNotifications$;
    }
  }

  public sendNotification() {
    if (!environment.licenses.vapid) {
      console.error('No VAPID public key found in environment.licenses.vapid.publicKey');
      return;
    }
  }
 */
  /**
   * Unregister and remove the service worker
   * This works by loading the safety-worker.js file included in the dist folder
   * @param callback Function to execute after sw has been unregistered
   */
  public remove(callback?: Function) {
    if (this.sw.isEnabled) {
      const s = document.createElement('script');
      s.src = 'safety-worker.js';
      if (callback) {
        s.onload = callback();
      }
      document.head.appendChild(s);
    }
  }
}
