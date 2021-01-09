let xT = 9.5;
let yT = 6;
let scal = 0.46;

//for bird function
let bird_x_coord = 1545/7;
let bird_y_coord = 1814/7;
let bird_rotate_val;
let bird_scale_val_x = 1;
let bird_scale_val_y = 1;

//for animating the bird
let multiplier = 1;
let next = false;
let flying = false;
let flying_counter = 0;

function setup() {
  createCanvas(800, 400);
  bird_rotate_val = 0;
}

/**
 * this function creates a bird with its center at (x_coord, y_coord)
 * the bird's rotation value can be set with rotate_val
 * the bird's scale can be set in both the x and y direction with scale_val_x and scale_val_y, respectively
 */
function bird(x_coord, y_coord, rotate_val, scale_val_x, scale_val_y)
{
    push();
      translate(x_coord, y_coord); //center of bird location
      rotate(rotate_val);
      scale(scale_val_x, scale_val_y);
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
    pop();
}

function draw() {
  background(228, 206, 155);
   noStroke();

   /* ALISHA'S SIGN DUDE*/

   //moving sign dude:
  if(xT < 185)
  {
    scal += 0.0025;
    xT += 0.8125;
    yT += 0.25;
  }

  push();
    // PERSON
    push();
      translate(xT, yT);
      scale(scal);
      fill(119, 64, 10); // brown
      push();
        translate(5, 50);
        rotate(-PI / 48);
        rect(0, 0, 90, 180, 50);
      pop();
      quad(80, 200, 123, 280, 123, 309, 30, 200);
      beginShape();
        vertex(40, 200);
        vertex(45, 260);
        vertex(10, 250);
        vertex(10, 275);
        vertex(15, 290);
        vertex(30, 290);
        vertex(24, 285);
        vertex(25, 275);
        vertex(50, 280);
        vertex(55, 275);
        vertex(90, 220);
      endShape();
      quad(25, 190, 0, 210, 25, 240, 50, 230);
      triangle(8, 90, 0, 175, 25, 220);
      triangle(100, 200, 110, 175, 96, 80);

      stroke(119, 64, 10);
      strokeWeight(3);
      noFill();
      push();
        translate(127, 286);
        rotate(PI / 48);
        ellipse(0, 0, 10, 45);
      pop();

      noStroke();
      fill(109, 125, 0); // green
      push();
        translate(47, 42);
        rotate(-PI / 48);
        rect(0, 0, 20, 150);
      pop();


      fill(241, 90, 80); // red
        arc(60, 18, 30, 35, PI / 2, 15 * PI / 12);
        quad(52, 20, 37, 28, 40, 30, 52, 30);
        push();
          translate(63, 25);
          rotate(PI / 4);

          arc(0, 0, 30, 45, PI / 4, PI);
        pop();


      fill(128, 71, 4); // tan
        arc(60, 18, 30, 35, 15 * PI / 12, PI / 2);
        triangle(63, 35, 63, 43, 71, 30);


      fill(241, 90, 80); // red
        push();
          translate(63, 28);
          rotate(PI / 12);
          ellipse(0, 0, 7, 15);
        pop();

    pop();

    // SIGN
    push();
      translate(280, 80);
      fill(124, 180, 197); // blue
      rect(0, -5, 15, 305);
      fill(246, 75, 6); // red
      ellipse(7.5, -35, 70, 70);
      fill(228, 206, 155); // yellow
      rect(-10, -40, 35, 10);
    pop();
  pop();


  /*ROSHNI'S CAMERA DUDE*/

  push();
    translate(400, 0); //moves entire camera dude over horizontally by 400

    /*the face*/
    push();
      translate(200, 180); //face center location
      fill(228, 125, 114); //peach color
      circle(0, 0, (0.5)*400); //face circle
      fill(228, 206, 155); //beige color
      circle(50, 0, 60); //eyeball circle
      fill(110, 144, 106); //green color
      circle(50, -8.5, 20); //iris circle
    pop();

    /*all of camera except bird*/
    push();
      translate((13/28) * 400, (9/14) * 400); //camera center location

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
      translate((1/7) * 400 - 5, (3/7) * 400 + 30); //center of left hand location
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
      curve(-20, 50, 10, 60, 50, 80, 50, 90); 
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


    //moving bird:

    if (xT < 185){ //before Alisha's sign dude is done moving
    	bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y); //have the bird be stationary
    //after Alisha's sign dude is done moving, vertically flip the bird in the camera
    } else if(xT == 185 && !next && bird_scale_val_y > -1) {
	  	bird_scale_val_y -= 0.01;
	  	bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y);
    //once the bird is flipped, give the okay (by toggling next) to move onto the next part of the movement sequence
  	} else if (xT == 185 && !next && bird_scale_val_y <= -1) {
      bird_scale_val_y = -1;
  		next = true;
  	} 

    //once the okay is given, scale down the bird
    if(next && bird_scale_val_x > 0.5) {
  		multiplier -= 0.0005;
  		bird_scale_val_y = (-1) * bird_scale_val_x * multiplier;
  		bird_scale_val_x = bird_scale_val_x * multiplier;
  		bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y);
    //after the bird is scaled down, give the okay to start flying (by toggling flying)
  	} else if (next && bird_scale_val_x <= 0.5 && !flying){
  		bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y);
      flying = true;
  	} 

    //once the okay is given, make the bird fly to the man's head
    if(flying && bird_x_coord > -154) {
      flying_counter -= 0.035;
      bird_x_coord = bird_x_coord + flying_counter;
      bird_y_coord = 0.00055 * (bird_x_coord + 185605649/403942) * (bird_x_coord + 185605649/403942) + 1386375306066439/296671162480000; //the goal was for a slightly parabolic flight path, but it still looks pretty linear
      bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y);  
    //once the bird reaches the man's head, have it be stationary
    } else if(flying && bird_x_coord <= -154) {
      bird(bird_x_coord, bird_y_coord, bird_rotate_val, bird_scale_val_x, bird_scale_val_y);
    }

  pop();
}
