// objects.js

import * as THREE from 'three';
import { setUpBoundingBox, objectTexture } from './utility.js';
// import { initScene } from './sceneSetup.js';


/////////////////////////////////////////////////////////////////////////////
// Create Objects Plane for ROOM and paintings on the walls
///////////////////////////////////////////////////////////////////////

// Create a plane
export function createPlane(options) {
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

    // Set up bounding box if needed
    if (options.bBox) {
        setUpBoundingBox(plane);
    }

    return plane;
}


/////////////////////////////////////////////////////////////////////////////
// FUNCTION TO ADD OBJECTS TO SCENE
/////////////////////////////////////////////////////////////////////////////

// Main function to add objects to the scene
export async function addObjects(scene, callback = null) {

    // // create ceiling

    // dome ceiling 
    // dome ceiling 
    const radius = 40;
    const sphereGeometry = new THREE.SphereGeometry(radius, 20, 10, 3, Math.PI * 2, 0, Math.PI / 2);
    const ceilingTexture = new THREE.TextureLoader().load('../Images/vibrantcity.jpg');
    // const ceilingTexture = new THREE.TextureLoader().load('../Images/image1_0.jpg');

    const ceilingMaterial = new THREE.MeshBasicMaterial({
        map: ceilingTexture,
        side: THREE.BackSide
    });

    const heightOfWalls = 5;
    const dome = new THREE.Mesh(sphereGeometry, ceilingMaterial);
    dome.position.y = heightOfWalls;
    scene.add(dome);


    // Create a group for the room
    const roomGroup = new THREE.Group();

    // Floor
    const floorOptions = {
        width: 50,
        height: 50,
        textureUrl: '../Images/assets/artGallery1Index/herringbone_parquet_diff_1k.jpg',
        position: { x: 0, y: -Math.PI / 2, z: 0 },
        rotation: { x: Math.PI / 2, y: 0, z: 0 },
        bBox: true
    };
    // Floor

    const floor = createPlane(floorOptions);
    roomGroup.add(floor);

    // Walls
    const wallHeight = 10;

    const leftWall = createPlane({
        width: 50,
        height: wallHeight,
        color: 0x526899f,
        position: { x: -25, y: 3, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    roomGroup.add(leftWall);

    const rightWall = createPlane({
        width: 50,
        height: wallHeight,
        color: 0xff688f,
        position: { x: 25, y: 3, z: 0 },
        rotation: { x: 0, y: -Math.PI / 2, z: 0 },
        bBox: true
    });
    roomGroup.add(rightWall);

    const frontWall = createPlane({
        width: 50,
        height: wallHeight,
        color: 0x071330,
        position: { x: 0, y: 3, z: -25 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    roomGroup.add(frontWall);

    const backWall = createPlane({
        width: 50,
        height: wallHeight,
        color: 0x071330,
        position: { x: 0, y: 3, z: 25 },
        rotation: { x: 0, y: Math.PI, z: 0 },
        bBox: true
    });
    roomGroup.add(backWall);

    // Add the room group to the scene
    scene.add(roomGroup);


    // Paintings
    const painting1 = createPlane({ //left wall
        width: 8,
        height: 5,
        textureUrl: '../Images/Museumopen.png',
        position: { x: -24.99, y: 3, z: 20 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting1);

    // Paintings
    const painting2 = createPlane({ // left wall
        width: 8,
        height: 5,
        textureUrl: '../Images/snowglobe.jpg',
        position: { x: -24.99, y: 3, z: 10 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting2);

    // Paintings
    const painting3 = createPlane({ // left wall
        width: 8,
        height: 5,
        textureUrl: '../Images/499ea6b3-0c41-4f76-b3b9-352c4c60c1ad.jpg',
        position: { x: -24.99, y: 3, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting3);

    // Paintings
    const painting4 = createPlane({ // left wall
        width: 8,
        height: 5,
        textureUrl: '../Images/540df13e-699d-435f-9201-ef7ee04126d9.jpg',
        position: { x: -24.99, y: 3, z: -10 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting4);

    // Paintings
    const painting5 = createPlane({ // left wall
        width: 8,
        height: 5,
        textureUrl: '../Images/0741e905-b043-4f09-bd3e-6283b6992624.jpg',
        position: { x: -24.99, y: 3, z: -20 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting5);

    const painting6 = createPlane({ // front wall
        width: 8,
        height: 5,
        textureUrl: '../Images/distortedglasshouse.jpg',
        position: { x: 20, y: 3, z: -24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting6);

    const painting7 = createPlane({ // front wall
        width: 8,
        height: 5,
        textureUrl: '../Images/3896eef8-f472-4c2a-bd2d-aa1f9c0d6c6f.jpg',
        position: { x: 10, y: 3, z: -24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting7);

    // Front wall, first painting (left-most)
    const painting8 = createPlane({ // front wall
        width: 8,
        height: 5,
        textureUrl: '../Images/bui.webp',
        position: { x: 0, y: 3, z: -24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting8);

    // Front wall, second painting
    const painting9 = createPlane({ // front wall
        width: 8,
        height: 5,
        textureUrl: '../Images/clockbuilding.jpg',
        position: { x: -10, y: 3, z: -24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting9);

    // Front wall, second painting
    const painting10 = createPlane({ // front wall
        width: 8,
        height: 5,
        textureUrl: '../Images/e8b323d2-392b-4695-84dc-2ff10f7b9c63.JPG',
        position: { x: -20, y: 3, z: -24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting10);

    // Paintings
    const painting11 = createPlane({ // right wall
        width: 8,
        height: 5,
        textureUrl: '../Images/floatingcityicon.png',
        position: { x: 24.99, y: 3, z: 20 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting11);


    const painting12 = createPlane({ // right wall
        width: 8,
        height: 5,
        textureUrl: '../Images/frozencity.jpg',
        position: { x: 24.99, y: 3, z: 10 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting12);


    const painting13 = createPlane({ // right wall
        width: 8,
        height: 5,
        textureUrl: '../Images/image.jpg',
        position: { x: 24.99, y: 3, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting13);


    const painting14 = createPlane({ // right wall
        width: 8,
        height: 5,
        textureUrl: '../Images/image.png',
        position: { x: 24.99, y: 3, z: -10 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting14);

    const painting15 = createPlane({ // right wall
        width: 8,
        height: 5,
        textureUrl: '../Images/image(2).jpg',
        position: { x: 24.99, y: 3, z: -20 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
        bBox: true
    });
    scene.add(painting15);

    const painting16 = createPlane({ // back wall
        width: 8,
        height: 5,
        textureUrl: '../Images/submergedhome.jpg',
        position: { x: 20, y: 3, z: 24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting16);

    const painting17 = createPlane({ // back wall
        width: 8,
        height: 5,
        textureUrl: '../Images/surrealhouse.png',
        position: { x: 10, y: 3, z: 24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting17);

    const painting18 = createPlane({ // back wall
        width: 8,
        height: 5,
        textureUrl: '../Images/hoveringfortress.jpg',
        position: { x: 0, y: 3, z: 24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting18);


    const painting19 = createPlane({ // back wall
        width: 8,
        height: 5,
        textureUrl: '../Images/vibrantcity.jpg',
        position: { x: -10, y: 3, z: 24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting19);


    const painting20 = createPlane({ // back wall
        width: 8,
        height: 5,
        textureUrl: '../Images/weirdbuilding.png',
        position: { x: -20, y: 3, z: 24.99 },
        rotation: { x: 0, y: 0, z: 0 },
        bBox: true
    });
    scene.add(painting20);

    if (callback) {
        callback({
            floor, dome, leftWall, rightWall, frontWall, backWall,
            painting1, painting2, painting3, painting4,
            //  painting5, painting6, painting7, painting8, painting9, painting10
        });
    }
}

///////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////
