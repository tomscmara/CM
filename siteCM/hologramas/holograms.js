import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('model-container');

const scene = new THREE.Scene();
// Use black background for better contrast with your hologram model
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
// Position camera so it sees the model nicely
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Controls for orbiting the model
const controls = new OrbitControls(camera, renderer.domElement);
// Set controls target to origin and update
controls.target.set(0, 0, 0);
controls.update();

// Add axes helper to debug scene orientation
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Load 3D Model (GLB/GLTF)
const loader = new GLTFLoader();
loader.load(
  './hologramas/CAPITOL.glb',
  (gltf) => {
    // Position and scale your model so it's visible
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
    console.log('Model loaded:', gltf);
  },
  undefined,
  (error) => {
    console.error('An error happened loading the model:', error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
