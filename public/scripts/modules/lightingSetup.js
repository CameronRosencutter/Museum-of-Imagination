// lightingSetup.js

import * as THREE from 'three';

// lights - to see the objects in the scene
// - params for light
// color, intensity (0-1), distance, decay
// position the light - x, y, z - params for position of light
// not recommended to set camera position to light position

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
function createAmbientLight() {
    // ambient light is not affected by position it covers all objects in scene equally
    let ambientLight = new THREE.AmbientLight(0x000000, 1.0);

    ambientLight.position.set(0, 0, 0)

    // return light for adding to scene
    return ambientLight;
}

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
function createDirectionalLight() {
    // directional light - shines in a specific direction
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);

    // set position to directional light - y axis above the scene - shines down
    directionalLight.position.set(0, 30, 0);

    return directionalLight;
}

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
function createHemisphereLight(camera) {
    // create hemisphere light from camera position
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0.5, 100);

    hemisphereLight.position.copy(camera.position);

    return hemisphereLight;
}

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// Main lighting setup function
export function lightingSetup(scene, camera) {
    const ambientLight = createAmbientLight();
    scene.add(ambientLight);

    const directionalLight = createDirectionalLight();
    scene.add(directionalLight);

    const hemisphereLight = createHemisphereLight(camera);
    scene.add(hemisphereLight);

    // return lights for adding to scene
    return { ambientLight, directionalLight, hemisphereLight };
}
