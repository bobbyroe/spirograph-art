const ringCircumferences = [96, 105];
const wheelCircumferences = [
  84, 80, 75, 72, 63, 60, 56, 52, 48, 45, 42, 40, 32, 30, 24,
];
// designs based on patterns from the original
// SPIROGRAPH design guide
// https://spirographicart.com/2020/11/21/super-spirograph-1969-instruction-book/
let options = {
  ringCircumference: 96,
  wheelCircumference: 84,
  fraction: 0.6, // 'fraction' corresponds to the 'hole' on the wheel, between 0.78 - 0.15
  rotation: 0,
  saturation: 100,
  lightness: 50
};

const recipies = [
  function pattern0() {
    const graphs = [];
    let numSteps = 12;
    const rotations = [0, 10];
    const len = 2;
    options.ringCircumference = 96;
    options.wheelCircumference = 84;
    options.hue = 240;
    options.saturation = 100;
    options.lightness = 25;
    options.scaleFactor = 6.5;
    let index = 0;
    for (let i = 0; i < len; i += 1) {
      options.fraction = 0.85;
      options.rotation = rotations[i];
      for (let j = 0; j < numSteps; j += 1) {
        options.fraction -= 0.03;
        options.rotation += 2.5;
        options.hue -= 3;
        options.lightness += 2.5;
        options.saturation -= 1;
        options.index = index;
        options.scaleFactor -= 0.125;
        graphs.push(Object.assign({}, options));
        index += 1;
      }
    }
    return graphs;
  },
  function pattern1() {
    const graphs = [];
    options.ringCircumference = 105;
    options.wheelCircumference = 96;
    options.fraction = 0.9;
    options.rotation = 12;
    options.scaleFactor = 5;
    options.hue = 350;
    options.saturation = 100;
    options.lightness = 50;
    const numSteps = 12;
    for (let i = 0; i < numSteps; i += 1) {
      options.fraction -= 0.1;
      options.hue += 4;
      options.rotation += 1;
      options.index = i;
      options.scaleFactor -= 0.5;
      options.scaleFactor = Math.max(1, options.scaleFactor);
      graphs.push(Object.assign({}, options));
    }
    return graphs;
  },
  function pattern2() {
    const graphs = [];
    options.ringCircumference = 105;
    options.wheelCircumference = 63;
    options.fraction = 0.85;
    options.hue = 190;
    options.rotation = 340;
    options.scaleFactor = 5;
    options.saturation = 100;
    options.lightness = 50;
    const numSteps = 12;
    for (let i = 0; i < numSteps; i += 1) {
      options.rotation += 2;
      options.hue = i <= 3 ? 0 : i >= 8 ? 140 : 195;
      options.fraction -= 0.02;
      options.index = i;
      graphs.push(Object.assign({}, options));
    }
    return graphs;
  },
  function pattern3() {
    const graphs = [];
    options.ringCircumference = 105;
    options.wheelCircumference = 96;
    options.fraction = 1;
    options.rotation = 12;
    options.scaleFactor = 5;
    options.hue = 260;
    options.saturation = 100;
    options.lightness = 50;
    const numSteps = 8;
    for (let i = 0; i < numSteps; i += 1) {
      options.hue += 4;
      options.index = i;
      options.scaleFactor -= 0.5;
      graphs.push(Object.assign({}, options));
    }
    return graphs;
  }
];

export default recipies;
