const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


var tileSize = 25; // 25
var mapSizeH = 24; // 24
var mapSizeW = 24; // 24

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
  //drawDebug();
  setTimeout(drawGame, gameSpeed);
}

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow','');
  if (!game && direction !== "Home") snake.setStart();
  snake.changeDirection(direction);
}))


function gameOver() {
  var halfScreen = canvas.height/2;

  if (highscore > 0) {
    ctx.fillStyle = "#39ff14";
    ctx.font = "16px Orbitron";

    var textString = "HIGHSCORE: " + highscore;
    if (newhighscore) {
      var textString = "NEW " + textString;
    }
    drawTextCentered(textString, halfScreen - (halfScreen / 2));
  }
  ctx.fillStyle = "white";
  ctx.font = "60px Orbitron";
  if (bolGameOver) {
    drawTextCentered("GAME OVER",halfScreen);
  }

  drawTextCentered("SNAKE",50);

  ctx.font = "16px Orbitron";
  drawTextCentered("BY MrSlade",70);



  if (Math.floor(frameSpeed % 1.5)) {
    showAnyKey = (showAnyKey) ? false : true;
  }
  if (showAnyKey) {
    ctx.font = "20px Orbitron";
    drawTextCentered("PRESS ANY KEY TO START", halfScreen + 40);
  }

  // Wall settings
  ctx.font = "16px Orbitron";
  var textString = "HOME key toggles wall collission! Its now ";
  textString+= (wall) ? "ON" : "OFF";
  drawTextCentered(textString,halfScreen + (halfScreen / 2));

  // credits
  ctx.font = "12px Orbitron";
  ctx.fillStyle = "#fe019a";

  drawTextCentered("coded and flavoured by MrSlade with help from tutorials and guides and some thinking", canvas.height-10);

}

function drawTextCentered(textString, textHeight) {
  textWidth = ctx.measureText(textString ).width;
  ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),textHeight);
}
