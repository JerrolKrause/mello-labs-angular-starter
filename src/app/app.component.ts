import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';

import { environment } from '$env';
import { NtsVersionManagementService } from './shared/services';
import { ServiceWorkerService } from '$shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  /** Global/app errors */
  // public error$ = this.settings.error$;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private version: NtsVersionManagementService,
    private sw: ServiceWorkerService,
  ) {}

  ngOnInit() {
    this.routeChange();

    // If service worker
    if (environment.settings.enableServiceWorker) {
      this.sw.pollforUpdates();
    }

    // If version endpoint specified, poll for version changes
    if (environment.endpoints.versionPath) {
      this.version.start(environment.endpoints.versionPath);
    }

    /**
    // If app comms
    if (environment.settings.enableAppComms) {
      this.comms.commsEnable();
    }
    */
  }

  /**
   * Actions to perform on route change
   * Page titles are in app.routes.ts
   */
  public routeChange() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        // Change document title
        this.title.setTitle(event['title'] + ' | ' + environment.properties.appName);
      });
  }
}
