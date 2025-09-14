let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}];
let direction = 'right';
let apple = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
let score = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, 10, 10);
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Score: ' + score, 10, 10);
}
function update() {
  let head = snake[0];
  let newHead = {x: head.x, y: head.y};
  if (direction === 'right') {
    newHead.x += 10;
  } else if (direction === 'left') {
    newHead.x -= 10;
  } else if (direction === 'up') {
    newHead.y -= 10;
  } else if (direction === 'down') {
    newHead.y += 10;
  }
  if (newHead.x < 0) {
    newHead.x = canvas.width - 10;
  } else if (newHead.x >= canvas.width) {
    newHead.x = 0;
  }
  if (newHead.y < 0) {
    newHead.y = canvas.height - 10;
  } else if (newHead.y >= canvas.height) {
    newHead.y = 0;
  }
  snake.unshift(newHead);
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    score++;
    apple = {x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10};
  } else {
    snake.pop();
  }
}
function handleKey(event) {
  if (event.key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  } else if (event.key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  } else if (event.key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  } else if (event.key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  }
}
document.addEventListener('keydown', handleKey);
setInterval(() => {
  update();
  draw();
}, 100);