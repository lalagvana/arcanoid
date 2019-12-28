function init() {
    var canvas = document.getElementById("main-canvas");
    var ctx = canvas.getContext("2d");

    var x0 = 0;
    var y0 = 0;
    var r = 40;
    var width = canvas.width, height = canvas.height;
    var maxx = x0 + width - r;
    var minx = x0 + r;
    var maxy = y0 + height - r;
    var miny = y0 + r;
    var isExploded = false;
    function randomLimited(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    balls = [
                      b1 = {x: randomLimited(minx, maxx), y: randomLimited(miny, maxy), dx: 4, dy: 6, isExploded:false},
                      b2 = {x: randomLimited(minx, maxx), y: randomLimited(miny, maxy), dx: -2, dy: 1, isExploded:false},
                      b3 = {x: randomLimited(minx, maxx), y: randomLimited(miny, maxy), dx: 3, dy: 1, isExploded:false}
                  ];


    var backgroundImage = document.getElementById("background-image");
    var backgroundPattern = ctx.createPattern(backgroundImage, "repeat");

    var ballSpriteSheet = document.getElementById("ball-sprite-sheet");
    var ballSprites = 13;
    var ballSpriteWidth = ballSpriteSheet.width / ballSprites;
    var ballSpriteHeight = ballSpriteSheet.height;

    var explosionSpriteSheet = document.getElementById("explosion-sprite-sheet");
    var explosionSprites = 35;
    var explosionSpriteWidth = explosionSpriteSheet.width / explosionSprites;
    var explosionSpriteHeight = explosionSpriteSheet.height;

    var globalFrameX = 0;
    var frameX = 0;
    var explosionFrame = 0;

    canvas.addEventListener("click", user);

    function user(event) {
        for(var b of balls){
            if (b.isExploded)
                return;
            var clientRect = canvas.getBoundingClientRect();
            var clickX = event.clientX - clientRect.left;
            var clickY = event.clientY - clientRect.top;

            if ((clickX - b.x) * (clickX - b.x) + (clickY - b.y) * (clickY - b.y) < (r + 3) * (r + 3)) {
                b.isExploded = true;
                explosionFrame = frameX;
            }
        }
    }

    requestAnimationFrame(draw);
    
    function draw() {
        globalFrameX++;
        requestAnimationFrame(draw);
        if (globalFrameX % 3 != 0)
            return;
        frameX++;

        ctx.fillStyle = backgroundPattern;
        ctx.fillRect(0, 0, width, height);
        for(var b of balls){
            drawBall(b);
            if (!b.isExploded) {
                b.x += b.dx;
                b.y += b.dy;
                reflectWall(b);
            }
        }
    }

    function reflectWall(b) {
        if (b.x + r >= width || b.x - r <= 0)
            b.dx *= -1;
        if (b.y + r >= height || b.y - r <= 0)
           b.dy *= -1;
        }

    function drawBall(b) {
        if (!b.isExploded) {
            var animationFrame = frameX % ballSprites;
            ctx.drawImage(
                ballSpriteSheet,
                ballSpriteWidth * animationFrame, 0,
                ballSpriteWidth, ballSpriteHeight,
                b.x - ballSpriteWidth / 2, b.y - ballSpriteHeight / 2,
                ballSpriteWidth, ballSpriteHeight
            );
        }
        else {
            animationFrame = frameX - explosionFrame - 1;
            if (animationFrame < explosionSprites)
                ctx.drawImage(
                    explosionSpriteSheet,
                    explosionSpriteWidth * animationFrame, 0,
                    explosionSpriteWidth, explosionSpriteHeight,
                    b.x - explosionSpriteWidth / 2, b.y - explosionSpriteHeight / 2,
                    explosionSpriteWidth, explosionSpriteHeight
                );
        }
    }
}