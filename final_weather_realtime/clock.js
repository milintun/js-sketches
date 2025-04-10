let _hourOffset = 0;
let _minuteOffset = 0;
let _secondOffset = 0;


function randomizeTime() {
    _hourOffset = choice(24);
    _minuteOffset = choice(60);
    _secondOffset = choice(60);
    // console.log(_hourOffset, _minuteOffset, _secondOffset);
}


function hour() {
    return (new Date().getHours() + _hourOffset) % 24;
}


function minute() {
    return (new Date().getMinutes() + _minuteOffset) % 60;
}


function second() {
    return (new Date().getSeconds() + _secondOffset) % 60;
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


// Get the x, y position of an analog clock hand given a
// middle point and a radius (length) for the hand.
function clockHand(value, maxValue, radius, middleX, middleY) {
    // let angle = map(value, 0, maxValue, radians(-90), radians(270));
    let angle = remap(value, 0, maxValue, radians(-90), radians(270));
    if (arguments.length == 3) {
        middleX = width / 2;
        middleY = height / 2;
    }
    return {
        'x': middleX + cos(angle)*radius,
        'y': middleY + sin(angle)*radius
    };
}


// Returns the hour as a number between 1 and 12, rather than 0 through 23.
function twelveHour() {
    let h = hour() % 12;
    if (h === 0) {
      h = 12;
    }
    return h;
}


// Format hours and minutes, padding both to always be two digits,
// e.g. 12:40 or 07:30.
function hoursMinutes() {
    // return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
    // return nfz(twelveHour(), 2) + ':' + nfz(minute(), 2);
    return twelveHour() + ':' + nfz(minute(), 2);
}


// Format hours, minutes, and seconds, e.g. 12:40:37 or 06:30:00.
function hoursMinutesSeconds() {
    // return hoursMinutes() + ':' + nf(second(), 2);
    return hoursMinutes() + ':' + nfz(second(), 2);
}


// The current second as a decimal value that accounts for milliseconds.
function smoothSecond() {
    // could use second() and millis() here, but it's an extra 'new Date()' call
    // return second() + millis() / 1000;
    let d = new Date();
    return d.getSeconds() + d.getMilliseconds() / 1000;
}


function smoothMinute() {
    return minute() + smoothSecond() / 60;
}


function smoothHour() {
    return hour() + smoothMinute() / 60;
}


function meridiem() {
    return hour() < 12 ? 'am' : 'pm';
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

// Avoid confusion when using adaptations from p5.js


function background() {
    console.error('Use clear() instead of background()');
}


function createCanvas() {
    console.error("Use size() instead of createCanvas()");
}


// . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


let _watchInit = false;
let _watchImage = null;
const WATCH_IMAGE_WIDTH = 550;  // hard-coded we don't have bad frames until load
const WATCH_IMAGE_HEIGHT = 900;
const WATCH_BEZEL = 78;  // diameter of darker ring around everything
let _watchScale, _watchX, _watchY, _watchWidth;
let _watchHeight = 300;
let _sketchX, _sketchY, _sketchScale;


function beginWatch() {
    if (!_watchInit) {
        requestImage('../series6.png', (img) => {
            // watchImage.resize(400, 0);
            _watchImage = img;
        });
        _watchInit = true;  // avoid requesting the watch several times
    }
    // image is 550 x 900
    // (91, 226) with 0 in lower-left (also upper-left: image is symmetrical)
    // screen area is 368 wide x 448 tall
    _watchScale = _watchHeight / WATCH_IMAGE_HEIGHT;
    _watchWidth = WATCH_IMAGE_WIDTH * _watchScale;
    _watchX = (width - _watchWidth) / 2;
    _watchY = (height - _watchHeight) / 2;

    // version that goes flush to top/bottom
    // sketchY = _watchY + 226 * _watchScale;
    // sketchScale = 448 * _watchScale / height;

    // version that's flush left/right
    _sketchY = _watchY + 266 * _watchScale;
    _sketchScale = 368 * _watchScale / height;

    _sketchX = (width - width*_sketchScale) / 2;

    push();
    translate(_sketchX, _sketchY);
    scale(_sketchScale);
}


function endWatch(showTime=false) {
    if (showTime) {
        watchTime();
    }
    pop();

    push();
    noStroke();
    fill('white');
    rectMode(CORNER);
    let halfBezel = WATCH_BEZEL * _watchScale * 0.5;
    let bezelVert = _sketchY - halfBezel;
    let bezelHoriz = _sketchX - halfBezel;
    rect(0, 0, width, bezelVert);  // clear top
    rect(0, 0, bezelHoriz, height);  // left
    rect(width - bezelHoriz, 0, bezelHoriz, height);  // right
    rect(0, height - bezelVert, width, bezelVert);  // bottom
    pop();

    if (_watchImage != null) {
        image(_watchImage, _watchX, _watchY, _watchWidth, _watchHeight);
    }
}


function watchTime() {
    push();
    noStroke();
    fill('white');
    // textAlign(RIGHT);
    // textSize(28);
    textAlign(RIGHT);
    textSize(45);
    text(twelveHour() + ':' + nfz(minute(), 2), width-39, 27);
    pop();
}
