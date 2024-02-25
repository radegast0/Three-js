import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const axisHelper = new THREE.AxesHelper(2);
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.add(axisHelper);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// Clock
const clock = new THREE.Clock();

gsap.to(mesh.position, { delay: 1, duration: 1, x: 2 });
gsap.to(mesh.position, { delay: 2, duration: 1, x: 0 });

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();


  mesh.rotation.y = elapsedTime;


  // Update objects
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
