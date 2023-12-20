// loaderSetup.js

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
// Loaders
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


export function loadGLTFModel(scene, modelPath, texturePath, onLoad, onProgress, onError) {
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    loader.load(modelPath,
        (gltf) => {
            const model = gltf.scene;

            // Load the texture
            textureLoader.load(texturePath, (texture) => {
                model.traverse((child) => {
                    if (child.isMesh) {
                        // Apply texture to each mesh
                        child.material.map = texture;
                        child.material.needsUpdate = true;
                    }
                });

                // Scale and position the model
                model.scale.set(0.02, 0.02, 0.02);
                model.position.set(0, -2, 0);

                // Add the model to the scene
                scene.add(model);
            });

            if (onLoad) onLoad(gltf);
        },
        onProgress,
        onError
    );
}

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////

export function initLoaders(scene) {
    const manager = new THREE.LoadingManager();
    const loader = new THREE.GLTFLoader(manager);

    // Callbacks for the Loading Manager
    manager.onStart = function () {
        console.log('Loading started');
    };

    manager.onLoad = function () {
        console.log('Loading complete');
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + ' (' + itemsLoaded + '/' + itemsTotal + ')');
    };

    manager.onError = function (url) {
        console.log('There was an error loading ' + url);
    };

    // Load each model
    loader.load('models/model1/model1.gltf', function (gltf) {
        scene.add(gltf.scene);
    });

    loader.load('models/model2/model2.gltf', function (gltf) {
        const model = gltf.scene;

        // Scale the model
        model.scale.set(0.5, 0.5, 0.5); // Scale to half its size

        // Position the model
        model.position.set(0, 0, 0); // Position at the origin

        scene.add(model);
    });

    // Add more models as needed
}
