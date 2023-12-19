// animation.js

import * as THREE from 'three';
// import { checkCollision } from './movement.js';

/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////



// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
export function animate(scene, camera, renderer, objects) {
    function render() {
        requestAnimationFrame(render);



        // if (checkCollision(camera)) {
        //     // Move the camera backward
        //     const backward = new THREE.Vector3();
        //     camera.getWorldDirection(backward);
        //     backward.multiplyScalar(-0.05); // Adjust this value as needed
        //     camera.position.add(backward);
        // }



        if (objects.dome) {
            objects.dome.rotation.y += 0.0006;
        }

        renderer.render(scene, camera);
    }
    render();
}
