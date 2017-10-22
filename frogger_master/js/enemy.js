var Enemy = function(x, y, options) {
    this.x = x;
    this.y = y;
    this.tickCount = 5
    this.numberOfFrames = 4;
    this.ticksPerFrame = 4;
    this.frameIndex = 0
		this.boss = options.boss
		this.height = this.boss ? 160 : 130;
		this.width = this.boss ? 590 : 350;
		this.sprite = this.boss ? 'images/boss.png' :'images/luigi.png';
		this.vel = this.boss ? 500 : Math.random() * (400 - 100) + 100
};

const yAxisSpawnPoints = [60, 146, 229, 312]

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	this.x -= this.vel*dt;
	if (this.boss) {
		this.x = this.x < - 9000 ? 800 : this.x;
	} else {
		this.y = this.x < -90 ?
			yAxisSpawnPoints[Math.floor(Math.random() * yAxisSpawnPoints.length)]
			: this.y;
		this.vel = this.x < -90 ? this.vel < 450 ? this.vel += 10 : this.vel : this.vel
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
