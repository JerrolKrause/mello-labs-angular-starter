import { browser, by, element } from 'protractor';

import { App } from '../../../app.po';
import { QaPage } from '../../qa.po';

describe('Confirmation Modal', () => {
  let app: App = new App();
  let page: QaPage = new QaPage();

  beforeEach(() => {
    app.navigateTo('/#/qa');
  });

  it('should be on the correct url, /#/qa', () => {
    return app.checkUrl('qa');
  });

  it('should open && have correct data supplied by launch modal component ', () => {
    element(by.css('.app-launch-modal')).click();
    Promise.all([
      expect(element(by.css('#modalConfirm')).isPresent()).toEqual(true),
      expect(element(by.css('#modalConfirm .modal-title')).getText()).toEqual('Testing Confirmation Modal'),
      expect(element(by.css('#modalConfirm .modal-body')).getText()).toEqual('Does the confirmation modal work?'),
    ]).then();
  });

  it('should be dismissable', () => {
    element(by.css('.app-launch-modal')).click();
    element(by.css('#modalConfirm .dismiss')).click();
    let subject = element(by.css('#modalConfirm')).isPresent();
    let result = false;
    expect<any>(subject).toEqual(result);
  });

  it('should be able to submit and have method response', () => {
    element(by.css('.app-launch-modal')).click();
    element(by.css('#modalConfirm .submit')).click();
    let subject = element(by.css('#launchModalWorks')).isPresent();
    let result = true;
    expect<any>(subject).toEqual(result);
  });
});
