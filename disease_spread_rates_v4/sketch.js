const fr = 120
function setup() {
  size(400, 400);
  textFont('Times New Roman')
  frameRate(fr)
}


function draw() {
  const timeFactor = 4
  let time = frameCount % (timeFactor * fr)
  console.log(time)
  
  let preAngle = remap(smoothSecond() % 2, 0, 1, 0, TAU);
  let preOffset = remap(cos(preAngle), -1, 1, -7, 7)
  
  let postAngle = remap(smoothSecond() % 20, 0, 6, 0, TAU);
  // console.log(remap(smoothSecond() % 20, 0, 19, 0, TAU))
  let postOffset = remap(cos(preAngle), -1, 1, -3, 3)
  
  // let preX = remap(time, 0, 60, 30, 390) + preOffset
  let preY = remap(time, 0, timeFactor * fr, 350, 50) 
  // let postX = remap(time, 0, 60, 30, 390) - postOffset
  let postY = remap(time, 0, timeFactor * fr, 350, 338) 
  
  let preDiameter = remap(time, 0, fr, 20, 140) 
  let postDiameter = remap(time, 0, fr, 20, 30) 
  
  fill(98, 128, 255)
  stroke("black")
  const offsetAngle = Math.PI/9
  arc(0, 250, preDiameter, -Math.PI/4 - offsetAngle, Math.PI/4 - offsetAngle)
  fill(122, 213, 156)
  arc(400, 300, postDiameter, -5 * Math.PI/4 - offsetAngle, -3 * Math.PI/4 - offsetAngle)

  // circle(270 + postOffset, postY, 20)
  
  // 96 vs 8
}