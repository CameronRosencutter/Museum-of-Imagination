import * as THREE from 'three';
import { lightingSetup } from './lightingSetup.js';

// sceneSetup.js
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
export function initScene() {
    // scene
    const scene = new THREE.Scene();

    // camera(fov(vision angle), aspectRatio(w/h), near, far)
    const camera = new THREE.PerspectiveCamera(
        75, // fov
        window.innerWidth / window.innerHeight, // aspect ratio
        0.1, // near plane
        1000); // far plane

    // renderer creates CANVAS sets size and adds element in DOM
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // set clear color to white
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement);


    /////////// Background Images//////////////////// 

    const imgUrl = '../Images/building1.jpg';

    const loader = new THREE.TextureLoader();
    const texture = loader.load(imgUrl, () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
        rt.fromEquirectangularTexture(renderer, texture);
        // texture.generateMipmaps = true;
        texture.colorSpace = THREE.SRGBColorSpace;
        // texture.minFilter = THREE.LinearMipMapLinearFilter; // Use mipmapping for better performance

        scene.background = rt.texture;
    });



    // add camera to scene
    scene.add(camera);

    // move the camera back 5 units on the z axis so we can see the scene position
    camera.position.z = 5;

    // setup lighting parameters
    lightingSetup(scene, camera);

    // Add more lights or adjust the setup as needed


    return { scene, camera, renderer };
}
