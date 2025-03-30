const fr = 120
function setup() {
  size(400, 400);
  textFont('Times New Roman')
  textAlign(CENTER)
  frameRate(fr)
  noStroke()
}


function draw() {
  clear("black")

  const timeFactor = 3.5
  let time = frameCount % (timeFactor * fr)
  console.log(time)
  
  if (time === timeFactor * fr - 2) {
    noLoop()
  }
  
  // let preX = remap(time, 0, 60, 30, 390) + preOffset
  let preY = remap(time, 0, timeFactor * fr, 350, 50) 
  // let postX = remap(time, 0, 60, 30, 390) - postOffset
  let postY = remap(time, 0, timeFactor * fr, 350, 338) 
  
  let preDiameter = remap(time, 0, timeFactor * fr, 20, 800) 
  let postDiameter = remap(time, 0, timeFactor * fr, 20, 800/12) 
  
  fill(122, 44, 44)
  arc(-120, 0, preDiameter, 0, Math.PI/2)
  let relPreCount = round(remap(frameCount%(timeFactor*fr), 0, timeFactor * fr - 2, 1, 5000))
  let preTextX = remap(frameCount%(timeFactor*fr), 0, timeFactor * fr, -50, 350)
  text("+ " + relPreCount + " infected", preTextX, 20)

  fill(203, 127, 127)
  arc(520, 400, postDiameter, -Math.PI,-Math.PI/2)
  let relPostCount = round(remap(frameCount%(timeFactor*fr), 0, timeFactor * fr - 2, 1, 400))
  let postTextX = remap(frameCount%(timeFactor*fr), 0, timeFactor * fr, 450, 420)
  text("+ " + relPostCount + " infected", postTextX, 390)

  
  fill("white")
  textSize(30)
  text("Week " + round(remap(frameCount%(timeFactor*fr), 0, timeFactor * fr, 0, 52)), 350, 220)
  
  textSize(15)





  // 96 vs 8
}