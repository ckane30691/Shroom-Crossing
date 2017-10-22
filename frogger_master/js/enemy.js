var Enemy = function(x, y) {
    this.sprite = 'images/luigi.png';
    this.x = x;
    this.y = y;
    this.width = 350;
    this.height = 130;
    this.tickCount = 5
    this.numberOfFrames = 4;
    this.ticksPerFrame = 4;
    this.frameIndex = 0
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x -= 100*dt;
    this.x = this.x < -90 ? 800 : this.x;

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

    //Collision Detection Algo
    this.radius = 20;
    var dx = (this.x + this.radius) - (player.x + player.radius);
    var dy = (this.y + this.radius) - (player.y + player.radius);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + player.radius) {
        var death = document.getElementsByClassName("death")[0];
        death.play();
        setTimeout(function(){location.reload()}, 500);
    };
};

Enemy.prototype.render = function () {

		  // Clear the canvas
		  // ctx.clearRect(0, 0, this.width, this.height);

		  // Draw the animation
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
		};



// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
