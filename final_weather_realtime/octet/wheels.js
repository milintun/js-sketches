let _octet;
let _util;
let _wheels = null;


// load module separately so we can use it without this being .mjs
import('./util.js')
  .then((util) => {
    _util = util;

    import('./sketch.js')
      .then((octet) => {
        _octet = octet;
        window.Sketch = _octet.Sketch;
        window.Vec2 = _octet.Vec2;

        // https://webmasters.stackexchange.com/a/1065
        let script = document.createElement("script");
        script.innerText = 'initWheels()';
        document.body.appendChild(script);
      });
    });


function initWheels() {
  if (_wheels != null) {
    console.error('Cannot use initWheels() to create more than one sketch on the page.');

  } else {
    // Put the messy stuff in the LegacySketch subclass. Keeps things clean
    // and always possible to promote these back into Sketch as needed.
    class TrainingSketch extends Sketch {

      // used to make sure defaults are called for drawing properties
      _drawnOnce = false;


      size() {
        this.canvasRatio(...arguments);

        // update these vars so that width/height work inside setup()
        window.width = this.rwidth;
        window.height = this.rheight;
      }


      _handleDraw(when) {
        // pollute the global namespace with our vars
        /*
        window.width = this.width;
        window.height = this.height;
        window.mouseX = this.mouseX;
        window.mouseY = this.mouseY;

        window.rwidth = this.rwidth;
        window.rheight = this.rheight;
        window.rmouseX = this.rmouseX;
        window.rmouseY = this.rmouseY;
        */
        window.canvasWidth = this.width;
        window.canvasHeight = this.height;

        if (this._ratio) {
          window.width = this.rwidth;
          window.height = this.rheight;
          window.mouseX = this.rmouseX;
          window.mouseY = this.rmouseY;
        } else {
          window.width = this.width;
          window.height = this.height;
          window.mouseX = this.mouseX;
          window.mouseY = this.mouseY;
        }

        window.frameCount = this.frameCount;
        window.mouseIsPressed = this.mouseIsPressed;
        window.focused = this.focused;

        window.ctx = this.ctx;

        if (!this._drawnOnce) {
          super.textFont('sans-serif', 12);
          super.fill('white');
          super.stroke('black');
          this._drawnOnce = true;
        }

        // TODO same for mouseX/Y et al
        super._handleDraw(when);
      }


      clear() {
        if (arguments.length == 1) {
          if (typeof(arguments[0]) == 'string') {
            super.clear(arguments[0]);

          } else if (typeof(arguments[0]) == 'number') {
            // console.error('Use clear(gray(0..100)) or clear(r, g, b)');
            console.error('Use clear(gray(value)) with values from 0 to 100');
            // const v = arguments[0];
            // super.clear(this.rgb(v, v, v));
            // super.clear(this.gray(arguments[0]));
          }
        } else if (arguments.length == 2) {
          // Just no… this is too problematic. WTF is a "background" with alpha
          console.error('clear() with alpha not yet supported');
          return super.clear(arguments[0]);

        } else if (arguments.length == 3) {
          super.clear(_util.rgb(...arguments));
        }
      }


      fill() {
        if (arguments.length == 1) {
          if (arguments[0] == null || typeof(arguments[0]) == 'string') {
            super.fill(arguments[0]);

          } else if (typeof(arguments[0]) == 'number') {
            // super.fill(this.gray(arguments[0]));
            console.error('Use fill(gray(value)) with values from 0 to 100 for 0% (white) to 100% (black)');
          }
        } else if (arguments.length == 2) {
          super.fill(_util.gray(arguments[0], arguments[1]));

        } else if (arguments.length == 3) {
          super.fill(_util.rgb(...arguments));

        } else if (arguments.length == 4) {
          if (arguments[3] > 1) {
            console.warn('The alpha value for fill() should be a number between 0 and 1');
          }
          super.fill(_util.rgba(arguments[0], arguments[1], arguments[2], arguments[3]));
        }
      }


      stroke() {
        if (arguments.length == 1) {
          if (arguments[0] == null || typeof(arguments[0]) == 'string') {
            super.stroke(arguments[0]);

          } else if (typeof(arguments[0]) == 'number') {
            // super.stroke(this.gray(arguments[0]));
            console.error('Use stroke(gray(value)) with values from 0 to 100 for 0% (white) to 100% (black)');
          }
        } else if (arguments.length == 2) {
          super.stroke(_util.gray(arguments[0], arguments[1]));

        } else if (arguments.length == 3) {
          super.stroke(_util.rgb(...arguments));

        } else if (arguments.length == 4) {
          if (arguments[3] > 1) {
            console.warn('The alpha value for stroke() should be a number between 0 and 1');
          }
          super.stroke(_util.rgba(arguments[0], arguments[1], arguments[2], arguments[3]));
        }
      }


      /*
      // value between 0-100, alpha between 0.0 and 1.0
      gray(value, alpha) {
        const v = 255 * value / 100;
        if (arguments.length == 1) {
          return super.rgb(v, v, v);
        } else {
          return super.rgba(v, v, v, alpha);
        }
      }


      color() {
        if (arguments.length == 1) {
          if (typeof(arguments[0]) == 'string') {
            return arguments[0];

          } else if (typeof(arguments[0]) == 'number') {
            return this.gray(arguments[0]);
          }
        } else if (arguments.length == 2) {
          return this.gray(arguments[0], arguments[1]);

        } else if (arguments.length == 3) {
          return this.rgb(...arguments);

        } else if (arguments.length == 4) {
          return this.rgba(arguments[0], arguments[1], arguments[2], arguments[3] / 100);
        }
      }
      */


      /*
      map() {
        // console.log('map args', arguments);
        return remap(...arguments);
      }


      nf() {
        if (arguments.length == 1) {
          // no formatting, just make it into a string
          return str(arguments[0]);

        } else if (arguments.length == 2) {  // zero pad an integer
          return nfz(...arguments);

        } else if (arguments.length == 3) {  // pad decimal digits
          // The original Processing API had nf(int value, int zeroes)
          // and nf(float value, left, right) which did padding
          const [ value, left, right ] = arguments;
          if (right === 0) {
            // this is just a zero pad
            return nfz(value, left);

          } else if (left !== 0) {
            // pad with zeroes *and* set decimals
            const whole = Math.floor(value);
            const frac = Math.abs(value - whole);
            // substring removes the zero before the dot
            return nfz(whole, left) + right.toFixed(frac, right).substring(1);

          } else {
            return value.toFixed(right);
          }
        }
      }


      point() {
        if (arguments.length == 1) {  // !#@$! vectors
          const arg = arguments[0];
          if (typeof(arg) !== 'undefined') {
            super.point(arg.x, arg.y);
          }
        } else {
          super.point(...arguments);
        }
      }


      rect() {
        if (arguments.length == 8) {
          this.roundRect(...arguments);
        } else if (arguments.length == 5) {
          const amount = arguments[4];
          this.roundRect(arguments[0], arguments[1],
                         arguments[2], arguments[3],
                         amount, amount, amount, amount);
        } else {
          super.rect(...arguments);
        }
      }


      square() {
        if (arguments.length == 3) {
          super.square(...arguments);
        } else if (arguments.length == 4) {
          const amount = arguments[3];
          this.roundRect(arguments[0], arguments[1],
                         arguments[2], arguments[2],
                         amount, amount, amount, amount);
        }
      }


      ellipse() {
        if (arguments.length == 3) {
          // double the last param; it's a circle
          super.ellipse(arguments[0], arguments[1], arguments[2], arguments[2]);
        } else {
          super.ellipse(...arguments);
        }
      }


      arc(x, y, h, v, start, stop, kind) {
        if (h !== v) {
          // TODO or add a shim for this? is it ever used?
          console.error('width and height must be the same in arc(), just using the width');
        }
        super.arc(x, y, h, start, stop, kind);
      }
      */


      beginShape() {
        if (arguments.length == 0) {
          // super.beginPath();
          console.error('To create a path, use beginPath() instead of beginShape()');
        } else {
          console.error(`Not yet implemented: beginShape(${arguments[0]})`);
        }
      }


      /*
      endShape() {
        super.endPath(...arguments);
      }


      text(str, x, y) {
        if (typeof str === 'undefined') {
          // p5.js won't show 'undefined' in this scenario
          // (not helpful for beginners when trying to debug!)
          return;
        }

        if (this._fillHack) {
          // p5.js does an unfortunate thing with text and stroke/fill
          // where if fill() has not been called by a sketch, it makes
          // the text black. And separately, stroke also applies to
          // text, so lots of weird interactions there... Could do
          // textStroke() and textFill(), but that seems heavy-handed.
          // console.log('fillHack() strikes back');
          super.fill('black');
        }

        // If stroke() hasn't been called, it appears that it won't stroke text
        super.text(str, x, y, !this._strokeHack);

        if (this._fillHack) {
          // console.log('text() setting fill back to white because fillHack is true');
          super.fill('white');  // set back to the default
        }
      }


      // NORMAL = 'regular';
      // BOLD = 'bold';
      // ITALIC = 'italic';
      // BOLDITALIC = 'bold italic';

      // https://p5js.org/reference/p5/textStyle/
      textStyle(style) {
        super._textStyle = style;
        super._textFontImpl();
      }


      millis() {  // though this is a util function; so it may be overridden
        return 1000 * super.elapsed();
      }


      append(array, items) {
        //array.push(...items);
        // items.forEach(item => {
        //   array.push(item);
        // });
        array.push(items);
      }
      */


      // TODO probably a class method, since angleMode() can affect some calls
      createVector(x, y) {
        return new Vec2(x, y);
      }


      /*
      // blech; not consistent with other api calls (little/none take vectors)
      mag(v) {
        return v.mag();
      }


      translate(v) {
        if (typeof(v) === 'object') {
          super.translate(v.x, v.y);
        } else {
          super.translate(...arguments);
        }
      }


      // planning to remove since unlike Java, this is better supported in JS
      split(str, what) {
        return str.split(what);
      }


      randomSeed() {
        // ignored, need to build by hand
        // https://stackoverflow.com/a/47593316
      }
      */

      print() {
        console.log(...arguments);
      }
    }


    /*
    window.p5 = {
      "Vector": {
        dist(a, b) {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          return Math.sqrt(dx*dx + dy*dy);
        },

        sub(a, b) {
          return new Vec2(a.x - b.x, a.y - b.y);
        },

        fromAngle(angle, magnitude=1) {
          return new Vec2(cos(angle) * magnitude, sin(angle) * magnitude);
        }
      }
    }
    */

    _wheels = new TrainingSketch();

    if (typeof(preload) !== 'undefined') {
      console.error('Use load() instead of preload()');
    }

    if (typeof(load) !== 'undefined') _wheels.load = load;
    if (typeof(setup) !== 'undefined') _wheels.setup = setup;
    if (typeof(draw) !== 'undefined') _wheels.draw = draw;

    if (typeof(canvasResized) !== 'undefined') _wheels.canvasResized = canvasResized;
    if (typeof(mousePressed) !== 'undefined') _wheels.mousePressed = mousePressed;
    if (typeof(mouseReleased) !== 'undefined') _wheels.mouseReleased = mouseReleased;
    if (typeof(mouseMoved) !== 'undefined') _wheels.mouseMoved = mouseMoved;
    if (typeof(mouseDragged) !== 'undefined') _wheels.mouseDragged = mouseDragged;
    if (typeof(mouseEnter) !== 'undefined') _wheels.mouseEnter = mouseEnter;
    if (typeof(mouseLeave) !== 'undefined') _wheels.mouseLeave = mouseLeave

    // iterate all properties and methods and add them to window

    /*
    window.LEFT = _octet.LEFT;
    window.RIGHT = _octet.RIGHT;
    window.UP = _octet.UP;
    window.DOWN = _octet.DOWN;

    window.BASELINE = _octet.BASELINE;
    window.TOP = _octet.TOP;
    window.BOTTOM = _octet.BOTTOM;

    window.CORNER = _octet.CORNER;
    window.CORNERS = _octet.CORNERS;
    window.CENTER = _octet.CENTER;
    window.RADIUS = _octet.RADIUS;

    window.OPEN = _octet.OPEN;
    window.CLOSE = _octet.CLOSE;

    window.CHORD = _octet.CHORD;
    window.PIE = _octet.PIE;
    window.WEDGE = _octet.WEDGE;

    window.ROUND = _octet.ROUND;
    window.BUTT = _octet.BUTT;
    window.MITER = _octet.MITER;
    window.BEVEL = _octet.BEVEL;

    window.REPLACE = _octet.REPLACE;
    window.BLEND = _octet.BLEND;
    window.ADD = _octet.ADD;
    window.SUBTRACT = _octet.SUBTRACT;
    window.LIGHTEST = _octet.LIGHTEST;
    window.DARKEST = _octet.DARKEST;
    window.DIFFERENCE = _octet.DIFFERENCE;
    window.EXCLUSION = _octet.EXCLUSION;
    window.MULTIPLY = _octet.MULTIPLY;
    window.SCREEN = _octet.SCREEN;
    window.OVERLAY = _octet.OVERLAY;
    window.HARD_LIGHT = _octet.HARD_LIGHT;
    window.SOFT_LIGHT = _octet.SOFT_LIGHT;
    window.DODGE = _octet.DODGE;
    window.BURN = _octet.BURN;

    window.BACKSPACE = _octet.BACKSPACE;
    window.DELETE = _octet.DELETE;

    window.PI = _octet.PI;
    window.TAU = _octet.TAU;

    window.RADIANS = _octet.RADIANS;
    window.DEGREES = _octet.DEGREES;
    */

    const CONSTANTS = [
      'LEFT',
      'RIGHT',
      'UP',
      'DOWN',

      'BASELINE',
      'TOP',
      'BOTTOM',
      'CORNER',
      'CORNERS',
      'CENTER',
      'RADIUS',

      'OPEN',
      'CLOSE',

      'CHORD',
      'PIE',
      'WEDGE',

      'SQUARE',
      'ROUND',
      'BUTT',
      'MITER',
      'BEVEL',

      'REPLACE',
      'BLEND',
      'ADD',
      'SUBTRACT',
      'LIGHTEST',
      'DARKEST',
      'DIFFERENCE',
      'EXCLUSION',
      'MULTIPLY',
      'SCREEN',
      'OVERLAY',
      'HARD_LIGHT',
      'SOFT_LIGHT',
      'DODGE',
      'BURN',
      'BACKSPACE',
      'DELETE',

      'PI',
      'TAU',
      'RADIANS',
      'DEGREES'
    ];

    CONSTANTS.forEach(name => {
      window[name] = _octet[name];
    });

    // let everyone = '';
    // note the order of prototype sources here for functions ala millis() that
    // overwrite another identically-named function when running in legacy mode
    const prototypes = [ _util, Sketch.prototype, TrainingSketch.prototype ];
    prototypes.forEach(proto => {
      const friends = Object.getOwnPropertyNames(proto);
      friends.forEach(name => {
        if (name !== 'constructor' && !name.startsWith('_')) {
          // console.log(name);
          // everyone += `'${name}',`;
          // everyone += `  '${name}',\n`;
          if (!window.hasOwnProperty(name) ||
              TrainingSketch.prototype.hasOwnProperty(name)) {
            window[name] = function() {
              // console.log('called', name, ...arguments);
              //return Sketch.prototype[name].call(_wheels, ...arguments);
              return proto[name].call(_wheels, ...arguments);
            }
          } else {
            // if (name != 'hour' && name != 'minute' && name != 'second') {
            console.info(`skipping override of ${name}()`);
            // } else {
            //   console.log('Skipping hour(), minute(), second() overrides for randomizeTime()');
            // }
          }
        }
      });
      // everyone += '\n';
    });
    // console.log(everyone);

    _wheels.init(null);
  }
}
