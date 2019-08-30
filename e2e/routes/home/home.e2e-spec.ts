import { browser, by, element } from 'protractor';

import { App } from '../../app.po';
import { HomePage } from './home.po';

describe('Home Page', () => {
  let app: App = new App();
  let page: HomePage = new HomePage();

  beforeEach(() => {
    app.navigateTo('/#/');
  });

  it('should have a nav menu', () => {
    let subject = element(by.css('.navbar-nav')).isPresent();
    let result = true;
    expect<any>(subject).toEqual(result);
  });
});
