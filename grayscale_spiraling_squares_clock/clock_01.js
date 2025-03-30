// Clock 01
// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/

function setup() {
  size(400, 400);
  textFont("Times New Roman")
  textSize(30)
  textAlign(CENTER, CENTER);
  let initialSecond = second()
  stroke('black');
  noFill();
  
  // initialize squares before current second
  for (let i = 0; i < initialSecond; i++) {
    push()
    // let r = remap(second(), 0, 59, 242, 98)
    // let g = remap(second(), 0, 59, 238, 75)
    // let b = remap(second(), 0, 59, 230, 59)
    // stroke(r, g, b)
    let grayscale = remap(second(), 0, 59, 0, 100)
    stroke(gray(grayscale))
    translate(width/2, height/2)
    rotate(radians(remap(i, 0, 58, 0, 360)))
    square(0, 0, remap(i, 0, 59, 40, 400), CENTER);
    pop()
  }
}

let previousSecond = -1

function draw() {
  noFill();
  let currentSecond = second()
  let amount = remap(second(), 0, 59, 40, 400);

  // new rotated square every second
  if (currentSecond !== previousSecond) {
    push()
    // let r = remap(second(), 0, 59, 242, 98)
    // let g = remap(second(), 0, 59, 238, 75)
    // let b = remap(second(), 0, 59, 230, 59)
    // stroke(r, g, b)
    let grayscale = remap(second(), 0, 59, 0, 100)
    stroke(gray(grayscale))
    translate(width/2, height/2)
    rotate(radians(remap(second(), 0, 58, 0, 360)))
    square(0, 0, amount, CENTER);
    previousSecond = currentSecond
    pop()
  }
  
  // text background
  noStroke()
  fill('white')
  square(width/2, height/2, 40, CENTER);
  rect(width/2, 30, 80, 40, CENTER)
  // text
  fill("black")
  // fill(91, 57, 18);
  text(hoursMinutes(), width/2, 30);
  // fill(148, 121, 109);
  fill(gray(40))
  text(second() + 1, width/2, height/2);
  
  // clear every minute
  if (currentSecond === 59) {
    clear("white")
  }
}
