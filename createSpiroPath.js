const size = 1024;
let defaultOptions = {
  ringCircumference: 96,
  wheelCircumference: 84,
  fraction: 0.6, // 'fraction' corresponds to the 'hole' on the wheel, between 0.78 - 0.15
  rotation: 0,
  saturation: 100,
  lightness: 50,
  scaleFactor: 5.5,
  size,
};
const constrain = (n, low, high) => Math.max(Math.min(n, high), low);

const getNumLoops = (a, b, c, d) => {
  if (!c) {
    c = a;
  }
  if (!d) {
    d = b;
  }
  let dividend = Math.max(a, b);
  let divisor = Math.min(a, b);
  let remainder = dividend % divisor;
  let numLoops = 0;
  if (remainder === 0) {
    numLoops = (c * d) / divisor / d;
  } else {
    numLoops = getNumLoops(divisor, remainder, c, d);
  }
  return numLoops;
};
let mid = { x: size * 0.5, y: size * 0.5 };

export default function createSpiroPath(opts = defaultOptions) {
  const path = new Path2D();
  let {
    scaleFactor = 5.5,
    ringCircumference,
    wheelCircumference,
    fraction,
  } = opts;

  ringCircumference *= scaleFactor;
  wheelCircumference *= scaleFactor;
  let x = mid.x;
  let y = mid.y;
  const radius = ringCircumference - wheelCircumference;

  let ratio = ringCircumference / wheelCircumference - 1;
  let rate = (1 / ratio) * 0.02; // speed of drawing & curve fidelity
  let pen;
  let counter = 0;
  const numLoops = getNumLoops(ringCircumference, wheelCircumference);
  const counterMax = (Math.PI * 2 * numLoops) / (ratio + 1.0) + 0.2;
  const clampValue = 1;

  while (counter < counterMax) {
    pen = {
      x:
        x +
        radius * constrain(Math.cos(counter), -clampValue, clampValue) +
        fraction * wheelCircumference * Math.cos(counter * ratio),
      y:
        y +
        radius * constrain(Math.sin(counter), -clampValue, clampValue) -
        fraction * wheelCircumference * Math.sin(counter * ratio),
    };

    counter += rate;
    path.lineTo(pen.x, pen.y);
  }
  path.closePath();
  return path;
}