var currentTimeInProg; //the time value dictating the frog's position
var clickCount = 0; //how many times the user has clicked in the correct area to interact with the program
var add = 0; //time value that should be added when altering currentTimeInProg

var upperRightLegRotateVal; 
var lowerRightLegRotateVal;

var upperLeftLegRotateVal;
var lowerLeftLegRotateVal;

var xCoord; //of frog
var originalYCoord; //y-coordinate of frog in its original seated position
var changingYCoord; //y-coordinate of frog at any point in time (as it moves)

var horizontalDifference = 7; //horizontal distance between the base of the frog's foot and the hip joint
var verticalDifference; //vertical distance between the base of the frog's foot and the hip joint
var hypot; //the hypotenuse of the triange constructed -- legs of the triangle set by the above two variables
var topAnglePt1; //part of the angle that the hip joint needs to rotate (given by the previously constructed triangle)
var distance = 0.05; //distance that the frog is above the ground

var topLegSegmentLength = 43;
var bottomLegSegmentLength = 54;



function setup() 
{
   createCanvas(400, 400);
   upperRightLegRotateVal = -18*PI/24;
   lowerRightLegRotateVal = 25*PI/28;
   upperLeftLegRotateVal = 18*PI/24;
   lowerLeftLegRotateVal = 25*PI/28;
   xCoord = width/2;
   originalYCoord = height - 110;
}

function draw() 
{
   drawBackground();

   determineTimeInProg();

   distanceFormulaForJump(400, -800);

   calculatingRegularlyChangingNecessaryVals()

   drawFrog(xCoord, changingYCoord, upperRightLegRotateVal, lowerRightLegRotateVal, upperLeftLegRotateVal, lowerLeftLegRotateVal, 0.5);
   moveFrog();
}

function drawBackground(){
  background(205, 223, 240); //sky color
  noStroke();
  fill(74, 176, 79); //hills color
  //hill shape:
  beginShape();
    curveVertex(-50, height + 50);
    curveVertex(-50, 250);
    curveVertex(-10, 100);
    curveVertex(width/2, 220);
    curveVertex(width + 10, 100);
    curveVertex(width + 50, 250);
    curveVertex(width + 50, height + 50);
  endShape(CLOSE);
  fill(79, 126, 171); //blue pond color
  ellipse(width/2, 450, 800, 400); //pond
  fill(90, 214, 96); //lily pad color
  ellipse(width/2, 310, 100, 60); //lily pad
}

function determineTimeInProg() {
  textAlign(CENTER);
  fill(47, 112, 50);
  if(clickCount%2 == 0){
    if(clickCount == 0) {
      text("Click Here to Make Frog Jump!", width/2, 100);
    }
    else {
      text("Click Here to Continue Frog's Jump!", width/2, 100);   
    }
    currentTimeInProg = millis()/1000 - millis()/1000 + add; //add value set in mousePressed()
  }
  else if(clickCount%2 != 0){
    text("Click Here to Pause Frog's Jump!", width/2, 100);
    currentTimeInProg = millis()/1000 - sub + add; //add and sub values set in mousePressed
  }
}

function distanceFormulaForJump(initialVelocity, gravity) {
  if(distance == 0) {
    sub = millis()/1000;
    add = 0;
  }

  //makes the frog move;
  if(distance <= 0.1) {
    distance = (-1)*(initialVelocity*currentTimeInProg + (1/2)*(gravity)*currentTimeInProg*currentTimeInProg); //kinematics distance formula
  }  
  //rests the frog's position to zero if it stops too low
  if(distance > 0.05) {
    distance = 0;
  }
}

function calculatingRegularlyChangingNecessaryVals() {
  changingYCoord = originalYCoord + distance; //decreases y-coord according to the distance formula to move the frog up
  verticalDifference = 18 - distance; //calculates changing vertical distance between hip joint and foot joint

  hypot = sqrt(verticalDifference * verticalDifference + horizontalDifference * horizontalDifference) //calculates the hypot the the triangle (the line that connects the hip joint to the foot joint)

  topAnglePt1 = atan(horizontalDifference/verticalDifference); //calculates part of the angle needed to rotate the hip joint correctly
}

function drawFrog(locX, locY, rotUpperJointR, rotLowerJointR, rotUpperJointL, rotLowerJointL, scal) 
{
  push();
      //move the entire frog
      translate(xCoord, changingYCoord);
      scale(scal); //scale the entire frog
      // draw body
      fill(47, 112, 50);
      stroke(0);
      ellipse(0, 0, 50, 60); 
      //right leg:
      push();
        translate(10, 25); //move into pivot position
        rotate(rotUpperJointR); //rotate by rotUpperJointR parameter
        ellipse(0, 25, 15, 50);
        //bottom joint of right leg:
        push();
          translate(0, 43); //move into pivot position
          rotate(rotLowerJointR); //rotate by rotLowerJointR parameter
          ellipse(0, 30, 15, 55); 
          //right foot:
          push();
            translate(0, 54); //move into pivot position
            rotate(-15*PI/24); //rotate right foot    
            beginShape();
              curveVertex(0, 0);
              curveVertex(3, 0);
              curveVertex(-3, 20);
              curveVertex(-3, 0);
            endShape(CLOSE);       
          pop();
        pop();
      pop();
      //left leg:
      push();
        translate(-10, 25); //move into pivot position
        rotate(rotUpperJointL); //rotate by rotUpperJointL parameter
        ellipse(0, 25, 15, 50);
        //bottom joint of left leg:
        push();
          translate(0, 43); //move into pivot position
          rotate(rotLowerJointL); //rotate by rotLowerJointL parameter
          ellipse(0, 30, 15, 55); 
          //left foot:
          push();
            translate(0, 54); //move into pivot position
            rotate(15*PI/24); //rotate left foot  
            beginShape();
              curveVertex(0, 0);
              curveVertex(-3, 0);
              curveVertex(3, 20);
              curveVertex(3, 0);
            endShape(CLOSE);       
          pop();
        pop();
      pop();
      //head:
      push();
        translate(0, -20); //move into pivot position
        rotate(0); //rotate head
        ellipse(0, -20, 60, 40);
        //right eye:
        circle(15, -37, 20);
        strokeWeight(0.5);
        fill(255);
        circle(15, -37, 15);
        fill(0);
        circle(15, -37, 8);
        //left eye:
        strokeWeight(1);
        fill(47, 112, 50);
        circle(-15, -37, 20);
        fill(255);
        strokeWeight(0.5);
        circle(-15, -37, 15);
        fill(0);
        circle(-15, -37, 8);
        strokeWeight(1);
      pop();
      //right arm:
      push();
        translate(20, -15); //move into pivot position
        rotate(PI/18);
        scale(1, 1); //rotate by changing y-scale
        ellipse(0, 30, 12.5, 60);
        //right hand:
        beginShape();
          curveVertex(-10, 70);
          curveVertex(0, 58);
          curveVertex(7.5, 70);
          curveVertex(2.5, 65);
          curveVertex(0, 70);
          curveVertex(-2.5, 65);
          curveVertex(-7.5, 70);
        endShape(CLOSE);
      pop();
      //left arm:
      push();
        translate(-20, -15); //move into pivot position
        rotate(-PI/18);
        scale(1, 1); //rotate by changing y-sclae
        ellipse(0, 30, 12.5, 60);
        //left hand:
        beginShape();
          curveVertex(10, 70);
          curveVertex(0, 58);
          curveVertex(-7.5, 70);
          curveVertex(-2.5, 65);
          curveVertex(0, 70);
          curveVertex(2.5, 65);
          curveVertex(7.5, 70);
        endShape(CLOSE);
      pop();
      noStroke();
   pop();
}

function moveFrog() {
  var topAnglePt2 = acos((bottomLegSegmentLength*bottomLegSegmentLength - topLegSegmentLength*topLegSegmentLength - hypot*hypot)/((-2)*topLegSegmentLength*hypot)); //law of cosines
  upperRightLegRotateVal = (-1)*(topAnglePt1 + topAnglePt2);
  upperLeftLegRotateVal = topAnglePt1 + topAnglePt2;

  var centerAngle = acos((hypot*hypot - topLegSegmentLength*topLegSegmentLength - bottomLegSegmentLength*bottomLegSegmentLength)/((-2)*topLegSegmentLength*bottomLegSegmentLength)); //law of cosines
  lowerRightLegRotateVal = PI - centerAngle;
  lowerLeftLegRotateVal = (-1)*(PI - centerAngle);
}

function mousePressed() 
{
  if(mouseX > 100 && mouseX < 300 && mouseY > 80 && mouseY < 110) { //bounding box around text
     clickCount++;
     if(clickCount%2 != 0) {
      //to start/resume jump
      sub = millis()/1000;
     }
     else if(clickCount > 1 && clickCount%2 == 0) {
      //to pause jump
      add = currentTimeInProg;
     }
  }
}
