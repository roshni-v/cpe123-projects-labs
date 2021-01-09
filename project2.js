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

//colors used in castle image
let yellowColor;
let greenColor;
let blueColor;
let pinkColor;
let silverColor;
let paleYellowColor;

//variables used for bounding box around door
let pen_stle = false;
let circleDistance;

//Alisha's animation vars
var clicked = false;
var eyeW = 0;
var eyeH = 0;
var rot = 0;

//joint animation vars (for the sequence with the flying key and then the turnng flags)
var xCoordOfMovingKey = 390;
var yCoordOfMovingKey = 250;
var clickedTwo = false;
var printMessage = false;
var flagTurn = false;
var xScaleFlag = 1;
var turnOne = false;
var nextNext = true;

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


/*Alisha's functions*/

function drawPerson()
{
    push();
    translate(700, 250);

    noStroke();
    fill(140, 88, 42);
    quad(-100, 17, 0, 4, 100, 17, 0, 30);
    fill(0);
    quad(-100, 18, 0, 5, 100, 18, 0, 31);

    push();
      translate(-350, -140);
      drawKey(300, 170, - 4 * PI / 16, 0.5,);
      drawKey(350, 200, - 11 * PI / 16, 0.65);
      drawKey(310, 180, - 14 * PI / 16, 0.45);
      drawKey(375, 185, - 7 * PI / 16, 0.4);
      drawKey(350, 160, - 2 * PI / 16, 0.35);
      drawKey(375, 175, - 3 * PI / 16, 0.6);
      drawKey(xCoordOfMovingKey, yCoordOfMovingKey, PI, 1.1);
    pop();

    fill(140, 88, 42); // brown
    arc(0, 30, 200, 250, - PI / 24, PI + PI / 24);
    quad(25, 100, -50, 100, -75, 200, 0, 200);

    push();
      translate(-100, 17);
      rotate(rot);

      arc(100, 14, 200, 200, PI + PI / 24, - PI / 24);
      if(clicked)
      {
        fill(0);
        quad(0, 0, 100, -13, 200, 0, 100, 13);
      }
    pop();

    fill(100, 150, 125);
    ellipse(-50, 275, 300, 200);

    noFill();
    stroke(0);
    strokeWeight(3);
    arc(0, 100, 100, 50, 0, PI);

    if(!clicked)
    {
      line(-20, 50, -75, 50);
      line(20, 50, 75, 50);

      //prints text "Click Here!" on the person's forehead
      fill(0);
      textSize(13);
      strokeWeight(1);
      textAlign(CENTER);
      text('Click Here!', 0, 0); 
    } else
    {
      fill(255);
      ellipse(-50, 50, 50, eyeH);
      ellipse(50, 50, 50, eyeH);

      if(eyeH < 25)
      {
        eyeH += 0.25;
      }

      if(rot > -PI)
      {
        rot -= PI / 100;
      } else if(rot <= -PI && clickedTwo == false) {
        printMessage = true;  //message in the blue background   
      }

      fill(0);

      if(eyeH > 3)
      {
        ellipse(-50, 50, 3, 3);
        ellipse(50, 50, 3, 3);
      }
    }

    noStroke();
    fill(94, 56, 23); // dark brown
    triangle(0, 75, -10, 100, 10, 100);
  pop();
}

function drawKey(x, y, rot, scal)
{
  noFill();
  stroke(245, 192, 69);
  strokeWeight(5);
  strokeCap(PROJECT);

  push();
    translate(x, y);
    rotate(rot);
    scale(scal);
    ellipse(25, 25, 50, 50);
    line(50, 25, 100, 25);
    line(100, 25, 100, 35);
    line(80, 25, 80, 35);
    line(60, 25, 60, 35);
  pop();

  noStroke();
  strokeCap(ROUND);
  fill(0);
}


/*Roshni's functions*/

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
    drawWindow(12, 17, -125, -87.5); //CORRECT WINDOW

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


/*Joint functions*/

function mouseClicked() {

  //roshni's mouseClicked
    //DORWAY REGION
  circleDistance = dist(mouseX, mouseY, 375, 412.5);
  if (((circleDistance < 37.5) || ((mouseX > 337.5) && (mouseX < 412.5) && (mouseY > 412.5) && (mouseY < 500))) && (!pen_stle)) {
    pen_stle = true;
  } else if (((circleDistance < 37.5) || ((mouseX > 337.5) && (mouseX < 412.5) && (mouseY > 412.5) && (mouseY < 500))) && pen_stle) {
    pen_stle = false;
  }

  //alisha's mouseCLicked
    // REGION OF FACE
  if(mouseX > 600 && mouseX < 750 && mouseY > 182 && mouseY < 405)
  {
    clicked = true;
  }

  //joint mouseClicked
    //REGION IN THE BLUE BACKGROUND
  if(clicked == true && mouseX > 300 && mouseX < 450 && mouseY > 0 && mouseY < 100) {
    clickedTwo = true;
    printMessage = false;
  }
}

/**
 * This function runs the code that pops up the second message after the person's head fully opens.
 * If the user clicks on this new message, a key comes out of the person's head, and files to a window slot
 * Once it reaches the window slot, the castle's flags start turning.
 * No inputs are required for this function.
 */
function jointAnimation(){
  if (clickedTwo == true) { //if the message in blue background is clicked
    if(yCoordOfMovingKey > 100 && nextNext == true) { //move the key up
      yCoordOfMovingKey-=2;
    } 
    else if(yCoordOfMovingKey <= 100 && xCoordOfMovingKey > 30) { //then move the key across
      xCoordOfMovingKey-=2;
      nextNext = false;
    }
    else if(yCoordOfMovingKey < 275 && nextNext == false){ //then move the key down
      yCoordOfMovingKey+=2;
    }
    else if(yCoordOfMovingKey >= 275 && xCoordOfMovingKey > 0){ //then move the key across to the window
      xCoordOfMovingKey-=2;
    }

    if (yCoordOfMovingKey>=275 && xCoordOfMovingKey<=0){ //if the key reaches the window
      flagTurn = true; //start turning the flags
    }
  }

  //this code turns the flags
  if (flagTurn == true) {
    if (xScaleFlag > -1 && turnOne == false) {
      xScaleFlag-=0.01;
    } else if (xScaleFlag <= -1) {
      turnOne = true;
    } 
    if (turnOne == true && xScaleFlag < 1){
      xScaleFlag+=0.01;
    }
  }

  //message in the blue background
  if (printMessage == true){
    fill(0);
    textSize(13);
    strokeWeight(1);
    textAlign(CENTER);  
    text('Click Here!', 375, 50);  
  }
}


function draw() {
  /*Roshni's background color*/
  background(blueColor); 

  /*Alisha's background*/
  fill(232, 158, 86);
  ellipse(0, 0, 100, 100);
  fill(50);
  rect(0, 200, width, 300);
  drawKey(525, 300, - 9 * PI / 16, 2);
  drawKey(0, 300, - 6 * PI / 16, 3);
  fill(50);
  rect(0, 250, 200, 150);
  rect(475, 225, 200, 200);
  drawKey(150, 600, - 12 * PI / 16, 4.75);

  /*Roshni's castle*/
  strokeWeight(1);
  stroke(0);
  //left side of castle
  endsOfCastle(scaleXLeftSide, xCoordLeftSide, yCoordLeftSide);
  //right side of caslte
  endsOfCastle(scaleXRightSide, xCoordRightSide, yCoordRightSide);
  //left flag
  drawFlag(xScaleFlag, 1, -43.75 + 287.5, -420 + height);
  //right flag
  drawFlag(xScaleFlag, 1, 43.75 + 287.5 + 175, -420 + height);
  //center part of castle
  centerOfCastle(xCoordCenter, yCoordCenter);

  /*rectangle covering bottom of castle to blend better into background*/
  fill(50);
  noStroke();
  rect(0, 450, width, height);

  /*Alisha's person*/
  drawPerson();

  /*our joint animation sequence with the key moving into window and the flags turning*/
  jointAnimation();
}


