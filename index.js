import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import recipes from './recipes.js';
import createSpiroPath from './createSpiroPath.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

function drawTexture(recipeStep) {
  const { hue, saturation, lightness } = recipeStep;
  const size = 1024;
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = size;
  ctx.canvas.height = size;

  const path = createSpiroPath(recipeStep);
  ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  ctx.fill(path);

  // ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  // ctx.lineWidth = 2;
  // ctx.stroke(path);

  return new THREE.CanvasTexture(ctx.canvas);
}

const sceneGroup = new THREE.Group();
sceneGroup.userData.update = function (t) {
  sceneGroup.children.forEach((c) => c.userData.update(t));
};
scene.add(sceneGroup);

function createComposition(index) {

  const recipe = recipes[index]();
  recipe.forEach((recipeStep, i) => {
    const size = 8;
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
      map: drawTexture(recipeStep),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      // blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = i * 0.05;
    const rate = i * 0.1;
    mesh.userData.update = function (t) {
      mesh.rotation.z = Math.cos(t + rate) * 0.5;
    };
    sceneGroup.add(mesh);
  });
}
function animate(t = 0) {
  requestAnimationFrame(animate);
  sceneGroup.userData.update(t * 0.001);
  renderer.render(scene, camera);
  controls.update();
}

createComposition(3);
animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);