const forOwn = require('lodash/forOwn');
const isUndefined = require('lodash/isUndefined');
const isNull = require('lodash/isNull');
const isNaN = require('lodash/isNaN');
const isString = require('lodash/isString');
const isEmpty = require('lodash/isEmpty');
const isObject = require('lodash/isObject');
const isArray = require('lodash/isArray');
const pull = require('lodash/pull');
const cloneDeep = require('lodash/cloneDeep');

/**
 * A collection of json/javascript helper utilities
 */
export class ObjectUtils {
  /**
   * Parses JSON to remove nulls, undefined, NaN, empty String, empty array and empty object
   * https://stackoverflow.com/questions/18515254/recursively-remove-null-values-from-javascript-object
   * @param obj - Any object
   */
  static cleanup(obj: any) {
    return (function prune(current) {
      forOwn(current, function(value: any, key: any) {
        if (
          isUndefined(value) ||
          isNull(value) ||
          isNaN(value) ||
          (isString(value) && isEmpty(value)) ||
          (isObject(value) && isEmpty(prune(value)))
        ) {
          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete
      // operation on an array
      if (isArray(current)) {
        pull(current, undefined);
      }

      return current;
    })(cloneDeep(obj)); // Do not modify the original object, create a clone instead
  }

  /**
   * Sanitize a JS object
   * @param obj - Any object
   */
  static sanitize(obj: Object) {
    return JSON.parse(JSON.stringify(obj));
  }
}
