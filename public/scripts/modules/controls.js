// controls.js
import * as THREE from 'three';
import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { showMenu, hideMenu } from './menu.js';


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
            showMenu();
        } else {
            cursorControls.lock();
            cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
            hideMenu();
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
        console.log(keycode);

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
            event.preventDefault();
            // Prevents the default action (scrolling in this case)
            camera.translateZ(-0.15);
        }
        // if the "Q key is pressed
        if (keycode === 81) {
            // rotate camera to the left
            camera.rotateY(0.15);
        }
        // if the "E" key is pressed
        if (keycode === 69) {
            // rotate camera to the right
            camera.rotateY(-0.15);
        }
        // Down arrow key or 'S' key
        if (keycode === 40 || keycode === 83) {
            // Prevents the default action (scrolling in this case)
            camera.translateZ(0.15);
        }
        // // if the "SPACE" key is pressed
        // if (keycode === 32) {
        //     event.preventDefault();
        //     // Replace with your desired URL
        //     window.location.href = 'https://github.com/CameronRosencutter/Museum-of-Imagination';
        // }
        // Escape key
        if (keycode === 27) {
            showMenu();

        }
    }; // end of onKeyDown function

    return cursorControls;
} // end of initControls

//////////////////////////////////////////////////////////////////////////////
// 
//////////////////////////////////////////////////////////////////////////////
