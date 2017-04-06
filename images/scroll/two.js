var scroll;
var lastScroll;



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
  bottomSlices = [];
  middleSlices = [];
  topSlices = [];
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

var bottomSlices = [];
var middleSlices = [];
var topSlices = [];

var slice0, slice1, slice2, slice3, slice4, slice5, slice6,
slice7, slice8, slice9, slice10, slice11, slice12, slice13;


function preload(){
}

function setup() {
  $("#loading").css("display", "none");
  $("#navigation").css("display", "block");
 
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');

  reset();
    document.body.scrollTop = 600;

}

function reset(){
  // Bottom Slices
 // slice1 = new Slice(17*height/18);
  slice2 = new Slice(15*height/18);
 // slice3 = new Slice(13*height/18);
  slice4 = new Slice(11*height/18);
  
  //bottomSlices.push(slice1);
  bottomSlices.push(slice2);
 // bottomSlices.push(slice3);
  bottomSlices.push(slice4);
  
  // Middle Slices
  slice5 = new Slice(11*height/18);
  slice6 = new Slice(10*height/18);
  slice7 = new Slice(9*height/18);
  slice8 = new Slice(8*height/18);
  
  middleSlices.push(slice5);
  middleSlices.push(slice6);
  middleSlices.push(slice7);
  middleSlices.push(slice8);
  
  // Top Slices
  slice9 = new Slice(6*height/18);
 // slice10 = new Slice(5*height/18);
 // slice11 = new Slice(3*height/18);
  slice12 = new Slice(2*height/18);
  slice13 = new Slice(-2*height/18);
  
  //topSlices.push(slice9);
  topSlices.push(slice9);
 // topSlices.push(slice11);
  topSlices.push(slice12);
  topSlices.push(slice13);
}


function draw() {
  clear();
  drawBottom();  
  drawMiddle();
  drawTop(); 
}


function scrollingUp(){
  if (document.body.scrollTop == 0){
    document.body.scrollTop = 97000;
  }
  for (var i=0; i<bottomSlices.length; i++){
    bottomSlices[i].moveUp();
  }
  for (var i=0; i<topSlices.length; i++){
    topSlices[i].moveUp();
  }
}

function scrollingDown(){
  if (document.body.scrollTop > 97500){
    document.body.scrollTop = 2;
  }
  for (var i=0; i<bottomSlices.length; i++){
    bottomSlices[i].moveDown();
  }
  for (var i=0; i<topSlices.length; i++){
    topSlices[i].moveDown();
  }
}


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}



var Slice = function(y){
 
 this.Y = y;
 
 this.position; 
 
  this.drawSelf = function(indicator){

    var y = this.Y;
    var hue =  this.hue/2;
    this.width = map(width, 0, 2000, 1000, 1500);
    var xShift = (width-this.width)/2;
    
    var r = map(this.Y, 0, height, 217, 217);
    var g = map(this.Y, 0, height, 150, 73);
    var b = map(this.Y, 0, height, 73, 120)

    fill(r, g, b);
    stroke(r, g, b);
    beginShape();
    vertex(xShift+this.width/3, y);
    vertex(xShift+this.width/3, y+(2*height/18));
    vertex(xShift+this.width/2, y+(2*height/9));
    vertex(xShift+this.width/2, y+(2*height/18));
    endShape();

    r = map(this.Y, 0, height, 172, 145);
    g = map(this.Y, 0, height, 111, 15);
    b = map(this.Y, 0, height, 33, 74);
    
    fill(r, g, b);
    stroke(r, g, b);
    beginShape();
    vertex(xShift+2*this.width/3, y);
    vertex(xShift+2*this.width/3, y+(2*height/18));
    vertex(xShift+this.width/2, y+(2*height/9));
    vertex(xShift+this.width/2, y+(2*height/18));
    endShape();

    r = map(this.Y, 0, height, 230, 219);
    g = map(this.Y, 0, height, 106, 27);
    b = map(this.Y, 0, height, 18, 71);
    
    fill(r, g, b);
    if (indicator == "middle"){
      //noStroke();
    }
    else{
      stroke(r, g, b);
    }
    stroke(r,g,b)
    beginShape();
    vertex(xShift+this.width/3, y);
    vertex(xShift+this.width/2, y+(2*height/18));
    vertex(xShift+2*this.width/3, y);
    vertex(xShift+this.width/2, y-(2*height/18));
    endShape();
  }
  
  
  this.moveUp = function(){
    this.Y -= 8;
  }

  this.moveDown = function(){
    this.Y += 8;
  }
}





function drawBottom(){
  var toRemove = -1;
  var newY;
  for (var i=0; i < bottomSlices.length; i++){
    var thisSlice = bottomSlices[i];
    var hue = map(thisSlice.Y, height, height/2, 240, 70);   
    thisSlice.hue = hue;
    thisSlice.drawSelf();
    if (thisSlice.Y < 11*height/18){
      toRemove = i;
      newY = 19*height/18;
    }
    else if (thisSlice.Y > 19*height/18){
      toRemove = i;
      newY = 11*height/18;      
    }
  }
  if (toRemove != -1){
    if (newY == 19*height/18){
      var newSlice = new Slice(newY);
      var temp = [];
      temp.push(newSlice);
      for (var i = 0; i < bottomSlices.length; i++){
        if (i != toRemove){
          temp.push(bottomSlices[i]);
        }
      }
      bottomSlices = temp;
    }
    else{
      var newSlice = new Slice(newY);
      var temp = [];
      for (var i = 0; i < bottomSlices.length; i++){
        if (i != toRemove){
          temp.push(bottomSlices[i]);
        }
      }
      temp.push(newSlice);
      bottomSlices = temp;      
    }
  }
}

function drawMiddle(){
  thisWidth = map(width, 0, 2000, 700, 1000);
  xShift = (width-thisWidth)/2;

  for (var i=0; i < middleSlices.length; i++){
    var thisSlice = middleSlices[i];
    thisSlice.hue = 110;
    thisSlice.drawSelf("middle");
  }

    var r = map(8*height/18, 0, height, 217, 217);
    var g = map(8*height/18, 0, height, 150, 73);
    var b = map(8*height/18, 0, height, 73, 120);
}

function drawTop(){
  var toRemove = -1;
  var newY;
  for (var i=0; i < topSlices.length; i++){
    var thisSlice = topSlices[i];
    var hue = map(thisSlice.Y, 0, height/2, 30, 120);
    thisSlice.hue = hue;
    thisSlice.drawSelf();
    if (thisSlice.Y < -(4*height/18)){
      toRemove = i;
      newY = 8*height/18
    }
    if (thisSlice.Y > 8*height/18){
      toRemove = i;
      newY = -(4*height/18)
    }
  }
  if (toRemove != -1){
    if (newY == -(4*height/18)){
      var newSlice = new Slice(newY);
      var temp = [];
      for (var i = 0; i < topSlices.length; i++){
        if (i != toRemove){
          temp.push(topSlices[i]);
        }
      }
      temp.push(newSlice);
      topSlices = temp;
    } else{
      var newSlice = new Slice(newY);
      var temp = [];
      temp.push(newSlice);
      for (var i = 0; i < topSlices.length; i++){
        if (i != toRemove){
          temp.push(topSlices[i]);
        }
      }
      topSlices = temp;
    }
  }
}



