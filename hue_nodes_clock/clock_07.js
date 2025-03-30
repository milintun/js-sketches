// Clock 07
// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

function node(location, shade, weight, angle, time) {
  push();
  translate(...location);
  rotate(radians(-90));  // start on the minute position
  stroke(...shade);
  strokeWeight(weight)
  line(width, 0, - width, 0);  // arbitrarily large
  for (let i = 0; i < time; i++) {
    rotate(angle);
    line(-width, 0, width, 0);
  }
  pop();
}
function setup() {
  size(400, 400);
}

let previousSecond = -1
let previousMinute = -1
let previousHour = -1

let r;
let g;
let b;

function draw() {
  let currentSecond = second()
  if (currentSecond !== previousSecond) {
    b = random(0, 255)
    previousSecond = currentSecond
  }
  
  let currentMinute = minute()
  if (currentMinute !== previousMinute) {
    g = random(0, 255)
    previousMinute = currentMinute
  }
  
  let currentHour = hour()
  if (currentHour !== previousHour) {
    r = random(0, 255)
    previousHour = currentHour
  }
  
  let shade1 = [r, g, b, 0.6]
  let shade2 = [r, g, 200, 0.6]
  let shade3 = [r, 150, 150, 0.7]
  
  if (hour() > 6 && hour() < 18) {clear('white')} 
  else {clear('black')}
  
  node([50, 70], shade1, 5, TAU / 120, second())
  node([300, 120], shade2,10, TAU / 120, minute())
  node([120, 250], shade3, 20, TAU / 48, hour())
  
}
