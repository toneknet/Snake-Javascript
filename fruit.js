function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() * mapSizeW - 1) + 1) * tileSize;
    this.y = (Math.floor(Math.random() * mapSizeH - 1) + 1) * tileSize;
  }

  this.draw = function() {
    ctx.fillStyle = "#4cafab";
    ctx.fillRect(this.x, this.y, tileSize, tileSize);
  }
}
