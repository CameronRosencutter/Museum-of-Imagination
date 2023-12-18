/** FOR INDEX HTML - ART GALLERY */
// console log for inspector to see if THREE is loaded
console.log("THREE object is loaded 😄, here is the THREE object: ", THREE)
import * as THREE from 'three';

import { initScene } from './sceneSetup.js';
import { initControls } from './controls.js';
import { addObjects } from './objects.js';
import { animate } from './animation.js';
import { onWindowResize } from './utility.js';
import { audioSetup } from './musicSetup.js';
// import { loadGLTFModel } from './loaderSetup.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
// import { checkCollision } from './movement.js';
// import { initLoaders } from './loadersSetup.js';
// import { lightingSetup } from './lightingSetup.js';
// import { objectTexture } from '/modules/utility.js';
// import { setUpBoundingBox } from './utility.js';

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

window.addEventListener('resize', onWindowResize, false);


// Initialize the scene, camera, and renderer
const { scene, camera, renderer } = initScene();
console.log(scene, camera, renderer); // Check if these are defined


// Initialize controls
initControls(camera, renderer);

// Add objects to the scene and receive any objects that might be needed for animation
// // Call addObjects and handle the asynchronous operation
addObjects(scene, (objects) => {
    animate(scene, camera, renderer, objects);
}).catch(error => {
    console.error('An error occurred loading objects:', error);
});

// Initialize audio
audioSetup(camera);

// if (checkCollision(camera)) {
//     // Move the camera backward
//     const backward = new THREE.Vector3();
//     camera.getWorldDirection(backward);
//     backward.multiplyScalar(-0.05); // Adjust this value as needed
//     camera.position.add(backward);
// }



////////////////////////////////////////////////////////////////////////////////

let lockPointer = true;

function exitOnEsc(event) {

    let keycode = event.which;
    cursorControls.unlock(); // unlock the pointer
    lockPointer = false;
    console.log("Escape key pressed"); // For debugging
    if (keycode === 27) {
        console.log("Navigating to new page"); // For debugging
        window.location.href = '../homepage.html';
    }
}
// // Add event listener to exit on escape key
document.addEventListener('keydown', exitOnEsc, false);

// //////////////////////////////////////////////////////////////////////////////
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled


// loadGLTFModel(scene, '../models/mossy_water_fountain_free__agustin_honnun/scene.gltf', onLoadFunction, onProgressFunction, onErrorFunction);

// loadGLTFModel(scene, '../models/mossy_water_fountain_free__agustin_honnun/scene.gltf',
//     (gltf) => {
//         console.log('Model loaded', gltf);
//         // Set the scale of the model
//         gltf.scene.scale.set(0.5, 0.5, 0.5);
//         // Set the position of the model
//         gltf.scene.position.set(0, 0, 0);
//         // Add the model to the scene
//         scene.add(gltf.scene);
//     },
//     (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded'); },
//     (error) => { console.error('Error loading model', error); }
// );


