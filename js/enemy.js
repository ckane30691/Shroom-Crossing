var Enemy = function(x, y, options) {
    this.x = x;
    this.y = y;
    this.tickCount = 5
    this.ticksPerFrame = 4;
    this.frameIndex = 0
		this.boss = options.boss
    this.reverse = options.reverse || false
		this.height = this.boss ? 160 : options.height || 130;
    this.numberOfFrames = options.numberOfFrames || 4;
		this.width = this.boss ? 590 : options.width || 510;
		this.sprite = this.boss ? 'images/boss.png' : options.sprite || 'images/luigi.png';
		this.vel = this.boss ? 500 : options.vel || Math.random() * (400 - 100) + 100
    this.radius = options.radius || 20;
};

const yAxisSpawnPoints = [60, 146, 229, 312]
const reverseAxisSpawnPoints = [40, 120, 200, 280]

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.reverse == false) {
    this.x -= this.vel*dt;
  } else {
    this.x += this.vel*dt;
    this.y = this.x > 880 ?
			reverseAxisSpawnPoints[Math.floor(Math.random() * reverseAxisSpawnPoints.length)]
			: this.y;
		this.vel = this.x > 880 ? this.vel < 650 ? this.vel += 10 : this.vel : this.vel
		// console.log(this.vel);
    this.x = this.x > 880 ? -90 : this.x;
  }
	if (this.boss) {
		this.x = this.x < Math.floor(Math.random() * (-9000 - -3000) + -3000) ? 800 : this.x;
    this.vel = this.x < -5000 ? this.vel + 10 : this.vel
	} else {
		this.y = this.x < -90 ?
			yAxisSpawnPoints[Math.floor(Math.random() * yAxisSpawnPoints.length)]
			: this.y;
		this.vel = this.x < -90 ? this.vel < 650 ? this.vel += 10 : this.vel : this.vel
		// console.log(this.vel);
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

    var dx = (this.x + this.radius) - (player.x + player.radius);
    var dy = (this.y + 20 + this.radius) - (player.y + player.radius);
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + player.radius) {
        this.vel = 0
        player.canMove = false;
        // console.log(this.sprite);
        this.sprite = this.sprite == 'images/robot.png' || this.sprite == 'images/robot_attack.png' ? 'images/robot_attack.png' : 'images/hit.png'
        this.sprite = this.boss ? 'images/boss_hit.png' : this.sprite
        player.sprite = 'images/death.png'
        var death = document.getElementsByClassName("death")[0];
        death.play();
        player.isDead = true;
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
      } else if (this.sprite != 'images/hit.png' && this.sprite != 'images/robot_attack.png') {
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
