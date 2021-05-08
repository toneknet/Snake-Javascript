class Fruit
{
  constructor()
  {
    this.x;
    this.y;
  }

  draw()
  {
    //ctx.fillStyle = "#4cafab";
    //ctx.fillRect(this.x, this.y, tileSize, tileSize);

    ctx.beginPath();
    ctx.arc(this.x+(tileSize/2), this.y+(tileSize/2), tileSize/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
/*    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
*/

  }

  pickLocation()
  {
    this.x = (Math.floor(Math.random() * mapSize - 1) + 1) * tileSize;
    this.y = (Math.floor(Math.random() * mapSize - 1) + 1) * tileSize;
    // Check if not in tail..
    for (var i=0; i<snake.tail.length; i++) {
      if(this.x === snake.tail[i].x && this.y === snake.tail[i].y) {
        console.log("Fruit in Tail");
        this.pickLocation();
        break;
      }
    }
  }
}
