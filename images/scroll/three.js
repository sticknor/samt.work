var scroll;
var lastScroll;

var leftLedge, rightLedge;


$(document).ready(function(){  
    window.scrollTo(0,1000);   
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

function windowResized() {
  ledges = [];
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function preload(){
  leftLedge = loadImage("three/leftLedge.png");
  rightLedge = loadImage("three/rightLedge.png");
}

var ledges = [];
var yShift;

function setup(){
  $("#loading").css("display", "none");
  $("#navigation").css("display", "block");
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  reset();
}

function reset(){
  var w = map(windowWidth, 0, 2000, 200, 500);
  for (var i=0; i<5; i++){
    var newLedge = new LedgePair ((-2*w)+(i*1.5*w));
    ledges.push(newLedge);
  }
  yShift = map(windowWidth, 432, 1523, 100, 150);

}


function draw() {
  clear();
  for (var i=0; i<ledges.length; i++){
    ledges[i].drawSelf();
  }
  drawWave();
}


function scrollingUp(){
  if (document.body.scrollTop == 0){
    document.body.scrollTop = 97000;
  }
  for (var i=0; i<ledges.length; i++){
    ledges[i].advanceSelfUp();
  }
  yShift += 10;
}

function scrollingDown(){
  if (document.body.scrollTop > 97500){
    document.body.scrollTop = 2;
  }
  for (var i=0; i<ledges.length; i++){
    ledges[i].advanceSelfDown();
  }
  yShift -= 10;
}

function LedgePair(y){
  this.y = y;
  this.x = 0;

  this.drawSelf = function(){
    var w = map(windowWidth, 0, 2000, 200, 500);
    var xShift = (windowWidth-(w+.75*w))/2;
    image(leftLedge, this.x+xShift, this.y, w, w);
    image(rightLedge, this.x+(w*.75)+xShift, this.y+(.75*w), w, w);
  }

  this.advanceSelfDown = function(){
    this.y+=10;
    var w = map(windowWidth, 0, 2000, 200, 500);
    if (this.y > (-2*w)+(7.5*w)){
      this.y = (-2*w);
    }
  }

  this.advanceSelfUp = function(){
    this.y-=10;
    var w = map(windowWidth, 0, 2000, 200, 500);
    if (this.y < (-2*w)){
      this.y = (-2*w)+(7.5*w);
    }
  }

}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


var s1 = 30;
var s3 = 30;

function drawWave(){
  if (lastScroll+150 < Math.floor(Date.now()) && 
      s1 < 30){
      s1=s1+2;
      s3=s3+2;
  }
  else if (lastScroll+150 > Math.floor(Date.now()) && 
      s1 > 3){
      s1 = s1/2;
      s3 = s3/2;
  }
  
  var w = map(windowWidth, 0, 2000, 200, 500);
  var wl = 4.15/w;

  for (var y=height/3; y<height/3+30; y++){
    strokeWeight(map(y, height/3, height/3+30, s1, 30));
    var prevX = w/2*Math.sin(wl*(y-1+yShift))+width/2;
    var x = w/2*Math.sin(wl*(y+yShift))+width/2;
    stroke(255, 255, map(y, height/3, height-height/3, 102, 0));
    line(prevX, y-1, x, y);
  }
  for (var y=height/3+30; y<height-height/3-30; y++){
    strokeWeight(30);
    var prevX = w/2*Math.sin(wl*(y-1+yShift))+width/2;
    var x = w/2*Math.sin(wl*(y+yShift))+width/2;
    stroke(255, 255, map(y, height/3, height-height/3, 102, 0));
    line(prevX, y-1, x, y);
  }
 for (var y=height-height/3-29; y<height-height/3; y++){
    strokeWeight(map(y, height-height/3-29, height-height/3, 30, s3));
    var prevX = w/2*Math.sin(wl*(y-1+yShift))+width/2;
    var x = w/2*Math.sin(wl*(y+yShift))+width/2;
    stroke(255, 255, map(y, height/3, height-height/3, 102, 0));
    line(prevX, y-1, x, y);

  }
}