/** FOR INDEX HTML - ART GALLERY */
import * as THREE from 'three';
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';
// // imports for add ons to THREE
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

console.log("THREE object is loaded 😄, here is the THREE object: ", THREE);
/**
 * STEPS TO CREATE A THREE.JS SCENE
 * 1. Create a scene
 * 2. Create a camera
 * 3. Create a renderer
 * 4. Add camera to scene
 * 5. Add renderer to DOM
 * 6. Add objects to scene
 * 7. Render scene
 * 8. Animate scene
 * 
 */

/////////////////////////////////////////////////////////////////////////////
// SCENE < > CAMERA
/////////////////////////////////////////////////////////////////////////////

// scene
const scene = new THREE.Scene();

// camera(fov(vision angle), aspectRatio(w/h), near, far)
const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near plane
    1000); // far plane

// renderer creates CANVAS sets size and adds element in DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// set clear color to white
// renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

/////////// Background Images//////////////////// 
const imgUrl1 = '../Images/assets/artGallery1Index/low-angle-shot-mesmerizing-starry-sky.jpg';
const imgUrl2 = '../Images/assets/artGallery1Index/astronomy.png';
const imgUrl3 = '../Images/assets/artGallery1Index/ultra-detailed-nebula-abstract-wallpaper-4.jpg';

const loader = new THREE.TextureLoader();
loader.load(imgUrl3, (texture) => {
    scene.background = texture;
});

// add camera to scene
scene.add(camera);

// move the camera back 5 units on the z axis so we can see the scene position
camera.position.z = 10;
camera.position.y = 2;

function onWindowResize() {
    // update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // update camera frustum
    camera.updateProjectionMatrix();
    // update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);



/////////////////////////////////////////////////////////////////////////////
// SCENE LIGHTING
/////////////////////////////////////////////////////////////////////////////

// Set lighting parameters

// - to see the objects in the scene
// color, intensity (0-1), distance, decay - params for light
let ambientLight = new THREE.AmbientLight(0xffffff, 1);

// position the light - x, y, z - params for position of light
// not recommended to set camera position to light position
// ambient light is not affected by position it covers all objects in scene equally
scene.add(ambientLight);

// directional light - shines in a specific direction
// color, intensity, distance, decay
let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(20, 100, 10);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.left = 100;
directionalLight.shadow.camera.right = -100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;
scene.add(directionalLight);

// set position to directional light - y axis above the scene - shines down
directionalLight.position.y = 50;

// set a pointer light to follow the camera around
// color, intensity, distance, decay
let pointerLight = new THREE.HemisphereLight(0xffffff, 1.0, 100);
pointerLight.position.set(0, 24, 0);
scene.add(pointerLight);

// set a point light to follow the camera around
// color, intensity, distance, decay
let pointLight = new THREE.PointLight(0xffffff, 1.0, 100);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);

// set a spot light to follow the camera around
// color, intensity, distance, decay
let spotLight = new THREE.SpotLight(0xffffff, 1.0, 100);
spotLight.position.set(0, 24, 0);
scene.add(spotLight);


/////////////////////////////////////////////////////////////////////////////
// CONTROLS
/////////////////////////////////////////////////////////////////////////////

// function showMenu() {
//     const menu = document.getElementById('menu');
//     menu.style.display = 'block';
// }

// function hideMenu() {
//     const menu = document.getElementById('menu');
//     menu.style.display = 'none';
// }

// ADD CONTROLS TO MOVE with mouse
const cursorControls = new PointerLockControls(camera, renderer.domElement);

// // At the start, after setting up the camera
// const defaultPosition = new THREE.Vector3().copy(camera.position);
// const defaultRotation = new THREE.Euler().copy(camera.rotation);

cursorControls.addEventListener('unlock', () => {
    console.log('Pointer Unlocked.');
    // camera.position.copy(defaultPosition);
    // camera.rotation.copy(defaultRotation);
});
renderer.domElement.addEventListener('click', () => {
    if (cursorControls.isLocked === true) {
        cursorControls.unlock();
        // showMenu();
    } else {
        cursorControls.lock();
        // hideMenu();
    }
});

cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
cursorControls.addEventListener('unlock', () => console.log('Pointer Unlocked.'));

// ADD CONTROLS TO MOVE with arrows and w, a, s, d

document.addEventListener('keydown', onKeyDown, true);

// function to move camera with keyboard when key is pressed
// 37 - left, 38 - down, 39 - right, 40 - up
function onKeyDown(event) {
    let keycode = event.which;

    if (keycode === 39 || keycode === 68) // right arrow key
    {
        // camera.translateX( 0.05 );
        camera.translateX(0.12);
    }
    if (keycode === 37 || keycode === 65) // left arrow key
    {
        // camera.translateX( -0.05 );
        camera.translateX(-0.12);
    }
    if (keycode === 38 || keycode === 87) // up arrow key
    {
        camera.translateZ(-0.15);

    }
    else if (keycode === 40 || keycode === 83) // down arrow key
    {
        camera.translateZ(0.12);

    }
}

/////////////////////////////////////////////////////////////////////////////
// CREATE OBJECTS
/////////////////////////////////////////////////////////////////////////////

// Create an object

// creating a cube just to see the effects of the light
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({
    color: 0x0002f1,
    roughness: 0.5,
    metalness: 0.8,
    emissive: 0x000000,
    emissiveIntensity: 0.5
});

const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

//POLYHEDRON - a solid figure with many plane faces, typically more than six.
// const geometry = new THREE.PolyhedronGeometry( vertices, indices, radius, detail );
const verticesOfCube = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
    -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
];

const indicesOfFaces = [
    2, 1, 0, 0, 3, 2,
    0, 4, 7, 7, 3, 0,
    0, 1, 5, 5, 4, 0,
    1, 2, 6, 6, 5, 1,
    2, 3, 7, 7, 6, 2,
    4, 5, 6, 6, 7, 4
];

const geometryWorld = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 10, 20);

const materialWorld = new THREE.MeshBasicMaterial({ color: 0x5f00ef, wireframe: true, wireframeLinewidth: 10, });

const polyhedron = new THREE.Mesh(geometryWorld, materialWorld);
scene.add(polyhedron);
polyhedron.position.set(0, 20, 0);

// add a bounding box for collisions
polyhedron.BBox = new THREE.Box3();
polyhedron.BBox.setFromObject(polyhedron);


// Spotlight specifically for the cube
const cubeSpotlight = new THREE.SpotLight(0xffffff, 1.0, 100);
cubeSpotlight.position.set(30, 30, 30);
cubeSpotlight.target = polyhedron; // Target the cube
scene.add(cubeSpotlight);

///////////////////////////////////////////////////////////////////////////////
// TEXTURE FUNCTION TO WRAP OBJECTS
///////////////////////////////////////////////////////////////////////////////

function objectTexture(url) {
    const objectTexture = new THREE.TextureLoader().load(url);
    objectTexture.wrapS = THREE.RepeatWrapping;
    objectTexture.wrapT = THREE.RepeatWrapping;

    objectTexture.colorSpace = THREE.SRGBColorSpace;

    return objectTexture;

};


/////////////////////////////////////////////////////////////////////////////
// FLOOR with TEXTURES
/////////////////////////////////////////////////////////////////////////////

// add Textures to objects

// create texture for floor

// const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/marble.jpg');

// const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/metal_galvanised_grey_texture.jpg');

// const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/wood_floor.jpg');

// const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/herringbone_parquet_diff_1k.jpg');

const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/astronomy.png');

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20, 20);

floorTexture.colorSpace = THREE.SRGBColorSpace;

// create plane geometry
const planeGeometry = new THREE.PlaneGeometry(55, 55);

let planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    roughness: 0.5
});

// create floor
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial)

scene.add(floorPlane);

// floorPlane.material.map = objectTexture('../images/artGallery1Index/astronomy.png'); // map for texture update

// set position of floor
floorPlane.rotation.x = Math.PI / 2; // 90 degree clockwise
floorPlane.position.y = -Math.PI / 2; // 180 degree clockwise

// add a bounding box for collisions
floorPlane.BBox = new THREE.Box3();
floorPlane.BBox.setFromObject(floorPlane);

// add a bounding box for collisions



/////////////////////////////////////////////////////////////////////////////
// CREATE WALLS - left wall, right wall, back wall, ceiling
/////////////////////////////////////////////////////////////////////////////

const wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup)

const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 15, 0.005),
    new THREE.MeshBasicMaterial({ color: 0xaf00af })
);
frontWall.position.z = -25;

const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 15, 0.05),
    new THREE.MeshBasicMaterial({ color: 0x00afaf })
);
backWall.position.z = 25;

const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.001, 15, 50),
    new THREE.MeshBasicMaterial({ color: 0x00af02 })
);
leftWall.position.x = 25;

const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.001, 15, 50),
    new THREE.MeshBasicMaterial({ color: 0xffaa02 })
);
rightWall.position.x = -25;

wallGroup.add(frontWall, leftWall, rightWall, backWall);

// texture walls
wallGroup.position.y = 5;


///////////////////////////////////////////////////////////////////////////////
// TEXTURE  WRAP OBJECTS
///////////////////////////////////////////////////////////////////////////////


frontWall.material.map = objectTexture('../Images/assets/artGallery1Index/castle.jpg');

backWall.material.map = objectTexture('../Images/assets/artGallery1Index/museum.jpg');

leftWall.material.map = objectTexture('../Images/assets/artGallery1Index/castle.jpg');

rightWall.material.map = objectTexture('../Images/assets/artGallery1Index/aigen-awe.png');


// // create ceiling
// dome ceiling 
const radius = 40;
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const ceilingTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/astronomy.png');
ceilingTexture.mapping = THREE.EquirectangularReflectionMapping;

const ceilingMaterial = new THREE.MeshBasicMaterial({
    map: ceilingTexture,
    side: THREE.BackSide,
    emissive: 0xffffff,
    emissiveMap: ceilingTexture
});
const heightOfWalls = 10;
const dome = new THREE.Mesh(sphereGeometry, ceilingMaterial);
dome.position.y = heightOfWalls;
scene.add(dome);


/////////////////////////////////////////////////////////////////////////////
// CREATE PAINTINGS 
/////////////////////////////////////////////////////////////////////////////

function createPainting(imageUrl, width, height, position) {
    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load(imageUrl);
    paintingTexture.colorSpace = THREE.SRGBColorSpace;

    const paintingGeometry = new THREE.PlaneGeometry(width, height);

    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingTexture,
        emissive: 0xffffff,
        emissiveMap: paintingTexture,
        side: THREE.DoubleSide,
    });

    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);

    painting.position.set(position.x, position.y, position.z);


    return painting;
};

const painting1 = createPainting(
    '../Images/assets/artGallery1Index/aigen-awe.png',
    5, 9,
    new THREE.Vector3(-5, 5, -24.99)
);

const painting2 = createPainting(
    '../Images/assets/artGallery1Index/museum.jpg',
    10, 10,
    new THREE.Vector3(15, 1, -24.99)
);

// const painting3 = createPainting();

scene.add(painting1, painting2);


/////////////////////////////////////////////////////////////////////////////
// ADD A BOUNDING BOX FOR COLLISIONS 
/////////////////////////////////////////////////////////////////////////////

// function setupBoundingBox(object) {
//     object.BBox = new THREE.Box3().setFromObject(object);
// }
// setupBoundingBox(leftWall);
// setupBoundingBox(rightWall);
// setupBoundingBox(frontWall);
// setupBoundingBox(backWall);
// setupBoundingBox(floorPlane);
// setupBoundingBox(polyhedron);


///////////////////////////////////////////////////////////////////////////////
// Collision Detection
//////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////
// ANIMATION
/////////////////////////////////////////////////////////////////////////////

// animation

// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
function animate() {
    requestAnimationFrame(animate);

    // // Set the position of the light to the camera's position
    // pointLight.position.copy(camera.position);

    // // cube rotation - x, y, z
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // Rotate the dome about the vertical axis (Y-axis)
    dome.rotation.y += 0.0003; // Adjust the speed as needed

    // // polyhedron rotation - x, y, z
    // polyhedron.rotation.x += -0.001;
    // polyhedron.rotation.y += -0.001;

    // // bounce the cube up and down
    // cube.position.y = Math.abs(Math.sin(Date.now() * 0.002)) * 20;



    // render the scene
    renderer.render(scene, camera);
}
animate();


