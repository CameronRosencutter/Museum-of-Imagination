// loaderSetup.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function loadTexture(url, callback) {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(url, (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);

        texture.colorSpace = THREE.SRGBColorSpace;
    });
    if (callback) {
        callback(texture);
    }
};

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function initLoaders() {
    // Example: Initialize a GLTF Loader if you plan to use it
    const gltfLoader = new GLTFLoader();
    // You can load models here or return the loader for use elsewhere

    // Example: Initialize an RGBE Loader if you plan to use it
    const rgbeLoader = new RGBELoader();
    // Similar to the GLTFLoader, load HDR environments or return the loader

    // Return the loaders if you want to use them outside this function
    return { gltfLoader, rgbeLoader };
}

// // Load GLTF Model function
// export function loadGLTFModel(scene, glbPath, onLoad, onProgress, onError) {
//     const gltfLoader = new GLTFLoader();

//     gltfLoader.load(
//         glbPath,
//         (gltf) => {
//             scene.add(gltf.scene);
//             if (onLoad) onLoad(gltf);
//         },
//         (xhr) => {
//             if (onProgress) onProgress(xhr);
//         },
//         (error) => {
//             console.error('An error happened', error);
//             if (onError) onError(error);
//         }
//     );
// }

// Load GLTF Model function
export function loadGLTFModel(scene, modelPath, onLoad, onProgress, onError) {
    const gltfLoader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
        modelPath,
        (gltf) => {
            scene.add(gltf.scene);
            if (onLoad) onLoad(gltf);
        },
        (xhr) => {
            if (onProgress) onProgress(xhr.loaded / xhr.total * 100);
        },
        (error) => {
            console.error('An error happened', error);
            if (onError) onError(error);
        }
    );
}

// // The OBJ loader code can be commented out or removed

// // instantiate a loader
// const loader = new OBJLoader();

// // load a resource
// loader.load(
//     // resource URL
//     '',
//     // called when resource is loaded
//     function (object) {

//         scene.add(object);

//     },
//     // called when loading is in progresses
//     function (xhr) {

//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');

//     },
//     // called when loading has errors
//     function (error) {

//         console.log('An error happened');

//     }
// );
