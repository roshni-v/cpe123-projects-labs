var xOfGearCenter;
var yOfGearCenter;
var radiusOfGear;
var angleGearToothBase;
var sumOfTwoAngles;
var returnThis;
var numberOfTeeth;
var bottomLength;
var topLength;
var heightOfTrapezoid;
var countTries = 0;
var totalTries = 0;
var drawCount = 0;
var warning = false;

var here = 0;

function setup() {
   createCanvas(550, 600);
   topLength = round(random(50, 400)); //top of gear tooth length
   bottomLength = round(random(2.5,4) * topLength); //bottom of gear tooth length
   heightOfTrapezoid = round(random(1, 2.5)*bottomLength); //height of the trapezoid that is the gear tooth
   noLoop();
}

function drawGearTooth(x, y, topDist, bottomDist, heightOfQuad, angleOfTooth) {
   push();
      translate(x, y);
      rotate(angleOfTooth);
      quad((-1)*0.5*bottomDist, 0, 0.5*bottomDist, 0, 0.5*bottomDist - (bottomDist - topDist)/2, heightOfQuad, (-1)*0.5*bottomDist + (bottomDist - topDist)/2, heightOfQuad);
   pop();
}

function determineRadius() {
   radiusOfGear = round(random(50, 1000));
   //based on geometry:
   angleGearToothBase = asin(0.5 * bottomLength / radiusOfGear) / PI; //simplified calc for the angle that the gear tooth base makes in the circle
   var angleGearToothTop = asin(0.5 * topLength / radiusOfGear) / PI; //simplified calc for the angle that the spaces between the gears (which is equal to the dist across the top of a gear tooth) makes in the circle
   sumOfTwoAngles = angleGearToothBase + angleGearToothTop;
   numberOfTeeth = round(1 / sumOfTwoAngles); //calculates the number of teeth needed to complete a gear
   if (((1 % sumOfTwoAngles) <= 0.0005) && (sumOfTwoAngles != undefined) && (numberOfTeeth > 4)) {
      warning = false;
      return (radiusOfGear);
   } else {
      countTries++;
      totalTries++;
      if(countTries > 2) {
         countTries = 0;
         //resets teeth values to recalc radius (because with the previous values a radius could not be efficiently found)
         topLength = round(random(50, 400));
         bottomLength = round(random(2.5,4) * topLength);
         heightOfTrapezoid = round(random(1, 2.5)*bottomLength);
      }
      if(totalTries >= 600){ //gives up on this run of the function if it takes more than 599 tries
         warning = true;
         countTries = 0;
         totalTries = 0;
         return false;  
      }
      determineRadius(topLength, bottomLength);
   }
}

function drawFullGear(x, y, topDist, bottomDist, heightOfQuad, rot) {
   returnThis = radiusOfGear; //what I ultimately want out of running determineRadius()
   push(); 
      translate(x, y);
      rotate(rot);
      scale(0.08);
      var angleOfGearTooth = PI/4 - ((PI - angleGearToothBase)/4);
      var count = 0;
      while(count < numberOfTeeth) {
         if (count == 0) {
            rotate(0);
         } else {
            rotate(sumOfTwoAngles * 2 * PI);
         }
         strokeWeight(5);
         line(0,0, 0, -returnThis);
         drawGearTooth(0, -returnThis, topDist, bottomDist, -heightOfQuad, angleOfGearTooth);
         count++;
      }
      circle(0, 0, returnThis*2);
   pop();
}

function createProperMeshing() {
   //chooses a random point inside the circle for the first gear:
   var posOrNeg = [-1, 1];
   var xCoord = random(posOrNeg) * random(0, (0.5 * diameter));
   var yCoord = random(posOrNeg) * random(0, sqrt((0.5 * diameter) * (0.5 * diameter) - (xCoord * xCoord))); //pythag
}

function draw() {
   drawCount++;
   background(194, 37, 6); //dark red
   strokeWeight(2.5);
   stroke(12, 55, 150); //dark red
   fill(240, 46, 7); //light red
   circle(width/2, height/2, 500);

   fill(255, 255, 255);
   var hi = determineRadius();
   if(warning == true) { //if a radius could not be found in 599 tries, runs the draw loop again
      loop();
   } 
   if(warning == false) { //if a radius coul be found in 599 tries, draws the gear and terminates the draw loop
      noLoop();
      here++;
      var rotVal = random(0, PI);
      drawFullGear(width/2, height/2, topLength, bottomLength, heightOfTrapezoid, rotVal);
   }
}