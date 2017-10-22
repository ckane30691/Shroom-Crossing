var allEnemies = [new Enemy(0, 312), new Enemy(200, 146), new Enemy(400, 229)];
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

var ambiance = document.getElementsByClassName("theme")[0];
    ambiance.play();

let muteBtn = document.getElementsByClassName("mute")[0];
muteBtn.onclick = () => {
  let theme = document.getElementsByClassName("theme")[0];
  let deathSound = document.getElementsByClassName("death")[0];
  let achievementSound = document.getElementsByClassName("achievement")[0];

  deathSound.muted = deathSound.muted ? false : true;
  achievementSound.muted = achievementSound.muted ? false : true;
  theme.muted = theme.muted ? false : true;
  muteBtn.className = muteBtn.className === "mute true" ? "mute" : "mute true"
  muteBtn.className === "mute true" ? muteBtn.innerHTML = "🕨" : muteBtn.innerHTML = "🕪"
}
