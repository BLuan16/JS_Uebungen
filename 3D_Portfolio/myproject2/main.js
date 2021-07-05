import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//SetUp

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerWidth, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry(10, 3 , 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0x00000, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

//Add Object to Scene
scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff);

//Add Object to Scene
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);

// //Add Object to Scene
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('himmel.jpg');
scene.background = spaceTexture;

//Avatar

const luTexture = new THREE.TextureLoader().load('lu.png');

const lu = new THREE.Mesh(
   new THREE.BoxGeometry(3,3,3),
   new THREE.MeshBasicMaterial({ map: luTexture } )
);

//Add Object to Scene
scene.add(lu);




//planet
const planetTexture = new THREE.TextureLoader().load('planet.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');


const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( { 
    map: planetTexture,
    normalMap: normalTexture
  } )

); 

//Add Object to Scene
scene.add(planet);
 
planet.position.z = 25;
planet.position.setX(-10);

//Camera movement trough scrolling  (firing function with every scroll)
function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;


  lu.rotation.y += 0.01;
  lu.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera







function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()