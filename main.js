function init() {
    console.info("initialized");

    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d");

    var rotAngle = 1;
    var bladesCount = 7;

    function drawBlade(ind) {
        c.save();
        c.strokeRect(0,0, 20, 80);

        c.translate(10, 80);
        drawCords();

        c.rotate(270.2);
        drawRope();
        c.restore();
    }
    function drawRope() {
        c.save();
        c.strokeRect(0,0, 3, 60);
        c.restore();
    }
    function drawSmallBlade(ind){
        c.save();
        c.strokeRect(10,140, 5, 20);

        c.translate(12, 160);
        drawCords();

        c.rotate(270.2);
        drawSmallRope();
        c.restore();
    }
    function drawSmallRope() {
        c.save();
        c.strokeRect(0,0, 1, 20);
        c.restore();
    }
    function drawFrame() {
        c.save();

        c.clearRect(0, 0, canvas.width, canvas.height);
        c.translate(canvas.width / 2, canvas.height / 2);
        c.rotate(rotAngle);

        for (var i = 1; i <= bladesCount; i++) {
            c.rotate(2*Math.PI / bladesCount);
            drawBlade(i);
        }
        for (var k = 1; k <= bladesCount; k++) {
            c.rotate(2*Math.PI / bladesCount);
            drawSmallBlade(k);
        }
        c.restore();
    }

    function drawCords() {
        c.save();

        c.beginPath();
        c.moveTo(0, 0);
        c.stroke();

        c.beginPath();
        c.moveTo(0, 0);
        c.stroke();

        c.restore();
    }

    function animate() {
        rotAngle += 0.01;
    }

    function loop() {
        animate();
        drawFrame();
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}