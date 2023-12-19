/** FOR INDEX HTML - ART GALLERY */
// console log for inspector to see if THREE is loaded
console.log("THREE object is loaded 😄, here is the THREE object: ", THREE)
import * as THREE from 'three';

import { initScene } from './sceneSetup.js';
import { initControls } from './controls.js';
import { addObjects } from './objects.js';
import { animate } from './animation.js';

import { audioPause, audioSetup, audioStart, audioStop } from './musicSetup.js';
// import { initLoaders } from './loaderSetup.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

// import { loadGLTFModel } from './loaderSetup.js';
// import { checkCollision } from './movement.js';
// import { initLoaders } from './loadersSetup.js';
// import { lightingSetup } from './lightingSetup.js';
// import { objectTexture } from '/modules/utility.js';
// import { setUpBoundingBox } from './utility.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { playButtonSetup } from './menu.js';

// //////////////////////////////////////////////////////////////////////////////

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

// //////////////////////////////////////////////////////////////////////////////


// Initialize the scene, camera, and renderer
const { scene, camera, renderer } = initScene();
console.log(scene, camera, renderer); // Check if these are defined

// Initialize audio
audioSetup(camera);




// Initialize controls
initControls(camera, renderer);

export function onWindowResize() {
    // update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // update camera frustum
    camera.updateProjectionMatrix();
    // update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    return camera;
}
// Add event listener for window resizing
window.addEventListener('resize', onWindowResize, false);


// Add objects to the scene and receive any objects that might be needed for animation
// // Call addObjects and handle the asynchronous operation
addObjects(scene, (objects) => {
    animate(scene, camera, renderer, objects);
}).catch(error => {
    console.error('An error occurred loading objects:', error);
});


// //////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////


// //////////////////////////////////////////////////////////////////////////////
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

// Add event listener for play button
playButtonSetup(controls);
// loadGLTFModel(scene, '../models/mossy_water_fountain_free__agustin_honnun/scene.gltf', onLoadFunction, onProgressFunction, onErrorFunction);


// Assuming texture paths
const baseColorPath = '../models/mossy_water_fountain_free__agustin_honnun/textures/Fountain_Material_baseColor.png';
const metallicRoughnessPath = '../models/mossy_water_fountain_free__agustin_honnun/textures/Fountain_Material_metallicRoughness.png';
const normalPath = '../models/mossy_water_fountain_free__agustin_honnun/textures/Fountain_Material_normal.png';

// Load textures
const textureLoader = new THREE.TextureLoader();
const baseColorTexture = textureLoader.load(baseColorPath);
const metallicRoughnessTexture = textureLoader.load(metallicRoughnessPath);
const normalTexture = textureLoader.load(normalPath);

// loadGLTFModel(scene, '../models/mossy_water_fountain_free__agustin_honnun/scene.gltf',
//     (gltf) => {
//         console.log('Model loaded', gltf);

//         // Add the model to the scene
//         scene.add(gltf.scene);

//         // Set the scale of the model
//         gltf.scene.scale.set(0.02, 0.02, 0.02);
//         // Set the position of the model
//         gltf.scene.position.set(0, -2, 0);

//         // Apply textures to the model
//         model.traverse((child) => {
//             if (child.isMesh) {
//                 child.material = new THREE.MeshStandardMaterial({
//                     map: baseColorTexture,
//                     metalnessMap: metallicRoughnessTexture,
//                     roughnessMap: metallicRoughnessTexture,
//                     normalMap: normalTexture
//                 });
//             }
//         });
//     },
//     (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
//     (error) => { console.error('Error loading model', error); }
// );

const gltfFountain = new GLTFLoader();

gltfFountain.load('../models/mossy_water_fountain_free__agustin_honnun/scene.gltf', (gltf) => {
    const model = gltf.scene;

    // Set the scale of the model
    model.scale.set(0.1, 0.1, 0.1);
    // Set the position of the model
    model.position.set(0, -30, 0);

    scene.add(model);

});
