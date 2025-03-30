// Clock 07
// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

function node(location, shade, weight, angle, time, fontSize) {
  push();
  translate(...location);
  rotate(radians(-90));  // start on the minute position
  stroke(shade);
  strokeWeight(weight)
  line(width, 0, - width, 0);  // arbitrarily large
  for (let i = 0; i < time; i++) {
    rotate(angle);
    line(-width, 0, width, 0);
  }
  textSize(fontSize)
  text(time, 45 * fontSize / 9, 12 * fontSize / 11)

  pop();
}
function setup() {
  size(400, 400);
  textFont("Courier New")
}


function draw() {
  let shade1 = gray(30)
  let shade2 = gray(60)
  let shade3 = gray(100)
  
  clear('white');
  fill('black');

  node([50, 70], shade1, 0.3, TAU / 120, second(), 7)
  node([300, 120], shade2, 0.6, TAU / 120, minute(), 13)
  node([120, 250], shade3, 1.1, TAU / 48, hour(), 22)
}
