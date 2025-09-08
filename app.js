
// Simple Snake game - reusable minimal implementation
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const scoreSpan = document.getElementById('score');

const gridSize = 20; // pixels per cell
const cols = canvas.width / gridSize;
const rows = canvas.height / gridSize;

let snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
let dir = {x: 0, y: 0};
let food = null;
let running = false;
let tickInterval = 120; // ms
let score = 0;
let timer = null;

function placeFood() {
  while (true) {
    const fx = Math.floor(Math.random() * cols);
    const fy = Math.floor(Math.random() * rows);
    if (!snake.some(s => s.x === fx && s.y === fy)) {
      food = {x: fx, y: fy};
      return;
    }
  }
}

function resetGame() {
  snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
  dir = {x: 0, y: 0};
  score = 0;
  scoreSpan.textContent = 'Score: ' + score;
  placeFood();
}

function gameOver() {
  running = false;
  clearInterval(timer);
  alert('Game Over! Score: ' + score);
}

function step() {
  if (!running) return;
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
  // wrap-around behavior
  head.x = (head.x + cols) % cols;
  head.y = (head.y + rows) % rows;

  // collision with self
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);
  // eat food?
  if (food && head.x === food.x && head.y === food.y) {
    score += 1;
    scoreSpan.textContent = 'Score: ' + score;
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function draw() {
  // clear
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw food
  if (food) {
    ctx.fillStyle = '#e91e63';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  // draw snake
  ctx.fillStyle = '#4caf50';
  for (let i = 0; i < snake.length; i++) {
    const s = snake[i];
    ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize, gridSize);
    // a small inner rectangle for the head
    if (i === 0) {
      ctx.fillStyle = '#a5d6a7';
      ctx.fillRect(s.x * gridSize + 2, s.y * gridSize + 2, gridSize - 4, gridSize - 4);
      ctx.fillStyle = '#4caf50';
    }
  }
}

window.addEventListener('keydown', (e) => {
  const k = e.key;
  if (k === 'ArrowUp' || k === 'w') {
    if (dir.y === 1) return; // avoid reversing
    dir = {x: 0, y: -1};
  } else if (k === 'ArrowDown' || k === 's') {
    if (dir.y === -1) return;
    dir = {x: 0, y: 1};
  } else if (k === 'ArrowLeft' || k === 'a') {
    if (dir.x === 1) return;
    dir = {x: -1, y: 0};
  } else if (k === 'ArrowRight' || k === 'd') {
    if (dir.x === -1) return;
    dir = {x: 1, y: 0};
  }
});

startBtn.addEventListener('click', () => {
  if (running) return;
  if (dir.x === 0 && dir.y === 0) {
    dir = {x: 1, y: 0}; // default move right
  }
  running = true;
  timer = setInterval(step, tickInterval);
});

pauseBtn.addEventListener('click', () => {
  if (!running) return;
  running = false;
  clearInterval(timer);
});

resetGame();
draw();
