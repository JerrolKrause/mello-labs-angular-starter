const unescape = require('lodash/unescape');
const escape = require('lodash/escape');

/**
 * Helper utilities for string manipulation
 */
export class StringUtils {
  static serialize(entity: JSON) {
    console.log(entity);
    let str = JSON.stringify(entity);
    str = this.pad(str, 75, 75);
    str = this.obfuscateAdd(str);
    str = this.charShift(str, 10);
    return str;
  }
  static deserialize(str: string) {
    console.log(str, typeof str);
    try {
      str = StringUtils.charShift(str, -10);
      str = StringUtils.obfuscateRemove(str);
      str = StringUtils.trim(str, 75, 75);
    } catch (err) {
      console.error(err);
      return null;
    }
    return JSON.parse(str);
  }

  /**
   * Generate a random string of letters and numbers
   * @param length - The length of the string
   */
  static randomstring(length: number) {
    let s = '';
    const randomchar = () => {
      const n = Math.floor(Math.random() * 62);
      if (n < 10) {
        return n; // 1-10
      }
      if (n < 36) {
        return String.fromCharCode(n + 55); // A-Z
      }
      return String.fromCharCode(n + 61); // a-z
    };
    while (s.length < length) {
      s += randomchar();
    }
    return s;
  }

  /**
   * Obfuscate a string by encoding with base64
   * @param val A string to obfuscate
   */
  static obfuscateAdd(val: string) {
    if (val && window) {
      return window.btoa(unescape(encodeURIComponent(val.toString())));
    }
    return val;
  }

  /**
   * Remove the obfuscation of a string by decoding it from base64
   * @param val  A string to obfuscate
   */
  static obfuscateRemove(val: string) {
    if (val && window) {
      return decodeURIComponent(escape(window.atob(val)));
    }
    return val;
  }

  /**
   * Pad a string by adding random characters before or after the input
   * @param val Input string
   * @param before Number of characters to PREPEND to the string
   * @param after Number of characters to APPEND to the string
   */
  static pad(val: string, before?: number, after?: number) {
    let str = val;
    if (before) {
      str = this.randomstring(before) + str;
    }
    if (after) {
      str = str + this.randomstring(after);
    }
    return str;
  }

  /**
   * Remove a specific number of characters from the front or back of a strong
   * @param val Input string
   * @param before Number of characters to remove from the FRONT of a string
   * @param after Number of characters to remove from the Back of a string
   */
  static trim(val: string, before?: number, after?: number) {
    let str = val;
    if (before) {
      str = str.substring(before);
    }
    if (after) {
      str = str.substring(0, str.length - after);
    }
    return str;
  }

  /**
   * Shifts the characters in a string to new ones based on the offset amount
   * @param str
   * @param offsetAmount
   */
  static charShift(str: string, offsetAmount: number = 1) {
    const charsList = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=[{]}|;:",<.>/?';
    let strNew = '';

    // Loop through all the chars in the string
    for (let i = 0; i < str.length; i++) {
      // Current character
      const charCurrent = str.charAt(i);
      // Position of current character in charList
      let charNewIndex = charsList.indexOf(charCurrent);

      // Make sure the character is in the charsList
      if (charNewIndex !== -1) {
        // If the character index plus the offset exceed the string length, get it to wrap via modulus
        if (charNewIndex + offsetAmount > charsList.length) {
          charNewIndex = (charNewIndex + offsetAmount) % charsList.length;
        } else if (charNewIndex + offsetAmount < 0) {
          // If char index plus offset is a number less than zero, get it to wrap
          charNewIndex = -((charNewIndex + offsetAmount) % charsList.length);
        } else {
          // Just add the offset to the char index
          charNewIndex += offsetAmount;
        }

        // Get the new offset character from charsList, add to string
        strNew += charsList.charAt(charNewIndex);
      } else {
        // If char is not in the charList, don't shift it
        strNew += charCurrent;
      }
    }

    return strNew;
  }
}
