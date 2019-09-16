import { EnvironmentConfig } from './environment.model';

/**
 * Global defaults for environment configs
 */
export const defaults: EnvironmentConfig = {
  /** Use production bundling */
  production: false,
  properties: {
    /** Name of application */
    appName: 'Angular Starter',
  },
  settings: {
    /** Enable service worker functionality */
    enableServiceWorker: true,
    /** Is this app going to communicate with other domains or instances of itself for multiscreen usage?
     * If so, whitelist domains in the domains.listenTo property */
    enableAppComms: true,
    /** Should lazy loaded routes be preloaded on app instantiation? If false will be loaded on demand */
    preloadRoutes: false,
    /** Should data that is written to localstorage (such as app settings and store state) be obfuscated? */
    obfuscate: true,
  },
  domains: {
    /** If App Comms is enabled, whitelist domains to accept messages from here */
    listenTo: <string[]>['http://localhost:4200'],
  },
  endpoints: {
    /** Location to get environment and config settings */
    envConfig: 'assets/mock-data/env-settings.json',
    /** Location of API if not getting that from envConfig */
    apiUrl: <string | null>null,
    /** Auth/Login endpoint */
    authLogin: 'assets/mock-data/login.json',
    /** Refresh token endpoint */
    authTokenRefresh: <string | null>null, // '/authentication/token',
    /** Api version endpoint. If not null then the app will request an update when the version changes */
    versionPath: <string | null>null, // '/version',
    /** Log front-end errors to here. Used by error.intercepter */
    errorPath: <string | null>null, // 'apiwebapp/log',
  },
  state: {
    /** Which UI store properties to not write to localstorage. IE do not persist confidential/personal information */
    uiStoreBlacklist: <string[]>[],
  },
  licenses: {
    /** Generate new key with 'npm install web-push -g' then 'web-push generate-vapid-keys --json'  */
    vapid: {
      publicKey:
        'BIZ-IPJrxKxtdL9O9CnK42-XWcepJDPMQDfj8pb_vCfQxa7j1LoC4exdzZ5MhPWaF_5eWPglkj3V32xRswQEm6Q',
      privateKey: 'jUOTBXqGGwElft-fTVBYb1BeLWrRhn2HgyJpXZBhgLo',
    },
    agGrid: 'qwerty',
  },
};
