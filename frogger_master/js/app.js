// Enemies player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/luigi.png';
    this.x = x;
    this.y = y;
    this.width = 2500;
    this.height = 100;
    this.tickCount = 0
    this.numberOfFrames = 25.6;
    this.ticksPerFrame = 10;
    this.frameIndex = 0
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 100*dt;
    this.x = this.x > 800 ? -100 : this.x;

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
        var death = document.createElement("audio");
        death.src = "soundfx/nooo.wav";
        death.volume = .2;
        death.play();
        setTimeout(function(){location.reload()}, 500);
    };
};

Enemy.prototype.render = function () {

		  // Clear the canvas
		  ctx.clearRect(0, 0, this.width, this.height);

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

var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.radius = 10;
};

Player.prototype.update = function(dt){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
        var achievement = document.createElement("audio");
        achievement.src = "soundfx/achievement.wav";
        achievement.volume = .5;
        achievement.play();
        $(".score").html("Score: " + score);
    };
};

var allEnemies = [new Enemy(0, 63), new Enemy(200, 146), new Enemy(400, 229)];
var player = new Player(100, 400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var score = 0;
$('.score').append(score);

var ambiance = document.createElement("audio");
    ambiance.src = "soundfx/pixelland.mp3";
    ambiance.play();
