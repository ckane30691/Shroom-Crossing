// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 100*dt;
    this.x = this.x > 500 ? -100 : this.x;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
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
    this.x = this.x > 400 ? 400 : this.x;
    this.y = this.y > 400 ? 400 : this.y; 

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 63), new Enemy(200, 146), new Enemy(400, 229)];
var player = new Player(100, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
