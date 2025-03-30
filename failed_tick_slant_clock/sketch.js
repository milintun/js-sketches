function setup() {
  size(400, 400);

  noStroke()
}

const CENTER = 200

function stiffs(numLines, lineLoc) {
  for (let i = 0; i < numLines; i++) {
  push()
  stroke("black")
  translate(CENTER, CENTER)
  rotate(radians(remap(i, 0, numLines, 0, 360)))
  line(... lineLoc)
  pop()
  }
}


function dynamic(time, maxTime, radius) {
  // clear()
  let currentAngle = radians(remap(time, 0, maxTime, -90, 270))
  console.log(second())
  arc(CENTER, CENTER, radius, radians(-90), currentAngle)
}

function antiDynamic(time, maxTime, radius) {
  // clear()
  let currentAngle = radians(remap(time, 0, maxTime, -90, 270))
  console.log(second())
  arc(CENTER, CENTER, radius, currentAngle, radians(-90) + (2 * PI))
}


function draw() {
  clear()
  // secs
  let stiffSecsLoc = [0, 100, 0, 120]
  let dynSecsLoc = [-7, 100, 0, 120]

  strokeWeight(0.5)
  push()
  stiffs(60, stiffSecsLoc)
  fill("white")
  dynamic(second(), 59, 250)
  pop()
  
  push()
  stiffs(60, stiffSecsLoc)
  fill(gray(10))
  antiDynamic(second(), 59, 250)
  stiffs(60, dynSecsLoc)
  pop()
  
  fill("black")
  circle(200, 200, 70)
  // textAlign(CENTER, CENTER)
  push()
  fill("white")
  text(hoursMinutesSeconds(), CENTER - 19, CENTER + 4)
  pop()
  
  
}