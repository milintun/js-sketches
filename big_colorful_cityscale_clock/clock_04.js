// Clock 04
// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/

// FEATS
// - BY THE HOUR: revolving sun and moon with hour text, plane finishes sky
// - BY THE MINUTE: plane moves with banner minute text, car finishes road, <30% of houselights randomly switch on and off
// - BY THE SECOND: car moves and pushes second text
// - EXTRA:
    // - animated oscillating banner 
    // - changing sky colors with accurate sunrises and sunsets
    // - houselights turn on during the day and off during the night
    // - randomized house colors within red brick range upon initialization


function remapRGB(value, rangeStart, rangeEnd, shadeStart, shadeEnd) {
  let rgbShade = []
  for (let i = 0; i < 3; i++) {
    rgbShade.push(remap(value, rangeStart, rangeEnd, shadeStart[i], shadeEnd[i]))
  }
  return rgbShade
}
const topRowColors = []
const bottomRowColors = []
const numHouses = 14;


function setup() {
  size(400, 400);
  textFont("Impact")
  textAlign(CENTER)
  for (let i = 0; i < numHouses; i++) {
    topRowColors.push([random(140, 180),
                       random(70, 100),   
                       random(50, 80)]);
  }
  for (let i = 0; i < numHouses; i++) {
    bottomRowColors.push([random(140, 180),
                       random(70, 100),   
                       random(50, 80)]);
  }
}


let dayFlag = true
let previousMinute = -1
let windowsAgainstTop;
const indexWindowsAgainstTop = new Set()
let windowsAgainstBottom;
const indexWindowsAgainstBottom = new Set()
let carColorIndex;

function draw() {
  let nightShade = [20, 40, 88]
  let sunSetRiseShade = [201, 89, 186]
  let dayShade = [210, 235, 255]
  
  
  let currentMinute = (hour() * 60) + minute()
  // let currentMinute = second() * 60 // 60 second simulation
  // console.log(currentMinute)
  let skyShade;
  const carColors = [[218, 27, 27], [45, 115, 47], [247, 234, 40], [34, 86, 175], [48, 48, 48], [249, 249, 249]]
  const canvasStart = -120
  const roadLength = 500
  
  // randomize windows and car color every minute
  if (currentMinute !== previousMinute) {
    windowsAgainstTop = random(0, 3)
    for (let i = 0; i < windowsAgainstTop; i++) {
      indexWindowsAgainstTop.add(Math.floor(random(0, numHouses)))
    }
    windowsAgainstBottom = random(0, 3)
    for (let i = 0; i < windowsAgainstBottom; i++) {
      indexWindowsAgainstBottom.add(Math.floor(random(0, numHouses)))
    }
    carColorIndex = Math.round(random(0, 5))
    previousMinute = currentMinute
  }

  // sunrise
  if (currentMinute >= 350 && currentMinute <= 430) {
    skyShade = remapRGB(currentMinute, 350, 510, nightShade, sunSetRiseShade)
    dayFlag = false
  }
  else if (currentMinute > 430 && currentMinute <= 510) {
    skyShade = remapRGB(currentMinute, 431, 510, sunSetRiseShade, dayShade)
    dayFlag = true
  }
  // sunset
  else if (currentMinute >= 1050 && currentMinute <= 1100) {
    skyShade = remapRGB(currentMinute, 1050, 1100, dayShade, sunSetRiseShade)
    dayFlag = true
  }
  else if (currentMinute > 1100 && currentMinute <= 1150) {
    skyShade = remapRGB(currentMinute, 1101, 1150, sunSetRiseShade, nightShade)
    dayFlag = false
  }
  // day
  else if (currentMinute > 510 && currentMinute < 1050) {
    skyShade = dayShade
    dayFlag = true
  }
  // night
  else {
    skyShade = nightShade
    dayFlag = false
  }
  
  clear(...skyShade);
  noStroke()  
  
  // sun and moon
  const orbitRadius = 200
  let moonPos = clockHand(currentMinute, 1440, orbitRadius, 200, 250)
  let moonX = moonPos["x"]
  let moonY = moonPos["y"]
  let sunX = 400 - moonX
  let sunY = 500 - moonY
  const sunMoonRadius = 70
  
  fill(255, 203, 98)
  circle(sunX, sunY, sunMoonRadius)
  fill (gray(7))
  circle(moonX, moonY, sunMoonRadius)
  
  // hour text on sun and moon
  textSize(40)
  fill(185, 130, 21)
  text(twelveHour(), sunX, sunY + 15)
  fill(gray(60))
  text(twelveHour(), moonX, moonY + 15)
  
  // plane
  let planeX = remap(smoothMinute(), 0, 60, canvasStart + 102, roadLength + 135)
  const planeY = 150
  fill("white")
  ellipse(planeX, planeY, 70, 13)
  fill(72, 175, 235)
  triangle(planeX - 35, planeY - 2, planeX - 35, planeY - 18, planeX - 20, planeY - 4)
  triangle(planeX - 8, planeY + 1, planeX - 15, planeY + 18, planeX + 8, planeY + 1)
  push()
    stroke(gray(50))
    line(planeX - 35, planeY, planeX - 80, planeY)
  pop()

  // banner
  let angle = remap(smoothSecond() % 3, 0, 3, 0, TAU);
  let bannerWidth = remap(cos(angle), -1, 1, 60, 65);
  let offsetY = remap(cos(angle), -1, 1, -5, 5)
  let offsetYSmall = remap(cos(angle), -1, 1, -3, 3)
  const bannerHeight = 30
  fill(255, 255, 255, 0.8)
  quad(planeX - 80 - bannerWidth, planeY - bannerHeight / 2 + offsetY,  planeX - 80, planeY - bannerHeight / 2, planeX - 80, planeY + bannerHeight / 2, planeX - 80 - bannerWidth, planeY + bannerHeight / 2 + offsetY)
  textSize(20)
  fill(58, 110, 149, 0.8)
  text(minute(), planeX - 80 - 30, planeY + offsetYSmall + 7)  
  
  // grass 
  fill(102, 156, 107)
  rect(-200, 250, 800, 150)
  
  const nightWindow = [64, 82, 118]
  const dayWindow = [249, 230, 138]
  let windowShade;
  let notWindowShade;
  if (dayFlag) {windowShade = dayWindow; notWindowShade = nightWindow}
  else {windowShade = nightWindow; notWindowShade = dayWindow}
  
  // top row houses
  const houseSpace = 77
  let topRowX = -150
  let topRowY = 230
  for (let i = 0; i < numHouses; i++) {
    fill(...topRowColors[i])
    square(topRowX, topRowY, 65)
    // window
    if (indexWindowsAgainstTop.has(i)) {
      fill(...notWindowShade)
    } else {
    fill(...windowShade)
    }
    rect(topRowX + 30, topRowY + 15, 18, 30)
    topRowX += houseSpace
  }
  
  // road
  fill(gray(70))
  rect(-200, 300, 800, 30)
  
  // car
  let currentSecond = smoothSecond()
  fill(...carColors[carColorIndex])
  let carX = remap(currentSecond, 0, 60, canvasStart - 29, roadLength - 24)
  rect(carX, 300, 29, 15)
  fill(175, 200, 219)
  rect(15 + carX, 302, 11, 7)
  rect(2 + carX, 302, 11, 7)
  
  // second text on car
  textSize(16)
  fill("white")
  text(second(), carX + 37, 314)
  
  // bottom row houses
  fill(162, 89, 70)
  let bottomRowX = -186
  let bottomRowY = 313
  for (let i = 0; i < numHouses; i++) {
    fill(...bottomRowColors[i])
    square(bottomRowX, bottomRowY, 65)
    // window
    if (indexWindowsAgainstBottom.has(i)) {
      fill(...notWindowShade)
    } else {
    fill(...windowShade)
    }
    rect(bottomRowX + 30, bottomRowY + 15, 18, 30)
    bottomRowX+= houseSpace
  }
}

  function mousePressed() {
    randomizeTime();
  }