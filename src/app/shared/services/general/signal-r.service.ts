import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';

// Closure containing token
type tokenFn = () => string;

/**
 * Manage SignalR connectivity
 * USAGE:  this.signalR.connectionStart('/api/signalr', () => this.settings.token);
 * USAGE:  this.signalR.listenStart<string>('ReceiveCallEvent').subscribe(data => console.log(data));
 * https://code-maze.com/netcore-signalr-angular/
 */
@Injectable({
  providedIn: 'root',
})
export class NtsSignalRService {
  /** Is SignalR currently running */
  public isActive = false;
  /** Hold ref to signalR hub */
  private hubConnection: signalR.HubConnection | undefined;
  /** A dictionary of observables tied to a specific ID that will listen to an ID */
  private connections: { [key: string]: Subject<any> } = {};
  /**
   * A dictionary of message events where the observable has been created BEFORE signalR is ready.
   * After signalR is ready these IDs will have their signalR ON event attached to the observable
   */
  private queuedIDs: { [key: string]: boolean } = {};

  private _token!: string | tokenFn;
  /** Return the token if it is a string or a closure that returns a string */
  private get token(): string {
    if (typeof this._token === 'function') {
      return this._token();
    }
    return this._token;
  }

  constructor() {
    if (!signalR) {
      console.error(
        'SignalR not installed. Install with: npm install @aspnet/signalr –-save',
      );
    }
  }

  /**
   * Start a connection to signalR
   * @param signalRUrl - Location of the api url for signalr
   * @param token - The bearer token to pass for requests. This argument accepts either a string or a closure that returns a string. If using a string, be sure to use the tokenUpdate method in this file when the token changes. The closure should return the token, IE () => this.settings.token
   * @param retryTime - If signalR is unavailable, retry in this many milliseconds
   */
  public connectionStart(
    signalRUrl: string,
    token?: string | tokenFn,
    retryTime = 10000,
  ) {
    // Make sure user is logged in and signalR endpoint specified
    if (!signalRUrl) {
      return;
    }
    // Keep token
    this._token = <any>token; // TODO: Improve for strict null checks

    // If hubConnection not available yet, create it only on first instance
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(signalRUrl, { accessTokenFactory: () => this.token })
        .build();
    }
    // Start signalR
    const hubConnection = (<any>this.hubConnection).start();
    // Watch status
    hubConnection
      // If any queued ID's, attach ON event to the observable
      .then(() => {
        this.isActive = true;
        if (Object.keys(this.queuedIDs).length) {
          Object.keys(this.queuedIDs).forEach(key => this.listenStart(key));
          this.queuedIDs = {}; // Reset queue
        }
      })
      // If error on start, retry every 10 seconds
      .catch(() => {
        // If retry specified
        if (retryTime) {
          setTimeout(
            () => this.connectionStart(signalRUrl, this.token, retryTime),
            retryTime,
          );
        }
      });
    // Return promise of signalR startup status
    return hubConnection;
  }

  /**
   * End the active signalR connection
   */
  public connectionEnd() {
    // Make sure a connection exists
    if (!this.hubConnection) {
      return;
    }
    // Complete and end all open subscriptions
    Object.keys(this.connections).forEach(key => {
      this.connections[key].complete();
      delete this.connections[key];
    });
    // Stop connection
    const hubConnection = this.hubConnection.stop();
    // End connection
    hubConnection
      .then(() => {
        this.isActive = false;
      })
      .catch(err => {
        console.log('Error while stopping connection: ' + err);
        // On error, attempt to end connection every 10 seconds
        setTimeout(() => this.connectionEnd(), 10000);
      });
    // Return promise of stop status
    return hubConnection;
  }

  /**
   * Listen to data being returned from signalR
   * Returns an observable that will only update on the event specified by 'id'
   * @param id The unique ID of the message event
   * @param autoStart Should this event attempt to start signalR if not started already?
   */
  public listenStart<t>(id: string) {
    // If observable for this message ID does not exist
    if (!this.connections[id]) {
      // Create observable in connections dictionary
      this.connections[id] = new Subject<t>();
    }
    // Make sure hub connection has been started
    if (this.hubConnection) {
      // Add event listener to hub connection
      this.hubConnection.on(id, data => {
        // Double check that user is logged in
        if (this.token) {
          // When data is passed via signalR, update subs
          this.connections[id].next(JSON.parse(data));
        } else {
          // If no token, end connection, do not broadcast
          this.connectionEnd();
        }
      });
    } else {
      console.warn('SignalR has not been started yet');
    }

    return <Subject<t>>this.connections[id];
  }

  /**
   * End signalR connection
   * Remove data listener, complete the observable and delete from array
   * @param id
   */
  public listenEnd(id: string) {
    if (!this.hubConnection) {
      return;
    }
    this.hubConnection.off(id, () => {
      this.connections[id].complete();
      delete this.connections[id];
    });
  }

  /**
   * Broadcast data to signalR
   * @param id The unique ID of the message event
   * @param data Any data to push
   */
  public broadcastData(id: string, data: any) {
    if (!this.hubConnection) {
      return;
    }
    // Invoke data
    const connection = this.hubConnection.invoke(id, data);
    // Handle responses
    connection.catch(err => console.error(err));
    // Return status promise
    return connection;
  }

  /**
   * Update the token signalR will use to communicate with the webapi
   * @param token
   */
  public updateToken(token: string) {
    this._token = token;
  }
}
