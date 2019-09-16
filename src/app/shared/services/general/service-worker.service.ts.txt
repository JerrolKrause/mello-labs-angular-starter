import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ModalsService } from '$modals';
import { environment } from '$env';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  /** Notify app when a new version is available */
  public updateAvailable$ = new BehaviorSubject(false);
  /** Holds set interval */
  private counter: any;
  /** Check for update this many minutes */
  private checkInterval = 1; //
  /** Has the modal been popped already? */
  private modalPopped = false;
  /** Hold SW sub */
  private sub: Subscription;

  constructor(
    private sw: SwUpdate,
    private modals: ModalsService,
    private zone: NgZone,
    private settings: AppSettings,
  ) {}

  /**
   * Enable service worker functionality which includes polling for updates
   */
  public enable() {
    if (this.sw.isEnabled && this.settings.isBrowser) {
      // On initial load, check if service worker is available first
      this.sub = this.sw.available.subscribe(() => {
        this.updateAvailable$.next(true);
        window.clearInterval(this.counter);
        if (!this.modalPopped) {
          this.openModal();
          this.modalPopped = true;
        }
      });
      // Check for update immediately on app load
      this.sw.checkForUpdate();
      this.pollForUpdates();
    }
  }

  /**
   * Disable service worker and stop polling
   */
  public disable() {
    if (this.settings.isBrowser) {
      window.clearInterval(this.counter);
      this.sub.unsubscribe();
    }
  }

  /**
   * Start polling for SW updates
   */
  public pollForUpdates() {
    // Service worker/zone.js has issue with setInterval https://github.com/angular/angular/issues/20970
    this.zone.runOutsideAngular(() => {
      if (this.settings.isBrowser) {
        this.counter = window.setInterval(() => {
          this.zone.run(() => this.sw.checkForUpdate());
        }, this.checkInterval * 1000 * 60);
      }
    });
  }

  /**
   * Open the modal asking the user to update
   */
  public openModal() {
    this.modals
      .open(
        'ConfirmationModalComponent',
        false,
        'lg',
        `A new version of ${
          environment.properties.appName
        } is available, would you like to update to the latest version?`,
      )
      .afterClosed()
      .subscribe(
        reason => {
          if (reason) {
            window.location.reload();
            // this.sw.activateUpdate();
            // this.updateAvailable$.next(false);
            // this.pollForUpdates();
            // this.modalPopped = false;
          }
        },
        () => console.warn('User is on an outdated version of the application'),
      );
  }
}
