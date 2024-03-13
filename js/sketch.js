let s = [];
let x = [];
let y = [];
let speedS = [];
let n = 10;
let oX, oY; // Orca X and Y
let oSX = 2,
  oSY = 2; // Orca Speed
let oS = 100; //size
let gF = 50; // Growth speed
let cs = []; // Circles

function setup() {
    let mycanvas=createCanvas(800, 500);
    mycanvas.parent("p5-canvas-container")
  oX = width / 2;
  oY = height / 2;
  // Initialize circles
  for (let i = 0; i < 10; i++) {
    cs.push({
      x: random(width),
      y: random(height),
      s: random(10, 50),
    });
  }
  for (i = 0; i < n; i++) {
    s[i] = 100;
    x[i] = random(width);
    y[i] = random(height);
    speedS[i] = random(0.01, 0.05);
  }
  background("black");
  for (let i = n / 2; i < width; i += n) {
    for (let j = n / 2; j < height; j += n) {
      fill(random(0, 10), random(0, 10), random(10, 45));
      rect(i, j, n);
    }
  }
}

function draw() {
  strokeWeight(0.5);
  oceanWorms();
  move();
  oX += oSX;
  oY += oSY;
  if (oX >= width - oS / 3 || oX < oS / 3) oSX *= -1;
  if (oY >= height - oS / 3 || oY < oS / 3) oSY *= -1;
  if (dist(mouseX, mouseY, oX, oY) < 100) {
    // Avoid mouse
    oSX = oX <= mouseX ? -abs(oSX) : abs(oSX);
    oSY = oY <= mouseY ? -abs(oSY) : abs(oSY);
  }
  drawOrca(oX, oY, oS);
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text(
    "Navigate using the mouse to try and click the touch Orca :)",
    width / 2,
    height - 20
  );
  text("Find the space trash, I might grow", width / 2, height - 40);

  for (let i = cs.length - 1; i >= 0; i--) {
    // Eat circles and grow
    let c = cs[i];
    if (dist(oX + oS / 6, oY + oS / 6, c.x, c.y) < oS / 6 + c.s / 2) {
      oS += gF;
      cs.splice(i, 1);
    }
  }
  fill("rgb(0,0,0)");
  cs.forEach((c) => ellipse(c.x, c.y, c.s, c.s)); // Draw circles
}

function move() {
  x[0] = width * noise(frameCount * 0.001);
  y[0] = height * noise(frameCount * 0.005);
  x[1] = width * noise(frameCount * 0.005);
  y[1] = height * noise(frameCount * 0.01);
}

function drawOrca(x, y, s) {
  let p = s / 15;
  fill("rgb(48,120,163)");
  rect(x - p * 1.5, y, p * 3, p * 2);
  rect(x, y - p, p, p);
  rect(x + p, y + p * 2, p, p);
  rect(x + p * 1.5, y + p, p, p);
  fill(255);
  rect(x - p / 2, y + p, p, p);
}

function oceanWorms() {
  for (i = 0; i < n; i++) {
    fill("rgba(81,81,156,0.33)");
    ellipse(x[i], y[i], s[i]);
    fill("rgba(116,169,192,0.27)");
    s[i] = 20 * sin(frameCount * speedS[i * 2]);
  }
}
