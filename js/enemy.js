var Enemy = function(x, y, options) {
    this.x = x;
    this.y = y;
    this.tickCount = 5
    this.ticksPerFrame = 4;
    this.frameIndex = 0
		this.boss = options.boss
		this.height = this.boss ? 160 : 130;
    this.numberOfFrames = 4;
		this.width = this.boss ? 590 : 510;
		this.sprite = this.boss ? 'images/boss.png' :'images/luigi.png';
		this.vel = this.boss ? 500 : Math.random() * (400 - 100) + 100
};

const yAxisSpawnPoints = [60, 146, 229, 312]

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x -= this.vel*dt;
	if (this.boss) {
		this.x = this.x < Math.floor(Math.random() * (-9000 - -3000) + -3000) ? 800 : this.x;
    this.vel = this.x < -5000 ? this.vel + 10 : this.vel
	} else {
		this.y = this.x < -90 ?
			yAxisSpawnPoints[Math.floor(Math.random() * yAxisSpawnPoints.length)]
			: this.y;
		this.vel = this.x < -90 ? this.vel < 650 ? this.vel += 10 : this.vel : this.vel
		console.log(this.vel);
    this.x = this.x < -90 ? 800 : this.x;
	}
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
        this.vel = 0
        player.canMove = false;
        this.sprite = this.boss ? 'images/boss_hit.png' : 'images/hit.png'
        player.sprite = 'images/death.png'
        var death = document.getElementsByClassName("death")[0];
        death.play();
        setTimeout(function(){location.reload()}, 500);
    };
};

Enemy.prototype.render = function () {

		  // Clear the canvas

		  // Draw the animation
      if (this.sprite === 'images/boss_hit.png') {
        // ctx.clearRect(0, 0, this.width, this.height);
        // this.ticksPerFrame = 3;
        // this.frameIndex = 0;
        // this.tickCount = 4
        this.width = 660
        this.numberOfFrames = 3;
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
      } else if (this.sprite != 'images/hit.png') {
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
      } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      }
		};



// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
