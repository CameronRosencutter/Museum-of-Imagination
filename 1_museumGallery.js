/** FOR INDEX HTML - ART GALLERY */
import * as THREE from 'three';
import { PointerLockControls } from './node_modules/three/examples/jsm/controls/PointerLockControls.js';

// // imports for add ons to THREE
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// import { audioPause, audioSetup, audioStart, audioStop } from '/scripts/modules/musicSetup.js';
// import { initLoader} from 'modules/loaderSetup.js';

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
const imgUrl2 = '../Images/assets/fantasy_9.webp';
const imgUrl3 = '../Images/assets/artGallery1Index/ultra-detailed-nebula-abstract-wallpaper-4.jpg';
const imgUrl4 = '../Images/assets/fantasy_10.webp';


const loader = new THREE.TextureLoader();
const texture = loader.load(imgUrl2, () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
    rt.fromEquirectangularTexture(renderer, texture);
    texture.generateMipmaps = true;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipMapLinearFilter; // Use mipmapping for better performance

    scene.background = rt.texture;
});

// add camera to scene
scene.add(camera);


// move the camera back 5 units on the z axis so we can see the scene position
camera.position.z = 5;
camera.position.y = 3;

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
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// position the light - x, y, z - params for position of light
// not recommended to set camera position to light position
// ambient light is not affected by position it covers all objects in scene equally
scene.add(ambientLight);

// directional light - shines in a specific direction
// color, intensity, distance, decay
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(20, 100, 10);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.0001;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
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
let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0.8, 100);
hemisphereLight.position.set(0, 24, 0);
scene.add(hemisphereLight);
hemisphereLight.visible = true; // turn off hemisphere light

// set a point light to follow the camera around
// color, intensity, distance, decay
let pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
pointLight.position.set(0, 24, 0);
scene.add(pointLight);
pointLight.visible = true; // turn off point light

// set a spot light to follow the camera around
// color, intensity, distance, decay
let spotLight = new THREE.SpotLight(0xffffff, 0.5, 100);
spotLight.position.set(0, 24, 0);
scene.add(spotLight);
spotLight.visible = true; // turn off spot light


renderer.outputEncoding = THREE.sRGBEncoding;


/////////////////////////////////////////////////////////////////////////////
// CONTROLS
/////////////////////////////////////////////////////////////////////////////

// ADD CONTROLS TO MOVE with mouse

function showMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
}

function hideMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}

// ADD CONTROLS TO MOVE with mouse
const cursorControls = new PointerLockControls(camera, renderer.domElement);

renderer.domElement.addEventListener('click', () => {
    if (cursorControls.isLocked === true) {
        cursorControls.unlock();
        showMenu();
    } else {
        cursorControls.lock();
        hideMenu();
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


    // Right arrow key or 'D' key
    if (keycode === 39 || keycode === 68) {
        camera.translateX(0.15);
    }

    // Left arrow key or 'A' key
    if (keycode === 37 || keycode === 65) {
        camera.translateX(-0.15);
    }

    // Up arrow key or 'W' key
    if (keycode === 38 || keycode === 87) {
        event.preventDefault();
        // Prevents the default action (scrolling in this case)
        camera.translateZ(-0.15);
    }

    // if the "Q key is pressed
    if (keycode === 81) {
        // rotate camera to the left
        camera.rotateY(0.15);
    }

    // if the "E" key is pressed
    if (keycode === 69) {
        // rotate camera to the right
        camera.rotateY(-0.15);
    }

    // Down arrow key or 'S' key
    if (keycode === 40 || keycode === 83) {
        // Prevents the default action (scrolling in this case)
        camera.translateZ(0.15);
    }

    // // if the "SPACE" key is pressed
    // if (keycode === 32) {
    //     event.preventDefault();
    //     // Replace with your desired URL
    //     window.location.href = 'https://github.com/CameronRosencutter/Museum-of-Imagination';
    // }

    // Escape key
    if (keycode === 27) {
        showMenu();

    }
}




/////////////////////////////////////////////////////////////////////////////
// CREATE OBJECTS
/////////////////////////////////////////////////////////////////////////////

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

const materialWorld = new THREE.MeshStandardMaterial({ color: 0x5f00ef, wireframe: true, wireframeLinewidth: 10, });

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

// scene.add(floorPlane);

// floorPlane.material.map = objectTexture('../images/artGallery1Index/astronomy.png'); // map for texture update

// set position of floor
floorPlane.rotation.x = Math.PI / 2; // 90 degree clockwise
floorPlane.position.y = -Math.PI / 2; // 180 degree clockwise

// add a bounding box for collisions
floorPlane.BBox = new THREE.Box3();
floorPlane.BBox.setFromObject(floorPlane);

scene.add(floorPlane);
/////////////////////////////////////////////////////////////////////////////
// CREATE WALLS - left wall, right wall, back wall, ceiling
/////////////////////////////////////////////////////////////////////////////


const wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup)

const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 13, 0.005),
    new THREE.MeshBasicMaterial({ color: 0xaf00af })
);
frontWall.position.z = -25;

const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50, 13, 0.05),
    new THREE.MeshBasicMaterial({ color: 0x00afaf })
);
backWall.position.z = 25;

const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.001, 13, 50),
    new THREE.MeshBasicMaterial({ color: 0x00af02 })
);
leftWall.position.x = 25;

const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.001, 13, 50),
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

rightWall.material.map = objectTexture('../Images/assets/artGallery1Index/castle.jpg');


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

// Create a plane
export function createPainting(options) {
    // Destructure options with default values
    const {
        width = 1,
        height = 1,
        color = 0xffffff,
        textureUrl = null,
        position = { x: 0, y: 0, z: 0 },
        rotation = { x: 0, y: 0, z: 0 },
        bBox = false, // Added this option for bounding box
    } = options;

    // Plane geometry
    const geometry = new THREE.PlaneGeometry(width, height);

    // Material
    let materialOptions = { color, side: THREE.DoubleSide };
    if (textureUrl) {
        // add objectTexture function from utility.js
        const texture = objectTexture(textureUrl);
        materialOptions.map = texture;
    }
    const material = new THREE.MeshBasicMaterial(materialOptions);

    // Plane mesh
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(position.x, position.y, position.z);
    plane.rotation.set(rotation.x, rotation.y, rotation.z);

    // // Set up bounding box if needed
    // if (options.bBox) {
    //     setUpBoundingBox(plane);
    // }

    return plane;
}


// Paintings
const painting1 = createPainting({ //left wall
    width: 8,
    height: 5,
    textureUrl: '../Images/Museumopen.png',
    position: { x: -24.99, y: 3, z: 20 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting1);

// Paintings
const painting2 = createPainting({ // left wall
    width: 8,
    height: 5,
    textureUrl: '../Images/cyberpunk.jpg',
    position: { x: -24.99, y: 3, z: 10 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting2);

// Paintings
const painting3 = createPainting({ // left wall
    width: 8,
    height: 5,
    textureUrl: '../Images/assets/artGallery1Index/aigen-awe.png',
    position: { x: -24.99, y: 3, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting3);

// Paintings
const painting4 = createPainting({ // left wall
    width: 8,
    height: 5,
    textureUrl: '../Images/10d625ce-efe9-472e-95f8-63427368a9d9.jpg',
    position: { x: -24.99, y: 3, z: -10 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting4);

// Paintings
const painting5 = createPainting({ // left wall
    width: 8,
    height: 5,
    textureUrl: '../Images/17d20236-9fe2-475b-b86f-5fd290b06068.jpg',
    position: { x: -24.99, y: 3, z: -20 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting5);

const painting6 = createPainting({ // front wall
    width: 8,
    height: 5,
    textureUrl: '../Images/80d4ece7-090e-45d0-b930-4b19c6b0601b.jpg',
    position: { x: 20, y: 3, z: -24.99 },
    rotation: { x: 0, y: 0, z: 0 },
    bBox: true
});
scene.add(painting6);

const painting7 = createPainting({ // front wall
    width: 8,
    height: 5,
    textureUrl: '../Images/319046ed-cf78-4216-b961-a51ad48faed9.jpg',
    position: { x: 10, y: 3, z: -24.99 },
    rotation: { x: 0, y: 0, z: 0 },
    bBox: true
});
scene.add(painting7);

// Front wall, first painting (left-most)
const painting8 = createPainting({ // front wall
    width: 8,
    height: 5,
    textureUrl: '../Images/clockthing.jpg',
    position: { x: 0, y: 3, z: -24.99 },
    rotation: { x: 0, y: 0, z: 0 },
    bBox: true
});
scene.add(painting8);

// Front wall, second painting
const painting9 = createPainting({ // front wall
    width: 8,
    height: 5,
    textureUrl: '../Images/buildingicons/weirdbuild.png',
    position: { x: -10, y: 3, z: -24.99 },
    rotation: { x: 0, y: 0, z: 0 },
    bBox: true
});
scene.add(painting9);

// Front wall, second painting
const painting10 = createPainting({ // front wall
    width: 8,
    height: 5,
    textureUrl: '../Images/d7d83c67-71a2-4ac9-8384-8d8907013c57.jpg',
    position: { x: -20, y: 3, z: -24.99 },
    rotation: { x: 0, y: 0, z: 0 },
    bBox: true
});
scene.add(painting10);

// Paintings
const painting11 = createPainting({ // right wall
    width: 8,
    height: 5,
    textureUrl: '../Images/e96f2fd6-7499-4352-8dd0-1fa3231f4e3b.jpg',
    position: { x: 24.99, y: 3, z: 20 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting11);


const painting12 = createPainting({ // right wall
    width: 8,
    height: 5,
    textureUrl: '../Images/forest1.jpg',
    position: { x: 24.99, y: 3, z: 10 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting12);


const painting13 = createPainting({ // right wall
    width: 8,
    height: 5,
    textureUrl: '../Images/image0_0.jpg',
    position: { x: 24.99, y: 3, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting13);


const painting14 = createPainting({ // right wall
    width: 8,
    height: 5,
    textureUrl: '../Images/image1_0.jpg',
    position: { x: 24.99, y: 3, z: -10 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting14);

const painting15 = createPainting({ // right wall
    width: 8,
    height: 5,
    textureUrl: '../Images/livingforest.jpg',
    position: { x: 24.99, y: 3, z: -20 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    bBox: true
});
scene.add(painting15);


// scene.add(painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8, painting9, painting10, painting11, painting12, painting13, painting14, painting15);

//////////////////////////////////////////////////////////////
// AUDIO
////////////////////////////////////////////////////////////////////

let sound = 0;
// track if audio buffer is loaded
let bufferLoaded = false;

// setup audio for the scene
export const audioSetup = (camera) => {

    document.getElementById("start_audio").addEventListener("click", audioStart);
    document.getElementById("pause_audio").addEventListener("click", audioPause);
    document.getElementById("stop_audio").addEventListener("click", audioStop);


    // create an audio listener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // creating the audio source
    sound = new THREE.Audio(listener);

    // create an audio loader
    const audioLoader = new THREE.AudioLoader();
    // load the audio file
    audioLoader.load("../audio/ethereal-voyage-161507.mp3", function (buffer) {
        // set the audio source buffer
        sound.setBuffer(buffer);
        // set the audio source to loop
        sound.setLoop(true);
        // set the audio source to autoplay
        sound.setVolume(0.1);
        // set to true when audio buffer is loaded
        bufferLoaded = true;
    });
}

// play audio
export const audioStart = () => {
    // check if the buffer is loaded before playing
    if (sound && bufferLoaded) {
        // play the audio
        sound.play();
    }
};

// pause audio
export const audioPause = () => {
    // if playing,
    if (sound) {
        // pause the audio
        sound.pause();
    }
};

// stop audio
export const audioStop = () => {
    // if playing,
    if (sound) {
        // stop the audio
        sound.stop();
    }
};

audioSetup(camera);

/////////////////////////////////////////////////////////////////////////////
// CREATE SCULPTURES
/////////////////////////////////////////////////////////////////////////////

// initLoaders(scene);

/////////////////////////////////////////////////////////////////////////////
// ANIMATION
/////////////////////////////////////////////////////////////////////////////

// animation

// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
function animate() {
    requestAnimationFrame(animate);

    // // Set the position of the light to the camera's position
    pointLight.position.copy(camera.position);

    // Shadow Configuration (if you have objects in the scene)
    renderer.shadowMap.enabled = true;
    renderer.colorSpace = THREE.sRGBColorSpace;
    // Rotate the dome about the vertical axis (Y-axis)
    dome.rotation.y += 0.0003; // Adjust the speed as needed

    // polyhedron rotation - x, y, z
    polyhedron.rotation.x += -0.001;
    polyhedron.rotation.y += -0.001;


    // render the scene
    renderer.render(scene, camera);
}
animate();


