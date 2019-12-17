import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { SettingsService } from '$settings';
import { AuthState, AuthService } from 'src/app/shared/services/project/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public formMain!: FormGroup;
  public waiting: boolean | undefined;
  public errorApi: IErrorApi | null | undefined;
  public showErrorDetails = false;

  public authState$ = this.authService.authState$;
  public authState = AuthState;

  public loggedout: boolean | undefined;
  public showPassword = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private settings: SettingsService,
  ) {}

  public ngOnInit() {
    let isLogin, hasLogin;
    if (isPlatformBrowser && window.localStorage.rememberLogin && this.settings.userName) {
      isLogin = this.settings.userName;
    }

    if (isPlatformBrowser && window.localStorage.rememberLogin) {
      hasLogin = true;
    }

    this.authService.logOutModal = null; // Get rid of logout modal if it persists

    this.formMain = this.fb.group({
      userName: [isLogin || 'juser', [Validators.required]],
      password: ['password', [Validators.required]],
      remember: [hasLogin],
    });
  }

  /**
   * Submit the form
   */
  public onLogin() {
    this.waiting = true;
    this.errorApi = null;
    this.showErrorDetails = false;

    // If remember username is set
    if (this.formMain && this.formMain.value.remember) {
      this.settings.userName = this.formMain.value.userName;
      window.localStorage.rememberLogin = true;
    } else {
      window.localStorage.removeItem('rememberLogin');
    }

    // Authenticate
    this.authService.logIn(this.formMain.value).subscribe(
      () => {
        this.settings.userName = this.formMain.value.userName;
        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
        this.waiting = false;
      },
      error => {
        error.errorMsg = 'Error logging in.';
        if ((error.statusText = 'Unauthorized')) {
          error.errorMsg = 'Invalid username or password, please try again.';
          this.showErrorDetails = false;
        }

        this.errorApi = error;
        this.waiting = false;
      },
    );
  } // end onSubmit

  ngOnDestroy() {}
}
