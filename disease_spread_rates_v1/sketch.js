function setup() {
  size(400, 400);
  textFont('Times New Roman')
  noStroke()
}


function draw() {
  let time = frameCount % 60
  // console.log(offsetY)
  
  if (time === 59) {
    noLoop()
  }
  
  let preAngle = remap(smoothSecond() % 2, 0, 1, 0, TAU);
  let preOffset = remap(cos(preAngle), -1, 1, -7, 7)
  
  let postAngle = remap(smoothSecond() % 20, 0, 6, 0, TAU);
  // console.log(remap(smoothSecond() % 20, 0, 19, 0, TAU))
  let postOffset = remap(cos(preAngle), -1, 1, -1, 1)
  
  let preX = remap(time, 0, 60, 30, 390) + preOffset
  let preY = remap(time, 0, 60, 350, 50) 
  let postX = remap(time, 0, 60, 30, 390) - postOffset
  let postY = remap(time, 0, 60, 350, 338) 

  stroke(98, 128, 255)
  circle(130 + preOffset, preY, 20)
  stroke(122, 213, 156)
  circle(270 + postOffset, postY, 20)
  
  // 96 vs 8
}