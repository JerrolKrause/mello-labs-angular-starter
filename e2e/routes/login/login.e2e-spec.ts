import { browser, by, element } from 'protractor';

import { App } from '../../app.po';
import { LoginPage } from './login.po';

describe('Login Page', () => {
  let app: App = new App();
  let page: LoginPage = new LoginPage();

  beforeEach(() => {
    app.navigateTo('/#/login');
  });

  it('should not have a nav menu', () => {
    let subject = element(by.css('.navbar-nav')).isPresent();
    let result = false;
    expect<any>(subject).toEqual(result);
  });

  it('should have a login, password and remember password fields', () => {
    let subject = element.all(by.css('input')).count();
    let result = 3;
    expect<any>(subject).toEqual(result);
  });

  it('should have login button be disabled by default', () => {
    let subject = element(by.css('form button[type="submit"]'));
    // let result = true;
    expect<any>(subject.isEnabled()).toEqual(false);
  });

  it('should show password in plain text after clicking Show Password', () => {
    element(by.css('form .toggle-pwd')).click();
    let subject = element(by.css('form .password')).getAttribute('type');
    // let result = 'eat@joes.com';
    expect<any>(subject).toEqual('text');
  });

  it('should have login button enabled with valid email and password', () => {
    element(by.css('form .login')).sendKeys('eat@joes.com');
    element(by.css('form .password')).sendKeys('123456');
    let subject = element(by.css('form button[type="submit"]'));
    // let result = true;
    expect<any>(subject.isEnabled()).toEqual(true);
  });

  it('should route to new page on successful submit', () => {
    element(by.css('form .login')).clear();
    element(by.css('form .login')).sendKeys('eat@joes.com');
    element(by.css('form .password')).clear();
    element(by.css('form .password')).sendKeys('123456');
    element(by.css('form .remember')).click();
    element(by.css('form button[type="submit"]')).click();

    return app.checkUrl('login', false);
  });
});
