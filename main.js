const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


var tileSize = 25;
var mapSizeH = 24;
var mapSizeW = 24;

const scale = 10;

var LastTime = 0;
var game = 0; // 0 = stop, 1 = run
var bolGameOver = false;

var gameSpeed = 250;
var highscore = 5;
var newhighscore = false;

var frameSpeed = 0;
var showAnyKey = true;

const eatSound = new Audio("sound1.wav");
const gameoverSound = new Audio("sound2.wav");

canvas.width = tileSize * mapSizeW;
canvas.height = tileSize * mapSizeH;

var snake;
var wall = true;

function setupGame() {
  snake = new Snake();
  fruit = new Fruit();
  drawGame();
}

/*function startGame() {
  fruit.pickLocation();
  game = 1;


}*/

function drawDebug() {
  ctx.fillStyle = "#ffffff";
  // Draw Speed
  ctx.font = "10px Orbitron";
  ctx.fillText("GameSpeed: " + gameSpeed, 5, 15);

  // draw debug settings
  ctx.font = "10px arial";
  ctx.fillText(
    "snake.tail.length: " + snake.tail.length + " | " +
    "wall: " + wall + " | " +
    "game: " + game + " | "
  , 5, canvas.height-5);
}

function drawWall() {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;

  // top
  ctx.beginPath();
  ctx.moveTo(1, 1);
  ctx.lineTo(canvas.width, 1);
  ctx.stroke();
  // bottom
  ctx.moveTo(1, canvas.height-1);
  ctx.lineTo(canvas.width, canvas.height-1);
  ctx.stroke();
  // left
  ctx.moveTo(1, 1);
  ctx.lineTo(1, canvas.height-1);
  ctx.stroke();
  // right
  ctx.moveTo(canvas.width - 1, 1);
  ctx.lineTo(canvas.width - 1, canvas.height-1);
  ctx.stroke();

}


function drawGame() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  frameSpeed++;
  if (!game) {
    gameOver();
    //return;
  } else {

    snake.update();

    if (snake.checkCollision()) {
      game=0;
      bolGameOver = true;
    }

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
    if (wall) drawWall();
    fruit.draw();
    snake.draw();

    // Drawing score
    ctx.fillStyle = "grey";
    ctx.font = "bold 10pt Orbitron";
    ctx.fillText("Score: " + snake.total,canvas.width-80,20);

  }
  drawDebug();
  setTimeout(drawGame, gameSpeed);
}

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow','');
  if (!game && direction !== "Home") snake.setStart();
  snake.changeDirection(direction);
}))


function gameOver() {

  if (highscore > 0) {
    ctx.fillStyle = "#39ff14";
    ctx.font = "16px Orbitron";

    var textString = "HIGHSCORE: " + highscore;
    if (newhighscore) {
      var textString = "NEW " + textString;
    }
     textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),canvas.height/2-65);
  }
  ctx.fillStyle = "white";

  if (bolGameOver) {
    ctx.font = "60px Orbitron";
    var textString = "GAME OVER";
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),canvas.height/2);
  }
  if (Math.floor(frameSpeed % 1.5)) {
    showAnyKey = (showAnyKey) ? false : true;
  }
  if (showAnyKey) {
    ctx.font = "20px Orbitron";
    var textString = "PRESS ANY KEY TO START";
    textWidth = ctx.measureText(textString ).width;
    // Flash av denna text
    ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),canvas.height/2+40);
  }


  updateWallText();
}

function updateWallText() {
  ctx.font = "16px Orbitron";
  var textString = "HOME key toggles wall collission! Its now ";
  textString+= (wall) ? "ON" : "OFF";
//  textStringx= (wall) ? "" : "Walls will kill you";
  ctx.fillText(textString,5,canvas.height-18);
//ctx.fillText(textString,5,canvas.height-38);
//  ctx.fillText(textStringx,5,canvas.height-18);
}

/*
//var speed = 7;
//var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0, gameTime = 0;
function gameLoop(t) {
  return;
//  var diff = Math.floor(t - LastTime);
//  LastTime = t;
  //console.log(diff);

  var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;
  gameTime+= Math.floor(timeElapsed);

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

//console.log(framesLastSecond);
  setTimeout(gameLoop, 1000 / speed);
  //requestAnimationFrame(gameLoop);
}

//gameLoop();
*/
/*ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
*/
//for (var i = 0; i < mapSizeW; i++) {
/*  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.lineTo(300,100);*/
  //ctx.endPath();
//}


/*

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}


for (var i = 0; i < mapSizeW; i++) {
  var start = i * tileSize + tileSize;
  drawLine(ctx, [1, start], [canvas.width, start], 'green', 1);
  drawLine(ctx, [start, 1], [start, canvas.width], 'green', 1);
//  console.log(start);
}

var pressedKey = [];
window.addEventListener("keydown", event => {
  var keyId = event.keyCode;
  var keyState = true;
  pressedKey[keyId] = keyState;
});


window.addEventListener("keyup", event => {
  var keyId = event.keyCode;
  var keyState = false;
  pressedKey[keyId] = keyState;
});




function gameloop() {




}*/
/*window.addEventListener("keyup", event => {
  pressedKey.push({events.keyCode: false});
});
*/


/*const canvas = document.querySelector('#canvas');
if (canvas.getContext) {
    const ctx = canvas.getContext('2d');*/
//    drawLine(ctx, [1, 100], [100, 300], 'green', 5);
/*}*/



/*function draw() {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();

}
draw();*/
