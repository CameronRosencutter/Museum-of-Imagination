// controls.js
import * as THREE from 'three';
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';

//////////////////////////////////////////////////////////////////////////////
// Pointer Lock Controls - Key bindings for camera movement
//////////////////////////////////////////////////////////////////////////////
export function initControls(camera, renderer) {
    // Pointer Lock Controls
    const cursorControls = new PointerLockControls(camera, renderer.domElement);

    // function to toggle pointer lock state
    function togglePointerLock() {
        if (cursorControls.isLocked === true) {
            cursorControls.unlock();
            cursorControls.addEventListener('unlock', () => console.log('Pointer Unlocked.'));
        } else {
            cursorControls.lock();
            cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
        }
    }
    // Add event listener to lock the pointer
    renderer.domElement.addEventListener('click', togglePointerLock);


    // Set the camera to be able to move with the keyboard
    // Add the event listener for keydown
    document.addEventListener('keydown', onKeyDown, false);

    // Function to move camera with keyboard when key is pressed
    // 37 - left, 38 - up, 39 - right, 40 - down
    function onKeyDown(event) {
        let keycode = event.which;

        // proposed new position
        let newPosition = camera.position.clone();

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
            camera.translateZ(-0.15);
        }
        // Down arrow key or 'S' key
        else if (keycode === 40 || keycode === 83) {
            camera.translateZ(0.15);
        }
    }; // end of onKeyDown function

    return cursorControls;
} // end of initControls

//////////////////////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////////////////////
