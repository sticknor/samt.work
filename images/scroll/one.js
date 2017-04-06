var scroll;
var lastScroll;

var c_1, c_2, c_3, c_4;
var cylinderStates;
var cylinderStateIndex = 0;
var particles= [];
var topParticles;
var bottomParticles;
var maxT = 16.5;
var minT =  2;


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
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){
  c_1 = loadImage("one/cylinder_1.png");
  c_2 = loadImage("one/cylinder_2.png");
  c_3 = loadImage("one/cylinder_3.png");
  c_4 = loadImage("one/cylinder_4.png");
  cylinderStates = [c_1, c_2, c_3, c_4];
}

function setup() {
  $("#loading").css("display", "none");
  $("#navigation").css("display", "block");
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

}


function draw() {
  clear();
  removeParticles();
  splitParticles();
  drawBottomParticles();
  drawCylinder();
  drawTopParticles();
}


function scrollingUp(){
  if (document.body.scrollTop == 0){
    document.body.scrollTop = 97000;
  }
  turnCylinder(1);
  for (var i=0; i<particles.length; i++){
    particles[i].advanceSelfUp();
  }
  var newParticle = new Particle(maxT, getRandom(90, 110), getRandom(290, 310));
  particles.push(newParticle);
  var newParticle = new Particle(maxT, getRandom(90, 110), getRandom(290, 310));
  particles.push(newParticle);
}

function scrollingDown(){
  if (document.body.scrollTop > 97500){
    document.body.scrollTop = 2;
  }
  turnCylinder(-1);
  for (var i=0; i<particles.length; i++){
    particles[i].advanceSelfDown();
  }
  var newParticle = new Particle(minT, getRandom(90, 110), getRandom(290, 310));
  particles.push(newParticle);
  var newParticle = new Particle(minT, getRandom(90, 110), getRandom(290, 310));
  particles.push(newParticle);
}


function drawCylinder(){
  var w = map(width, 0, 2000, 600, 1000);
  var v_margin = (windowWidth-w)/2;
  var h = map(height, 0, 1000, 500, 900);
  var h_margin = (windowHeight-h)/2
  image(cylinderStates[cylinderStateIndex], v_margin, h_margin, w, h);
}

function removeParticles(){
  var newP = particles.filter(function(p){
    return !p.remove;
  });
  particles = newP;
}

function splitParticles(){
  topParticles = particles.filter(function(p){
    return p.inFront;
  });
  bottomParticles = particles.filter(function(p){
    return !p.inFront;
  });
}

function drawTopParticles(){
  for (var i=0; i<topParticles.length; i++){
    topParticles[i].drawSelf();
  }
}


function drawBottomParticles(){
  for (var i=0; i<bottomParticles.length; i++){
    bottomParticles[i].drawSelf();
  }
}

function turnCylinder(direction){ 
  cylinderStateIndex += direction;
  if (cylinderStateIndex < 0){
    cylinderStateIndex = 3;
  }
  else if (cylinderStateIndex > 3){
    cylinderStateIndex = 0;
  }
}

function Particle(t, a, b){
  this.a = a;
  this.b = b;
  this.t = t;



  this.xCoord = this.a-this.b*Math.cos(this.t)+windowWidth/2-100;
  this.yCoord = (this.a*this.t-this.b*Math.sin(this.t))*.5;

  this.remove = false;
  this.inFront = false;

  this.opacity = 0;
  this.Orate = getRandom(10, 15);

  this.newSize = function(){
    var newSize = getRandom(5, 10); 
    return newSize
  }

  this.size = this.newSize();

  this.drawSelf = function(){
    if (lastScroll+150 < Math.floor(Date.now())){
      this.opacity -= this.Orate;
      if (this.opacity < 0){
        this.remove = true;
      } 
    }
    else if (this.opacity < 255){
      this.opacity += this.Orate;
    }
    if (this.inFront){
      stroke(255 - this.yCoord/windowHeight*60, this.opacity);
      fill(255- this.yCoord/windowHeight*60, this.opacity);      
    }
    else{
      stroke(255- this.yCoord/windowHeight*60, this.opacity/2);
      fill(255- this.yCoord/windowHeight*60, this.opacity/2);
    }
    if (!this.remove){
      ellipse(this.xCoord, this.yCoord, this.size, this.size); 
      this.size = this.newSize();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }
  }

  this.advanceSelfDown = function(){
    this.t += getRandom(.05, .1);
    var newX = this.a-this.b*Math.cos(this.t)+width/2-100;
    if (this.xCoord < newX){
      this.inFront = false;
    }
    else{this.inFront = true;}
    this.xCoord = newX;
    this.yCoord = (this.a*this.t-this.b*Math.sin(this.t))*.5;
    if (this.yCoord > windowHeight){
      maxT = this.t;
      this.remove = true;
    }
  }

  this.advanceSelfUp = function(){
    this.t -= getRandom(.05, .1);
    var newX = this.a-this.b*Math.cos(this.t)+width/2-100;
    if (this.xCoord > newX){
      this.inFront = false;
    }
    else{this.inFront = true;}
    this.xCoord = newX;
    this.yCoord = (this.a*this.t-this.b*Math.sin(this.t))*.5;
      if (this.yCoord < 0){
        minT = this.t;
        this.remove = true;
      }
  }

}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}