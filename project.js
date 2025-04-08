let seconds = 0;
let clicks = 0;
let moves = 0;
let keys = 0;

const timeSpan = document.getElementById('time');
const clickSpan = document.getElementById('clicks');
const moveSpan = document.getElementById('moves');
const keySpan = document.getElementById('keys');

setInterval(() => {
  seconds++;
  timeSpan.textContent = seconds;
}, 1000);

document.addEventListener('click', () => {
  clicks++;
  clickSpan.textContent = clicks;
});

document.addEventListener('mousemove', () => {
  moves++;
  moveSpan.textContent = moves;
});

document.addEventListener('keydown', () => {
  keys++;
  keySpan.textContent = keys;
});
