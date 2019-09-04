import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { UiStateService } from '$ui';
import { delay } from 'helpful-decorators';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  /** Is the service worker enabled */
  public isEnabled = this.sw.isEnabled;

  constructor(private sw: SwUpdate, private ui: UiStateService) {}

  /**
   * Start polling for SW/app changes based on the supplied interval
   * @param intervalTime Default 1 hour, 1 * 60 * 60 * 1000
   */
  @delay(100) // Ensures app is loaded
  public pollforUpdates(intervalTime = 10 * 1000) {
    if (this.sw.isEnabled) {
      // If an update is available, notify the app
      this.sw.available.subscribe(() => {
        console.log(1);
        this.ui.updateAvailable$.next(true);
      });
      // Immediately check for an update when service loads
      // Otherwise SW will always serve old version of app
      this.sw.checkForUpdate();
      // Poll for updates
      interval(intervalTime).subscribe(() => this.sw.checkForUpdate());
    }
  }

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
