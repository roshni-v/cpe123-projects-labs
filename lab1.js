function setup() {
	createCanvas(400, 400);
}


function draw() {
	noStroke(); //nothing in the background is lined
	background(128);

	/*backdrop*/

	//sky
	fill('rgba(197, 239, 240, 94)');
	rect(0, 0, 400, 400);

	//ground
	fill('rgba(90, 163, 163, 64)');
	rect(0, 280, 400, 133);

	//clouds
	fill('rgba(255, 255, 255)');
	rect(50, 90, 200, 20);
	rect(235, 120, 70, 20);

	//sun
	fill('rgba(242, 218, 87, 95)');
	circle(400, 0, 230);

	//sunbeams
	strokeWeight(7); 
	stroke('rgba(242, 218, 87, 95)');
	line(290, 30, 0, 80); //left beam
	line(370, 110, 325, 400); //right beam
	line(400, 0, 220, 180); //middle beam

	/*pig!*/

	//set fill color to pink because most of pig is pink and reset stroke so that the pig's body is lined
	fill('rgba(240,70,191, 94)');
	strokeWeight(1);
	stroke('black');

	//body
	quad(95, 230, 285, 230, 265, 320, 115, 320);

	//head
	circle(85, 220, 95);

	//eyes
	arc(62, 215, 20, 15, PI, TWO_PI, OPEN);
	arc(108, 215, 20, 15, PI, TWO_PI, OPEN);

	//snout
	ellipse(85, 233, 50, 20);

	//nostrils
	circle(80, 233, 2);
	circle(90, 233, 2);

	//smile
	arc(88, 244, 30, 20, 0, HALF_PI + ( PI / 4), OPEN);

	//ears
	fill('rgba(163, 33, 126, 64)');
	triangle(60, 168, 70, 202, 35, 195); 
	triangle(105, 168, 97, 202, 131, 188);

	//legs
	triangle(122, 320, 110, 359, 130, 363);
	triangle(155, 320, 155, 363, 175, 359);
	triangle(255, 320, 250, 363, 267, 363);
	triangle(235, 320, 212, 359, 230, 363);

	//tail
	noFill();
	arc(265, 225, 80, 40, 0, QUARTER_PI, OPEN);
	arc(297, 225, 15, 6, (3 * PI / 4), TWO_PI, OPEN);
}