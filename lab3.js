//arguments for endsOfCastle() function to create left side of castle
let scaleXLeftSide = 1;
let xCoordLeftSide = 287.5;
let yCoordLeftSide;

//arguments for endsOfCastle() function to create right side of castle
let scaleXRightSide = -1;
let xCoordRightSide = 462.5;
let yCoordRightSide;

//arguments for centerOfCastle() function to create the center part of the castle
let xCoordCenter = 375;
let yCoordCenter;

//colors used in image
let yellowColor;
let greenColor;
let blueColor;
let pinkColor;
let silverColor;
let paleYellowColor;

//variables used for bounding box around door
let pen_stle = false;
let circleDistance;

function setup() {
  createCanvas(750, 500);
  yCoordLeftSide = height;
  yCoordRightSide = height;
  yCoordCenter = height;
  yellowColor = color(240, 192, 103);
  greenColor = color(122, 240, 108);
  blueColor = color(100, 159, 237);
  pinkColor = color(237, 123, 198);
  silverColor = color(189, 211, 240);
  paleYellowColor = color(250, 221, 175);
}

/**
 * toggles the image between regular castle and pen-stle whenever the user clicks anywhere in the door shape
 * requires no inputs and runs automatically whenever the mouse is clicked anywhere in the image
 */
function mouseClicked() {
  circleDistance = dist(mouseX, mouseY, 375, 412.5);
  if (((circleDistance < 37.5) || ((mouseX > 337.5) && (mouseX < 412.5) && (mouseY > 412.5) && (mouseY < 500))) && (!pen_stle)) {
    pen_stle = true;
  } else if (((circleDistance < 37.5) || ((mouseX > 337.5) && (mouseX < 412.5) && (mouseY > 412.5) && (mouseY < 500))) && pen_stle) {
    pen_stle = false;
  }
}

/**
 * draws a pink flag with the base point at (x_coord, y_coord)
 * uses scale_x and scale_y to scale this flag in the x and y direction, respectively
 */
function drawFlag(scale_x, scale_y, x_coord, y_coord) {
  push();
    translate(x_coord, y_coord); 
    scale(scale_x, scale_y);
    fill(pinkColor);
    //first rectangle-esque piece
    beginShape();
      vertex(0, 0); //base point
      vertex(0,- 20); 
      vertex(10, -18.5); 
      vertex(20, -20);
      vertex(20, 0);
      vertex(10, 1.5);
    endShape(CLOSE);
    //second rectangle-esque piece
    beginShape();
      vertex(20, 3);
      vertex(20, -17);
      vertex(30, -18.5);
      vertex(40, -17);
      vertex(40, 3);
      vertex(30, 2.5);
    endShape(CLOSE);
    //last triangle
    beginShape();
      vertex(40, 2);
      vertex(57.75, -4);
      vertex(40, -9);
    endShape();
  pop();
}


/**
 * draws window shapes with approx center of these shapes at (center_x, center_y)
 * w_width determines the width of the window
 * approx_height determines the approximate height of the actual window, but in reality the window will be slightly taller
 */
function drawWindow(w_width, approx_height, center_x, center_y) 
{
  if (!pen_stle) {
    fill(pinkColor); 
  } else {
    fill(0);
  }
  noStroke();
  circle(center_x, center_y, w_width);
  rect(center_x - 0.5 * w_width, center_y, w_width, approx_height);
}

/**
 * creates the left two segments of the castle (and then flips it to create the right two segments)
 * requires a scaleX value to be able to alter the scale of this image in the x direction (to set it to -1 and flip it horizontally)
 * shape built with regard to point (xCoord, yCoord); this is the bottom right point of the original creation
 */
function endsOfCastle(scaleX, xCoord, yCoord){
  push();
    translate(xCoord, yCoord);
    scale(scaleX, 1);

    //outer piece
    fill(silverColor);
    if(!pen_stle) {
      rect(-162.5, -190, 75, 190);
    } else {
      rect(-162.5, -190, 75, 102.5);
      fill(yellowColor);
      rect(-162.5, -87.5, 75, 87.5);
      line(-142.5, -87.5, -142.5, 0);
      line(-107.5, -87.5, -107.5, 0);
    }

    //shape on top of outer piece
    if (!pen_stle) {
      fill(silverColor);  
    } else {
      fill(pinkColor);
    }
    beginShape();
      vertex(-162.5, -190);
      vertex(-162.5, -225);
      vertex(-141.5, -225);
      vertex(-141.5, -205);
      vertex(-134.5, -205);
      vertex(-134.5, -225);
      vertex(-113.5, -225)
      vertex(-113.5, -205);
      vertex(-106.5, -205);
      vertex(-106.5, -225);
      vertex(-87.5, -225);
      vertex(-87.5, -190);
    endShape(CLOSE);

    // horizontal stripe through shape on top of outer piece in regular castle
    if (!pen_stle) {
      line(-162.5, -205, -87.5, -205);
    }

    //inner piece
    fill(silverColor);
    rect(-87.5, -275, 87.5, 275);
    line(-87.5, -260, 0, -260); //top horizontal stripe

    /*tower*/
    if (!pen_stle) {
      //base of tower for regular castle
      rect(-82.5, -350, 77.5, 75); 

      //triangle tip for reg castle towers
      fill(0);
      triangle(-43.75, -420, -82.5, -350, -5, -350);
    } else {
      //pencil body shape for pen-stle tower
      fill(yellowColor);
      beginShape();
        vertex(-5, -275)
        vertex(-5, -350);
        vertex(-24, -370);
        vertex(-63.5, -370);
        vertex(-82.5, -350);
        vertex(-82.5, -275);
      endShape(CLOSE);
      line(-24, -355, -24, -275);
      line(-63.5, -355, -63.5, -275);

      //pencil tip
      fill(paleYellowColor);
      beginShape();
        vertex(-5, -350);
        vertex(-24, -355); 
        vertex(-43.75, -346);
        vertex(-63.5, -355); 
        vertex(-82.5, -350);
        vertex(-43.75, -420);
      endShape(CLOSE);

      //pencil lead
      fill(0);
      triangle(-43.75, -420, -43.75 + 0.5 * 31, -420 + 0.5 * 56, -43.75 - 0.5 * 31, -420 + 0.5 * 56);
    }

    /*windows*/

    //furthest wing
    drawWindow(10, 15, -140, -137.5); 
    drawWindow(10, 15, -110, -137.5);
    drawWindow(12, 17, -125, -87.5);

    //tower
    drawWindow(12, 17, -43.75, -325);

    //inner wing
    drawWindow(20, 17, -43.75, -155);

  pop();
}

function centerOfCastle(xCoord, yCoord) {
  push();
    translate(xCoord, yCoord);
    fill(silverColor);
    rect(-87.5, -240, 175, 240); //center rectangle

    //top shape
      beginShape();
        vertex(-87.5, -240);
        vertex(-87.5, -275);
        vertex(-73.5, -275);
        vertex(-73.5, -255);
        vertex(-66.5, -255);
        vertex(-66.5, -275);
        vertex(-45.5, -275)
        vertex(-45.5, -255);
        vertex(-38.5, -255);
        vertex(-38.5, -275);
        vertex(-19.5, -275);
        vertex(-19.5, -255);
        vertex(-12.5, -255);
        vertex(-12.5, -275);
        vertex(8.5, -275);
        vertex(8.5, -255);
        vertex(15.5, -255);
        vertex(15.5, -275);
        vertex(36.5, -275);
        vertex(36.5, -255);
        vertex(43.5, -255);
        vertex(43.5, -275);
        vertex(64.5, -275);
        vertex(64.5, -255);
        vertex(71.5, -255);
        vertex(71.5, -275);
        vertex(87.5, -275);
        vertex(87.5, -240);
      endShape(CLOSE);
      
      line(-87.5, -255, 87.5, -255); //top horizontal stripe

    /*door*/
    fill(0);
    circle(0, -87.5, 75);
    rect(-37.5, -87.5, 75, 87.5);

    //text in doorway
    fill(pinkColor);
    textSize(13);
    textAlign(CENTER);
    if (!pen_stle) {
      text('Click Here!', 0, -87.5); 
    } else {
      text('Click Here Again!', -35, -87.5, 75); 
    }
    
    /*windows above door*/
    drawWindow(20, 17, -40, -200);
    drawWindow(20, 17, 40, -200);
  pop();
}

function draw() {
  background(blueColor); 

  //left side of castle
  endsOfCastle(scaleXLeftSide, xCoordLeftSide, yCoordLeftSide);
  //right side of caslte
  endsOfCastle(scaleXRightSide, xCoordRightSide, yCoordRightSide);
  //left flag
  drawFlag(1, 1, -43.75 + 287.5, -420 + height);
  //right flag
  drawFlag(1, 1, 43.75 + 287.5 + 175, -420 + height);
  //center part of castle
  centerOfCastle(xCoordCenter, yCoordCenter);
}
