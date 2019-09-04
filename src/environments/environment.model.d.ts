/**
 * Global defaults for environment configs
 */
export interface EnvironmentConfig {
  /** Use production bundling */
  production: boolean;
  properties: {
    /** Name of application */
    appName: string;
  };
  settings: {
    /** Enable service worker functionality */
    enableServiceWorker: boolean;
    /** Is this app going to communicate with other domains or instances of itself for multiscreen usage?
     * If so, whitelist domains in the domains.listenTo property */
    enableAppComms: boolean;
    /** Should lazy loaded routes be preloaded on app instantiation? If false will be loaded on demand */
    preloadRoutes: boolean;
    /** Should data that is written to localstorage (such as app settings and store state) be obfuscated? */
    obfuscate: boolean;
  };
  domains: {
    /** If App Comms is enabled, whitelist domains to accept messages from here */
    listenTo: string[];
  };
  endpoints: {
    /** Location to get environment and config settings */
    envConfig: string | null | undefined;
    /** Location of API if not getting that from envConfig */
    apiUrl: string | null | undefined;
    /** Auth/Login endpoint */
    authLogin: string | null | undefined;
    /** Refresh token endpoint */
    authTokenRefresh: string | null | undefined;
    /** Api version endpoint. If not null then the app will request an update when the version changes */
    versionPath: string | null | undefined;
    /** Log front-end errors to here. Used by error.intercepter */
    errorPath: string | null | undefined;
  };
  state: {
    /** Which UI store properties to not write to localstorage. IE do not persist confidential/personal information */
    uiStoreBlacklist: string[];
  };
  licenses: {
    /** VAPID key used for service worker registration */
    vapid?: {
      publicKey: string;
      privateKey: string;
    };
    agGrid: 'qwerty';
  };
}
