const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


var tileSize = 25;
var mapSizeH = 24;
var mapSizeW = 24;

const scale = 10;

var LastTime = 0;
var game = 0; // 0 = stop, 1 = run
var bolGameOver = false;

const eatSound = new Audio("sound1.wav");
const gameoverSound = new Audio("sound2.wav");

canvas.width = tileSize * mapSizeW;
canvas.height = tileSize * mapSizeH;

var snake;
var wall = false;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {

    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (!game) {
      gameOver();
      return;
    }


    snake.update();

    if (snake.checkCollision()) {
      game=0;
      bolGameOver = true;

    }

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
    fruit.draw();
    snake.draw();



    ctx.fillStyle = "grey";
    ctx.font = "bold 10pt Orbitron";
    ctx.fillText("Score: " + snake.total,canvas.width-80,20);

  }, 250);
}());

//console.log(ctx);

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow','');
  if (!game && direction !== "Home") snake.setStart();
  snake.changeDirection(direction);
}))


function gameOver() {
  ctx.fillStyle = "white";
  //ctx.font = "bold 20pt Orbitron";
  ctx.font = "60px Orbitron";

  //console.log(ctx.measureText('GAME OVER'));
  if (bolGameOver) {
    var textString = "GAME OVER";
    textWidth = ctx.measureText(textString ).width;
    ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),canvas.height/2);
  }
  //ctx.fillText("GAME OVER",(canvas.width)/6,canvas.height/2);

  ctx.font = "20px Orbitron";
  var textString = "PRESS SPACE TO START";
  textWidth = ctx.measureText(textString ).width;
  // Flash av denna text
  ctx.fillText(textString,(canvas.width/2) - (textWidth / 2),canvas.height/2+40);

  updateWallText();
}

function updateWallText() {
  ctx.font = "16px Orbitron";
  var textString = "HOME key toggles wall collission! Its now ";
  textString+= (wall) ? "OFF" : "ON";
//  textStringx= (wall) ? "" : "Walls will kill you";
  ctx.fillText(textString,5,canvas.height-18);
//ctx.fillText(textString,5,canvas.height-38);
//  ctx.fillText(textStringx,5,canvas.height-18);
}



function gameLoop(t) {
  var diff = Math.floor(t - LastTime);
  LastTime = t;
  //console.log(diff);

  requestAnimationFrame(gameLoop);
}

//gameLoop();

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
