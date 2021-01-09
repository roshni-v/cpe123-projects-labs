var leafCountLeft;
var leafCoordsLeft;
var leafCountRight;
var leafCoordsRight;
var point1Leaves;
var point1Vals;
var point2Leaves;
var point2Vals;
var point3Leaves;
var point3Vals;
var point4Leaves;
var point4Vals;
var point5Leaves;
var point5Vals;
var point6Leaves;
var point6Vals;
var point7Leaves;
var point7Vals;
var point8Leaves;
var point8Vals;
var point9Leaves;
var point9Vals;
var point10Leaves;
var point10Vals;
var flowerCountRight;
var flowerCoordsRight;
var flowerCountLeft;
var flowerCoordsLeft;
var stemRightGuideVal;
var stemRightGuideCoords;
var stemLeftGuideVal;
var stemLeftGuideCoords;
var rotateVals = [];
var vxVals = [];
var vyVals = [];
var xLocVals = [];
var yLocVals = [];
var ladyBugColor = [];

function setup() {
  createCanvas(400, 400);
  leafCountLeft = 0;
  leafCoordsLeft = [];
  while(leafCountLeft < height) {
    leafCoordsLeft.push(random(leafCountLeft, leafCountLeft + 0.1*height));
    leafCountLeft += 0.1*height;
  }
  leafCountRight = 0;
  leafCoordsRight = [];
  while(leafCountRight < height) {
    leafCoordsRight.push(random(leafCountRight, leafCountRight + 0.1*height));
    leafCountRight += 0.1*height;
  }  
  point1Leaves = 0;
  point1Vals = []
  while(point1Leaves < leafCoordsRight.length*2) {
    point1Vals.push(random(-5, 5));
    point1Leaves++;
  }
  point2Leaves = 0;
  point2Vals = []
  while(point2Leaves < leafCoordsRight.length*2) {
    point2Vals.push(random(5, 15));
    point2Leaves++;
  }
  point3Leaves = 0;
  point3Vals = []
  while(point3Leaves < leafCoordsRight.length*2) {
    point3Vals.push(random(45, 55));
    point3Leaves++;
  }
  point4Leaves = 0;
  point4Vals = []
  while(point4Leaves < leafCoordsRight.length*2) {
    point4Vals.push(random(-55, -45));
    point4Leaves++;
  }
  point5Leaves = 0;
  point5Vals = []
  while(point5Leaves < leafCoordsRight.length*2) {
    point5Vals.push(random(95, 105));
    point5Leaves++;
  }
  point6Leaves = 0;
  point6Vals = []
  while(point6Leaves < leafCoordsRight.length*2) {
    point6Vals.push(random(-65, -55));
    point6Leaves++;
  }
  point7Leaves = 0;
  point7Vals = []
  while(point7Leaves < leafCoordsRight.length*2) {
    point7Vals.push(random(55, 65));
    point7Leaves++;
  }
  point8Leaves = 0;
  point8Vals = []
  while(point8Leaves < leafCoordsRight.length*2) {
    point8Vals.push(random(-5, 5));
    point8Leaves++;
  }
  point9Leaves = 0;
  point9Vals = []
  while(point9Leaves < leafCoordsRight.length*2) {
    point9Vals.push(random(-5, 5));
    point9Leaves++;
  }
  point10Leaves = 0;
  point10Vals = []
  while(point10Leaves < leafCoordsRight.length*2) {
    point10Vals.push(random(95, 105));
    point10Leaves++;
  }

  flowerCountRight = 0;
  flowerCoordsRight = [];
  while(flowerCountRight < height) {
    flowerCoordsRight.push(random(flowerCountRight, flowerCountRight + (1/5)*height));
    flowerCountRight += (1/5)*height;    
  }
  flowerCountLeft = 0;
  flowerCoordsLeft = [];
  while(flowerCountLeft < height) {
    flowerCoordsLeft.push(random(flowerCountLeft, flowerCountLeft + (1/5)*height));
    flowerCountLeft += (1/5)*height;    
  }
  stemRightGuideVal = 0;
  stemRightGuideCoords = [];
  while(stemRightGuideVal < flowerCoordsRight.length) {
    stemRightGuideCoords.push(random(-800, 800));
    stemRightGuideVal++;    
  }  
  stemLeftGuideVal = 0;
  stemLeftGuideCoords = [];
  while(stemLeftGuideVal < flowerCoordsLeft.length) {
    stemLeftGuideCoords.push(random(-800, 800));
    stemLeftGuideVal++;    
  } 

  for(var i=0; i<18; i++) {
    var xLoc = random(0, width);
    var yLoc = random(0, height);
    xLocVals.push(xLoc);
    yLocVals.push(yLoc);
    //to ensure that no values near 0, PI occur (because then a divide by 0 error usually occurs when calculating dy and dx):
    var posOrNeg = [-1, 1];
    var select = random(posOrNeg);
    var rot;
    if (select == (1)) {
      rot = random(PI/5,4*PI/5);
    }
    else if (select == (-1)) {
      rot = random(PI/5,4*PI/5) + PI;  
    }
    var multiplier = random(1, 1.5); //changes the speed
    rotateVals.push(rot);
    //vy and vx for the different quadrants:
    if(rot >= 0 && rot < PI/2) {
      var vx = multiplier;
      var vy = multiplier * tan(-PI/2 + rot);
    }
    else if(rot >= PI/2 && rot < PI) {
      var vx = multiplier;
      var vy = multiplier * tan(-PI/2 + rot);     
    }
    else if(rot >= PI && rot < 3*PI/2) {
      var vx = -multiplier;
      var vy = -multiplier * tan(-PI/2 + rot);             
    }
    else if(rot >= 3*PI/2 && rot < 2*PI) {
      var vx = -multiplier;
      var vy = -multiplier * tan(-PI/2 + rot);   
    }
    if((rot == 0) || (rot == PI)) {
      vx = 0;
    }
    else if((rot == 3*PI/2)) {
      vy = 0;
    }
    vxVals.push(vx);
    vyVals.push(vy);

    //randomized red color for ladyBugs
    ladyBugColor.push(color(random(160, 300), 15, 15));
  }
}

function drawLadyBug(xCoord, yCoord, rotateVal, scal, wingColor)
{
  push();
    translate(xCoord, yCoord);
    rotate(rotateVal);
    scale(scal);
    fill(0);
    circle(0, -25, 50);
    ellipse(0, 30, 80, 80);
    fill(255);
    ladyBugWings(0, -15, -PI/6, 1, 1, wingColor);
    ladyBugWings(0, -15, -PI/6, -1, 1, wingColor);
    ladyBugAntennae(10, -50, 0, 1, 1);
    ladyBugAntennae(-10, -50, 0, -1, 1);
  pop();
}

function ladyBugWings(xCoord, yCoord, rotateVal, scalX, scalY, selectedColor) {
  push();
    translate(xCoord, yCoord);
    scale(scalX, scalY);
    rotate(rotateVal);
    fill(selectedColor);
    arc(0, 50, 90, 90, -PI/2, PI/2);
    fill(0);
    circle(25, 30, 10);
    circle(35, 50, 12);
    circle(20, 70, 10);
    circle(15, 50, 8);
  pop();
}

function ladyBugAntennae(xCoord, yCoord, rotateVal, scalX, scalY) {
  push();
    translate(xCoord, yCoord);
    scale(scalX, scalY);
    noFill();
    strokeWeight(5);
    curve(-10, 100, 0, 0, 30, -20, 100, 50);
    fill(0);
    circle(30, -20, 10);
  pop();
}

function leaf(xCoord, yCoord, scalX, scalY, point1, point2, point3, point4, point5, point6, point7, point8, point9, point10) {
  push();
    translate(xCoord, yCoord);
    scale(scalX, scalY);
    fill(0, 255, 0);
    beginShape();
      curveVertex(-10, 60);
      curveVertex(point1, point2);
      curveVertex(point3, point4);
      curveVertex(point5, point6);
      curveVertex(point7, point8); 
      curveVertex(point9, point10);
      curveVertex(-10, 20);
    endShape(CLOSE);
    curve(-10, 200, 0, 50, 80, -50, 200, -40);
  pop();
}

function flowerAndStem(xCoord, yCoord, scalX, scalY, stemGuideVal) {
  push();
    translate(xCoord, yCoord);
    scale(scalX, scalY);
    //stem:
    noFill();
    strokeWeight(5);
    curve(-10, 200, 0, 150, 100, -50, 500, stemGuideVal);
    //flower:
    var rot = atan((stemGuideVal + 50)/400);
    var addition = PI/2;
    flower(100, -50, 1, 1, rot + addition);
  pop();
}

function flower(xCoord, yCoord, scalX, scalY, rotateVal) {
  push();
    translate(xCoord, yCoord);
    scale(scalX, scalY);
    rotate(rotateVal);
    strokeWeight(1);
    fill(255, 0, 0);
    rotate(-PI/6);
    ellipse(0, -10, 18, 30);
    rotate(2*PI/6);
    ellipse(0, -10, 18, 30); //center petal
    rotate(-PI/6);
    ellipse(0, -10, 18, 30);
  pop();
}

function updateLadyBugLocation() 
{
  for(var i=0; i<rotateVals.length; i++) {
    if((xLocVals[i] >= width)) { //if the ladybug hits the right edge, alter rotate value and dx
      if(vyVals[i] > 0) {
        rotateVals[i] = 2*PI - rotateVals[i];
      }
      else if(vyVals[i] < 0) {
        rotateVals[i] = 2*PI - rotateVals[i];
      }
      else if(vyVals[i] == 0) {
        rotateVals[i] = 3*PI/2;
      }
      vxVals[i] = (-1) * vxVals[i];
    }
    if((xLocVals[i] <= 0)) { //if the ladybug hits the left edge, alter rotate value and dx
      if(vyVals[i] > 0) {
        rotateVals[i] = rotateVals[i] - PI/2;
      }
      else if(vyVals[i] < 0) {
        rotateVals[i] = (-1) * rotateVals[i] + 2*PI;
      } 
      else if(vyVals[i] == 0) {
        rotateVals[i] = PI/2;  
      } 
      vxVals[i] = (-1) * vxVals[i];    
    }
    if((yLocVals[i] >= height) || (yLocVals[i] <= 0)) { //if the ladybug hits the bottom or top edge, alter rotate value, dx, and dy
      if(vxVals[i] > 0) {
        rotateVals[i] = PI - rotateVals[i];
        vxVals[i] = vxVals[i];
        vyVals[i] = (-1) * vyVals[i];
      }
      else if(vxVals[i] < 0) {
        rotateVals[i] = 3*PI - rotateVals[i]; 
        vxVals[i] = vxVals[i];
        vyVals[i] = (-1) * vyVals[i];
      }
      else if(vxVals[i] == 0) {
        rotateVal[i] = rotateVal[i] * (-1);
        vxVals[i] = vxVals[i];
        vyVals[i] = (-1) * vyVals[i];
      }
    }

    drawLadyBug(xLocVals[i], yLocVals[i], rotateVals[i], random(0.09, 0.101), ladyBugColor[i]); //slight alteration in scale for vibrating effect

    xLocVals[i] = xLocVals[i] + vxVals[i];
    yLocVals[i] = yLocVals[i] + vyVals[i];

  }
}

function draw() {
  background(0, 0, 255);
  for(var i=0; i<leafCoordsLeft.length; i++){
    leaf(0, leafCoordsLeft[i], 1, 1, point1Vals[i], point2Vals[i], point3Vals[i], point4Vals[i], point5Vals[i], point6Vals[i], point7Vals[i], point8Vals[i], point9Vals[i], point10Vals[i]);
  }
  for(var i=0; i<leafCoordsLeft.length; i++){
    leaf(width, leafCoordsLeft[i], -1, 1, point1Vals[i+leafCoordsLeft.length], point2Vals[i+leafCoordsLeft.length], point3Vals[i+leafCoordsLeft.length], point4Vals[i+leafCoordsLeft.length], point5Vals[i+leafCoordsLeft.length], point6Vals[i+leafCoordsLeft.length], point7Vals[i+leafCoordsLeft.length], point8Vals[i+leafCoordsLeft.length], point9Vals[i+leafCoordsLeft.length], point10Vals[i+leafCoordsLeft.length]);
  }
  for(var i=0; i<flowerCoordsRight.length; i++){
    flowerAndStem(0, flowerCoordsRight[i], 1, 1, stemRightGuideCoords[i]); 
  }
  for(var i=0; i<flowerCoordsLeft.length; i++){
    flowerAndStem(width, flowerCoordsLeft[i], -1, 1, stemLeftGuideCoords[i]); 
  }

  updateLadyBugLocation();
}
