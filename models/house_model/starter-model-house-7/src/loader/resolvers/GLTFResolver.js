
    import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
    
    export class GLTFResolver {
      constructor() {
        this.type = "gltf";
        const gltfLoader = new GLTFLoader();
        const dracoloader = new DRACOLoader();
        dracoloader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        gltfLoader.setDRACOLoader(dracoloader);
    
        this.loader = gltfLoader;
      }
    
      resolve(item) {
        return new Promise((resolve) => {
          this.loader.load(item.url, (scene) => {
            resolve(Object.assign(item, { scene }));
          });
        });
      }
    
      get(item) {
        return item.scene;
      }
    }
    
