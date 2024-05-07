export default function drawStar(ctx, size = 500) {
  const radius = 250;
  const numPoints = 5;
  const inset = 2;
  ctx.save();
  ctx.beginPath();
  ctx.translate(size * 0.5, size * 0.5);
  ctx.moveTo(0, 0 - radius);
  for (var i = 0; i < numPoints; i++) {
    ctx.rotate(Math.PI / numPoints);
    ctx.lineTo(0, 0 - (radius * inset));
    ctx.rotate(Math.PI / numPoints);
    ctx.lineTo(0, 0 - radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};