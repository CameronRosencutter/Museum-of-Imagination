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
    const moveSpeed = 5 * delta; // moveSpeed is the distance the camera will move in one second. We multiply by delta to make the movement framerate independent. This means that the movement will be the same regardless of the framerate. This is important because if the framerate is low, the movement will be slow and if the framerate is high, the movement will be fast. This is not what we want. We want the movement to be the same regardless of the framerate.

    const previousPosition = camera.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

    // cose self-explanatory
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

    // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
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
