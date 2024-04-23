<script>
import * as THREE from "three";
import { ref, onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

export default {
  setup() {
    const experience = ref(null);
    const point0 = ref(null);
    let camera, scene, renderer;
    let geometry, material, mesh;
    let controls;
    let loader, gltfLoader;
    let backgroundTexture, bodyBakedTexture, otherBakedTexture;
    let bodyBakedMaterial, otherBakedMaterial;
    let raycaster = new THREE.Raycaster();
    let car;
    const pointer = new THREE.Vector2();
    let contentDiv, lastContent, targetLabel;

    const points = ref([
      { position: new THREE.Vector3(0.2, 0.3, -1.2), element: null },
      { position: new THREE.Vector3(-0.5, 0.5, 0), element: null },
      { position: new THREE.Vector3(0.7, 0.3, 0.7), element: null },
    ]);

    onMounted(async () => {
      point0.value = document.getElementById("point0");
     

      if (point0.value) {
          points.value[0].element = point0.value;

        }

      if (window.innerWidth < 1280) {
        console.log(window.innerWidth);
      }


      init();
      animate();

      function onPointerMove(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      const clickHandler=  (_event) => {

     
    
        const parent = _event.target.parentNode
    const label = parent.children[0]

          if (label.innerHTML.includes("Label1")) {
            gsap.to(camera.position, {
              duration: 1,
              x: 0.022,
              y: 1.14,
              z: -1.918,
            });
          } 
        } 

     
      function addObjects() {
        // Add objects to the scene
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);

        bodyBakedMaterial = new THREE.MeshBasicMaterial({
          map: bodyBakedTexture,
        });

        otherBakedMaterial = new THREE.MeshBasicMaterial({
          map: otherBakedTexture,
        });

        gltfLoader.load("/Car/car.glb", (gltf) => {
          gltf.scene.traverse((child) => {
            if (child.name.includes("Car")) {
              child.material = bodyBakedMaterial;
            } else {
              child.material = otherBakedMaterial;
            }
          });
          // gltf.scene.position.x = -1
          scene.add(gltf.scene);
        });
      }

      function textureLoad() {
        loader = new THREE.TextureLoader();
        gltfLoader = new GLTFLoader();
        backgroundTexture = loader.load("/Car/gradient.png");
        backgroundTexture.flipY = false;
        backgroundTexture.colorSpace = THREE.SRGBColorSpace;

        bodyBakedTexture = loader.load("/Car/final.png");
        bodyBakedTexture.flipY = false;
        bodyBakedTexture.colorSpace = THREE.SRGBColorSpace;
        otherBakedTexture = loader.load("/Car/other.png");
        otherBakedTexture.flipY = false;
        otherBakedTexture.colorSpace = THREE.SRGBColorSpace;
      }

      function init() {

        scene = new THREE.Scene();

        // Initialize camera, scene, and renderer
        camera = new THREE.PerspectiveCamera(
          70,
          window.innerWidth / window.innerHeight,
          0.01,
          10
        );
        camera.position.set(-2.5, 1.6, 0.3);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        console.log(camera);

        textureLoad();

        // scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
        scene.background = backgroundTexture;
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);

        addObjects();



      
        renderer = new THREE.WebGLRenderer({
          canvas: experience.value,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        //add orbit controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        // controls.enablePan = false;
        controls.enableDamping = true;
        // renderer.render(scene, camera);

        window.addEventListener("resize", onWindowResize);
        window.addEventListener("pointermove", onPointerMove);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        controls.update();

        for (const point of points.value) {
          // console.log(point);
          if (point.element) {
            const screenPosition = point.position.clone().project(camera);
            raycaster.setFromCamera(screenPosition, camera);

            car = scene.children[scene.children.length - 1].children.filter(
              (child) =>
                child.name.includes("SE7" || "chair" || "Body" || "Back")
            );
            const intersects = raycaster.intersectObjects(car, true);

            if (intersects.length === 0) {
              point.element.classList.add("visible");
            } else {
              const intersectionDistance = intersects[0].distance;
              const pointDistance = point.position.distanceTo(camera.position);

              point.element.classList.remove("visible");
              if (intersectionDistance < pointDistance) {
                point.element.classList.remove("visible");
              } else {
                point.element.classList.add("visible");
              }
            }

            const translateX = screenPosition.x * window.innerWidth * 0.5;
            const translateY =
              -screenPosition.y * window.innerHeight * 0.5 + 100;
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
          }
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      point0.value.addEventListener("click", clickHandler);
    });

    return { experience };
  },
};
</script>


<template>
  <div class="webgl-wrapper">
    <canvas ref="experience"></canvas>
    <div class="point" id="point0" ref="point0" @click="clickHandler">
      <div class="point-label">Label1</div>
    </div>
  </div>
</template>

<style scoped>
.point {
  position: absolute;
  top: 50%;
  left: 50%;
}

.point-label {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 60px;
  height: 40px;
  border-radius: 10%;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  line-height: 40px;
  font-weight: 100;
  font-size: 14px;

  cursor: pointer;
  transform: scale(0, 0);
  transition: transform 0.3s;

  /* efferct 1 */
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px;
  }

  /* effect 2 */
}



.point.visible .point-label {
  transform: scale(1, 1);
}

.point .point-desc {
  position: absolute;
  top: 30px;
  left: -120px;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  line-height: 1.3em;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 100;

  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;

  display: flex;
  flex-direction: row;
  /* pointer-events: none; */
}

.point-desc p {
  font-size: medium;
}





.point.visible .label {
  transform: scale(1, 1);
}
</style>
