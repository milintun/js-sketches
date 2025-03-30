// let oswaldFont;

function setup() {
  size(400, 400);
  // let oswaldFont = loadFont('https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap');
  // textFont(oswaldFont);
}
function timeFormat(type) {
  let word;
  let time;
  if (type === "h") {
    word = "HOUR"
    time = hour().toString()
    // console.log(time.at(-1))
  }
  else if (type === "m") {
    word = "MINUTE"
    time = minute().toString()
  }
  else {
    word = "SECOND"
    time = second().toString()
  }

  let suffix;
  if (time.at(-1) === "1") {
    suffix = "ST"
  }
  else if (time.at(-1) === "2") {
    console.log('here')
    suffix = "ND"
  }
  else if (time.at(-1) === "3") {
    suffix = "RD"
  }
  else {
    suffix = "TH"
  }
  return time + suffix + " " + word
}

function draw() {
  clear(255, 128, 0);
  noStroke();
  fill(94, 196, 216)
  rect(0, 0, 200, 400)
  fill(255, 178, 100)
  rect(0, 400, 200, -remap(hour(), 0, 23, 0, 400))
  
  /**
   * formats time correctly except for teens
   */
  // console.log(timeFormat("h"))
  
  fill("white")
  textSize(35)
  text(timeFormat("h"), 0, 410 - remap(hour(), 0, 23, 0, 400))
  
  fill(82, 178, 198)
  rect(200, 0, 150, 400)
  fill(245, 148, 52)
  rect(200, 400, 150, -remap(minute(), 0, 59, 0, 400))
  
  fill("white")
  textSize(23)
  text(timeFormat("m"), 200, 408 - remap(minute(), 0, 59, 0, 400))
  
  fill(52, 170, 193)
  rect(350, 0, 50, 400)
  fill(255, 128, 0)
  rect(350, 400, 50, -remap(second(), 0, 59, 0, 400))
  
  fill("white")
  textSize(7)
  text(timeFormat("s"), 350, 402 - remap(second(), 0, 59, 0, 400))

  matte()
}
