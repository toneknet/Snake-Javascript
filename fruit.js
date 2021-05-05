class Fruit
{
  constructor()
  {
    this.x;
    this.y;
  }

  draw()
  {
    ctx.fillStyle = "#4cafab";
    ctx.fillRect(this.x, this.y, tileSize, tileSize);
  }

  pickLocation()
  {
    this.x = (Math.floor(Math.random() * mapSizeW - 1) + 1) * tileSize;
    this.y = (Math.floor(Math.random() * mapSizeH - 1) + 1) * tileSize;
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
