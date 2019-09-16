import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

// TODO: Remove event listener

interface Keys {
  [key: string]: boolean;
}

/**
 * Manages DOM event handlers and makes available as an observable. Currently only supports keys pressed and keys down
 * USAGE: keysPressed$.subscribe(keysPressed => console.log(keysPressed));
 */
@Injectable({
  providedIn: 'root',
})
export class NtsDomEventsService {
  private keysPressed = new Subject<Keys>();
  /** Keys that have just been pressed */
  public get keysPressed$() {
    if (!Object.keys(this.listenersActive).length) {
      this.listenerCreateKeyboard();
      this.listenersActive['keyup'] = this.keysPressed;
    }
    return this.keysPressed;
  }

  private keysDown = new BehaviorSubject<Keys>({});
  /** Keys that are currently being pressed */
  public get keysDown$() {
    if (!Object.keys(this.listenersActive).length) {
      this.listenerCreateKeyboard();
      this.listenersActive['keydown'] = this.keysDown;
    }
    return this.keysDown;
  }

  /** State of keys */
  private keysState: Keys = {};
  /** Is this service actively listening for event handlers */
  private listenersActive: { [key: string]: any } = {};

  constructor() {}

  /**
   * Create an event listener
   * @param keyEvent
   */
  private listenerCreateKeyboard() {
    window.addEventListener('keydown', this.keyboardEvent.bind(this));
    window.addEventListener('keyup', this.keyboardEvent.bind(this));
  }

  /**
   * Remove an event listener
   * @param keyEvent
   */
  private listenerRemoveKeyboard() {
    window.removeEventListener('keydown', this.keyboardEvent.bind(this));
    window.removeEventListener('keyup', this.keyboardEvent.bind(this));
  }

  /**
   * Manage keypresses
   * @param event
   */
  private keyboardEvent(event: KeyboardEvent) {
    if (!event.repeat) {
      const keysState = { ...this.keysState };
      switch (event.type) {
        case 'keydown':
          keysState[event.key] = true;
          break;
        case 'keyup':
          // If event handler keyup present, emit action
          if (this.listenersActive['keyup']) {
            this.keysPressed.next(this.removeUnused(keysState));
          }
          keysState[event.key] = false;
          break;
      }
      this.keysState = keysState;

      // If event handler keydown present, emit action
      if (this.listenersActive['keydown']) {
        this.keysDown$.next(this.removeUnused(keysState));
      }

      this.checkStateKeyboard();
    }
  }

  /**
   * After an event, check that each observable actually has subscribers. If not remove event
   */
  private checkStateKeyboard() {
    const listenersActive = { ...this.listenersActive };

    let keepListeners = true;
    Object.keys(listenersActive).forEach(key => {
      if (listenersActive[key] && listenersActive[key].observers && listenersActive[key].observers.length === 0) {
        keepListeners = false;
      }
    });
    if (!keepListeners) {
      this.listenerRemoveKeyboard();
      this.listenersActive = {};
    }
    this.listenersActive = listenersActive;
  }

  /**
   * Remove any false values from the keys
   * @param keysState
   */
  private removeUnused(keysState: Keys): Keys {
    const keysStateNew = { ...keysState };
    Object.keys(keysStateNew).forEach(key => (!keysStateNew[key] ? delete keysStateNew[key] : null));
    return keysStateNew;
  }
}
