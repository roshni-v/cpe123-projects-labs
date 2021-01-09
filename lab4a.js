
/* diagram of the points and their locations on each pumpkin: coordinates of point 1 -- (0,0)
      1
   8.-.-.2
   /     \ 
  /       \
7.         .3
  \       /
   \     /
    .-.-.4
   6  5

*/

//variables needed for x-coordinates on pumpkins 
var pointTwoXCoord;
var pointThreeXCoord;
var pointFourXCoord;
var pointSixXCoord;
var pointSevenXCoord;
var pointEightXCoord;

//variables needed for y-coordinates on pumpkins
var pointTwoEightYCoord;
var pointThreeSevenYCoord;
var pointFourSixYCoord;
var pointFiveYCoord;

//variables needed for facial cutout placements on the pumpkins
var listOfWidths;
var widthOfPumpkin;
var topBoundaryForPointThreeAndFace;
var bottomBoundaryForPointThreeAndFace;
var verticalCenterDistance;

//colors used in image
var orangeColor;
var brownColor;
var darkGreenColor;
var purpleBackgroundColor;

function setup() {
	orangeColor = color(245, 140, 29);
	brownColor = color(168, 101, 29);
	darkGreenColor = color(20, 168, 42);
	purpleBackgroundColor = color(177, 144, 245);
	createCanvas(800, 600);
	noLoop();
}

/**
 * Draws the randomly generated body of each pumpkin.
 * Requires an x-coordinate (x) and a y-coordinate (y) for placement.
 * Requres a scale value (scale) to determine the size of the pumpkin
 * a rotation value (rot) is optional
 */
function pumpkinBodyShape(x, y, scal, rot) {
	push();
		translate(x, y);
		scale(scal);
		if (rot!= null) {
			rotate(rot);
		} else {
			rotate(0);
		}

		fill(orangeColor);

		//sets the x-values of each point on the pumpkin
		pointTwoXCoord = 120;
		pointFourXCoord = random(0.8, 1.2) * 120;
		pointSixXCoord = (-1) * pointFourXCoord;
		pointEightXCoord = (-1) * pointTwoXCoord;
		if(pointTwoXCoord > pointFourXCoord) {
			pointThreeXCoord = random(0.92, 1.5) * pointTwoXCoord;
		} else {
			pointThreeXCoord = random(0.92, 1.5) * pointFourXCoord;
		}
		pointSevenXCoord = (-1) * pointThreeXCoord;

		//finds the widest point on the pumpkin
		listOfWidths =[pointTwoXCoord, pointThreeXCoord, pointFourXCoord];
		widthOfPumpkin = max(listOfWidths);

		//sets the approximate height of the pumpkin to 2-3 times the 1/2 the x-coord of the widest point --> so, 1-1.5 times taller 
		var heightOfPumpkin =  random(2, 3) * widthOfPumpkin

		//sets the y-values for each point on the pumpkin given the predetermined approximate height of the pumpkin
		pointTwoEightYCoord = random(-0.07, 0.15) * heightOfPumpkin;
		pointFourSixYCoord = heightOfPumpkin;
		pointFiveYCoord = random(-0.05, 0.1) * heightOfPumpkin + pointFourSixYCoord;

		//determines the top and bottom boundaries for the face and the y-coordinate of points three and seven
		topBoundaryForPointThreeAndFace = max(0, pointTwoEightYCoord);
		bottomBoundaryForPointThreeAndFace = min(pointFiveYCoord, pointFourSixYCoord);

		//randomly selects a y-coordinate for point three and seven given the top and bottom boundaries of the pumpkin face
		verticalCenterDistance = bottomBoundaryForPointThreeAndFace - topBoundaryForPointThreeAndFace ;
		pointThreeSevenYCoord = random((topBoundaryForPointThreeAndFace + 0.3 * verticalCenterDistance), (bottomBoundaryForPointThreeAndFace - 0.3 * verticalCenterDistance));

		//draws the pumpkin shape
		beginShape();
			curveVertex(0, 0); //set point
			curveVertex(0, 0); //point 1
			curveVertex(pointTwoXCoord, pointTwoEightYCoord); //point 2
			curveVertex(pointThreeXCoord, pointThreeSevenYCoord); //point 3
			curveVertex(pointFourXCoord, pointFourSixYCoord); //point 4
			curveVertex(0, pointFiveYCoord); //point 5
			curveVertex(pointSixXCoord, pointFourSixYCoord); //point 6
			curveVertex(pointSevenXCoord, pointThreeSevenYCoord); //point 7
			curveVertex(pointEightXCoord, pointTwoEightYCoord); //point 8
			curveVertex(0, 0); //set point
		endShape(CLOSE);
	pop();
}

/*
 * Draws the curved lines on each pumpkin's body
 * x, y, scal, and rot inputs should match the x, y, scal, and rot inputs for pumpkinBodyShape()
 */
function linesOnPumpkin(x, y, scal, rot) {
	//pumpkin lines
	push();
		translate(x, y);
		scale(scal);
		if (rot!= null) {
			rotate(rot);
		} else {
			rotate(0);
		}

		noFill();
		stroke(brownColor);
		var distBetweenLines = pointThreeXCoord / 2.5

		//top half of lines from right of pumpkin to left
		curve((pointEightXCoord * 6), ((-1) * pointTwoEightYCoord), 0, 0, (pointThreeXCoord - distBetweenLines), pointThreeSevenYCoord, 0, pointFiveYCoord);
		curve((pointEightXCoord * 4), ((-1) * pointTwoEightYCoord), 0, 0, (pointThreeXCoord - distBetweenLines * 2), pointThreeSevenYCoord, 0, pointFiveYCoord);
		curve((pointTwoXCoord * 4), ((-1) * pointTwoEightYCoord), 0, 0, (pointThreeXCoord - distBetweenLines * 3), pointThreeSevenYCoord, 0, pointFiveYCoord);
		curve((pointTwoXCoord * 6), ((-1) * pointTwoEightYCoord), 0, 0, (pointThreeXCoord - distBetweenLines * 4), pointThreeSevenYCoord, 0, pointFiveYCoord);
	
		//bottom half of lines from right of pumpkin to left
		curve((pointSixXCoord * 6), pointFiveYCoord - (pointFourSixYCoord - pointFiveYCoord), 0, pointFiveYCoord, (pointThreeXCoord - distBetweenLines), pointThreeSevenYCoord, 0, 0);
		curve((pointSixXCoord * 4), pointFiveYCoord - (pointFourSixYCoord - pointFiveYCoord), 0, pointFiveYCoord, (pointThreeXCoord - distBetweenLines * 2), pointThreeSevenYCoord, 0, 0);
		curve((pointFourXCoord * 4), pointFiveYCoord - (pointFourSixYCoord - pointFiveYCoord), 0, pointFiveYCoord, (pointThreeXCoord - distBetweenLines * 3), pointThreeSevenYCoord, 0, 0);
		curve((pointFourXCoord * 6), pointFiveYCoord - (pointFourSixYCoord - pointFiveYCoord), 0, pointFiveYCoord, (pointThreeXCoord - distBetweenLines * 4), pointThreeSevenYCoord, 0, 0);
	pop();
}

/*
 * Draws the face on the pumpkin.
 * Eyes, nose, and mouth shapes are each randomly selected from lists for eyes shapes, nose shapes, and mouth shapes, respectively.
 * Requires the same x, y, scal, and rot values as those inputted into both the pumpkinBodyShape() and linesOnPumpkin() functions.
 */
function face(x, y, scal, rot){
	//faces
	push();
		translate(x, y);
		scale(scal);
		if (rot!= null) {
			rotate(rot);
		} else {
			rotate(0);
		}

		//divides up vertical space into three regions for the eyes, nose and mouth with 20 units removed for space between the edge of the pumpkin and the face
		var verticalDivision = (verticalCenterDistance - 20) / 3;

		//finds the shortest width of the pumpkin
		var horizontalFaceRegionList = [pointTwoXCoord, pointThreeXCoord, pointFourXCoord];
		var horizontalFaceRegion = min(horizontalFaceRegionList);

		//useful in calculations below because it is just slightly less than the a quarter of the smallest width of the pumpkin
		var horizontalDivision = (horizontalFaceRegion - 20) / 2;
		
		//determines the x-coordinate for the left end of the face region
		var leftEndOfFace = ((-1) * horizontalFaceRegion);

		//all of the face parts are black (because they are cut-outs)
		fill(0);

		//eyes:
		let eyesSelection = [1, 2, 3, 4, 5];
		var eyesChoice = random(eyesSelection);
		if (eyesChoice == 1) {
			//circle eyes
			circle(leftEndOfFace + horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision);
			circle(leftEndOfFace + 3*horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision);
		} else if (eyesChoice == 2) {
			//semi cirle eyes curve down
			arc(leftEndOfFace + horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision, verticalDivision/2, 0, PI);
			arc(leftEndOfFace + 3*horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision, verticalDivision/2, 0, PI);
		} else if (eyesChoice == 3){
			//semi circle eyes curve up
			arc(leftEndOfFace + horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision, verticalDivision/2, PI, 2*PI);
			arc(leftEndOfFace + 3*horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalDivision, verticalDivision/2, PI, 2*PI);
		} else if (eyesChoice == 4) {
			//triangle point up
			triangle(leftEndOfFace + horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + 20, leftEndOfFace + 10, topBoundaryForPointThreeAndFace + verticalDivision - 10, - 10, topBoundaryForPointThreeAndFace + verticalDivision -10);
			triangle(leftEndOfFace + 3*horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + 20, 10, topBoundaryForPointThreeAndFace + verticalDivision - 10, horizontalFaceRegion - 10, topBoundaryForPointThreeAndFace + verticalDivision - 10);
		} else if (eyesChoice == 5){
			//line/rect eyes
			rectMode(CENTER);
			rect(leftEndOfFace + horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalFaceRegion/2 - 10, 15);
			rect(leftEndOfFace + 3*horizontalFaceRegion/2, topBoundaryForPointThreeAndFace + verticalDivision/2, horizontalFaceRegion/2 - 10, 15);
		}
		
		//nose:
		let noseSelection = [1, 2, 3];
		var noseChoice = random(noseSelection);
		if (noseChoice == 1){
			//circle
			circle(0, topBoundaryForPointThreeAndFace + 3*verticalDivision/2, 30);
		} else if (noseChoice == 2){
			//rect nose
			rectMode(CENTER);
			rect(0, topBoundaryForPointThreeAndFace + 3*verticalDivision/2, 30, 15);
		} else if (noseChoice == 3) {
			//triangle
			triangle(0, topBoundaryForPointThreeAndFace + 3*verticalDivision/2 + 15, -20, topBoundaryForPointThreeAndFace + 3*verticalDivision/2, 20, topBoundaryForPointThreeAndFace + 3*verticalDivision/2);
		}

		//mouth:
		let mouthSelection = [1, 2, 3];
		var mouthChoice = random(mouthSelection);
		if (mouthChoice == 1){
			//toothy smile
			arc(0, 5*verticalDivision/2, horizontalFaceRegion - 10, (-1) * horizontalFaceRegion + 10, 0, PI);
			rectMode(CENTER);
			fill(245, 140, 29);
			noStroke();
			rect(-25, 5*verticalDivision/2 + 4, 20, 10);
			rect(25, 5*verticalDivision/2 + 4, 20, 10);
			rect(0, 5*verticalDivision/2 + (2.5)*horizontalFaceRegion/6 + 1, 20, 10);
		} else if (mouthChoice == 2) {
			//stitches smile
			noFill();
			strokeWeight(7);
			line((-1)*horizontalDivision, 5*verticalDivision/2, horizontalDivision, 5*verticalDivision/2);
			line((-1)*horizontalDivision, 5*verticalDivision/2 - 5, (-1)*horizontalDivision, 5*verticalDivision/2 + 5);
			line(horizontalDivision, 5*verticalDivision/2 - 5, horizontalDivision, 5*verticalDivision/2 + 5);
			line(horizontalDivision, 5*verticalDivision/2 - 5, horizontalDivision, 5*verticalDivision/2 + 5);
			line(0, 5*verticalDivision/2 - 5, 0, 5*verticalDivision/2 + 5);
			line(horizontalDivision/2, 5*verticalDivision/2 - 5, horizontalDivision/2, 5*verticalDivision/2 + 5);
			line((-1)*horizontalDivision/2, 5*verticalDivision/2 - 5, (-1)*horizontalDivision/2, 5*verticalDivision/2 + 5);
		} else if (mouthChoice == 3) {
			//shocked mouth
			circle(0, 5*verticalDivision/2 + 10, horizontalDivision);
		}
	pop();
}

/*
 * Draws the stem on each pumpkin.
 * Randomly chooses between a green stem with a leaf or a brown, twisted stem.
 * Requires the same x, y, scal, and rot values as those inputted into the pumpkinBodyShape(), linesOnPumpkin(), and face() functions. 
 */
function stem(x, y, scal, rot) {
	//stem
	push();
		translate(x, y); 
		scale(scal);
		if (rot!= null) {
			rotate(rot);
		} else {
			rotate(0);
		}

		let stemSelection = [1, 2];
		let stemChoice = random(stemSelection);
		if (stemChoice == 1){ //green pumpkin stem
			noFill();
			strokeWeight(10);
			stroke(darkGreenColor);
			//leaf stem
			curve(20, 240, 0, 10, 80, 0, 100, 100);
			curve(-150, -50, 80, 0, 120, 100, 0, 100);
			curve(300, -100, 120, 100, 150, 200, 170, 250);
			//leaf
			fill(darkGreenColor);
			arc(175, 190, 50, 25, 6*PI/7, 13*PI/7);
			arc(135, 210, 50, 25, 6*PI/7, 13*PI/7);
			strokeWeight(1);
			beginShape()
				curveVertex(0,0);
				curveVertex(175, 270);
				curveVertex(110, 220);
				curveVertex(198, 179);
				curveVertex(100, 500);
			endShape();
			//pumpkin stem
			stroke(0);
			strokeWeight(1);
			ellipse(0, 7.5, 40, 20);
			noStroke()
			quad(-20, 7.5, 20, 7.5, 25, -25, -25, -25);
			stroke(0);
			ellipse(0, -25, 50, 30);
		} else if (stemChoice == 2) { //brown pumpkin stem
			fill(brownColor);
			stroke(0);
			strokeWeight(1);
			ellipse(0, 7.5, 40, 20);

			beginShape();
				curveVertex(100, 307.5);
				curveVertex(20, 7.5);
				curveVertex(-50, -52.5);
				curveVertex(-70, -52.5);
				curveVertex(-20, 7.5);
				curveVertex(80, 307.5);
			endShape();
		}
	pop();
}

/*
 * Creates the message that reads "Happy October! Refresh the Page to Generate a Slightly Different Image :)" in a translucent green box at the top of the full image.
 * Requires an input for the height of this translucent green message box (heightOfMessageBox)
 */
function message(heightOfMessageBox) {
	noStroke();
	rectMode(CENTER)
	fill('rgba(54, 245, 82, 0.83)') //light green
	rect(width/2, heightOfMessageBox/2, 300, heightOfMessageBox);
	textSize(15);
	fill(0);
    textAlign(CENTER);
    textStyle(BOLD);
    text("Happy October! \n\n Refresh the Page to Generate a Slightly Different Image :)", width/2, 50, 250, 72);
}

function drawPumpkinsInDifferentPartsOfScreen(startXcoord, stopXCoord, startYCoord, stopYCoord, numberOfPumpkins) {
	for (let i = 0; i < numberOfPumpkins; i++)
	{
		var xCoord = random(startXcoord, stopXCoord);
		var yCoord = random(startYCoord, stopYCoord);
		var scaleVal = random(0.25, 0.4);

		pumpkinBodyShape(xCoord, yCoord, scaleVal);	
		linesOnPumpkin(xCoord, yCoord, scaleVal);
		face(xCoord, yCoord, scaleVal);
		stem(xCoord, yCoord, scaleVal);
	}	
}

function draw() {
	background(purpleBackgroundColor);

	//12 pumpkins in top left of image
	drawPumpkinsInDifferentPartsOfScreen(0, width/2, 0, height/2, 12);
	//12 pumpkins in top right of image
	drawPumpkinsInDifferentPartsOfScreen(width/2, width, 0, height/2, 12);
	//12 pumpkins in bottom left of image
	drawPumpkinsInDifferentPartsOfScreen(0, width/2, height/2, height, 12);
	//12 pumpkins in bottom right of image
	drawPumpkinsInDifferentPartsOfScreen(width/2, width, height/2, height, 12);

	message(100);
}