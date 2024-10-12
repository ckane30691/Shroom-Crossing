const populateEnemies = () => {
  return [
    new Enemy(600, 60, {boss: false}),
    new Enemy(200, 146, {boss: false}),
    new Enemy(400, 229, {boss: false}),
    new Enemy(0, 312, {boss: false}),
    new Enemy(-150, 400, {boss: true}),
    new Enemy(600, 40, {
      boss: false,
      numberOfFrames: 6,
      width: 850,
      height: 170,
      reverse: true,
      radius: 45,
      vel: 100,
      sprite: 'images/robot.png'
    }),
    new Enemy(0, 200, {
      boss: false,
      numberOfFrames: 6,
      width: 850,
      height: 170,
      reverse: true,
      radius: 45,
      vel: 50,
      sprite: 'images/robot.png'
    })
  ];
}

var allEnemies = populateEnemies()

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

// Prevent window scrolling on up or down keypress
window.onkeydown = (e) => {
  if ((e.keyCode == 38 || e.keyCode == 40) && e.target == document.body) {
    e.preventDefault();
  }
};

var score = 0;
$('.score').append(score);

let muteBtn = document.getElementsByClassName("mute")[0];
muteBtn.onclick = () => {
  let theme = document.getElementsByClassName("theme")[0];
  let deathSound = document.getElementsByClassName("death")[0];
  let achievementSound = document.getElementsByClassName("achievement")[0];

  deathSound.muted = deathSound.muted ? false : true;
  achievementSound.muted = achievementSound.muted ? false : true;
  theme.muted = theme.muted ? false : true;
  muteBtn.className = muteBtn.className === "mute true" ? "mute" : "mute true"
  muteBtn.className === "mute true" ? muteBtn.innerHTML = "<span class=\"mute-label\">Mute:</span><img class=\"mute-image\" src=\"./images/unmute.svg\" />" : muteBtn.innerHTML = "<span class=\"unmute-label\">Unmute:</span><img class=\"mute-image\" src=\"./images/mute.svg\" />"
}
