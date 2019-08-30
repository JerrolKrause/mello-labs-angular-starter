import { browser, by, element } from 'protractor';
import { App } from '../app.po';

import { QaPage } from './qa.po';

describe('QA page', () => {
  let app: App = new App();
  let page: QaPage = new QaPage();

  beforeEach(() => {
    app.navigateTo('/#/qa');
  });

  it('should be on the correct url, /#/qa', () => {
    return app.checkUrl('qa', true);
  });

  it('should have a nav menu', () => {
    let subject = element(by.css('.navbar-nav')).isPresent();
    let result = true;
    expect<any>(subject).toEqual(result);
  });
});
