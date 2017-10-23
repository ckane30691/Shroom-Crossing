/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in app.js).
 */

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

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        lastTime = now;
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
        // noop
    }

    Resources.load([
        'images/death.png',
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
