// Native HTML5 Canvas WPM Chart & Symbol Heatmap Engine

export function renderWpmChart(canvasId, wpmHistory) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Clear previous drawings
  ctx.clearRect(0, 0, width, height);

  if (!wpmHistory || wpmHistory.length < 2) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Outfit, sans-serif';
    ctx.fillText('Not enough data points to plot chart', width / 3, height / 2);
    return;
  }

  const padding = 30;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const maxWpm = Math.max(...wpmHistory, 40);
  const minWpm = 0;

  // Draw Grid Lines
  ctx.strokeStyle = 'rgba(51, 65, 85, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 4; i++) {
    const y = padding + (graphHeight / 4) * i;
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
  }
  ctx.stroke();

  // Calculate Points
  const points = wpmHistory.map((wpm, index) => {
    const x = padding + (index / (wpmHistory.length - 1)) * graphWidth;
    const y = height - padding - ((wpm - minWpm) / (maxWpm - minWpm)) * graphHeight;
    return { x, y };
  });

  // Draw Gradient Fill Area
  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
  gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
  gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(pt => ctx.lineTo(pt.x, pt.y));
  ctx.lineTo(points[points.length - 1].x, height - padding);
  ctx.lineTo(points[0].x, height - padding);
  ctx.closePath();
  ctx.fill();

  // Draw WPM Line Curve
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(pt => ctx.lineTo(pt.x, pt.y));
  ctx.stroke();

  // Draw Data Point Circles
  ctx.fillStyle = '#38bdf8';
  points.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Render Symbol Typo Heatmap
export function renderSymbolHeatmap(containerId, typoMap) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  const developerSymbols = ['{', '}', '(', ')', '[', ']', ';', ':', '=>', '->', '=', '<', '>', '"', "'"];
  const symbolErrors = {};

  // Filter typos to only developer symbols
  Object.keys(typoMap).forEach(char => {
    if (developerSymbols.includes(char)) {
      symbolErrors[char] = typoMap[char];
    }
  });

  if (Object.keys(symbolErrors).length === 0) {
    container.innerHTML = `<span style="color: var(--text-correct); font-size: 0.85rem;">Clean run! Zero symbol typos detected. ✨</span>`;
    return;
  }

  Object.entries(symbolErrors).forEach(([symbol, count]) => {
    const badge = document.createElement('div');
    badge.className = 'heatmap-badge';
    badge.innerHTML = `
      <span class="symbol">${symbol}</span>
      <span class="count">${count} error${count > 1 ? 's' : ''}</span>
    `;
    container.appendChild(badge);
  });
}
