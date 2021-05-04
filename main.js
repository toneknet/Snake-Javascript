const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");


var tileSize = 25;
var mapSizeH = 24;
var mapSizeW = 24;

const scale = 10;


canvas.width = tileSize * mapSizeW;
canvas.height = tileSize * mapSizeH;

var snake;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }

    snake.checkCollision();

    document.querySelector('.score').innerText = snake.total;

  }, 250);
}());


window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow','');
  snake.changeDirection(direction);
}))





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
