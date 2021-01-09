/**
Final Project
Section: 05
Group #: 5

Names: Alisha Cherian, Roshni Vakil, Shosei Anegawa, Hamza Deif

*/

//Game Variables:

var selection = false; 

var p1flag = 0; //tracks which car player 1 selects
var p2flag = 0; //tracks which car player 2 selects
var race = false; //tracks whether the actual race part of the code is executing
var redfill, yellowfill, greenfill, bluefill;
var redfill2, yellowfill2, greenfill2, bluefill2;

var trackW = 150; 
var trackH = 200;
var laneWidth = 20;
var outerTrackCirc; //to store distance around the outer track
var innerTrackCirc; //to store distance around the inner track
var trackDifference; //to store the difference between the distance around the outer track and distance around the inner track 
var numOfTrackLines = 12; //the number of center division lines on the track

var car1X; //to store the x-coord of car 1
var car1Y; //to store the y-coord of car 1
var car2X; //to store the x-coord of car 2
var car2Y; //to store the y-coord of car 2

var car1Progress = 0; //stores the distance car 1 has traveled along the track; initially set to 0
var car1Speed; //to store car 1's natural speed at any point in the game

var car2Progress; //stores the distance car 2 has traveled along the track; initially set to 0
var car2Speed; //to store car 2's natural speed at any point in the game

var refreshEvery1; //to store how often car 1's boost cycle should refresh
var refreshEvery2; //to store how often car 2's boost cycle should refresh

var car1Refresh; //to store car 1's current point in its boost cycle
var car2Refresh; //to store car 2's current point in its boost cycle

var originalCar1Speed; //to store car 1's given natural speed (before the user might reduce it)
var originalCar2Speed; //to store car 2's given natural speed (before the user might reduce it)

//to store the primary body color of each car:
var redColor; 
var orangeColor; 
var greenColor; 
var blueColor; 

//to store the outline color of each car in their top profile graphics:
var redStrokeColor; 
var greenStrokeColor; 
var blueStrokeColor; 

//to store the strokeWeights of each car's outlines in thier top profile graphics:
var redStrokeWeight; 
var greenStrokeWeight;
var blueStrokeWeight;
var orangeStrokeWeight;

var winningStatement = ""; //winning statement is blank if no car has won yet
var rematchColor, newGameColor;

//stores whether or not the players pressed/activated their turbos on time
var pressedOnTime1 = false;
var pressedOnTime2 = false;

var count = 0;

function setup() {
   createCanvas(500, 500);
   outerTrackCirc = 2 * PI * sqrt((pow(trackW + laneWidth / 2, 2) + pow(trackH + laneWidth / 2, 2)) / 2) //calculates distance around outer track
   innerTrackCirc = 2 * PI * sqrt((pow(trackW, 2) + pow(trackH, 2)) / 2); //calculates distance around inner track
   trackDifference = outerTrackCirc - innerTrackCirc;
   car2Progress = -trackDifference;

   redColor = color(240, 45, 45);
   orangeColor = color(240, 169, 0);
   greenColor = color(31, 237, 24);
   blueColor = color(47, 193, 237);

   redStrokeColor = color(169, 29, 0);
   orangeStrokeColor = color(168, 108, 15);
   greenStrokeColor = color(12, 166, 7);
   blueStrokeColor = color(25, 69, 247);

   redStrokeWeight = 0.5;
   greenStrokeWeight = 0.5;
   blueStrokeWeight = 0.5;
   orangeStrokeWeight = 0.5;

   redfill = color(180,180,180);
   yellowfill =  color(180,180,180);
   greenfill =  color(180,180,180);
   bluefill =  color(180,180,180);
   redfill2 = color(180,180,180);
   yellowfill2 =  color(180,180,180);
   greenfill2 =  color(180,180,180);
   bluefill2 =  color(180,180,180);

   rematchColor = color(255, 180, 0);
   newGameColor = color(255, 180, 0);
} 

function carOneTopProfile() {
  push();
    strokeWeight(redStrokeWeight);
    stroke(redStrokeColor);
    fill(redColor);
    rect(-4,-5-5/9, 8, 5+5/9);
    rect(-5, -20, 10, 14+4/9);
  pop();
}

function carTwoTopProfile() {
  push();
    strokeWeight(orangeStrokeWeight);
    stroke(orangeStrokeColor);
    fill(orangeColor);
    ellipse(0, -10, 10, 20);
    circle(0, -11.5, 10);
  pop();
}

function carThreeTopProfile() {
  push();
    strokeWeight(greenStrokeWeight);
    stroke(greenStrokeColor);
    fill(greenColor);
    rect(-4, -2-2/9, 8, 2+2/9);
    rect(-5, -10-4/9, 10, 8+2/9);
    rect(-4, -20, 8, 9+5/9);
  pop();
}

function carFourTopProfile() {
  push();
    strokeWeight(blueStrokeWeight);
    stroke(blueStrokeColor);
    fill(blueColor);
    rect(-4, -3-5/9, 8, 3+5/9);
    rect(-5, -18-2/3, 10, 15+1/9);
    rect(-4, -20, 8, 1+1/3);
  pop();
}

function carOneSideProfile(xCoord, yCoord, scal) {
   push();
      translate(xCoord, yCoord);
      scale(scal)

      noStroke();
      fill(redColor);

      //body:
      rect(-100, -35, 200, 70, 5);
      rect(-100, -120, 130, 110, 5);
      triangle(29.8, -120, 29.8, -20, 50,-20);

      //windows:
      fill(255);
      rect(-90, -110, 50, 70, 3);
      rect(-30, -110, 50, 70, 3);
      triangle(19.8, -110, 19.8, -40, 35, -40);

      //wheels:
      fill(0);
      circle(-50, 35, 55);
      circle(50, 35, 55);
   pop();
}

function carTwoSideProfile(xCoord, yCoord, scal){
   push();
      translate(xCoord, yCoord);
      scale(scal);

      noStroke();
      fill(orangeColor); 

      //body:
      rect(-100, -30, 200, 60, 50);
      arc(-5, -30, 120, 115, PI, 2*PI);

      //windows:
      fill(255);
      arc(0, -30, 95, 95, 3*PI/2, 2*PI);
      arc(-10, -30, 95, 95, PI, 3*PI/2);

      //wheels:
      fill(0);
      circle(-50, 30, 55);
      circle(50, 30, 55);
   pop();
}

function carThreeSideProfile(xCoord, yCoord, scal){
   push();
      translate(xCoord, yCoord);
      scale(scal);

      noStroke();
      fill(greenColor);

      //body:
      rect(-100, -30, 200, 60, 5);
      rect(-10, -80, 65, 110, 5);
      triangle(53, -80, 53, 30, 100, 30)

      //windows:
      fill(255);
      rect(0, -70, 50, 40, 5);
      triangle(48, -70, 48, -30, 65, -30);

      //wheels:
      fill(0);
      circle(-50, 30, 55);
      circle(50, 30, 55);
   pop();
}


function carFourSideProfile(xCoord, yCoord, scal) {
   push();
      translate(xCoord, yCoord);
      scale(scal);

      noStroke();
      fill(blueColor);

      //body:
      rect(-100, -35, 200, 70, 5);
      rect(-60, -100, 100, 100, 5);
      triangle(38, -100, 38, 0, 80, 0);
      triangle(-58, -100, -58, 0, -100, 0)

      //windows:
      fill(255);
      rect(-5, -90, 40, 55, 5);
      triangle(33, -90, 33, -35, 55, -35);
      rect(-50, -90, 40, 55, 5);
      triangle(-48, -90, -48, -35, -72, -35)


      //wheels:
      fill(0);
      circle(-50, 35, 55);
      circle(50, 35, 55);
   pop();
}

function drawCar1(carX, carY)
{
   push();
      translate(carX, carY);
      rotate(atan2(carY - height / 2, carX - width / 2));

      fill(200, 200, 200);
      noStroke();

      if(p1flag == 1){
         carOneTopProfile();
      }
      if(p1flag == 2) {
         carTwoTopProfile();
      }
      if(p1flag == 3){
        carThreeTopProfile();
      }
      if(p1flag == 4){
        carFourTopProfile();
      }
   pop();
}

function drawCar2(carX, carY)
{
   push();
      translate(carX, carY);
      rotate(atan2(carY - height / 2, carX - width / 2));

      fill(200, 200, 200);
      noStroke();
      
      if(p2flag == 1){
         carOneTopProfile();
      }
      if(p2flag == 2) {
         carTwoTopProfile();
      }
      if(p2flag == 3){
        carThreeTopProfile();
      }
      if(p2flag == 4){
        carFourTopProfile();
      }
   pop();
}

function drawFlag(yLoc)
{
   fill(255);
   noStroke();
   rect(0, yLoc, width, 100);

   for(var i = 0; i < width; i+=10)
   {
      for(j = yLoc; j < 100 + yLoc; j += 20)
      {
         if((i / 10) % 2 == 0)
         {
            fill(0);
            rect(i, j, 10, 10);
         }
         else
         {
            fill(0);
            rect(i, j + 10, 10, 10);
         }  
      }  
   }
}

function boxes(){
   push();
      background(6, 153, 50);

      drawFlag(25);

      //TITLE
      textSize(60);
      stroke(0);
      strokeWeight(5);
      textStyle(BOLD);
      textStyle(ITALIC);
      textFont('Impact');
      fill(255, 180, 0);
      textAlign(LEFT);
      text('RACE  AWAY', 100, 100);

      //Directions
      noStroke();
      textFont(NORMAL);
      textSize(20);
      textStyle(BOLD);
      fill(255, 250, 0);
      // text('Directions:', 20, 160);
      fill(200, 250, 100);
      text('P1:\nA to move the car\nS to activate turbo', 15, 160);
      text('P2:\nK to move the car\nL to activate turbo',250,160)
      fill(0)
      text('If you mistime your turbo boost, your car will overheat \nand slow down. Use with care!',15,270)

      stroke(0)
      strokeWeight(1);
      fill(180,180,180)
      rect(60,350,360,100)
      strokeWeight(4);
      fill(255,0,0);
      textSize(40);
      text('Choose Your Cars!',75,410);
   pop();
   
}

//65: Key A
//75: Key K
function keyPressed() {
   if(count>180)
   {
  if (keyCode == 65 & winningStatement == "") {
    car1Progress += car1Speed;
    
  }
  if (keyCode == 75 && winningStatement == ""){
    car2Progress += car2Speed;
  }
}
}

function updateCar1()
{
   var progressRatio = (car1Progress / outerTrackCirc);
   var carAngle = atan(progressRatio) * 8;

   car1X = (trackW + laneWidth / 2) * cos(carAngle) + width / 2;
   car1Y = (trackH + laneWidth / 2) * sin(carAngle) + height / 2;
}

function updateCar2()
{
   var progressRatio = (car2Progress / innerTrackCirc);
   var carAngle = atan(progressRatio) * 8;

   car2X = (trackW - laneWidth / 2) * cos(carAngle) + width / 2;
   car2Y = (trackH - laneWidth / 2) * sin(carAngle) + height / 2;
}

/*
declares which car wins the game and prints that to the screen
*/
function endGame() {
  if(car1Progress >= outerTrackCirc && car2Progress >= innerTrackCirc) {
    winningStatement = "Tie!!";
  }
  else if(car1Progress >= outerTrackCirc) {
    winningStatement = "Car 1 Wins!!";
  }
  else if(car2Progress >= innerTrackCirc) {
    winningStatement = "Car 2 Wins!!";
  }

  if(winningStatement != "")
  {
    background(6, 153, 50);
    drawFlag(150);

    stroke(0);
    strokeWeight(10);
    textSize(60);
    textStyle(BOLD);
    textStyle(ITALIC);
    textFont('Impact');
    fill(255, 180, 0);
    textAlign(CENTER);
    text(winningStatement, width / 2, 225);
    strokeWeight(3);
    fill(rematchColor);
    rect(90, 300, 130, 40);
    fill(newGameColor);
    rect(290, 300, 130, 40);
    fill(255);
    strokeWeight(3);
    stroke(0);
    textSize(25);
    textStyle(NORMAL);
    text("REMATCH", 155, 330);
    text("NEW GAME", 355, 330);
    strokeWeight(1);
  }
}

function drawBackground()
{
   background(6, 153, 50);
   strokeWeight(laneWidth * 2);
   stroke(0);
   noFill();

   ellipse(width / 2, height / 2, trackW * 2, trackH * 2);

   stroke(255);
   strokeWeight(2);
   strokeCap(SQUARE);
   for(var i = 0; i < numOfTrackLines * 2; i += 2)
   {
      arc(width / 2, height / 2, trackW * 2, trackH * 2, ((i * PI) / (numOfTrackLines)), ((i + 1) * PI) / (numOfTrackLines));
   }

   fill(255);
   line(width/2 + trackW - laneWidth, height / 2, width/2 + trackW + laneWidth, height / 2); //finish line

   var progressRatio = (-trackDifference / innerTrackCirc);
   var carAngle = atan(progressRatio) * 8;

   car2X = (trackW - laneWidth / 2) * cos(carAngle) + width / 2;
   car2Y = (trackH - laneWidth / 2) * sin(carAngle) + height / 2;

   line(car2X - 10*cos(carAngle), car2Y - 10*sin(carAngle), car2X + 10*cos(carAngle), car2Y + 10*sin(carAngle));
   noStroke();
}

function playerLocation(car1X, car1Y, car2X, car2Y)
{
   if(car1Progress == 0 && car2Progress <= 0)
   {
      push();
         stroke(255)
         translate(car1X - 10, car1Y - 27);
         textSize(12);
         fill(255, 0, 0)
         text('P 1', 0, 0);
      pop();
      push();
         stroke(255)
         translate(car2X - 20, car2Y - 23);
         textSize(12);
         fill(0, 0, 255);
         text('P 2', 0, 0);
      pop();
   }
}

//76: Key S
//83: Key L
function turbo()
{ 
   if(count>200)
   {

   //the turbo speed:
   var newCar1Speed = 20;
   var newCar2Speed = 20; 

   //prints each car's speed in the center of the track
   noStroke();
   textSize(20);
   noStroke();
   fill(0);
   textSize(15);
   textStyle(BOLD);
   textAlign(CENTER);
   text('P1 Regular Speed : ' + round(originalCar1Speed, 3), width/2, 200);
   text('P2 Regular Speed : ' + round(originalCar2Speed, 3), width/2, 250);
   textAlign(LEFT); //sets the texAlign back to normal

   //prints the turbo messages for both cars in the top corners of the screen at certain intervals of Car1Refresh and Car2Refresh
   if(car1Refresh <= 0 && car1Refresh > -150)
   {
      textSize(20);
      fill(255, 0, 0);
      text('TURBO', 20, 50);
      noStroke();
      fill(0);
      textSize(15);
      textStyle(BOLD);
      text('Press S', 17, 70);
   }
   if(car2Refresh <= 0 && car2Refresh > -150)
   {
      textSize(20);
      fill(0, 0, 255);
      text('TURBO', 382, 50);
      noStroke();
      fill(0);
      textSize(15);
      textStyle(BOLD);
      text('Press L', 377, 70);
   }

   //stores if the boost is activated for each car in the correct time interval
   if((car1Refresh <= 0 && car1Refresh > -150) && (keyIsDown(83))) {
      pressedOnTime1 = true;
   }
   if((car2Refresh <= 0 && car2Refresh > -150) && (keyIsDown(76))) {
      pressedOnTime2 = true;
   }

   //if players try to activate the boost in the incorrect time interval, their car's natural speed is reduced by 0.005
   if((car1Refresh > 0 || car1Refresh <= -150) && keyIsDown(83) && (pressedOnTime1 != true)) {
      originalCar1Speed-=0.005*(originalCar1Speed);
   }
   if((car2Refresh > 0 || car2Refresh <= -150) && keyIsDown(76) && (pressedOnTime2 != true)) {
      originalCar2Speed-=0.005*(originalCar2Speed);
   }

   //if boost is activated in the correct time interval, the boost cycle is reset (a new refreshEvery val is set):
   if(car1Refresh <= 0 && car1Refresh > -150 && keyIsDown(83))
   {
      car1Speed = newCar1Speed;
      if(p1flag == 1) {
        refreshEvery1 = 1000000000000;   
      }
      else if(p1flag == 2) {
        refreshEvery1 = random(500, 600);
      }
      else if(p1flag == 3) {
        refreshEvery1 = random(300, 400);
      }
      else if(p1flag == 4) {
        refreshEvery1 = random(225, 275);
      }
      car1Refresh = refreshEvery1;
   }
   if(car2Refresh <= 0 && car2Refresh > -150 && keyIsDown(76))
   {
      car2Speed = newCar2Speed;
      if(p2flag == 1) {
        refreshEvery2 = 1000000000000;  
      }
      else if(p2flag == 2) {
        refreshEvery2 = random(500, 600);
      }
      else if(p2flag == 3) {
        refreshEvery2 = random(300, 400);
      }
      else if(p2flag == 4) {
        refreshEvery2 = random(225, 275);
      }
      car2Refresh = refreshEvery2;
   }
   //if the boost is missed, the boost cycle is reset:
   else if(floor(car1Refresh) <= -150) {
      pressedOnTime1 = false;
      if(p1flag == 1) {
        refreshEvery1 = 1000000000000;   
      }
      else if(p1flag == 2) {
        refreshEvery1 = random(500, 600);
      }
      else if(p1flag == 3) {
        refreshEvery1 = random(300, 400);
      }
      else if(p1flag == 4) {
        refreshEvery1 = random(225, 275);
      }
      car1Refresh = refreshEvery1;      
   }
   else if(floor(car2Refresh) <= -150) {
      pressedOnTime2 = false;
      if(p2flag == 1) {
        refreshEvery2 = 1000000000000;  
      }
      else if(p2flag == 2) {
        refreshEvery2 = random(500, 600);
      }
      else if(p2flag == 3) {
        refreshEvery2 = random(300, 400);
      }
      else if(p2flag == 4) {
        refreshEvery2 = random(225, 275);
      }
      car2Refresh = refreshEvery2;    
   }
   //after 100 time units from boost being activated, the car's speed reverts from boost speed to regular speed
   if(car1Refresh <= refreshEvery1 - 100)
   {
      car1Speed = originalCar1Speed;
   }
   if(car2Refresh <= refreshEvery2 - 100)
   {
      car2Speed = originalCar2Speed;
   }

   //resets the pressedOnTime a little after the last boost is clicked:
   if((car1Refresh + 100) < refreshEvery1) {
      pressedOnTime1 = false;
   }

   if((car2Refresh + 100) < refreshEvery2) {
      pressedOnTime2 = false;
   }   

   //decrements car1Refresh & car2Refresh to count time
   car1Refresh--;
   car2Refresh--;
   }
}

/*
creates the "3, 2, 1, GO" at the beginning of each race
*/
function go()
{
   textAlign(LEFT);
   if(count > 1 && count < 50)
      {
         fill(255, 100, 30);
         textSize(100);
         stroke(255);
         text('3', 225, 290);
      }
      if(count > 51 && count < 100)
      {
         fill(255, 100, 30);
         textSize(100);
         stroke(255);
         text('2', 225, 290);
      }
      if(count > 101 && count < 150)
      {
         fill(255, 100, 30);
         textSize(100);
         stroke(255);
         text('1', 230, 290);
      }
      if(count > 151 && count < 200)
      {
         fill(255, 100, 30);
         textSize(100);
         stroke(255);
         text('GO!', 160, 275);
      }
}

/*
creates the "Select Your Car" screen
*/
function choose(xLoc,red, yellow, green, blue){
      push();
        noStroke();
        textStyle(BOLD);
        textSize(30)
        textFont('Impact');
        textStyle(ITALIC);
        fill(0, 20, 120);
        text('Select Your Car:', 150, 50);
        text('P1',100,100);
        text('P2',350,100);
      pop();
      push();
        translate(120,130)
        textSize(20);
        fill(0);
        textFont(ITALIC);
        text('10 speed but no turbo boosts',0,-5);
      pop();
      push();
        translate(120,230)
        textSize(20);
        fill(0);
        textFont(ITALIC);
        text('9 speed but has few turbo boosts',0,-5);
      pop();
      push();
        translate(120,330)
        textSize(20);
        fill(0);
        textFont(ITALIC);
        text('8 speed and has more turbo boosts',0,-5);
      pop();
      push();
        translate(100,430)
        textSize(20);
        fill(0);
        textFont(ITALIC);
        text('6 speed and has frequent turbo boosts',0,-5);
      pop();

      //Red Car:
      push();
        translate(xLoc,0)
        fill(red);
        noStroke();
        translate(60,130);
        rect(0,0,120,60);
        carOneSideProfile(55,40,0.28);
        noStroke();
      pop();
      //Orange Car:
      push();
        noStroke();
        translate(xLoc,0);
        fill(yellow);
        translate(60, 230);
        rect(0,0,120,60);
        carTwoSideProfile(55,40,0.28);
        noStroke();
      pop();
      //Green Car:
      push();
        noStroke();
        translate(xLoc,0)
        translate(60, 330);
        fill(green);
        rect(0,0,120,60);
        carThreeSideProfile(55,40,0.28);
        noStroke()
      pop();
      //Blue Car:
      push();
        noStroke();
        translate(xLoc,0)
        translate(60, 430);
        fill(blue);
        rect(0,0,120,60);
        carFourSideProfile(55,40,0.28)
        noStroke();
      pop();  
}

function buttonHoverHighlights()
{
  if(winningStatement != "" && mouseX > 90 && mouseX < 220 && mouseY > 300 && mouseY < 340)
  {
    rematchColor = color(205, 130, 0);
  }
  else
  {
    rematchColor = color(255, 180, 0);
  }

  if(winningStatement != "" && mouseX > 290 && mouseX < 420 && mouseY > 300 && mouseY < 340)
  {
    newGameColor = color(205, 130, 0);
  }
  else
  {
    newGameColor = color(255, 180, 0);
  }
}

/*
presets all speed related vars before each race
*/
function presettingAllSpeedVars() {
   if(p1flag == 1){ //if player 1 selects car 1
    originalCar1Speed = 10;
    refreshEvery1 = 1000000000000;
   }
   else if(p1flag == 2) { //if player 1 selects car 2
    originalCar1Speed = 9;
    refreshEvery1 = random(500, 600);
   }
   else if(p1flag == 3) { //if player 1 selects car 3
    originalCar1Speed = 8;
    refreshEvery1 = random(300, 400);
   }
   else if(p1flag == 4) { //if player 1 selects car 4
    originalCar1Speed = 6;
    refreshEvery1 = random(225, 275);
   }
   car1Refresh = refreshEvery1;
   car1Speed = originalCar1Speed;

   if(p2flag == p1flag) { //if player 2 selects the same car as player 1
    originalCar2Speed = originalCar1Speed;
    refreshEvery2 = refreshEvery1;
   }
   else if(p2flag == 1){ //else if player 2 selects car 1
    originalCar2Speed = 10;
    refreshEvery2 = 1000000000000;
   }
   else if(p2flag == 2) { //else if player 2 selects car 2
    originalCar2Speed = 9;
    refreshEvery2 = random(500, 600);
   }
   else if(p2flag == 3) { //else if player 2 selects car 3
    originalCar2Speed = 8;
    refreshEvery2 = random(300, 400);
   }
   else if(p2flag == 4) { //else if player 2 selects car 2
    originalCar2Speed = 6;
    refreshEvery2 = random(225, 275);
   }
   car2Refresh = refreshEvery2;
   car2Speed = originalCar2Speed;
}

function mouseClicked(){
  if (mouseX > 60 && mouseX < 420 && mouseY > 360 && mouseY < 460 && !race){
    selection = true;
  }

   if (mouseX > 60 && mouseX < 180 && mouseY > 130 && mouseY < 190 && selection == true){
      p1flag = 1;
      redfill = color(180,255,180);
      yellowfill = color(180,180,180);
      greenfill = color(180,180,180);
      bluefill = color(180,180,180);
   }

   else if(mouseX > 60 && mouseX < 180 && mouseY > 230 && mouseY < 290 && selection == true){
      p1flag = 2;
      yellowfill = color(180,255,180);
      redfill = color(180,180,180);
      greenfill = color(180,180,180);
      bluefill = color(180,180,180);
   }

   else if(mouseX > 60 && mouseX < 180 && mouseY > 330 && mouseY < 390 && selection == true){
      p1flag = 3;
      greenfill = color(180,255,180);
      bluefill = color(180,180,180);
      redfill = color(180,180,180);
      yellowfill = color(180,180,180);
   }

   else if(mouseX > 60 && mouseX < 180 && mouseY > 430 && mouseY < 490 && selection == true){
      p1flag = 4;
      bluefill = color(180,255,180);
      greenfill = color(180,180,180);
      redfill = color(180,180,180);
      yellowfill = color(180,180,180);
   }

    if (mouseX > 310 && mouseX < 430 && mouseY > 130 && mouseY < 190 && selection == true){
      p2flag = 1;
      redfill2 = color(180,255,180);
      yellowfill2 = color(180,180,180);
      greenfill2 = color(180,180,180);
      bluefill2 = color(180,180,180);
   }

   else if(mouseX > 310 && mouseX < 430 && mouseY > 230 && mouseY < 290 && selection == true){
      p2flag = 2;
      yellowfill2 = color(180,255,180);
      redfill2 = color(180,180,180);
      greenfill2 = color(180,180,180);
      bluefill2 = color(180,180,180);
   }

   else if(mouseX > 310 && mouseX < 430 && mouseY > 330 && mouseY < 390 && selection == true){
      p2flag = 3;
      greenfill2 = color(180,255,180);
      bluefill2 = color(180,180,180);
      redfill2 = color(180,180,180);
      yellowfill2 = color(180,180,180);
   }

   else if(mouseX > 310 && mouseX < 430 && mouseY > 430 && mouseY < 490 && selection == true){
      p2flag = 4;
      bluefill2 = color(180,255,180);
      greenfill2 = color(180,180,180);
      redfill2 = color(180,180,180);
      yellowfill2 = color(180,180,180);
   }


   else if(p1flag != 0 && p2flag != 0 && mouseX >185 && mouseX < 300  && mouseY > 200 && mouseY < 275){
      race = true;
   }

   if(race == false) {
    presettingAllSpeedVars();
   }

   //if player(s) choose rematch at the end of the race:
   if(winningStatement != "" && mouseX > 90 && mouseX < 220 && mouseY > 300 && mouseY < 340)
   {
      winningStatement = "";
      car1Progress = 0;
      car2Progress = -trackDifference;
      count = 0;
      presettingAllSpeedVars();
   }

   //if player(s) choose new game at the end of the race:
   if(winningStatement != "" && mouseX > 290 && mouseX < 420 && mouseY > 300 && mouseY < 340)
   {
      p1flag = 0;
      p2flag = 0;
      race = false;
      selection = false;
      winningStatement = "";
      car1Progress = 0;
      car2Progress = -trackDifference;
      redfill = color(180);
      yellowfill = color(180);
      greenfill = color(180);
      bluefill = color(180);
      count = 0;
      redfill2 = color(180);
      yellowfill2 = color(180);
      greenfill2 = color(180);
      bluefill2 = color(180);
      presettingAllSpeedVars();
   }
}

function draw() 
{
   boxes();
   if (selection == true){
    background(6, 153, 50);
    choose(0,redfill,yellowfill,greenfill,bluefill)
    choose(250,redfill2,yellowfill2,greenfill2, bluefill2)

     if (p1flag != 0 && p2flag != 0){
        push();
          fill(180,180,180);
          rect(185,200,115,75)
          textStyle(BOLD);
          textFont('Impact');
          fill(255,0,0);
          textSize(40);
          strokeWeight(3);
          text('RACE!', 195, 250);
        pop();

     }
     if (race == true){
      drawBackground();
      playerLocation(car1X, car1Y, car2X, car2Y);
      go();
      updateCar1();
      updateCar2();
      drawCar1(car1X, car1Y);
      drawCar2(car2X, car2Y);
      if(winningStatement=="") {
        turbo();
      }
      push();
        endGame();
        count++;
        buttonHoverHighlights();
      pop();
    }  
  }
}