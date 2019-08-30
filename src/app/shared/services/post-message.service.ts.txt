import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ObjectUtils } from '$utils';
import { AppSettings } from '../app.settings';

interface Message {
  event?: string;
  payload?: any;
}

interface MessageComplete extends Message {
  token?: string;
  appId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostMessageService {
  /** Postmessage response */
  public postMessage$: Subject<Message> = new Subject();
  /** Holds postmessage event listener */
  private postMessageListener: any;
  /** An array of domains to accept postmessage responses from, based on window.location.origin */
  private allowedDomains: string[];
  /** Generate a random number to identify this app. Used to drop same domain postmessages */
  private appId = Math.floor(Math.random() * 10000000);

  constructor(private settings: AppSettings) {}

  /**
   * Activates the post message listener
   * @param allowedDomains - Allowable domains to whitelist message responses. Based on window.location.origin
   */
  public listenForMessages(allowedDomains?: string[]) {
    // Set allowed domains to receive messages from
    if (allowedDomains) {
      this.allowedDomains = allowedDomains;
    }

    if (this.settings.isBrowser) {
      // If not IE
      if (window.addEventListener) {
        this.postMessageListener = window.addEventListener('message', this.messageReceived.bind(this), false);
      } else {
        // If IE
        this.postMessageListener = (<any>window).attachEvent('onmessage', this.messageReceived.bind(this), false);
      }
    }

    return this.postMessage$;
  }

  /**
   * Stop listening for postmessage events
   */
  public stopListening() {
    if (this.settings.isBrowser) {
      window.removeEventListener('message', this.postMessageListener);
    }
  }

  /**
   * Post a message from an embedded iframe to its parent
   * @param message - The message payload
   * @param urlTarget - If the target url is known, only post to that domain. Otherwise its *
   */
  public postMessageToParent(message: Message, urlTarget: string = '*') {
    if (this.settings.isBrowser) {
      if (window.parent) {
        window.parent.postMessage(this.addMetadata(message), urlTarget);
      }
    }
  }

  /**
   * Post a message to an embedded iframe
   * @param id - a CSS ID of the iframe. IE 'messageTarget' of <iframe id="messageTarget"></iframe>
   * @param message - The message payload
   * @param urlTarget  - If the target url is known, only post to that domain. Otherwise its *
   */
  public postMessageToIframe(id: string, message: Message, urlTarget: string = '*') {
    if (this.settings.isBrowser) {
      // Make sure the element is on the DOM
      if ((<any>document).getElementById(id) && (<any>document).getElementById(id).contentWindow) {
        (<any>document).getElementById(id).contentWindow.postMessage(this.addMetadata(message), urlTarget);
      }
    }
  }

  /**
   * Post a message to window object reference
   * @param reference - A window reference either created by window.open or if existing, window.opened
   * @param message - The message payload
   * @param urlTarget  - If the target url is known, only post to that domain. Otherwise its *
   */
  public postMessageToWindow(reference: Window, message: Message, urlTarget: string = '*') {
    reference.postMessage(this.addMetadata(message), urlTarget);
  }

  /**
   * When a message was received via the postMessage event listener
   * @param event - The event passed from the event listener
   */
  private messageReceived(event: MessageEvent) {
    // Scrub webpackOk events and same appId origination
    if (event.data && event.data.type !== 'webpackOk' && event.data.appId !== this.appId) {
      // Sanitize incoming payload
      const msg: MessageComplete = ObjectUtils.sanitize(event.data);
      // Check if allowable domains
      if ((this.allowedDomains && this.allowedDomains.indexOf(event.origin) !== -1) || !this.allowedDomains) {
        this.postMessage$.next(msg);
      } else {
        console.error('Message from unauthorized source');
      }
    }
  }

  /**
   * Add metadata to the postmessage payload. IE the token and appId
   * @param msg
   */
  private addMetadata(msg: Message): MessageComplete {
    return {
      ...ObjectUtils.sanitize(msg),
      appId: this.appId,
      token: this.settings.token,
    };
  }
}
