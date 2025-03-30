const fr = 4
function setup() {
  size(400, 400);
  textFont('Times New Roman')
  frameRate(fr)
}


function draw() {
  // clear("white")
  // let planeX = remap(smoothMinute(), 0, 60, canvasStart + 105, roadLength + 90)
  // const planeY = 150
  //   // banner
  // let preAngle = remap(smoothSecond() % 2, 0, 1, 0, TAU);
  // // let bannerWidth = remap(cos(angle), -1, 1, 60, 65);
  // let preOffset = remap(cos(preAngle), -1, 1, -10, 10)
  // let offsetYSmall = remap(cos(angle), -1, 1, -3, 3)
  // const bannerHeight = 30
  // fill(255, 255, 255, 0.8)
  // quad(planeX - 80 - bannerWidth, planeY - bannerHeight / 2 + offsetY,  planeX - 80, planeY - bannerHeight / 2, planeX - 80, planeY + bannerHeight / 2, planeX - 80 - bannerWidth, planeY + bannerHeight / 2 + offsetY)
  // textSize(20)
  // fill(58, 110, 149, 0.8)
  // text(minute(), planeX - 80 - 30, planeY + offsetYSmall + 7)  
  
  let time = frameCount % (3 * fr)
  // console.log(offsetY)
  
  let preAngle = remap(smoothSecond() % 2, 0, 1, 0, TAU);
  let preOffset = remap(cos(preAngle), -1, 1, -7, 7)
  
  let postAngle = remap(smoothSecond() % 20, 0, 6, 0, TAU);
  // console.log(remap(smoothSecond() % 20, 0, 19, 0, TAU))
  let postOffset = remap(cos(preAngle), -1, 1, -3, 3)
  
  // let preX = remap(time, 0, 60, 30, 390) + preOffset
  let preY = remap(time, 0, fr, 350, 50) 
  // let postX = remap(time, 0, 60, 30, 390) - postOffset
  let postY = remap(time, 0, fr, 350, 338) 
  
  let preDiameter = remap(time, 0, fr, 20, 200) 
  let postDiameter = remap(time, 0, fr, 20, 60) 
  
  fill(98, 128, 255)
  stroke(98, 128, 255)
  arc(130, 350, preDiameter, 5 * Math.PI/4, 7 * Math.PI/4)
  fill(122, 213, 156)
  stroke(122, 213, 156)
  arc(270, 350, postDiameter, 5 * Math.PI/4, 7 * Math.PI/4)

  // circle(270 + postOffset, postY, 20)
  
  // 96 vs 8
}