import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
console.log("THREE object is loaded 😄, here is the THREE object: ", THREE);

/**
 * STEPS TO CREATE A THREE.JS SCENE
 * 1. Create a scene
 * 2. Create a camera
 * 3. Create a renderer
 * 4. Add camera to scene
 * 5. Add renderer to DOM
 * 6. Add objects to scene
 * 7. Render scene
 * 8. Animate scene
 * 
 */

function main() {

    /////////////////////////////////////////////////////////////////////////////
    // SCENE < > CAMERA
    ///////////////////////////////////////////////////////////////////////////

    // get the canvas element from the DOM
    const canvas = document.querySelector('#c');

    const scene = new THREE.Scene();

    // camera with perspective projection
    const fov = 75; // field of view (degrees)
    // const aspect = 2; // how many * bigger the width times height
    const aspect = canvas.clientWidth / canvas.clientHeight; // default
    const near = 0.1; // near clipping plane (anything closer than this will not be rendered)
    const far = 500; // for far clipping plane (anything further than this will not be rendered)

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    // const width = canvas.clientWidth;
    // const height = canvas.clientHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);


    // controls
    // new THREE.OrbitControls(camera, canvas);
    // controls.target.set(0, 0, 0);
    // controls.update();


    scene.add(camera);

    // set camera position
    camera.position.set(0, 20, 20)


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////// Background Images//////////////////// 
    // const imgUrl1 = '/Images/assets/artGallery1Index/low-angle-shot-mesmerizing-starry-sky.jpg';
    // const imgUrl2 = '/Images/assets/artGallery1Index/astronomy.png';
    const imgUrl3 = '/Images/assets/artGallery1Index/ultra-detailed-nebula-abstract-wallpaper-4.jpg';

    const loader = new THREE.TextureLoader();
    const texture = loader.load(imgUrl3, () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
        rt.fromEquirectangularTexture(renderer, texture);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipMapLinearFilter; // Use mipmapping for better performance

        scene.background = rt.texture;
    });



    function onWindowResize() {
        // update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        // update camera frustum
        camera.updateProjectionMatrix();
        // update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize, false);


    // controls
    // const controls = new OrbitControls(camera, canvas);
    // controls.target.set(0, 0, 0);
    // controls.update();

    // ******************************************************************************************************************************************************************************************************************************************** //

    // ADD CONTROLS TO MOVE with mouse
    const cursorControls = new PointerLockControls(camera, renderer.domElement);

    // // At the start, after setting up the camera
    // const defaultPosition = new THREE.Vector3().copy(camera.position);
    // const defaultRotation = new THREE.Euler().copy(camera.rotation);

    cursorControls.addEventListener('unlock', () => {
        console.log('Pointer Unlocked.');
        // camera.position.copy(defaultPosition);
        // camera.rotation.copy(defaultRotation);
    });
    renderer.domElement.addEventListener('click', () => {
        if (cursorControls.isLocked === true) {
            cursorControls.unlock();
            // showMenu();
        } else {
            cursorControls.lock();
            // hideMenu();
        }
    });

    cursorControls.addEventListener('lock', () => console.log('Pointer Locked.'));
    cursorControls.addEventListener('unlock', () => console.log('Pointer Unlocked.'));

    // ADD CONTROLS TO MOVE with arrows and w, a, s, d

    document.addEventListener('keydown', onKeyDown, true);

    // function to move camera with keyboard when key is pressed
    // 37 - left, 38 - down, 39 - right, 40 - up
    function onKeyDown(event) {
        let keycode = event.which;

        if (keycode === 39 || keycode === 68) // right arrow key
        {
            // camera.translateX( 0.05 );
            camera.translateX(0.12);
        }
        if (keycode === 37 || keycode === 65) // left arrow key
        {
            // camera.translateX( -0.05 );
            camera.translateX(-0.12);
        }
        if (keycode === 38 || keycode === 87) // up arrow key
        {
            camera.translateZ(-0.15);

        }
        else if (keycode === 40 || keycode === 83) // down arrow key
        {
            camera.translateZ(0.12);

        }
    }

    /////////////////////////////////////////////////////////////////////////////
    // CREATE OBJECTS
    /////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////
    // TEXTURE FUNCTION TO WRAP OBJECTS
    ///////////////////////////////////////////////////////////////////////////////

    function objectTexture(url) {
        const objectTexture = new THREE.TextureLoader().load(url);
        objectTexture.wrapS = THREE.RepeatWrapping;
        objectTexture.wrapT = THREE.RepeatWrapping;
        objectTexture.minFilter = THREE.LinearMipMapLinearFilter;
        objectTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        objectTexture.colorSpace = THREE.SRGBColorSpace;

        return objectTexture;

    };


    /////////////////////////////////////////////////////////////////////////////
    // FLOOR with TEXTURES
    /////////////////////////////////////////////////////////////////////////////

    // add Textures to objects

    // create texture for floor

    // const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/marble.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/metal_galvanised_grey_texture.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/wood_floor.jpg');

    // const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/herringbone_parquet_diff_1k.jpg');

    const floorTexture = new THREE.TextureLoader().load('../Images/assets/artGallery1Index/astronomy.png');

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    floorTexture.minFilter = THREE.LinearMipMapLinearFilter; // Use mipmapping for better performance
    floorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    floorTexture.colorSpace = THREE.SRGBColorSpace;

    // create plane geometry
    const planeGeometry = new THREE.PlaneGeometry(82, 82);

    let planeMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
        roughness: 0.5
    });

    // create floor
    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial)

    scene.add(floorPlane);


    // set position of floor
    floorPlane.rotation.x = Math.PI / -2; // 90 degree clockwise
    floorPlane.position.y = -Math.PI / 2; // 180 degree clockwise


    ///////////////////////////////////////////////////////////////////////////
    //
    // //LOD - Level of Detail //
    // Assuming you have two models: highPolyModel and lowPolyModel
    // and they are already loaded (e.g., via GLTFLoader)
    // 
    ///////////////////////////////////////////////////////////////////////////

    // // Create a LOD instance
    // const lod = new THREE.LOD();

    // // Add high detail model for close distance
    // lod.addLevel(highPolyModel, 100); // Use high-poly model within 100 units from the camera

    // // Add low detail model for far distance
    // lod.addLevel(lowPolyModel, 200); // Switch to low-poly model when the camera is further than 200 units

    // // Add LOD to scene
    // scene.add(lod);


    /////////////////////////////////////////////////////////////////////////////
    // CREATE WALLS - left wall, right wall, back wall, ceiling
    /////////////////////////////////////////////////////////////////////////////

    const wallGroup = new THREE.Group(); // create a group to hold the walls
    scene.add(wallGroup)

    const frontWall1 = new THREE.Mesh(
        new THREE.BoxGeometry(40, 15, 0.005),
        // new THREE.MeshBasicMaterial({ color: 0xaf00af }) // purple
    );
    frontWall1.position.z = -25;

    const backWall1 = new THREE.Mesh(
        new THREE.BoxGeometry(40, 15, 0.05),
        new THREE.MeshBasicMaterial({ color: 0x00afaf }) // blue
    );
    backWall1.position.z = 25;

    const leftWall1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 15, 40),
        new THREE.MeshBasicMaterial({ color: 0x00af02 }) // green
    );
    leftWall1.position.x = 25;

    const rightWall1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 15, 40),
        new THREE.MeshBasicMaterial({ color: 0xffaa02 }) // orange
    );
    rightWall1.position.x = -25;



    wallGroup.add(frontWall1, leftWall1, rightWall1, backWall1);

    // texture walls
    wallGroup.position.y = 5;

    ///////////////////////////////////////////////////////////////////////////////
    const newWallGroup = new THREE.Group(); // create a group to hold the walls
    scene.add(newWallGroup)

    const frontWall2 = new THREE.Mesh(
        new THREE.BoxGeometry(40, 15, -0.010),
        new THREE.MeshBasicMaterial({ color: 0xaf00af }) // purple
    );
    frontWall2.position.z = -50
    frontWall2.position.x = -25;

    const backWall2 = new THREE.Mesh(
        new THREE.BoxGeometry(40, 15, 0.05),
        new THREE.MeshBasicMaterial({ color: 0x00afaf }) // blue
    );
    backWall2.position.x = 25;

    const leftWall2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 15, 40),
        new THREE.MeshBasicMaterial({ color: 0x00af02 }) // green
    );
    leftWall2.position.z = 25;

    const rightWall2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.001, 15, 40),
        new THREE.MeshBasicMaterial({ color: 0xffaa02 }) // orange
    );
    rightWall2.position.z = -25;

    // purple blue green orange
    newWallGroup.add(frontWall2, leftWall2, rightWall2, backWall2);

    // texture walls
    newWallGroup.position.y = 5;

    ///////////////////////////////////////////////////////////////////////////////
    // TEXTURE  WRAP WALL OBJECTS
    ///////////////////////////////////////////////////////////////////////////////


    frontWall1.material.map = objectTexture('../Images/assets/artGallery1Index/castle.jpg');

    backWall1.material.map = objectTexture('../Images/assets/artGallery1Index/museum.jpg');

    leftWall2.material.map = objectTexture('../Images/assets/artGallery1Index/castle.jpg');

    rightWall2.material.map = objectTexture('../Images/assets/artGallery1Index/aigen-awe.png');



    /////////////////////////////////////////////////////////////////////////////
    // CREATE PAINTINGS 
    /////////////////////////////////////////////////////////////////////////////

    function createPainting(imageUrl, width, height, position) {
        const textureLoader = new THREE.TextureLoader();
        const paintingTexture = textureLoader.load(imageUrl);
        paintingTexture.colorSpace = THREE.SRGBColorSpace;
        paintingTexture.minFilter = THREE.LinearMipMapLinearFilter; // Use mipmapping for better performance
        paintingTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        const paintingGeometry = new THREE.PlaneGeometry(width, height);

        const paintingMaterial = new THREE.MeshBasicMaterial({
            map: paintingTexture,
            emissive: 0xffffff,
            emissiveMap: paintingTexture,
            side: THREE.DoubleSide,
        });

        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);

        painting.position.set(position.x, position.y, position.z);


        return painting;
    };

    const painting1 = createPainting(
        '../Images/assets/artGallery1Index/aigen-awe.png',
        5, 9,
        new THREE.Vector3(-5, 5, -24.99)
    );

    const painting2 = createPainting(
        '../Images/assets/artGallery1Index/museum.jpg',
        10, 10,
        new THREE.Vector3(15, 1, -24.99)
    );

    // const painting3 = createPainting();

    scene.add(painting1, painting2);


    /////////////////////////////////////////////////////////////////////////////
    // ADD A BOUNDING BOX FOR COLLISIONS 
    /////////////////////////////////////////////////////////////////////////////

    // function setupBoundingBox(object) {
    //     object.BBox = new THREE.Box3().setFromObject(object);
    // }
    // setupBoundingBox(leftWall);
    // setupBoundingBox(rightWall);
    // setupBoundingBox(frontWall);
    // setupBoundingBox(backWall);
    // setupBoundingBox(floorPlane);
    // setupBoundingBox(polyhedron);


    ///////////////////////////////////////////////////////////////////////////////
    // Collision Detection
    //////////////////////////////////////////////////////////////////////////////

    // ******************************************************************************************************************************************************************************************************************************************** //






    /////////////////////////////////////////////////////////////////////////////
    // SCENE LIGHTING
    /////////////////////////////////////////////////////////////////////////////

    // Set lighting parameters

    // - to see the objects in the scene
    // color, intensity (0-1), distance, decay - params for light
    let ambientLight = new THREE.AmbientLight(0xffffff, 1);

    // position the light - x, y, z - params for position of light
    // not recommended to set camera position to light position
    // ambient light is not affected by position it covers all objects in scene equally
    scene.add(ambientLight);

    // directional light - shines in a specific direction
    // color, intensity, distance, decay
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);

    scene.add(directionalLight);

    // set position to directional light - y axis above the scene - shines down
    directionalLight.position.y = 50;

    // set a pointer light to follow the camera around
    // color, intensity, distance, decay
    let pointerLight = new THREE.HemisphereLight(0xffffff, 1.0, 100);
    pointerLight.position.set(0, 22, 0);
    scene.add(pointerLight);

    // set a point light to follow the camera around
    // color, intensity, distance, decay
    let pointLight = new THREE.PointLight(0xffffff, 1.0, 100);
    pointLight.position.set(0, 52, 0);
    scene.add(pointLight);

    // set a spot light to follow the camera around
    // color, intensity, distance, decay
    let spotLight = new THREE.SpotLight(0xffffff, 1.0, 100);
    spotLight.position.set(0, 22, 0);
    scene.add(spotLight);

    /////////////////////////////////////////////////////////////////////////////
    // ANIMATION
    /////////////////////////////////////////////////////////////////////////////

    function renderAnimation() {

        requestAnimationFrame(renderAnimation);

        // floorPlane.rotation.z += 0.0005;
        scene.rotation.y += 0.0002;

        renderer.render(scene, camera);
    } // end render()

    requestAnimationFrame(renderAnimation);

} // end main()

main();
