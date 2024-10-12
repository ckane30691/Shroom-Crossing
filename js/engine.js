/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in app.js).
 */
var isPaused = false;
 let startBtn = document.getElementsByClassName("start")[0];
startBtn.onclick = () => {
  startBtn.className += " hidden"
  let theme = document.getElementsByClassName("theme")[0];
  theme.play()

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 808;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    doc.addEventListener('keydown', function(e) {
      if (e.code === 'KeyP') { // P key for pause/unpause
        isPaused = !isPaused;
        if (!isPaused) {
          // When unpausing, reset lastTime to the current time to avoid large dt
          lastTime = Date.now();
        }
      }
    });


    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        player.canMove = false
        if (!isPaused) {
        player.canMove = true
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
      }
      
      // Check if the player is dead
      if (player.isDead) {
        resetGame();
        return;
      }

      win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = [
                'images/water-block.png',   // Top row is water
                // 'images/blocks.png',   // Row 1 of 2 of grass
                // 'images/blocks.png',   // Row 1 of 2 of grass
                // 'images/blocks.png',   // Row 1 of 2 of grass
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 8,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {
        player.reset();
        isPaused = false;
        allEnemies = populateEnemies();
        score = 0;
        $(".score").html("Score: " + score);
        // additional reset logic goes here
    }

    function resetGame() {
      // Display a message to start a new game
      var gameOverMessage = doc.createElement('div');
      gameOverMessage.innerHTML = '<h1>Game Over! Press Enter to Restart</h1>';
      gameOverMessage.className = 'game-over';
      doc.body.appendChild(gameOverMessage);

      // Wait for user to press Enter to restart the game
      doc.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {
          doc.body.removeChild(gameOverMessage);
          reset();   // Reset game state
          init();    // Reinitialize the game
        }
      });
    }

    Resources.load([
        'images/death.png',
        'images/robot.png',
        'images/robot_attack.png',
        'images/hit.png',
        'images/stone-block.png',
        'images/boss.png',
        'images/boss_hit.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/luigi.png',
        'images/blocks.png',
        'images/shroom.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);
}
