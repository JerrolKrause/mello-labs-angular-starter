// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  // Comment out All tests and uncomment/change one of the other lines to only run a few tests
  specs: [
    './e2e/**/*.e2e-spec.ts', // All tests
    //'./e2e/routes/login/**/*.e2e-spec.ts'  // Login route only
    //'./e2e/components/pipes/**/*.e2e-spec.ts' // Components only
  ],
  capabilities: {
    browserName: 'chrome',
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {},
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json',
    });
    require('zone.js/dist/zone-node');

    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    console.log('onPrepare');
    // Login to get initial token and such
    browser.get('/#/login');
    element(by.css('form .login')).clear();
    element(by.css('form .login')).sendKeys('eat@joes.com');
    element(by.css('form .password')).clear();
    element(by.css('form .password')).sendKeys('123456');
    element(by.css('form button[type="submit"]')).click();

    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return url.indexOf('login') === -1 ? true : false;
      });
    }, 10000);
  },
};
