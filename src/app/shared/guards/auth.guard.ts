import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService, AuthState } from '../services/auth.service';
import { SettingsService } from '$settings';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private settings: SettingsService, private auth: AuthService) {}

  canActivate() {
    // If a token
    if (this.settings.token) {
      return true; // logged in and has apiUrl so set true
    }
    this.auth.logOut(AuthState.sessionExpired);
    return false;
  }
}
