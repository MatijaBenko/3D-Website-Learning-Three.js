import './style.css'

import * as THREE from "three";

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.OctahedronGeometry(0.5);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  neptune.rotation.y += 0.005;

  //controls.update();

  renderer.render(scene, camera);
}

//Avatar

const matijaTexture = new THREE.TextureLoader().load('self_body_shot.jpg');

const matija = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: matijaTexture})
);

const neptuneTexture = new THREE.TextureLoader().load('neptune_texture.jpg');
const normalTexture = new THREE.TextureLoader().load('texture.jpg');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
    normalMap: normalTexture
  })
);

neptune.position.z = 30;
neptune.position.setX(-10);
matija.position.z = -5;
matija.position.x = 2;

function moveCamera() {
  const viewPort = document.body.getBoundingClientRect().top;
  neptune.rotation.x += 0.05;
  neptune.rotation.y += 0.075;
  neptune.rotation.z += 0.05;

  matija.rotation.y += 0.01;
  matija.rotation.z += 0.01;

  camera.position.z = viewPort * -0.01;
  camera.position.x = viewPort * -0.0002;
  camera.position.y = viewPort * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

scene.add(matija, neptune);

animate();
