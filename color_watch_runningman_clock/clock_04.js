function setup() {
  size(400, 400);
  textFont("Impact")
}

function draw() {
  clear("white")
  let centerX = 200
  let centerY = 230
  let radius1 = 100
  let radius2 = 109
    
  strokeWeight(10)
  
  push()
    noStroke()
    clear("white")
    translate(centerX, centerY)
    fill("black")
    circle(0, 0, radius1 * 2)
    
    rotate(-radians(remap(smoothSecond(), 0, 60, -180, 180)))
    push()
      textSize(80)
      rotate(radians(180))
      fill("white")
      textAlign(CENTER, CENTER)
      text(hour(), 0, 0)
      push()
        fill("black")
        translate(0, radius1)
        // rotate(radians(180))
        textSize(50)
        text(minute(), 0, -2 * radius2)
      pop()
    pop()
  pop()
  
  let shade1;
  let shade2;
  let currentSecond = second()
  
  if (currentSecond > 55 || currentSecond < 5) {
    shade1 = gray(0, 0); 
    shade2 = gray(0, 0);
    stroke(gray(100))
    line(190, 80, 240, 70)
    line(190, 80, 140, 80)
    // R arm
    line(197, 55, 230, 50)  
    // L arm
    line(197, 55, 165, 55)
      fill("black")
      
    // head
    circle(203, 35, 20)
    // headband
    push()
    stroke("red")
    strokeWeight(4.5)
    line(190, 30, 218, 35)
    line(190, 30, 180, 20)
    line(190, 30, 180, 35)
    pop()
    // body
    line(200, 40, 190, 80)
  }
  else{
    if (currentSecond % 2 === 0) {shade1 = gray(100); shade2 = gray(20)}
    else {shade1 = gray(20); shade2 = gray(100)}
    
    push()
    stroke(shade1)
    // R thigh
    line(190, 90, 212, 102)
    // R calf
    line(212, 102, 200, 125)
    // R bicep
    line(197, 65, 213, 77)
    // R forearm
    line(213, 77, 230, 65)
    pop()
    
    push()
    stroke(shade2)
    // L thigh
    line(190, 90, 170, 110)
    // L calf
    line(170, 110, 150, 90)
    // L bicep
    line(197, 65, 177, 55)
    // L forearm
    line(177, 55, 165, 72)
    pop()
    
    fill("black")
    // head
    circle(203, 45, 20)
    // headband
    push()
    stroke("red")
    strokeWeight(4.5)
    line(190, 40, 218, 45)
    line(190, 40, 180, 30)
    line(190, 40, 180, 45)
    pop()
    // body
    line(200, 50, 190, 90)
  }
}


function mousePressed() {
  randomizeTime()
}

