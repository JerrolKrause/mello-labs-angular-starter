import { browser, by, element } from 'protractor';

import { App } from '../../app.po';
import { QaPage } from '../qa.po';

describe('Filter Pipe', () => {
  let app: App = new App();
  let page: QaPage = new QaPage();

  beforeEach(() => {
    app.navigateTo('/#/qa');
  });

  it('should be on the correct url, /#/qa', () => {
    return app.checkUrl('qa');
  });

  // Array of strings
  it('string should have 10 items when unfiltered', () => {
    let subject = element.all(by.css('#filterPipeOutput li')).count();
    let result = 10;
    expect<any>(subject).toEqual(result);
  });

  it('string should have 4 items when filtering for "berr"', () => {
    element(by.css('#filterPipeInput')).sendKeys('berr');
    let subject = element.all(by.css('#filterPipeOutput li')).count();
    let result = 4;
    expect<any>(subject).toEqual(result);
  });

  it('string should have 2 items when filtering for "pea"', () => {
    element(by.css('#filterPipeInput')).sendKeys('pea');
    let subject = element.all(by.css('#filterPipeOutput li')).count();
    let result = 2;
    expect<any>(subject).toEqual(result);
  });

  it('string should have no results', () => {
    element(by.css('#filterPipeInput')).sendKeys('qwerty');
    let subject = element.all(by.css('#filterPipeOutput li')).count();
    let result = 0;
    expect<any>(subject).toEqual(result);
  });

  it('should be able to clear filter and have 10 results', () => {
    element(by.css('#filterPipeInput')).sendKeys('qwerty');
    element(by.css('#filterPipeInputBtn')).click();
    let subject = element.all(by.css('#filterPipeOutput li')).count();
    let result = 10;
    expect<any>(subject).toEqual(result);
  });

  // Array of objects
  it('string should have 10 items when unfiltered', () => {
    let subject = element.all(by.css('#filterPipeOutputMore li')).count();
    let result = 10;
    expect<any>(subject).toEqual(result);
  });

  it('string should have 4 items when filtering for "berr"', () => {
    element(by.css('#filterPipeInputMore')).sendKeys('berr');
    let subject = element.all(by.css('#filterPipeOutputMore li')).count();
    let result = 4;
    expect<any>(subject).toEqual(result);
  });

  it('string should have 2 items when filtering for "pea"', () => {
    element(by.css('#filterPipeInputMore')).sendKeys('pea');
    let subject = element.all(by.css('#filterPipeOutputMore li')).count();
    let result = 2;
    expect<any>(subject).toEqual(result);
  });

  it('string should have no results', () => {
    element(by.css('#filterPipeInputMore')).sendKeys('qwerty');
    let subject = element.all(by.css('#filterPipeOutputMore li')).count();
    let result = 0;
    expect<any>(subject).toEqual(result);
  });

  it('should be able to clear filter and have 10 results', () => {
    element(by.css('#filterPipeInputMore')).sendKeys('qwerty');
    element(by.css('#filterPipeInputMoreBtn')).click();
    let subject = element.all(by.css('#filterPipeOutputMore li')).count();
    let result = 10;
    expect<any>(subject).toEqual(result);
  });
});
