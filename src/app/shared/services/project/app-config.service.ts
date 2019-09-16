import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SettingsService } from '$settings';

const camelCase = require('lodash/camelCase');

interface EnvSettings {
  ApiUrl: string;
  ApiNamespace: string;
  SignalRUrl: string;
}

interface Settings {
  [key: string]: any;
}

/**
 * Manages receiving and setting initial environment settings
 */
@Injectable()
export class AppConfigService {
  constructor(private settings: SettingsService, private http: HttpClient) {}

  /**
   * Set all env settings in app settings
   * @param settings
   */
  public appSettingsUpdate(settings: EnvSettings) {
    // Loop through all env properties passed by web api
    Object.keys(settings).forEach(key => {
      // Check to make sure this prop has been declared in app.settings and is not undefined
      // If defined, updated prop value
      // If not throw error
      const appSetting = <Settings>this.settings;
      const appKey = camelCase(key);
      if (appSetting[appKey] !== undefined) {
        appSetting[appKey] = (<Settings>settings)[key];
      } else {
        console.error(camelCase(key), `is not present in app settings`);
      }
    });
  }

  /**
   * Load environment settings
   */
  public loadEnvSettings(envEndpoint: string) {
    return this.http
      .get(envEndpoint)
      .toPromise()
      .then((data: any) => this.appSettingsUpdate(data))
      .catch((err: any) => {
        console.error('Error getting environment settings', err);
        this.settings.reset();
        return Promise.resolve();
      });
  }
}
