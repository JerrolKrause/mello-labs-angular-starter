import { browser, by, element } from 'protractor';

export class App {
  /**
   * Navigate to a url
   * @param url
   */
  navigateTo(url = '/#/') {
    return browser.get(url);
  }

  /**
   * Checks if the supplied URL matches the current url.
   * Set isMatch to false to return truthy if current URL does NOT match supplied URL
   * @param urlNew
   * @param isMatch
   */
  checkUrl(urlNew: string, isMatch: boolean = true) {
    return browser.driver.wait(() => {
      return browser.driver.getCurrentUrl().then(url => {
        if (isMatch) {
          return url.indexOf(urlNew) != -1 ? true : false;
        } else {
          return url.indexOf(urlNew) == -1 ? true : false;
        }
      });
    }, 10000);
  }
}
