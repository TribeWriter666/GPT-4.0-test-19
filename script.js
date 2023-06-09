const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numWaves = 5;
const waveSpeed = 0.005;
const waveDistance = 100;

class WaveSource {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

const waveSources = Array.from({ length: numWaves }, () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  return new WaveSource(x, y);
});

function getColorAt(x, y, time) {
  let sum = 0;

  for (const source of waveSources) {
    const d = source.distanceTo(x, y);
    sum += Math.sin(d / waveDistance - time * waveSpeed);
  }

  const intensity = (sum / numWaves + 1) * 0.5;
  return `hsl(200, 100%, ${intensity * 100}%)`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() * 0.001;

  for (let x = 0; x < canvas.width; x += 10) {
    for (let y = 0; y < canvas.height; y += 10) {
      ctx.fillStyle = getColorAt(x, y, time);
      ctx.fillRect(x, y, 10, 10);
    }
  }

  requestAnimationFrame(draw);
}

draw();
