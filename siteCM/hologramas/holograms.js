/* 

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('model-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(----);

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lights
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// Add AxesHelper to see axes in scene
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Controls (mouse interaction)
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Load 3D Model (GLB/GLTF)
const loader = new GLTFLoader();
loader.load(
  './hologramas/CAPITOL.glb',
  function (gltf) {
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error('An error happened:', error);
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
*/