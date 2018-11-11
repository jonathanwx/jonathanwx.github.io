var height;
var width;
var bubbles = [];
var frequency = 40;
var xSpeed = 25;
var ySpeed = 25;
var rSpeed = 20;
$(document).ready(function() {
  var $canvas = $("<canvas></canvas>")
    .attr("id", "jonahtan-wx-bubble")
    .addClass("jonathan-wx-bubble");
  $("body").append($canvas);
  var ctx = $canvas[0].getContext("2d");
  renderLayout(ctx);
  initBubbles(15);

  setInterval(function() {
    render(ctx);
    update();
  }, frequency);

  $(window).resize(function() {
    renderLayout(ctx);
  });
});

function renderLayout(ctx) {
  height = $(window).innerHeight();
  width = $(window).innerWidth();
  ctx.canvas.height = height;
  ctx.canvas.width = width;
}

function render(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < bubbles.length; i++) {
    drawBubble(bubbles[i], ctx);
  }
}

function update() {
  var count = 0;
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].x += bubbles[i].vx;
    bubbles[i].y += bubbles[i].vy;
    if (
      bubbles[i].x - width > 3.5 * bubbles[i].radio ||
      bubbles[i].y + 3.5 * bubbles[i].radio < 0
    ) {
      bubbles.splice(i, 1);
      count++;
      continue;
    }

    bubbles[i].radius += bubbles[i].vr;
    if (bubbles[i].radius < bubbles[i].radio) {
      bubbles[i].vr *= -1;
    }
    if (bubbles[i].radius > bubbles[i].radio * 3) {
      bubbles[i].vr *= -1;
    }
    bubbles[i].a = bubbles[i].radius / bubbles[i].radio / 3 * 0.5;
  }
  addBubble(count);
}

function initBubbles(n) {
  for (var i = 0; i < n; i++) {
    var radius = 20 + Math.floor(1 + Math.random() * 15);
    bubbles.push({
      x: Math.floor(width * Math.random()),
      y: Math.floor(height * Math.random()),
      radius: radius,
      radio: radius / 2,
      vr:
        frequency *
        rSpeed /
        1000 *
        Math.pow(-1, Math.floor(Math.random() * 100)),
      vx: frequency * (xSpeed - 15 + 1 + Math.random() * 15) / 1000,
      vy: frequency * (ySpeed - 15 + 1 + Math.random() * 15) / 1000 * -1,
      ax: 1,
      ay: -1,
      r: Math.floor(255 * Math.random()),
      g: Math.floor(255 * Math.random()),
      b: Math.floor(255 * Math.random()),
      a: 0.5 * 2 / 3
    });
  }
}

function addBubble(n) {
  for (var i = 0; i < n; i++) {
    var radius = 20 + Math.floor(1 + Math.random() * 15);
    var xy = Math.random();
    bubbles.push({
      x: xy > 0.5 ? -1 * radius : Math.floor(width * Math.random()),
      y: xy <= 0.5 ? height + radius : Math.floor(height * Math.random()),
      radius: radius,
      radio: radius / 2,
      vr:
        frequency *
        rSpeed /
        1000 *
        Math.pow(-1, Math.floor(Math.random() * 100)),
      vx: frequency * (xSpeed - 15 + 1 + Math.random() * 15) / 1000,
      vy: frequency * (ySpeed - 15 + 1 + Math.random() * 15) / 1000 * -1,
      ax: 1,
      ay: -1,
      r: Math.floor(255 * Math.random()),
      g: Math.floor(255 * Math.random()),
      b: Math.floor(255 * Math.random()),
      a: 0.5 * 2 / 3
    });
  }
}

function drawBubble(bubble, ctx) {
  ctx.fillStyle =
    "rgba(" + bubble.r + "," + bubble.g + "," + bubble.b + "," + bubble.a + ")";
  ctx.strokeStyle = "rgba(154,154,154," + bubble.a + ")";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
