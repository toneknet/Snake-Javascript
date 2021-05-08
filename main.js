const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


var tileSize = 15; // 25
var mapSize = 50; // 24

const scale = 10;

var LastTime = 0;
var game = 0; // 0 = stop, 1 = run
var bolGameOver = false;

var gameSpeed = 200;
var highscore = 5;
var newhighscore = false;

var frameSpeed = 0;
var showAnyKey = true;

const eatSound = new Audio("sound1.wav");
const gameoverSound = new Audio("sound2.wav");

canvas.width = tileSize * mapSize;
canvas.height = tileSize * mapSize;

var snake;
var wall = true;

var mode=0;
var gamesizeOptions = [];
gamesizeOptions.push({
  tileSize: 25,
  mapSize: 24
});
gamesizeOptions.push({
  tileSize: 15,
  mapSize: 50
});

function setupGame() {
  snake = new Snake();
  fruit = new Fruit();
  changeSize();
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
  ctx.strokeStyle = 'white';
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
  var allowedKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','F1','F2', ' '];
  for (var i = 0; i < allowedKeys.length; i++) {
    evt.preventDefault();
  }
  const direction = evt.key.replace('Arrow','');
  if (!game && (direction !== evt.key || evt.key === " ") ) snake.setStart();
  snake.changeDirection(direction);
}))


function changeSize() {
  tileSize = gamesizeOptions[mode].tileSize;
  mapSize = gamesizeOptions[mode].mapSize;
  canvas.width = tileSize * mapSize;
  canvas.height = tileSize * mapSize;
}



function gameOver() {
  var halfScreen = canvas.height/2;
  // Game Over
  ctx.fillStyle = "white";
  ctx.font = "60px Orbitron";
  if (bolGameOver) {
    drawTextCentered("GAME OVER",halfScreen);
  }
  // Press any key to continue
  ctx.fillStyle = "white";
  if (Math.floor(frameSpeed % 1.5)) {
    showAnyKey = (showAnyKey) ? false : true;
  }
  if (showAnyKey) {
    ctx.font = "20px Orbitron";
    drawTextCentered("PRESS ANY ARROW KEY TO START", halfScreen + 40);
  }

  // Options
  ctx.font = "20px Orbitron";
  ctx.fillStyle = "white";
  drawTextCentered("OPTIONS",halfScreen + (halfScreen / 2)-30);

  // Wall settings
  ctx.font = "16px Orbitron";
  ctx.fillStyle = "white";
  var textString = "F1 key toggles wall collission!";
  drawTextCentered(textString,halfScreen + (halfScreen / 2));
  ctx.fillStyle = "red";
  textString= (wall) ? "ON" : "OFF";
  drawTextCentered(textString,halfScreen + (halfScreen / 2+20));

  // Wall settings
  ctx.font = "16px Orbitron";
  ctx.fillStyle = "white";
  var textString = "F2 toggle map size (tilesize, mapsize)";
  drawTextCentered(textString,halfScreen + (halfScreen / 2)+40);
  ctx.fillStyle = "red";
  textString= (mode) ? "Big" : "Standard" ;
  drawTextCentered(textString,halfScreen + (halfScreen / 2)+60);

  if (wall) drawWall();


  // Get changeable color
  ctx.fillStyle = hsl; //bgcolor();
  // Highscore
  if (highscore > 0) {
    //ctx.fillStyle = "#39ff14";
    ctx.font = "16px Orbitron";
    var textString = "HIGHSCORE: " + highscore;
    if (newhighscore) {
      var textString = "NEW " + textString;
    }
    drawTextCentered(textString, halfScreen - (halfScreen / 2));
  }
  // Title
  ctx.font = "60px Orbitron";
  drawTextCentered("SNAKE",50);
  ctx.font = "16px Orbitron";
  drawTextCentered("BY MrSlade",70);
  // credits
  ctx.font = "12px Orbitron";
  //ctx.fillStyle = "#fe019a";
  drawTextCentered("coded and flavoured by MrSlade with help from tutorials and guides and some thinking", canvas.height-10);
}

function drawTextCentered(textString, textHeight) {
  textWidth = ctx.measureText(textString ).width;
  ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),textHeight);
}
