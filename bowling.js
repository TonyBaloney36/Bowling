// LEFT CLICK = Release ball
// SPACEBAR = New Ball

let a, b, x, y, drawing, img, resetting, newPositionY;

let pinPositions = [ {x: 200, y: 245},  {x: 175, y: 270},  {x: 225, y: 270},  {x: 150, y: 295},  {x: 200, y: 295},  {x: 250, y: 295},  {x: 125, y: 320},  {x: 175, y: 320},  {x: 225, y: 320},  {x: 275, y: 320} ]

let collidedPositions = [];

function setup() {
  createCanvas(400, 400);
  a=5;
  b=0;
  x=0;
  y=0;
  drawing=true;
  resetting=true;
  img = loadImage('bowling-pin1.png')
}

function draw() {
  console.log(drawing)
  console.log(x)
  console.log(y)
  background(100)
  fill(181, 52, 108)
  newPositionY = y+a
  noCursor()
  
  // Draw the pins
  for (let i = 0; i < pinPositions.length; i++) {
    if (!collidedPositions.includes(i)) {
      image(img, pinPositions[i].x, pinPositions[i].y, 28, 80);
    }
  }
  
  if (drawing===true){
    circle(mouseX, mouseY, 40)
  }
  if (drawing===false){
    a=a+5
    circle(x,newPositionY,40);
    
    // Check for collision with pins
    for (let i = 0; i < pinPositions.length; i++) {
      if (!collidedPositions.includes(i) && isColliding(x, newPositionY, 20, pinPositions[i].x, pinPositions[i].y, 28, 80)) {
        collidedPositions.push(i);
      }
    }
    
  }
}

function mouseClicked(){
  if (resetting ===true){
    a=0;
    drawing=false;  
    x=mouseX;
    y=mouseY;
    background(100);
    resetting=false;
    collidedPositions = [];
  }
}

function keyPressed() {
  if (key ===' '){
    drawing=true;
    resetting=true;
  } 
}

function isColliding(circleX, circleY, circleSize, rectX, rectY, rectWidth, rectHeight) {
  let closestX = clamp(circleX, rectX, rectX + rectWidth);
  let closestY = clamp(circleY, rectY, rectY + rectHeight);
  let distanceX = circleX - closestX;
  let distanceY = circleY - closestY;
  let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
  return distanceSquared < (circleSize * circleSize);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
