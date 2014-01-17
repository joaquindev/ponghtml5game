//RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return window.requestAnimatoinFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
      return window.setTimeout(callback, 1000/60);
    }
})();

//cancelRequestAnimFrame: a browser API for cancelling a frame request
window.cancelRequestAnimFrame = (function(){
  return window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mazCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
})();

//Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"), //create canvas context
  W = window.innerWidth, //window's width
  H = window.innerHeight, //window's height
  particles = [], //array containing particles
  ball = {}, //ball object
  paddles = [2], //array containing two paddles
  mouse = {}, //mouse object to store it's current position
  points = 0, //variable to store points
  fps = 60, //Max FPS (frames per seconds)
  particlesCount = 20, //numer of sparks when ball strikes the paddle
  flag = 0, //flag variable which is changed on collision
  particlePos = {}, //object to contain the position of collision
  multiplayer = 1, //variable to control the direction of sparks
  startBtn = {}, //start button object
  restartBtn = {}, //restart button object
  over = 0, //flag variable, changed when the game is over
  init, //variable to initialize the animation
  paddleHit;

//Add mousemove and mousedown events to the canvas
canvas.addEventListener("mousemove", trackPosition, true);
canvas.addEventListener("mousedown", btnClick, true);

function trackPosition(e){
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

function btnClick(e){
 //TODO 
}

//Initialise the collision sound
//collision = document.getElementById("collide");

//Set the canva's height and width to full screen
canvas.width = W;
canvas.height = H;

//Function to paint canvas
function paintCanvas(){
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,W,H);
}

//Function for creating paddles
function Paddle(pos){
  this.h = 5; 
  this.w = 150;
  this.x = W/2 - this.w/2;
  this.y = (pos == "top") ? 0 : H - this.h;
}

paddles.push(new Paddle("bottom"));
paddles.push(new Paddle("top"));


//Ball OBJECT
ball = { 
  x: 50, 
  y: 50, 
  r: 5, 
  c: "white", 
  vx: 4, 
  vy: 8, 

  //Function for drawing ball on canvas
  draw: function(){
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    ctx.fill();
  }
};

//Start Button OBJECT
startBtn = {
  w: 100, 
  h: 50, 
  x: W/2 - 50,
  y: H/2 - 25, 

  draw: function(){
    ctx.strokeStyle = "white";
    ctx.lineWidth = "2";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText("Start", W/2, H/2);
  }
};

//Restart Button OBJECT
restartBtn = {
  w: 100, 
  h: 50, 
  x: W/2 - 50, 
  y: H/2 - 50,

  draw: function(){
    ctx.strokeStyle = "white";
    ctx.lineWidth = "2";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.font = "18px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText = ("Restart", W/2, H/2 - 25);
  }
};

//function createParticles(x,y,m){}

function draw(){
  paintCanvas();
  for(var i = 0; i<paddles.length;i++){
    p = paddles[i];
    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, p.w, p.h);
  }
  ball.draw();
  update();
}

//function increaseSpd(){}

function update(){
  updateScore();//update scores
  if(mouse.x && mouse.y){ //move the paddles on mouse move
    for(var i =1;i<paddles.length;i++){
      p = paddles[i];
      p.x = mouse.x - p.w/2;
    }
  }
  ball.x += ball.vx; 
  ball.y += ball.vy; //move ball

  p1 = paddles[1];
  p2 = paddles[2]; //collision with paddles

  //TODO !!!!!!!!
}

//function collides(b,p){}

//function collideAction(ball, p){}

//function emitParticles(){}

function updateScore(){
  ctx.fillStyle = "white";
  ctx.font = "16px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Score: " + points, 20, 20);
}

//function gameOver(){}

function animloop(){
  init = requestAnimFrame(animloop);
  draw();
}

function startScreen(){
  draw();
  startBtn.draw();
}

//function btnClick(e){}



startScreen();