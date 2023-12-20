// animation.js

import * as THREE from 'three';


/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////



// Render Loop - render the scene every time the screen is refreshed
// animate function is called 60 times per second
export function animate(scene, camera, renderer, objects) {

    function render() {
        requestAnimationFrame(render);


        // Rotate the dome
        if (objects.dome) {
            objects.dome.rotation.y += 0.0006;
        }


        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;
        renderer.render(scene, camera);
    }
    render();
}
