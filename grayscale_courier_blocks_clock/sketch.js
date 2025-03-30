// TODO:  split text into complementary color parts
function setup() {
  size(400, 400);
  // let oswaldFont = loadFont('https://fonts.googleapis.com/css2?family=Oswald:wght@400&display=swap');
  textFont("Courier New");
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
  
  let numTime = Number(time)
  let teens = time > 9 && time < 20 ? true : false;
  let suffix;
  
  if (teens) {suffix = "TH"}
  else {
    if (time.at(-1) === "1") {
      suffix = "ST"
    }
    else if (time.at(-1) === "2") {
      suffix = "ND"
    }
    else if (time.at(-1) === "3") {
      suffix = "RD"
    }
    else {
      suffix = "TH"
    }
  }
  
  console.log(suffix)
  return time + suffix + " " + word
  
}

function draw() {
  clear(255, 128, 0);
  noStroke();
  fill(gray(10))
  rect(0, 0, 200, 400)
  fill(gray(20))
  rect(0, 400, 200, -remap(hour(), 0, 23, 0, 400))
  
  fill("white")
  textSize(37)
  text(timeFormat("h"), 0, 410 - remap(hour(), 0, 23, 0, 400))
  
  fill(gray(40))
  rect(200, 0, 150, 400)
  fill(gray(60))
  rect(200, 400, 150, -remap(minute(), 0, 59, 0, 400))
  
  fill("white")
  textSize(23)
  text(timeFormat("m"), 200, 408 - remap(minute(), 0, 59, 0, 400))
  
  fill(gray(70))
  rect(350, 0, 50, 400)
  fill(gray(100))
  rect(350, 400, 50, -remap(second(), 0, 59, 0, 400))
  
  fill("white")
  textSize(7.4)
  text(timeFormat("s"), 350, 402 - remap(second(), 0, 59, 0, 400))
}