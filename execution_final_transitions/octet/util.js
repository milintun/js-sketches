import { Table } from './table.js';


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// MATH


export function min(value1, value2) {
  if (arguments.length == 2) {
    return Math.min(value1, value2);

  } else if (arguments.length == 1 && typeof(arguments[0]) === 'object') {
    return min(...arguments[0]);

  } else {
    let index = 0;
    while (index < arguments.length) {
      if (typeof(arguments[index]) !== 'undefined') {
        break;
      }
      index++;
    }
    let found;
    if (index < arguments.length) {
      found = arguments[index];
      for (let i = index + 1; i < arguments.length; i++) {
        if (arguments[i] < found) {
          found = arguments[i];
        }
      }
    }
    return found;
  }
}


export function max(value1, value2) {
  if (arguments.length == 2) {
    return Math.max(value1, value2);

  } else if (arguments.length == 1 && typeof(arguments[0]) === 'object') {
    return max(...arguments[0]);

  } else {
    let index = 0;
    while (index < arguments.length) {
      if (typeof(arguments[index]) !== 'undefined') {
        break;
      }
      index++;
    }
    let found;
    if (index < arguments.length) {
      found = arguments[index];
      for (let i = index + 1; i < arguments.length; i++) {
        if (arguments[i] > found) {
          found = arguments[i];
        }
      }
    }
    return found;
  }
}


export function sum(array, start, count) {
  start = start || 0;
  count = count || array.length;
  let stop = start + count;
  let outgoing = 0;
  for (let i = start; i < stop; i++) {
    if (array[i]) {  // only use legit values
      outgoing += array[i];
    }
  }
  return outgoing;
}


export function degrees(radians) {
  return radians * 180 / Math.PI;
}


export function radians(degrees) {
  return degrees * Math.PI / 180;
}


export function abs(value) {
  return Math.abs(value);
}


export function ceil(value) {
  return Math.ceil(value);
}


export function floor(value) {
  return Math.floor(value);
}


export function round(value) {
  return Math.round(value);
}


export function remap(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}


export function norm(value, low, high) {
  return (value - low) / (high - low);
}


export function constrain(value, min, max) {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}


export function dist(x1, y1, x2, y2) {
  if (arguments.length == 2 && typeof(x1) === 'object') {  // assume it's a Vec2
    console.log(x1, y1, dist(x1.x, x1.y, y1.x, y1.y));
    return dist(x1.x, x1.y, y1.x, y1.y);
  }
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx*dx + dy*dy);
}


export function mag(a, b) {
  return Math.sqrt(a*a + b*b);
}


export function sq(value) {
  return value * value;
}


export function sqrt(value) {
  return Math.sqrt(value);
}


export function pow(a, b) {
  return Math.pow(a, b);
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// TEXT FORMATTING / PARSING


export function str(what) {
  // ever so slightly more performant than new String() and .toString()
  return '' + what;
}


export function int(what) {
  return parseInt(what);
}


// format a number with zeroes and decimal places
export function nf(value, left, right) {
  if (left !== 0) {
    // pad with zeroes *and*
    const whole = Math.floor(value);
    return nfz(whole, left) + value.toFixed(value - whole, right);

  } else {
    return value.toFixed(right);
  }
}


export function nfd(value, digits) {
  return value.toFixed(digits);
}


// format the left side with commas
// 'digits' is optional if you want to also set # of decimal places
export function nfc(value, digits) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0
  });
}


// zero-pad a number with a set number of digits
export function nfz(value, digits) {
  //return value.toFixed(digits);
  //return (value < 10 ? '0' : '') + value;
  return new String(value).padStart(digits, '0');
}


export function hex(value, digits) {
  let outgoing = value.toString(16);
  const length = outgoing.length;
  if (length > digits) {
    console.error(`Call hex() with more digits than ${digits} because ${outgoing} is ${length} digits.`);
    return outgoing.substring(length - digits);

  } else if (length < digits) {
    return outgoing.padStart(digits, '0');
  }
  // return outgoing.toUpperCase();  // see todo.txt
  return outgoing;
}


export function unhex(str) {
  return parseInt(str, 16);
}


export function join(array, separator) {
  let outgoing = array[0];
  for (let i = 1; i < array.length; i++) {
    outgoing += separator + array[i];
  }
  return outgoing;
}


// export function splitTokens(what, chars) {
//   return what.split(what, /chars/)
// }


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// RANDOM


export function random() {
  if (arguments.length == 0) {
    return Math.random();
  } else if (arguments.length == 1) {
    if (typeof(arguments[0]) === 'object') {
      console.error('Use choice() instead of random() on arrays');
      return choice(arguments[0]);
    } else {
      return arguments[0] * Math.random();
    }
  } else {
    return arguments[0] + Math.random() * (arguments[1] - arguments[0]);
  }
}


export function choice(what) {
  if (typeof(what) === 'number') {
    return Math.floor(Math.random() * what);

  } else if (Object.hasOwn(what, 'length')) {
    let which = Math.floor(Math.random() * what.length);
    return what[which];
  }
  // could also return a random element of an object here;
  // holding off until we find a use case where that makes sense

  // could also return null here, but 'undefined' is actually appropriate
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// TIME


export function year() {
  return new Date().getFullYear();
}


export function month() {
  return new Date().getMonth() + 1;  // getMonth() returns 0...11
}


export function day() {
  return new Date().getDate();
}


export function hour() {
  return new Date().getHours();
}


export function minute() {
  return new Date().getMinutes();
}


export function second() {
  return new Date().getSeconds();
}


export function millis() {
  return new Date().getMilliseconds();
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// I/O


export function fetchJSON(location, loadCallback, errorCallback) {
  return fetch(location)
    .then(response => response.json())
    .then(data => loadCallback(data))
    .catch(error => {
      if (arguments.length == 3) {
        errorCallback(error)
      } else {
        console.error(error);
      }
    });
}


export class XML {
  el;

  constructor() {
    if (arguments.length > 0) {
      this.el = arguments[0];
    }
  }

  init(text) {
    // doc = parser.parseFromString(text);
    let doc = new DOMParser().parseFromString(text, "text/xml");
    // console.log(doc.childNodes);
    doc.childNodes.forEach((node) => {
      // console.log(n.nodeName + ' ' + n.nodeType);
      if (node.nodeType == Node.ELEMENT_NODE) {
        this.el = node;
      }
    });
    // console.log(el);
    // console.log(doc.firstChild.nodeName);
    // el = doc.getElementsByTagName('xml')[0];
  }

  getChild(name) {
    return new XML(this.el.querySelector(name));
  }

  getString(name) {
    // console.log(el);
    // console.log(el.getAttribute(name));
    return this.el.getAttribute(name);
  }

  getNumber(name) {
    return new Number(this.getString(name));
  }

  getFloat(name) {
    return parseFloat(this.getString(name));
  }

  getInt(name) {
    return parseInt(this.getString(name));
  }
}


/*
export function fetchXML(location, loadCallback, errorCallback) {
  return fetch(location)
    .then((response) => response.text())
    .then((xml) => {
      let outgoing = new XML();
      outgoing.init(xml);
      loadCallback(outgoing);
    })
    .catch(error => {
      if (arguments.length == 3) {
        errorCallback(error)
      } else {
        console.error(error);
      }
    });
}
*/
export function fetchXML(location) {
  return fetch(location)
    .then((response) => response.text())
    .then((text) => {
      let outgoing = new XML();
      outgoing.init(text);
      return outgoing;
    })
}


/*
export function fetchStrings(location, loadCallback, errorCallback) {
  return fetch(location)
    .then((response) => response.text())
    .then((data) => {
      let outgoing = data.split('\n');
      loadCallback(outgoing);
    })
    .catch(error => {
      if (errorCallback != null) {
        errorCallback(error)
      } else {
        console.error(error);
      }
    });
}
*/
export function fetchStrings(location) {
  return fetch(location)
    .then((response) => response.text())
    .then((data) => {
      return data.split('\n');
    })
}


/*
export function fetchTable(location) {
  let errorCallback = null;
  return fetch(location)
    .then((response) => response.text())
    .then((data) => {
      let index = arguments.length - 1;
      let loadCallback;
      if (index > 1 && typeof(arguments[index]) === 'function') {
        if (index > 2 && typeof(arguments[index]) === 'function') {
          errorCallback = arguments[index];
          loadCallback = arguments[index-1];
          index -= 2;
        } else {
          loadCallback = arguments[index];
          index--;
        }
      }
      let options = [ ];
      if (index > 1) {
        options = arguments.slice(1, index - 1);
      }
      let outgoing = new Table(data, ...options);
      loadCallback(outgoing);
    })
    .catch(error => {
      if (errorCallback != null) {
        errorCallback(error)
      } else {
        console.error(error);
      }
    });
}
*/
export function fetchTable(location) {
  return fetch(location)
    .then((response) => response.text())
    .then((data) => {
      let options = arguments.slice(1);
      return new Table(data, ...options);
    })
}


export function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
      // loadCallback(img);
    };

    img.onerror = (error) => {
      console.error(error);
      reject(new Error(`Error fetching image from ${url}`));
    };

    img.src = url;
  });
}


/*
export function requestImage(url, loadCallback, errorCallback) {
  return fetchImage(url)
    .then(img => {
      loadCallback(img)
    })
    .catch(error => {
      if (arguments.length == 3) {
        errorCallback(error);
      } else {
        console.error(error);
      }
    });
}
*/


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// COLOR

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
// https://www.w3.org/TR/css-color-4/


/*
gray(value, alpha) {
  value = constrain(value, 0, 255);
  if (arguments.length == 1) {
    // return 'rgb(' + value + ',' + value + ',' + value +  ')';
    return `rgb(${value},${value},${value})`;

  } else {
    let norm = constrain(alpha, 0, 255) / 255;
    return `rgb(${value},${value},${value},${norm})`;
  }
}
*/

export function gray(value, alpha) {
  value = constrain(remap(value, 100, 0, 0, 255), 0, 255);
  if (arguments.length == 1) {
    // return 'rgb(' + value + ',' + value + ',' + value +  ')';
    return `rgb(${value},${value},${value})`;

  } else {
    return `rgb(${value},${value},${value},${constrain(alpha, 0, 1)})`;
  }
}


export function rgb(r, g, b) {
  return 'rgb(' +
    constrain(r, 0, 255) + ',' +
    constrain(g, 0, 255) + ',' +
    constrain(b, 0, 255) +
  ')';
}


export function rgba(r, g, b, a) {
  return 'rgba(' +
    constrain(r, 0, 255) + ',' +
    constrain(g, 0, 255) + ',' +
    constrain(b, 0, 255) + ',' +
    constrain(a, 0, 1) +
  ')';
}


export function hsl(hue, saturation, lightness) {
  return 'hsl(' +
    constrain(hue, 0, 360) + ',' +
    constrain(saturation, 0, 100) + ',' +
    constrain(lightness, 0, 100) +
  ')';
}


// const c = this._hslToRgb(hue, saturation, lightness);
export function hsla(hue, saturation, lightness, alpha) {
  return 'hsla(' +
    constrain(hue, 0, 360) + ',' +
    constrain(saturation, 0, 100) + ',' +
    constrain(lightness, 0, 100) + ',' +
    constrain(alpha, 0, 1) +
  ')';
}


export function lab(L, a, b, alpha=1) {
  if (alpha !== 1) {
    return `lab({L}% {a} {b}) / alpha`;
  } else {
    return `lab({L}% {a} {b})`
  }
}


// For now, this is just a stub that turns things into an rgb array.
// Over time, make this a color object that stores its type,
// the original values, etc.
export function createColor(c) {
  if (c === 'white') {
    // return { 'red': 255, 'green': 255, 'blue': 255, 'alpha': 1 };
    return [ 255, 255, 255, 1];

  } else if (c === 'black') {
    // return { 'red': 0, 'green': 0, 'blue': 0, 'alpha': 1 };
    return [ 0, 0, 0, 1 ];

  } else if (c.startsWith('#')) {
    // check whether 3 or 6 digits
    if (c.length == 4) {
      return [
        parseInt(c.substring(1, 2), 16),
        parseInt(c.substring(2, 3), 16),
        parseInt(c.substring(3, 4), 16),
        1
      ];

    } else if (c.length == 7 || c.length == 9) {
      return [
        parseInt(c.substring(1, 3), 16),
        parseInt(c.substring(3, 5), 16),
        parseInt(c.substring(5, 7), 16),
        (c.length == 9) ? parseInt(c.substring(7, 9), 16) / 255.0 : 1
      ];
    }
  }

  // more elaborate versions: https://stackoverflow.com/a/63856391
  let m = c.match(/^\s*(\w+)\((.*)\)\s*$/);
  if (m != null) {
    // const [ _, variety, inner ] = m;
    const variety = m[1];
    const inner = m[2];
    // const pieces = inner.split(/[,%\/\s]+/);  // linter says \ not needed
    const pieces = inner.split(/[,%/\s]+/);
    const values = pieces.map(n => parseFloat(n))

    if (variety == 'rgb' && pieces.length == 3) {
      return [ values[0], values[1], values[2], 1 ];

    } else if (variety == 'rgba' && pieces.length == 4) {
      return values;

    } else if (variety == 'hsl' || variety == 'hsla') {
      const [r, g, b] = hslToRgb(values[0], values[1], values[2]);
      return [ r*255, g*255, b*255, values.length == 4 ? values[3] : 1 ];

    } else if (variety == 'lab') {
      const [r, g, b] = xyzToRgb(labToXyz(values[0], values[1], values[2]));
      return [ r*255, g*255, b*255, values.length == 4 ? values[3] : 1 ];
    }
  }
  console.error(`Could not parse color from '${c}'`);
  return [ 0, 0, 0, 1 ];  // just send back black
}


// https://web.archive.org/web/20060213080625/http://www.easyrgb.com/math.php?MATH=M8#text8
function labToXyz(el, ay, be) {
  let var_Y = (el + 16) / 116;
  let var_X = ay / 500 + var_Y;
  let var_Z = var_Y - be / 200;

  const amt = Math.pow(0.008856, 1/3.0);
  var_Y = (var_Y > amt) ?
    Math.pow(var_Y, 3) : (var_Y - 16/116.0) / 7.787;
  var_X = (var_X > amt) ?
    Math.pow(var_X, 3) : (var_X - 16/116.0) / 7.787;
  var_Z = (var_Z > amt) ?
    Math.pow(var_Z, 3) : (var_Z - 16/116.0) / 7.787;

  // Observer= 2°, Illuminant= D65;
  const REF_X = 95.047;
  const REF_Y = 100.0;
  const REF_Z = 108.883;

  return [
    REF_X * var_X,
    REF_Y * var_Y,
    REF_Z * var_Z
  ];
}


// https://web.archive.org/web/20060213080606/http://www.easyrgb.com/math.php?MATH=M1#text1
function xyzToRgb(xyz) {
  const var_X = xyz[0] / 100;  // Where X = 0 ÷  95.047
  const var_Y = xyz[1] / 100;  // Where Y = 0 ÷ 100.000
  const var_Z = xyz[2] / 100;  // Where Z = 0 ÷ 108.883

  let var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
  let var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
  let var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;

  var_R = (var_R > 0.0031308) ?
    1.055 * Math.pow(var_R, 1/2.4) - 0.055 : 12.92 * var_R;
  var_G = (var_G > 0.0031308) ?
    1.055 * Math.pow(var_G, 1/2.4) - 0.055 : 12.92 * var_G;
  var_B = (var_B > 0.0031308) ?
    1.055 * Math.pow(var_B, 1/2.4) - 0.055 : 12.92 * var_B;

  return [
    var_R * 255,
    var_G * 255,
    var_B * 255
  ];
}


/**
 * https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 * @param {number} hue - Hue as degrees 0..360
 * @param {number} sat - Saturation in reference range [0,100]
 * @param {number} light - Lightness in reference range [0,100]
 * @return {number[]} Array of RGB components 0..1
 */
function hslToRgb(hue, sat, light) {
  hue = hue % 360;

  if (hue < 0) {
    hue += 360;
  }

  sat /= 100;
  light /= 100;

  function f(n) {
    let k = (n + hue/30) % 12;
    let a = sat * Math.min(light, 1 - light);
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }

  return [f(0), f(8), f(4)];
}


// can take strings or color arrays
export function lerpColor(c1, c2, amount) {
  if (typeof(c1) === 'string') {
    c1 = createColor(c1);
  }
  if (typeof(c2) === 'string') {
    c2 = createColor(c2);
  }
  return rgba(c1[0] + (c2[0] - c1[0])*amount,
              c1[1] + (c2[1] - c1[1])*amount,
              c1[2] + (c2[2] - c1[2])*amount,
              c1[3] + (c2[3] - c1[3])*amount);
}


/*
function lerpColorHex(r1, r2, amount) {
  let value = Math.floor(r1 + (r2 - r1) * amount);
  return hex(constrain(value, 0, 255), 2);
}


// currently only works with 6-digit hex codes; need to do more checks,
// (not even checking for typeof string, or length being 7 or 4...)
// add 3-digit version, but more importantly, work through the data model
// for a better way to work with color.
export function lerpColor(one, two, amount) {
  // if (!one.startsWith('#') || !two.startsWith('#')) {
  const r1 = parseInt(one.substring(1, 3), 16);
  const g1 = parseInt(one.substring(3, 5), 16);
  const b1 = parseInt(one.substring(5, 7), 16);

  const r2 = parseInt(two.substring(1, 3), 16);
  const g2 = parseInt(two.substring(3, 5), 16);
  const b2 = parseInt(two.substring(5, 7), 16);

  return '#' +
    lerpColorHex(r1, r2, amount) +
    lerpColorHex(g1, g2, amount) +
    lerpColorHex(b1, b2, amount);
}
*/


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// CURVES


export function bezierPoint(a, b, c, d, t) {
  const t1 = 1 - t;
  return (a*t1 + 3*b*t)*t1*t1 + (3*c*t1 + d*t)*t*t;
}


export function bezierTangent(a, b, c, d, t) {
  return (3*t*t * (-a+3*b-3*c+d) +
          6*t * (a-2*b+c) +
          3 * (-a+b));
}


export function _splineForward(segments, matrix) {
  const f  = 1.0 / segments;
  const ff = f * f;
  const fff = ff * f;

  matrix.set(0,     0,    0, 1,
             fff,   ff,   f, 0,
             6*fff, 2*ff, 0, 0,
             6*fff, 0,    0, 0);
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// DATA


export class List {
  array;
  numeric = false;
  locale = null;

  constructor(array) {
    this.array = array;
    if (this.array.length > 0) {
      this.numeric = typeof(this.array[0]) === 'number';
    }
  }

  get(index) {
    return this.array[index];
  }

  sort(reverse=false) {
    if (this.numeric) {
      this.array.sort((a, b) => {
        return reverse ? b - a : a - b;
      });
    } else {
      if (this.locale == null) {
        this.locale = new Intl.NumberFormat().resolvedOptions().locale;
      }
      this.array.sort((a, b) => {
        if (reverse) {
          return b.localeCompare(a, this.locale, { sensitivity: "base" });

        } else {
          return a.localeCompare(b, this.locale, { sensitivity: "base" });
        }
      });
    }
  }

  min() {
    let count = this.array.length;
    if (count > 0) {
      let outgoing = this.array[0];
      for (let i = 1; i < count; i++) {
        if (this.array[i] < outgoing) {
          outgoing = this.array[i];
        }
      }
      return outgoing;
    }
    // returns undefined
  }

  max() {
    let count = this.array.length;
    if (count > 0) {
      let outgoing = this.array[0];
      for (let i = 1; i < count; i++) {
        if (this.array[i] < outgoing) {
          outgoing = this.array[i];
        }
      }
      return outgoing;
    }
    // returns undefined
  }

  // TODO lots can be done to improve performance here
  removeValue(what) {
    let index = 0;
    // for (let i = 0; i < this.array.length; i++) {
    while (index < this.array.length) {
      // print(this.array[i], what);
      if (this.array[index] === what) {
        // console.log('removing');
        this.array.splice(index, 1);
      } else {
        index++;
      }
    }
  }

  removeIndex(index) {
    this.array.splice(index, 1);
  }

  size() {
    return this.array.length;
  }

  forEach(callback) {
    // TODO probably should be apply() or similar, right?
    for (let i = 0; i < this.array.length; i++) {
      callback(this.array[i], i, this.array);
    }
  }

  *[Symbol.iterator]() {
    // TODO can this be passed directly to the array?
    for (let i = 0; i < this.array.length; i++) {
      yield this.array[i];
    }
  }

  /* this should return a copy
  toArray() {
    return this.array;
  }
  */
}


export class Dict {
  object;
  order = null;

  constructor(object) {
    this.object = object;
  }

  #checkOrder() {
    if (this.order == null) {
      this.order = new List(Object.keys(this.object));
    }
  }

  sortKeys(reverse=false) {
    this.#checkOrder();
    this.order.sort(reverse);
  }

  sortValues(reverse=false) {
    this.#checkOrder();
    this.order.array.sort((a, b) => {
      let diff = reverse ? (this.object[b] - this.object[a]) : (this.object[a] - this.object[b]);
      if (diff !== 0) {
        return diff;  // normal case
      }
      // tie-breaker by alphabetizing (ignores 'reverse', too weird otherwise)
      return a.localeCompare(b, this.locale, { sensitivity: "base" });
    });
  }

  key(index) {
    // return this.order[index]
    return this.order.get(index);
  }

  value(index) {
    // return this.object[this.order[index]];
    return this.object[this.key(index)];
  }

  size() {
    return this.order.array.length;
  }

  *[Symbol.iterator]() {
    this.#checkOrder();
    let count = this.order.array.length;
    for (let i = 0; i < count; i++) {
      let key = this.order.array[i];
      yield [ key, this.object[key] ];
    }
  }

  /* this should return a copy
  getObject() {
    return this.object;
  }
  */
}