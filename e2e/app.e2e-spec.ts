import { browser, by, element } from 'protractor';
import { App } from './app.po';

describe('Application', () => {
  let app: App = new App();

  beforeEach(() => {
    app.navigateTo();
  });

  it('should be able to log out', () => {
    element(by.css('#navbar-main .dropdown-toggle')).click();
    element(by.css('#navbar-main .logout')).click();
    return app.checkUrl('login');
  });

  it('should not be able to route to another page because app is logged out', () => {
    app.navigateTo();
    return app.checkUrl('login');
  });

  it('should be able to log in', () => {
    app.navigateTo('/#/login');
    element(by.css('form .login')).clear();
    element(by.css('form .login')).sendKeys('eat@joes.com');
    element(by.css('form .password')).clear();
    element(by.css('form .password')).sendKeys('123456');
    element(by.css('form .remember')).click();
    element(by.css('form button[type="submit"]')).click();

    return app.checkUrl('login', false);
  });
});
