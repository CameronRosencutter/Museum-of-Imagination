// utility.js

import * as THREE from 'three';

//////////////////////////////////////////////////////////////////////
// Bounding Box
//////////////////////////////////////////////////////////////////////////////

// export function setUpBoundingBox(object) {
//     object.BBox = new THREE.Box3().setFromObject(object);

//     return object;
// };

//////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
export const setUpBoundingBox = (objects) => {
    // objects will be either paintings or walls that we pass in from main.js
    if (!Array.isArray(objects)) {
        objects = objects.children;
    }

    objects.forEach((object) => {
        object.BoundingBox = new THREE.Box3(); // create a new bounding box for each object
        object.BoundingBox.setFromObject(object); // set the bounding box to the object (painting or wall)
    });
};

//////////////////////////////////////////////////////////////////////
// Check Collision
//////////////////////////////////////////////////////////////////////////////

export function checkCollision(cameraPosition, roomGroup) {
    let cameraBoundingBox = new THREE.Box3().setFromObject(cameraPosition);

    // Check collision with walls in the roomGroup
    for (let i = 0; i < roomGroup.children.length; i++) {
        let object = roomGroup.children[i];
        if (object.BBox && cameraBoundingBox.intersectsBox(object.BBox)) {
            console.log("collision detected");
            return true;
        }
    }
    return false;
}


///////////////////////////////////////////////////////////////////////
// Create Textured Mesh
//////////////////////////////////////////////////////////////////////////////

export function createTexturedMesh(geometry, textureUrl, callback) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(textureUrl, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);

        if (callback) {
            callback(mesh);
        }
    });
}

///////////////////////////////////////////////////////////////////////
// Create Textured Mesh
export function objectTexture(url, options = {}) {


    const objectTexture = new THREE.TextureLoader().load(url);
    objectTexture.wrapS = THREE.RepeatWrapping;
    objectTexture.wrapT = THREE.RepeatWrapping;

    if (options.repeat) {
        objectTexture.repeat.set(options.repeat.x, options.repeat.y);
    }

    if (url === '../Images/assets/artGallery1Index/herringbone_parquet_diff_1k.jpg') {
        objectTexture.repeat.set(10, 10);
    }

    objectTexture.colorSpace = THREE.SRGBColorSpace;

    return objectTexture;

};

///////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////
