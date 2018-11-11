var height;
var width;
var snows = [];
var frequency = 40;
var xSpeed = 25;
var ySpeed = 25;
$(document).ready(function() {
    var $bg = $("<div></div>").addClass("jonathanwx-snow-bg");
    $("body").append($bg);
    var $canvas = $("<canvas></canvas>")
        .attr("id", "jonahtanwx-snow")
        .addClass("jonathanwx-snow-canvas");
    $("body").append($canvas);
    var ctx = $canvas[0].getContext("2d");
    renderLayout(ctx);
    initSnows(150);
    setInterval(function() {
        update();
        render(ctx);
    }, frequency);
});

function renderLayout(ctx) {
    height = $(window).innerHeight();
    width = $(window).innerWidth();
    ctx.canvas.height = height;
    ctx.canvas.width = width;
}


function initSnows(n) {
    for (var i = 0; i < n; i++) {
        snows.push({
            x: Math.floor(width * Math.random()),
            y: Math.floor(height * Math.random()),
            r: Math.random() * 5,
            vx: frequency * (xSpeed - 15 + 1 + Math.random() * 15) / 1000,
            vy: frequency * (ySpeed - 15 + 1 + Math.random() * 15) / 1000
        });
    }

}

function update() {
    for (var i = 0; i < snows.length; i++) {
        if (snows[i].x - snows[i].r >= width) {
            snows[i].x = snows[i].r * -1;
            snows[i].vx = frequency * (xSpeed - 15 + 1 + Math.random() * 15) / 1000;
            continue;
        }
        if (snows[i].y - snows[i].r >= height) {
            snows[i].y = snows[i].r * -1;
            snows[i].vy = frequency * (ySpeed - 15 + 1 + Math.random() * 15) / 1000;
            continue;
        }
        snows[i].x += snows[i].vx;
        snows[i].y += snows[i].vy;
    }
}

function render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < snows.length; i++) {
        drawSnow(snows[i], ctx);
    }
}

function drawSnow(snow, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#cccccc55";
    ctx.arc(snow.x, snow.y, snow.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}