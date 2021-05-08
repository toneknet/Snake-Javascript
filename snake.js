class Snake
{
    constructor()
    {
      this.x = (mapSizeW * tileSize) / 2;
      this.y = (mapSizeH * tileSize) / 2;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.total = 0;
      this.tail = [];
    }

    changeDirection(direction)
    {
      switch (direction) {
        case 'Up' :
          this.xSpeed = 0;
          if (this.ySpeed === 0 || this.tail.length === 0) {
            this.ySpeed = -tileSize * 1;
          }
          break;
        case 'Down' :
          this.xSpeed = 0;
          if (this.ySpeed === 0 || this.tail.length === 0) {
            this.ySpeed = tileSize * 1;
          }
          break;
        case 'Left' :
          if (this.xSpeed === 0 || this.tail.length === 0) {
            this.xSpeed = -tileSize * 1;
          }
          this.ySpeed = 0;
          break;
        case 'Right' :
          if (this.xSpeed === 0 || this.tail.length === 0) {
            this.xSpeed = tileSize * 1;
          }
          this.ySpeed = 0;
          break;
        case 'Home' :
          if (!game) {
            wall = (wall) ? false : true;
          }
          break;
      }
    }

    checkCollision()
    {
      for (var i=0; i<this.tail.length; i++) {
        if(this.x === this.tail[i].x && this.y === this.tail[i].y) {
          this.gameover();
          return true;
        }
      }
    }

    draw()
    {
      var padding=2;
      ctx.fillStyle = "white";
      // Generates tail color here
      var tmp = generateColor('#FFFFFF','#800080',this.tail.length);
      for (let i=0; i<this.tail.length; i++) {
         if (tmp !== undefined) {
          ctx.fillStyle = "#" + tmp[i];
         }
        ctx.fillRect(this.tail[i].x+padding, this.tail[i].y+padding, tileSize-(padding*2), tileSize-(padding*2));
      }
      ctx.fillStyle = "purple";
      ctx.fillRect(this.x, this.y, tileSize, tileSize);
    }

    eat(fruit)
    {
      if(this.x === fruit.x && this.y === fruit.y) {
        this.total++;
        eatSound.play();
        if (gameSpeed > 50) gameSpeed-= 5;
        return true;
      }
      return false;
    }

    gameover()
    {
      gameoverSound.play();
      if (this.total > highscore) {
        highscore = this.total;
        newhighscore = true;
      }

      // Reset all variables
      this.total = 0;
      this.tail = [];
      this.xSpeed = 0;
      this.ySpeed = 0;
      gameSpeed = 250;
      game=0;
      bolGameOver = true;
    }

    setStart()
    {
      console.log("Game Started");
      this.x = (mapSizeW * tileSize) / 2;
      this.y = (mapSizeH * tileSize) / 2;
      game = 1;
      newhighscore = false;
      fruit.pickLocation();
      bolGameOver = false;
    }

    update()
    {
      for (let i=0; i< this.tail.length -1; i++) {
        this.tail[i] = this.tail[i+1];
      }

      this.tail[this.total -1] = {x: this.x, y: this.y};

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (wall ) {
        if (
          this.x >= canvas.width ||
          this.y >= canvas.height ||
          this.x <= 0 ||
          this.y <= 0
        ) {
          this.gameover();
        }
      } else {
        if ( this.x > canvas.width) {
          this.x = 0;
        }

        if ( this.y > canvas.height) {
          this.y = 0;
        }

        if ( this.x < 0) {
          this.x = canvas.width;
        }

        if ( this.y < 0 ) {
          this.y = canvas.width;
        }
      }

    }

}
