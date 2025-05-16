// this will store all the weather data

let w;
let borderX;
let borderY;
let t;
let noiseY;
let noiseRotate;



function setup() {
  size(393, 659);
  borderX = [width/5, 4 * width / 5];
  borderY = [height / 4, 3 * height / 4];
  t = 0;
  noiseY = 2000;
  noiseRotate = 5000;
  strokeWeight(1)

  // get the current weather for SATX latitude and longitude
  w = requestWeather(29.4252, -98.4946); 
}


function draw() {
  clear("white"); 
  textSize(120);
  textAlign(CENTER);

  if (w.ready) {
    const temp = w.getApparentTemperature();
    const hum = w.getHumidity();
    const prec = w.getPrecipitationIntensity();
    const cloud = w.getCloudCover();
    
    // WIND SIMULATION
    const wind = w.getWindSpeed();
    console.log(wind)
    // const wind = 50 // simulate wind speed
    

    const hsv = [remap(temp, -18, 80, 0.65, 0.02), 0.62, 0.77];
    const rgb = HSVtoRGB(...hsv)
    fill(...rgb)
    stroke(...rgb)
    
    // ENTROPY SIMLUATION
    const [entropy, windIndex] = calcEntropy(temp, hum, prec, wind, cloud); // realtime entropy
    // const entropy = 1 // simulate entropy value
    // const windIndex = remap(wind, 0, 70, 0, 1);


    const fr = remap(entropy, 0, 1, 1, 15);
    frameRate(fr)
    drawEntropy(entropy, windIndex)
  }
}


function calcEntropy(temp, hum, prec, wind, cloud) {
  const tempIndex = calcTempIndex(temp);
  const precIndex = remap(prec, 0, 0.5, 0, 1);
  const windIndex = remap(wind, 0, 70, 0, 1);
  const entropy = (tempIndex * 0.15) + (hum * 0.15) + (precIndex * 0.25) + (windIndex * 0.35) - (cloud * 0.1);
  const entropyNoise = remap(entropy, 0, 1, 0, 0.5)
  return [entropy + random(0, entropyNoise), windIndex]
}

function calcTempIndex(temp) {
  if (temp <= 65) {
    return remap(temp, 65, -18, 0, 1) ;
  } else if (temp > 65) {
    return remap(temp, 66, 115, 0, 1);
  }
}

function drawEntropy(entropy, windIndex) {
  const period = remap(entropy, 0, 1, 0, 10);
  const amp = remap(entropy, 0, 1, 0, 20);
  const noise = 1 * pow(10 * entropy, 2);
  
  drawRows(10, period, amp, noise, borderX, borderY, windIndex, windIndex)
  push();
    translate(width / 2, height / 2); // Move to center
    rotate(Math.PI / 2); // Rotate by 90 degrees
    translate(-width / 2, -height / 2); // Move back
    const correction = 134
    drawRows(6, period, amp, noise, [height / 4 - correction, 3 * height / 4 - correction], [width/5 + correction, 4 * width / 5 + correction], windIndex, 0, windIndex);
  pop();
}

function drawRows(numRows, period, amp, noise, border1, border2, windIndex, windRow=0, windCol=0) {
  for (let row = 0; row <= numRows; row++) {
    let y = border2[0] + row * ((border2[1] - border2[0]) / numRows);

    for (let x = border1[0]; x <= border1[1]; x++) {
      const distribution = 2.5;
      let noiseX = pow(random(0, pow(noise, 1 / distribution)), distribution);
      let noiseY = pow(random(0, pow(noise, 1 / distribution)), distribution);
      const signX = random(0, 1);
      const signY = random(0, 1);
      
      let gustIndexRow = 0; let gustIndexCol = 0;
      const windOffset = remap(3 * smoothNoise(t), 0, 3, 0, 0.5);
      if (windRow !== 0) {
        gustIndexRow = windIndex + windOffset;
      } 
      if (windCol !== 0) {
        gustIndexCol = windIndex + windOffset;
      }
      
      t += remap(windIndex, 0, 1, 0, 0.5);
  
      const posThreshX = remap(gustIndexRow, 0, 1, 0.5, 0)
      const posThreshY = remap(gustIndexCol, 0, 1, 0.5, 1)
      // console.log(posThreshY)
      if (signX < posThreshX) {
        noiseX *= -1
      }
      if (signY < posThreshY) {
        noiseY *= -1
      }
      
      if (row === 0 || row === numRows) { // wider distribution at edges
        circle(x + 2 * noiseX, y + 2 * noiseY, 0.8);
      } 
      
      if (row === 0 && windCol > 0) {
        // stroke('blue')
        let gust = remap(windCol, 0, 1, 1, 2)
        circle(x + 2 * gust * noiseX, y + 2 * gust * noiseY, 0.8);
        // stroke('red')
        circle(x + 2 * gust * noiseX - random(0, remap(windIndex, 0, 1, 0, 20)), y + 2 * gust * noiseY - random(0, remap(windIndex, 0, 1, 0, 20)), 0.8);
      }
      circle(x + noiseX, y + noiseY, 0.8);
    }
  }
}

/**
 * source: https://editor.p5js.org/dcbriccetti/sketches/BksXOb2om
 */
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin_octaves = 4; // default to medium smooth
let perlin_amp_falloff = 0.5; // 50% reduction/octave

const scaled_cosine = i => 0.5 * (1.0 - cos(i * PI));

let perlin; // will be initialized lazily by noise() or noiseSeed()


function smoothNoise(x, y = 0, z = 0) {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;

  let r = 0;
  let ampl = 0.5;

  let n1, n2, n3;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);

    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaled_cosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }
  return r;
}
