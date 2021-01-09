//for the bird function
let bird_x_coord = 1545/7;
let bird_y_coord = 1814/7;
let bird_rotate_val;
let bird_scale_val = 1.8; //should equal 1 for original image

function setup() {
	createCanvas(400, 400);
  bird_rotate_val = PI;
}

function bird(x_coord, y_coord, rotate_val, scale_val)
{
    translate(x_coord, y_coord); //center of bird location
    rotate(rotate_val);
    scale(scale_val);
    noStroke();
    fill(56, 124, 121); //blue-green color
    circle(-10, 11, 15); //head
    ellipse(0, -4, 30, 25); //body
    quad(27, 11, 12, -9, 8, -4, 19, 14); //tail
    //beak
    triangle(-16, 16, -18, 24, -12, 16);
    triangle(-16, 15, -22, 15, -16, 11);
    stroke(56, 124, 121); //stroke blue-green color
    strokeWeight(1);
    //legs and feet
    line(0, -6, 10, -19);
    line(10, -19, 2, -24);
    line(-2, -24, 5, -24);
    line(0, -6, -6, -20);
    line(-5, -20, -10, -20);
}

function draw() {
	noStroke();
	background(128);

	/*backdrop*/
	fill(228, 206, 155); //beige color
	rect(0, 0, width, height);

	/*the face*/
	push();
		translate(width / 2, 180); //face center location
		fill(228, 125, 114); //peach color
		circle(0, 0, (0.5)*width); //face circle
		fill(228, 206, 155); //beige color
		circle(50, 0, 60); //eyeball circle
		fill(110, 144, 106); //green color
		circle(50, -8.5, 20); //iris circle
	pop();

	/*all of camera except bird*/
	push();
		translate((13/28) * width, (9/14) * height); //camera center location

		/*creates rectangular, yellow camera shape*/
		fill(236, 190, 69); //yellow color
		rectMode(CENTER);
		rect (0, 0, 1800 / 7, 1200 / 7, 20);

		//creates blue-green button and blue-green line next to button
		stroke('rgba(56, 124, 121, 0.75)'); //semi-transparent blue-green color
		strokeWeight(5);
		curve(-30, -100, -40, -86, -20, -86, -30, -100); //camera button
		strokeWeight(7);
		line(-10, -88, 21, -88); //line next to camera button

		noStroke();
		fill(228, 206, 155); //beige color
		//camera lens
		circle(35, 2, 100);
		//camera viewfinder
		rect(75, -72, 23, 12);
		//little circle just under and to the right of viewfinder
		circle(95, -50, 9);
		//beige dot inside tiny beige-lined circle underneath camera lens
		circle(67, 48, 5); 

		//creates tiny beige-lined circle underneath camera lens
		noFill();
		stroke(228, 206, 155); //beige color
		strokeWeight(2);
		circle(67, 48, 15);

		//lines on left side of camera
		strokeWeight(3);
		line(-100, -30, -40, -30);
		line(-100, -17.2, -40, -17.2);
		line(-100, -4.4, -40, -4.4);
		line(-100, 8.4, -40, 8.4);
		line(-100, 21.2, -40, 21.2);
		line(-100, 34, -40, 34);

		//white circle
		fill(255, 255, 255);
		noStroke();
		circle(109, 69, 16.5);

		//red line inside white circle
		strokeWeight(2);
		stroke(223, 15, 44);
		line(109, 65, 109, 73);
	pop();
		
	/*left hand*/
	push();
		translate((1/7) * width - 5, (3/7) * height + 30); //center of left hand location
		stroke('rgba(223, 15, 44, 0.75)'); //semi-transparent red color
		noFill();

		//curves that form the left hand
		curve(0, 0, 0, 75, 0, 137, -30, 100);
		curve(100, 150, 0, 137, -25, 75, -30, 50);
		curve(100, 100, -25, 75, 0, -70, 80, 30);
		curve(-30, 10, 0, -70, 100, -60, 120, 40);
		curve(-50, -200, 100, -60, 85, -45, 0, -210);
		curve(150, 80, 85, -45, 15, -45, -30, 0);
		curve(80, -80, 15, -45, 15, -30, 40, -20);
		curve(0, -30, 15, -30, 60, -25, 75, 0);
		curve(0, -30, 60, -25, 105, 22, 110, 80);
		curve(80, -10, 105, 22, 105, 42, 50, 40);
		curve(150, 0, 105, 42, 50, 0, 0, 0);
		curve(75, 50, 50, 0, 10, -5, 0, 10);
		curve(50, 0, 10, -5, 10, 10, 40, 0);
		curve(0, 0, 10, 10, 60, 35, 100, 50);
		curve(0, 20, 60, 35, 95, 75, 75, 100);
		curve(50, 0, 95, 75, 75, 80, 0, -10);
		curve(110, 110, 75, 80, 0, 35, -5, 110);
		curve(75, 0, 0, 35, 10, 60, 50, 70);
		curve(-20, 50, 10, 60, 50, 80, 50, 90); //
		curve(0, 50, 50, 80, 60, 100, 25, 110);
		curve(40, 60, 60, 100, 40, 103, 25, 75);
		curve(75, 150, 40, 103, 0, 75, -30, 50); 
	pop();

	/*right hand*/
	push();
		translate(340, 280); //center of right hand location

		stroke('rgba(223, 15, 44, 0.75)'); //semi-transparent red color
		noFill();

		//curves that form the right hand
		curve(30, 200, 20, 125, 35, 0, -20, -60);
		curve(-60, -30, -40, -110, 35, 0, 0, 25); //
		curve(50, -100, -40, -110, -40, -80, 20, -50);
		curve(100, -140, -40, -80, -20, -35, 40, 0);
		curve(-30, -60, -20, -35, -15, -15, -20, 45);
		curve(40, 10, -15, -15, -60, -40, -100, 50);
		curve(0, -50, -60, -40, -20, 30, -40, 100);
		curve(50, 0, -20, 30, -50, 120, -60, 200);
	pop();	

	/*hat*/
	push();
		translate(230, 100); //center of hat location
		fill('rgba(56, 124, 121, 0.75)'); //semi-transparent blue-green color

		//creation of hat shape
		beginShape();
			curveVertex(80, -100);
			curveVertex(60, 30);
			curveVertex(-80, -8);
			curveVertex(-82, -32);
			curveVertex(15, -30);
			curveVertex(35, -15); 
			curveVertex(80, 20);
			curveVertex(0, 10);
		endShape();
	pop();

	/*alterable bird!*/
	bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val);
}