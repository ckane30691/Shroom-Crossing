var Player = function(x, y){
    this.sprite = 'images/shroom.png';
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.width = 330;
    this.height = 120;
    this.tickCount = 5
    this.numberOfFrames = 3;
    this.ticksPerFrame =7;
    this.frameIndex = 0
};

Player.prototype.update = function(dt){
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {

				this.tickCount = 0;

        // If the current frame index is in range
        if (this.frameIndex < this.numberOfFrames - 1) {
            // Go to the next frame
            this.frameIndex += 1;
        } else {
            this.frameIndex = 0;
        }
      }
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
  ctx.drawImage(
    Resources.get(this.sprite),
    this.frameIndex * this.width / this.numberOfFrames,
    0,
    this.width / this.numberOfFrames,
    this.height,
    this.x,
    this.y,
    this.width / this.numberOfFrames,
    this.height);
}
// Player.prototype.render = function(){
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

Player.prototype.handleInput = function(input){
    if(!input) return;
    var moveToX = {
        'left': -100,
        'right': 100
    };

    var moveToY = {
        'up': -83,
        'down': 83
    };

    this.x += moveToX[input] || 0;
    this.y += moveToY[input] || 0;
    this.win = this.y < 0 ? true : false;
    this.x = this.x < 0 ? 0 : this.x;
    this.y = this.y < 0 ? 400 : this.y;
    this.x = this.x > 700 ? 700 : this.x;
    this.y = this.y > 400 ? 400 : this.y;
    if (this.win === true){
        score+=1;
        var achievement = document.getElementsByClassName('achievement')[0];
        achievement.play();
        $(".score").html("Score: " + score);
    };
};
