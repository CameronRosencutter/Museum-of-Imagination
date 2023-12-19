
    import * as THREE from "three";
    import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AmbientLight } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { preloader } from "./loader";
    import { GLTFResolver } from "./loader/resolvers/GLTFResolver";
    
   

/* Init renderer and canvas */
const container = document.body;
const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("white");
container.style.overflow = "hidden";
container.style.margin = 0;
container.appendChild(renderer.domElement);

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 10;
camera.position.y = 2;

/* Lights */
const ambientLight = new AmbientLight(0xffffff, 0.8);
const frontLight = new PointLight(0xffffff, 0.8);
const backLight = new PointLight(0xffffff, 0.8);
frontLight.castShadow = true;
frontLight.shadow.mapSize.width = 1024;
frontLight.shadow.mapSize.height = 1024;
backLight.castShadow = true;
backLight.shadow.mapSize.width = 1024;
backLight.shadow.mapSize.height = 1024;
frontLight.position.set(20, 20, 20);
backLight.position.set(-20, -20, 20);
scene.add(frontLight);
scene.add(backLight);
scene.add(ambientLight);

/* Various event listeners */
window.addEventListener("resize", onResize);

    
    
    /* Preloader */
    preloader.init(new GLTFResolver());
    preloader
      .load([{ id: "model", type: "gltf", url: "assets/house-7.gltf" }])
      .then(([model]) => {
        onResize();
        animate();
        const obj = model.scene.scene;
        obj.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = obj.receiveShadow = true;
          }
        });
        scene.add(obj);

        const plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(100, 100),
          new THREE.MeshStandardMaterial({ color: "white" })
        );
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
      });

    
   
/**
 Resize canvas
*/
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 RAF
*/
function animate() {
window.requestAnimationFrame(animate);
  render();
}

/**
 Render loop
*/
function render() {
  controls.update();
  renderer.clear();
  renderer.render(scene, camera);
}


