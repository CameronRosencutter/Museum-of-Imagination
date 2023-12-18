import * as THREE from 'three';

// object to hold the keys pressed
export const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
};

// parameters we get from setupRendering where updateMovement is called. setupRendering gets the parameters from main.jsss
export const updateMovement = (delta, controls, camera, walls) => {
    const moveSpeed = 10 * delta;

    const previousPosition = camera.position.clone(); // clone the camera position and store it use this to reset the camera position if there is a collision

    // keyboard controls
    if (keysPressed.ArrowRight || keysPressed.d) {
        controls.moveRight(moveSpeed);
    }
    if (keysPressed.ArrowLeft || keysPressed.a) {
        controls.moveRight(-moveSpeed);
    }
    if (keysPressed.ArrowUp || keysPressed.w) {
        controls.moveForward(moveSpeed);
    }
    if (keysPressed.ArrowDown || keysPressed.s) {
        controls.moveForward(-moveSpeed);
    }

    //  check for collisions. If collision -
    if (checkCollision(camera, walls)) {
        // reset the camera position to the previous position.
        camera.position.copy(previousPosition);
    }
};

// function to check for collisions
export const checkCollision = (camera, walls) => {
    // create a bounding box for the camera as player
    const playerBoundingBox = new THREE.Box3();
    // create a vector to hold the camera's world position
    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);
    // set the playerBoundingBox to the camera's world position and size.
    playerBoundingBox.setFromCenterAndSize(
        cameraWorldPosition, // center
        new THREE.Vector3(1, 1, 1) // size
    );
    // loop through each wall
    for (let i = 0; i < walls.children.length; i++) {

        const wall = walls.children[i];

        // check if the playerBoundingBox meets the wall's bounding box
        if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
            // collision detected
            return true;
        }
    }

    return false;
};
