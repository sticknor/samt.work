
var ballX;
var ballY;
var ballRate = 2;
var scroll;
var lastScroll;

var ledges = [];

$(document).ready(function(){     
    $(window).scroll(function(){
      var newScroll = $(window).scrollTop();
      if (newScroll < scroll){
      	scrollingUp();
      }
      else{
      	scrollingDown();
      }
      scroll = newScroll;
      lastScroll = Math.floor(Date.now())
    }); 
});


function setup() {
  createCanvas(windowWidth, windowHeight);

  ballX = windowWidth/2;
  ballY = windowHeight/2;

  for (var i=0; i<3; i++){
    var newLedge;
    if (i%2 == 0){
      newLedge = new LeftLedge(i*windowWidth/3, 500, 200);
    }
    else{
      newLedge = new RightLedge(i*windowWidth/3, 500, 200);
    } 
    ledges.push(newLedge);
    newLedge.drawSelf();
  }

console.log(ledges[0])
}

function draw() {
  // clear canvas
  fill(255);
  background("#fff");
  // draw background here
  // draw ball
  if (ballRate > 0 && lastScroll+500 < Math.floor(Date.now())){
  	ballRate--;
  }
  // drawForeground here
  for (var i=0; i<ledges.length; i++){
    ledges[i].drawSelf();
  }
  drawBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = windowWidth/2;
  ballY = windowHeight/2;
}

function scrollingUp(){
	ballX = ballX-ballRate
	ballRate++;
  for (var i=0; i<ledges.length; i++){
    ledges[i].advanceSelfUp();
  }
}

function scrollingDown(){
	ballX= ballX+ballRate;
	ballRate++;
  for (var i=0; i<ledges.length; i++){
    ledges[i].advanceSelfDown();
  }
}

function drawBall(){
  ellipse(ballX, ballY, windowWidth/8, windowWidth/8);
}

function LeftLedge(yShift, length, tilt){
  this.yShift = yShift;
  this.tilt = tilt;

  this.drawSelf = function(){
    xShift = -5*windowWidth/20;
    length = 16*windowWidth/20;
    fill(60,60,60);
    stroke(60, 60, 60);
    beginShape();
    vertex(windowWidth/10+length+xShift, tilt+this.yShift);
    vertex(windowWidth/10+length+xShift, windowWidth/10+tilt+this.yShift);
    vertex(length+xShift, windowWidth/5+tilt+this.yShift);
    vertex(length+xShift, windowWidth/10+tilt+this.yShift);
    vertex(windowWidth/10+length+xShift, tilt+this.yShift);
    endShape();

    fill(40, 40, 40);
    stroke(40, 40, 40);
    beginShape();
    vertex(windowWidth/5+xShift, this.yShift);
    vertex(windowWidth/10+length+xShift, tilt+this.yShift);
    vertex(length+xShift, windowWidth/10+tilt+this.yShift);
    vertex(xShift, windowWidth/15+this.yShift);
    vertex(windowWidth/5+xShift, this.yShift);  
    endShape();

    fill(20, 20, 20);
    stroke(20, 20, 20);
    beginShape();
    vertex(length+xShift, windowWidth/5+tilt+this.yShift);
    vertex(xShift, windowWidth/6+this.yShift);
    vertex(xShift, windowWidth/15+this.yShift);
    vertex(length+xShift, windowWidth/10+tilt+this.yShift);
    vertex(length+xShift, windowWidth/5+tilt+this.yShift);
    endShape();    
  }

  this.advanceSelfUp = function(){
    this.yShift-=10;
    if (this.yShift < -100){
      this.yShift = windowHeight+100
    }
  }

  this.advanceSelfDown = function(){
    this.yShift+=10;
    if (this.yShift > windowHeight+100){
      this.yShift = -100
    }
  }

}

function RightLedge(yShift, length, tilt){
  this.yShift = yShift;
  this.length = length;
  this.tilt = tilt;

  this.drawSelf = function(){
    xShift = 8*windowWidth/20;
    length = 16*windowWidth/20;
    fill(60,60,60);
    stroke(60, 60, 60);
    beginShape();
    vertex(xShift, tilt+this.yShift);
    vertex(xShift, windowWidth/10+tilt+this.yShift);
    vertex(windowWidth/10+xShift, windowWidth/5+tilt+this.yShift);
    vertex(windowWidth/10+xShift, windowWidth/10+tilt+this.yShift);
    endShape();

    fill(40, 40, 40);
    stroke(40, 40, 40);
    beginShape();
    vertex(length-windowWidth/5+xShift, this.yShift);
    vertex(xShift, tilt+this.yShift);
    vertex(windowWidth/10+xShift, windowWidth/10+tilt+this.yShift);
    vertex(length+xShift, windowWidth/15+this.yShift);
    endShape();

    fill(20, 20, 20);
    stroke(20, 20, 20);
    beginShape();
    vertex(windowWidth/10+xShift, windowWidth/5+tilt+this.yShift);
    vertex(xShift+length, windowWidth/6+this.yShift);
    vertex(xShift+length, windowWidth/15+this.yShift);
    vertex(windowWidth/10+xShift, windowWidth/10+tilt+this.yShift);
    endShape();    
  }

  this.advanceSelfUp = function(){
    this.yShift-=10;
    if (this.yShift < -100){
      console.log("problem here")
      this.yShift = windowHeight+100
    }
  }

  this.advanceSelfDown = function(){
    this.yShift+=10;
    if (this.yShift > windowHeight+100){
      this.yShift = -100
    }
  }

}