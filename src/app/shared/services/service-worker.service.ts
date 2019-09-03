import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { UiStateService } from '$ui';
import { delay } from 'helpful-decorators';

@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  constructor(private sw: SwUpdate, private ui: UiStateService) {}

  /**
   * Start polling for SW/app changes based on the supplied interval
   * @param intervalTime Default 1 hour, 1 * 60 * 60 * 1000
   */
  @delay(100) // Ensures app is loaded
  public pollforUpdates(intervalTime = 1000) {
    console.log(1);
    if (this.sw.isEnabled) {
      // If an update is available, notify the app
      this.sw.available.subscribe(() => this.ui.updateAvailable$.next(true));
      // Immediately check for an update on load
      this.sw.checkForUpdate();
      // Poll for updates once app is stable
      interval(intervalTime).subscribe(() => {
        console.log('Polling');
        this.sw.checkForUpdate();
      });
    }
  }
}
