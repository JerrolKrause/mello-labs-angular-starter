import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { UiStateService } from '$ui';

interface VersionApi {
  assembly: string;
  db: string;
  host: string;
  machine: string;
  port: number;
  release: string;
  runtime: string;
  version: string;
}

/**
 * Polls the server for version changes
 */
@Injectable({
  providedIn: 'root',
})
export class NtsVersionManagementService {
  /** Notify subscribers of update available */
  public versionUpdated$ = new Subject<string>();
  /** Update at this frequency */
  private pollInterval!: number; // = 5 * 60 * 1000; // 5 minutes
  /** Current version, grabbed from localstorage */
  private versionCurrent!: string | null;
  /** URL to poll for versionchanges */
  private versionApiUrl!: string;
  /** Can this service continue polling */
  private canPoll = true;
  /** Property to extract version from localstorage */
  private versionProp!: string;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService, private uiState: UiStateService) {}

  /**
   * Poll for version changes
   * @param versionApiUrl Location of version api url
   * @param pollInterval How often to check for version changes in milliseconds. Default is 5 minutes
   * @param versionProp Which property to get/set the version in localstorage. Default is 'version'
   */
  public start(versionApiUrl: string, pollInterval = 5 * 60 * 1000, versionProp = 'version') {
    // Get current version from local storage
    this.versionCurrent = localStorage.getItem(versionProp);
    this.pollInterval = pollInterval;
    this.versionApiUrl = versionApiUrl;
    this.versionProp = versionProp;
    this.pollVersionChanges();
    this.versionUpdated$.subscribe(() => {
      this.confirmationService.confirm({
        message: 'A new version of this application has just been released, would you like to refresh?',
        header: 'Confirmation',
        accept: () => {
          // Reset ui state to clear out any breaking changes
          this.uiState.reset();
          // Reload page
          location.reload();
        },
      });
    });
    return this.versionUpdated$;
  }

  /**
   * Stop checking for version changes
   */
  public stop() {
    this.canPoll = false;
  }

  /**
   * Poll for version changes
   */
  private pollVersionChanges() {
    this.http.get<VersionApi>(this.versionApiUrl).subscribe(
      res => {
        const version = res.version;
        // If version isn't set, set it here and in localstorage
        if (!this.versionCurrent) {
          this.versionCurrent = version;
          localStorage.setItem(this.versionProp, String(version));
        }
        // If new version is different than old version, notify observable
        if (version !== this.versionCurrent) {
          this.versionCurrent = version;
          localStorage.setItem(this.versionProp, String(version));
          this.versionUpdated$.next(version);
        }
        if (this.canPoll) {
          setTimeout(() => this.pollVersionChanges(), this.pollInterval);
        }
      },
      // On error, reset
      () => {
        if (this.canPoll) {
          setTimeout(() => this.pollVersionChanges(), this.pollInterval);
        }
      },
    );
  }
}
