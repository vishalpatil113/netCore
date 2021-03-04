export class Utils {
    validateUrl(url) {
        return true;

    }
}

/**
 * Ref: https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript
 * Finds provided array in given string
 * @param str string to find array of words
 * @param substrings array of words to find
 * @return Returns matched string
 * @example
 * var result = containsAny("defg", ["ab", "cd", "ef"]);
 * console.log("String was found in substring " + result);
 */
export function containsAny(str, substrings) {
  for (var i = 0; i != substrings.length; i++) {
     var substring = substrings[i];
     if (str.indexOf(substring) != - 1) {
       return substring;
     }
  }
  return null; 
}

/**
 * Converts camelcase text to Title Case Sentence Form
 * @param text string to convert to Sentence Form
 * @example
 * Input: conversionRate
 * Output: Conversion Rate
 * @returns converted setence from string
 */
export function capitalizeText(text) {
    if (typeof text !== 'string') {
        return text;
    }
    // Reference: https://stackoverflow.com/questions/5582228/insert-space-before-capital-letters
    return text.replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        // uppercase the first character
        .replace(/^./, function (str) { return str.toUpperCase(); });
}
/**
 * Formats number to short computer format
 * @example
 * Input: 1000
 * Output: 1k
 * @reutnrs converted number
 */
export function formatNumber(number) {
    const SI_POSTFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier === 0) {
        return number;
    }
    const postfix = SI_POSTFIXES[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    let formatted = scaled.toFixed(1) + '';
    if (/\.0$/.test(formatted)) {
        formatted = formatted.substr(0, formatted.length - 2);
    }
    return formatted + postfix;
}

export function truncate(str = '', len = 15, delimiter = '...') {
  str = str || '';
  return str.length > len ? str.substr(0, len) + delimiter : str;
}

// https://jsperf.com/js-deep-copy/17
export function recursiveDeepCopy(o) {
  let newO,
    i;

  if (typeof o !== 'object') {
    return o;
  }
  if (!o) {
    return o;
  }

  if ('[object Array]' === Object.prototype.toString.apply(o)) {
    newO = [];
    for (i = 0; i < o.length; i += 1) {
      newO[i] = recursiveDeepCopy(o[i]);
    }
    return newO;
  }

  newO = {};
  for (i in o) {
    if (o.hasOwnProperty(i)) {
      newO[i] = recursiveDeepCopy(o[i]);
    }
  }
  return newO;
}
