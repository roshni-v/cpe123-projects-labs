// ARRAY STORING BOOKS ON BOOKSHELF
var bookdX = [];
var bookdH = [];
var bookCol = [];
var stripeStart = [];
var stripeNum = [];
var stripeColor = [];
var stripeH = [];
var stripeGap = [];

// DIMENSIONS OF BOOKSHELF
var shelves = 4;
var shelfX = 50;
var shelfY = 10;
var shelfW = 400;
var shelfH = 400;

// CHARACTER DIMENSIONS & COLOR
var charColor;
var charW = 30;
var charWSide = 60;
var charH = 80;
var charX = 265;
var charY = 160;
var chardY = 2;
var charScal = 1;

// TRACKERS FOR FILM
var counter = 0; // counter of frames
var bgVersion = 1; // version of background
var charState = 1; // state of character
var eyeState = 1; // state of eyes
var blinkRate = 30; // how many frames per blink state
var mouthState = 1; //state of mouth
var mouthMovementRate = 40; // how many frames per mouth state


//X SCALE VAL FOR BOOK COVER (USED TO OPEN THE COVER)
var turn = 1;

//COLORS IN SECOND BACKGROUND SCENE
var darkBlueColor;
var starColor;
var brownColor;

//ARRAY STORING VALS FOR THE STARS IN THE SKY
var starXCoords = [];
var starYCoords = [];
var sizeOfStar = [];
var numStars = 7;
var starRotateVal;

//VARS FOR MOVING/BLOWING UP THE BOOK PAGE
var xBackground = 235;
var yBackground = 368;
var backgroundXScale = 3/25;
var backgroundYScale = 4/25;



/*FUNCTIONS FOR FIRST SCENE:*/

/*
   Draws a book

   x & y - x & y position of book
   w & h - width and height of book
   bookColor - color of book
   stripeStart - y position on book to start stripes at
   numStripes - number of stripes to draw
   stripeColor - color of stripes
   stripeH - thickness of stripes
   stripeGap - space between stripes
*/
function drawBook(x, y, w, h, bookColor, stripeStart, numStripes, stripeColor, stripeH, stripeGap)
{
    push();
        translate(x, y);

        stroke(1);
        fill(bookColor);

        rect(0, 0, w, h);

        for(var i = 0; i < numStripes; i++)
        {
            noStroke();
            fill(stripeColor);
            rect(0, stripeStart + stripeGap * i, w, stripeH);
        }
    pop();
}

/*
   Pushes information about each book in bookshelf to book arrays

   dX - width of book
*/
function bookPush(dX)
{
   bookdX.push(dX);
    bookdH.push(random(15, 35));
    bookCol.push(color(random(100, 200), random(100, 200), random(100, 200)));
      stripeStart.push(random(5, 15));
      stripeNum.push(random(-0.25, 3));
      stripeColor.push(color(random(25, 100), random(25, 100), random(25, 100)));
      stripeH.push(random(0.8, 2.0));
      stripeGap.push(random(5, 10));
}

/*
   Initializes bookcase to later be drawn
   Paramaters should match those used in drawBookcase()

   numShelves - number of shelves on bookcase
   xPos - x position of upper left corner of bookcase
   w - width of bookcase
*/
function initializeBookcase(numShelves, xPos, w)
{
    for(var i = 0; i < numShelves; i++)
    {

        var x = xPos + 10;
        while(x < (xPos + w) - 35)
        {
         var dX = random(10, 25);
           bookPush(dX);

            x += dX;
        }

        bookPush((xPos + w) - x - 1);
    }
}

/*
   Draws bookcase
   Paramaters should match those used in initalizeBookcase()

   numShelves - number of shelves on bookcase
   xPos - x position of upper left corner of bookcase
   yPos - y position of upper left corner of bookcase
   h - height of bookcase
   w - width of bookcase
*/
function drawBookcase(numShelves, xPos, yPos, h, w)
{
    var baseH = yPos;
    var shelfH = h / numShelves;
    var j = 0;

    for(var i = 0; i < numShelves; i++)
    {
        strokeWeight(2);
        fill(60); // grey
        rect(xPos, baseH, w, shelfH);

        var x = xPos + 10;
        while(x < (xPos + w) - 35)
        {
            drawBook(x, baseH + bookdH[j], bookdX[j], shelfH - bookdH[j], bookCol[j], stripeStart[j], stripeNum[j], stripeColor[j], stripeH[j], stripeGap[j]);
            x += bookdX[j];
            j++;
        }


        drawBook(x, baseH + bookdH[j], bookdX[j], shelfH - bookdH[j], bookCol[j], stripeStart[j], stripeNum[j], stripeColor[j], stripeH[j], stripeGap[j]);
      j++;

        fill(25); // black
        rect(xPos, baseH, 10, shelfH);
        rect((xPos + w) - 10, baseH, 10, shelfH);
        rect(xPos, baseH + shelfH - 10, w, 10);
        if(i == 0) {rect(xPos, baseH, w, 10);}

        baseH += shelfH;
    }
}



/*FUNCTIONS FOR SECOND SCENE:*/

/*
   Draws a star

   x & y - x & y position of star
   rot - rotation value of star
   scal - scale factor of star

*/
function star(x, y, rot, scal) {
    push();
        translate(x, y);
        rotate(rot);
        scale(scal);

        fill(starColor);
        noStroke();
        ellipse(0, 0, 2, 20);
        ellipse(0, 0, 20, 2);
        stroke(255);
        strokeWeight(2);
        line(-15, -15, 15, 15);
        line(15, -15, -15, 15);
    pop();
}

/*
   Draws a tree

   x & y - x & y position of bottom of tree
   scal - scale factor of tree

*/
function tree(x, y, scal){
   push();
      translate(x, y);
      scale(scal);
      fill(brownColor);
      noStroke();
      beginShape();
         curveVertex(20, 0);
         curveVertex(10, -10);
         curveVertex(8, -60);
         curveVertex(9, -110);
         curveVertex(40, -120);
         curveVertex(50, -130);
         curveVertex(40, -125);
         curveVertex(0, -125);
         curveVertex(-15, -140);
         curveVertex(0, -165);
         curveVertex(-2, -175);
         curveVertex(-5, -165);
         curveVertex(-25, -150);
         curveVertex(-35, -170);
         curveVertex(-37, -170);
         curveVertex(-20, -130);
         curveVertex(-9, -110);
         curveVertex(-8, -60);
         curveVertex (-10, -10);
         curveVertex(-20, 0);
      endShape(CLOSE);

      fill('rgba(127, 161, 2, 0.7)');
      beginShape();
         curveVertex(-70, -200);
         curveVertex(30, -180);
         curveVertex(70, -80);
         curveVertex(0, -88);
         curveVertex(-70, -80);
         curveVertex(-50, -180);
      endShape(CLOSE);
   pop();
}

/*
   Initializes stars to later be drawn

   numberOfStars - number of stars in the sky
*/
function initializeStars(numberOfStars) {
   for(var i = 0; i < numberOfStars; i++) {
      starXCoords.push(random(17, width - 17));
      starYCoords.push(random(17, (height/3)));
      sizeOfStar.push(random(0.35, 0.5));
   }
}

/*
   Draws the stars initialized in initializeStars()

   xCoords - array that stores the initialized x-values of the stars
   yCoords - array that stores the initialized y-values of the stars
   rotateVal - preset rotation value for all the stars (preset to PI/4)
   starSize - array that stores the initialized scale values of the stars
*/
function drawStars(xCoords, yCoords, rotateVal, starSize) {
   for(var i = 0; i < starXCoords.length; i++) {
      star(xCoords[i], yCoords[i], rotateVal, starSize[i]);
   }
}

/*
   Draws the scene in the book that becomes the second background

   topRightXCoord - the x-coordinate of the top right point of the rectangular image
   topRightYCoord - the y-coordinate of the top right point of the rectangular image
   xScale - scale value for the image in the x direction
   yScale - scale value for the image in the y direction
*/
function drawSecondBackground(topRightXCoord, topRightYCoord, xScale, yScale){
   push();
      translate(topRightXCoord, topRightYCoord);
      scale(xScale, yScale);
      fill(darkBlueColor);
      rect(0, 0, width, height);
      for(var i = 0; i < starXCoords.length ; i++) {
         star(starXCoords[i], starYCoords[i], PI/4, sizeOfStar[i]);
      }
      tree(width /2, height, 1.5);
   pop();
}



/*FUNCTIONS FOR BOTH SCENES*/

/*
   Draws background

   bgVersion - determines which background to draw (GLOBAL VARIABLE)
      1. library background
      2. story background
*/
function drawBackground()
{
   // LIBRARY
   if(bgVersion == 1)
   {
      background(219, 255, 218);
         fill(21, 107, 49);
         rect(-5, height - 225, width + 10, 230);
         drawBookcase(shelves, shelfX, shelfY, shelfH, shelfW);
   }

   // STORY PAGE
   if(bgVersion == 2)
   {
      drawSecondBackground(0, 0, 1, 1);
   }
}

/*
   Draws character

   x - x position of center of character
   y - y position of center of character
   scal - scale factor of character
   dY - y velocity of character
   state - determines which state of character to draw
      1. spine of book
      2. front of book, closed
      3. opening front cover
      4. expanding inside page to become the second background
*/
function drawChar(x, y, scal, dY, state)
{
   if(state == 1)
   {
      push();
          translate(x, y);
          scale(scal);

          stroke(1);
          fill(charColor);
         rect(-charW / 2, -charH / 2, charW, charH);

         drawEyes();
      pop();
   }
   if(state == 2)
   {
      push();
          translate(x, y);
          scale(scal);

          stroke(1);
          fill(charColor);
         rect(-charWSide / 2, -charH / 2, charWSide, charH);
         rect(-charWSide / 2 - 10, -charH / 2, 10, charH);

         drawEyes();
      pop();
   }
   if (state == 3) 
   {
      push();
         translate(x - charWSide / 2, y -charH / 2);

         drawSecondBackground(0, 0, (3/25), (4/25)); //inner page of book
         
         stroke(1);
         fill(charColor);
         rect(0 - 10, 0, 10, charH); //spine of book
         //front cover of book:
         scale(turn, 1);
         rect(0, 0, charWSide, charH);
         if (turn > -1){ 
            turn -= 0.01; 
         } 
         //draws eyes on the inner cover one the book is fully opened:
         else 
         {
            push();
               translate(charWSide / 2, charH / 2);
               drawEyes();
            pop();
         }
      pop();
   }
   if (state == 4)
   //blows up the image in the book to fit the canvas:
   {
      if(xBackground > 0) {
         xBackground-=1;
      }
      if(yBackground > 0) {
         yBackground-=1;
      }
      if(backgroundXScale < 1) {
         backgroundXScale +=0.002;
      }
      if(backgroundYScale < 1) {
         backgroundYScale += 0.002;
      }
      drawSecondBackground(xBackground, yBackground, backgroundXScale, backgroundYScale);

      //switches the background state
      if(xBackground <= 0 && yBackground <= 0 && backgroundXScale >= 1 && backgroundYScale >= 1) {
         bgVersion = 2;
      }
   }
}

/*
   Draws character's eyes

   eyeState - determines which state of eyes to draw
      1. eyes open
      2. eyes closed
*/
function drawEyes()
{
   stroke(0.25);
   fill(255);
    ellipse(-6, -10, 10, 20);
    ellipse(6, -10, 10, 20);

    fill(0);
    ellipse(-6, -10, 3, 10);
    ellipse(6, -10, 3, 10);

    if(eyeState == 1)
    {
      arc(-6, -10, 10, 20, PI, PI * 2);
      arc(6, -10, 10, 20, PI, PI * 2);
    }
    if(eyeState == 2)
    {
      ellipse(-6, -10, 10, 20);
      ellipse(6, -10, 10, 20);
    }
}

/*
   Draws character's mouth

   mouthState - determines which state of the mouth to draw
      1. mouth circular
      2. mouth ellipse-shaped
*/
function drawMouth(x, y) {
   push();
      translate(x, y)
      fill(0);
      if (mouthState == 1) {
         circle(0, 10, 5);
      }
      if (mouthState == 2) {
         ellipse(0, 10, 10, 5);
      }
   pop();
}

/*
   Updates Character's State

   Determined by the value of counter as counter tracks time
*/
function updateChar()
{
  if(eyeState == 1 && counter % blinkRate == 0){eyeState = 2;}
  else if(eyeState == 2 && counter % blinkRate == 0){eyeState = 1;}

  if(mouthState == 1 && counter % mouthMovementRate == 0){mouthState = 2;}
  else if(mouthState == 2 && counter % mouthMovementRate == 0){mouthState = 1;}

  if(counter > 100 && counter < 225)
  {
    charState = 1;
    charY += chardY;
  }
  if(counter >= 225 && counter < 500)
  {
    charState = 2;
  }
  if (counter >= 425 && counter < 725)
  {
    charState = 3;
  }
  if (counter >= 725 && counter < 900) {
    charState = 4;
  }
  if(counter >= 1200)
  {
    charState = 2; 
    charY = 460;
    charX = 200;
  }

}

/*
   Draws speech bubble
*/
function drawBubble()
{
  fill(255);
  ellipse(charX - 100, charY - 100, 200, 100);
  beginShape();
    vertex(charX - 50, charY - 60);
    vertex(charX - 25, charY - 50);
    vertex(charX - 25, charY - 65);
  endShape();
  fill(0);
}

/*
   Writes content inside of speech bubble & draws the character's mouth

   Determined by the value of counter as counter tracks time
*/
function drawTextAndMouth()
{
  if(counter >= 225 && counter < 285)
  {
    drawBubble();
    text('Darn. I fell.', charX - 130, charY - 95);
    drawMouth(charX, charY);
  }
  if(counter >= 285 && counter < 420)
  {
    drawBubble();
    text('Well, while I\'m here,\n', charX - 150, charY - 105);
    text('I might as well tell you a story.', charX - 175, charY - 90);
    drawMouth(charX, charY);
  }
  if(counter >= 1200 && counter < 1300)
  {
    drawBubble();
    text('This is the tree I came from.', charX - 175, charY - 95);
    drawMouth(charX, charY);
  }
  if(counter >= 1300 && counter < 1400)
  {
    drawBubble();
    text('But now I\'m just a dumb book!', charX - 175, charY - 95);
    drawMouth(charX, charY);
  }
}



function setup() {
   createCanvas(500, 500);
    initializeBookcase(shelves, shelfX, shelfW);
    charColor = color(132, 165, 217);

   initializeStars(numStars);
   darkBlueColor = color(18, 18, 161);
   starColor = color(230, 246, 252);
   brownColor = color(161, 106, 31);
   starRotateVal = PI/4;
}

function draw() {
    drawBackground();
    drawChar(charX, charY, 1, 0, charState);
    updateChar();
    drawTextAndMouth();

    counter++;
}


