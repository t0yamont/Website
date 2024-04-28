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
    let enable = ref(true);
    let fullscreen = ref(false);
    // let contentDiv, lastContent, targetLabel;

    const points = ref([
      { position: new THREE.Vector3(0.2, 0.5, -1.2), element: null },
      { position: new THREE.Vector3(-0.5, 0.5, 0), element: null },
      { position: new THREE.Vector3(0.7, 0.3, 0.7), element: null },
    ]);

    onMounted(async () => {
      if (window.innerWidth < 1124 && enable.value === true) {
        enable.value = false;
      }

      point0.value = document.getElementById("point0");

      if (point0.value) {
        points.value[0].element = point0.value;
      }

      // console.log(experience.value.parentNode.clientWidth, experience.value.parentNode.clientWidth);

      init();
      animate();

      function onPointerMove(event) {
        pointer.x =
          (event.clientX / experience.value.parentNode.clientWidth) * 2 - 1;
        pointer.y =
          -(event.clientY / experience.value.parentNode.clientHeight) * 2 + 1;
      }

      const clickHandler = (_event) => {
        const parent = _event.target.parentNode;
        const label = parent.children[0];

        if (label.innerHTML.includes("Powertrain")) {
          gsap.to(camera.position, {
            duration: 1,
            x: 0.022,
            y: 1.14,
            z: -1.918,
          });
          // console.log("animating");
        }
      };

      function exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }


      function toggleFullscreen(event) {
        if (document.fullscreenElement) {
          exitFullscreen();
          fullscreen.value = false;
        } else {
          experience.value.parentNode.requestFullscreen();
          fullscreen.value = true;
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
          experience.value.parentNode.clientWidth /
            experience.value.parentNode.clientHeight,
          0.01,
          10
        );
        camera.position.set(-2.5, 1.6, 0.3);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

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

        renderer.setSize(
          experience.value.parentNode.clientWidth,
          experience.value.parentNode.clientHeight
        );

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
        camera.aspect =
          experience.value.parentNode.clientWidth /
          experience.value.parentNode.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          experience.value.parentNode.clientWidth,
          experience.value.parentNode.clientHeight
        );
        if (
          window.innerWidth < 1124 &&
          experience.value.parentNode.clientWidth < 1124
        ) {
          enable.value = false;
        } else {
          enable.value = true;
          // console.log(experience.value.parentNode.clientWidth, enable.value);
        }
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

            const translateX =
              screenPosition.x * experience.value.parentNode.clientWidth * 0.5;
            const translateY =
              -screenPosition.y *
              experience.value.parentNode.clientHeight *
              0.5;
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
          }
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      const fullscreenButton = document.getElementById("fullscreen-button");
      fullscreenButton.addEventListener("click", toggleFullscreen);
      point0.value.addEventListener("click", clickHandler);
      window.addEventListener("fullscreenchange", (event) => {
        if (!document.fullscreenElement) {
          fullscreen.value = false;
        }
      });
    });

    return { experience, enable, fullscreen };
  },
};
</script>

<template>
  <NuxtLayout name="electric">
    <div class="webgl-wrapper px-6 md:px-12 lg:px-24">
      <div
        class="w-full md:h-[35rem] lg:h-[41rem] xl:h-[45rem] 2xl:h-[50rem] h-[24rem] relative"
      >
        <canvas ref="experience" class="relative rounded-2xl"></canvas>
        <button
          id="fullscreen-button"
          class="absolute top-3 left-3 px-4 py-2 z-10"
          @click="toggleFullscreen"
        >
          <!-- {{ logo }} -->
          <!-- {{ fullScreenSvg }}
           -->
          <NuxtImg
            v-if="fullscreen"
            src="/Car/close.svg"
            class="minimize"
            alt="X"
          />
          <NuxtImg
            v-else
            src="/Car/fullScreen.svg"
            alt="full screen"
            class="fullScreen"
          />
        </button>
        <div class="point" id="point0" ref="point0" @click="clickHandler">
          <div class="point-label" v-if="enable">Powertrain</div>
        </div>
      </div>
    </div>

    <div class="py-12 px-6 md:px-12 lg:px-24">
      <span id="breadcrumbs" class="my-4"
        ><NuxtLink class="underline" to="/">Home</NuxtLink> ><span
          >Electric</span
        ></span
      >
      <h1 class="mb-10">SURTES Electric</h1>
      <div
        class="mb-12 lg:mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <p class="lg:col-span-2 xl:col-span-3">
          Team SURTES was one of the first teams to bring a successful electric
          car to FSUK and presented an innovative inboard dual motor drivetrain
          vehicle at the 2023 competition. The team will be competing in the
          Concept Class this academic year 2023/24 to gather feedback on our
          future EV design. Our plan is to build the skills and knowledge of
          younger students through Concept Class to build a successfully running
          Electric Vehicle in the future.
        </p>
        <NuxtImg src="/img/EV_Page_photo.jpg" class="rounded-lg" />
      </div>
      <div
        class="mb-12 lg:mb-24 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <div class="lg:col-span-2 sm:col-auto md:col-auto xl:col-span-2">
          <NuxtImg src="/img/Team-2016-2.jpg" class="rounded-lg w-11/12" />
        </div>
        <div class="flex flex-col w-full lg:col-span-2">
          <h2 class="mb-4 lg:mb-0">SE1</h2>
          <p class="lg:col-span-2 xl:col-span-3">
            In 2016 TEAM SURTES has become one of the few teams in the UK to
            switch to electric power. A year later, we successfully passed as 1
            of only 3 teams in the UK.
          </p>
          <p class="lg:col-span-2 xl:col-span-3">
            This made us the 5<sup>th</sup> Best UK Team and placed us 12<sup
              >th</sup
            >
            Best Overall
          </p>
        </div>
      </div>
      <div
        class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
      >
        <div class="flex flex-col w-full lg:col-span-2">
          <h2>SE4</h2>
          <p class="lg:col-span-2 xl:col-span-3">
            In 2020, we achieved 11<sup>th</sup> place overall, and 8<sup
              >th</sup
            >
            best UK EV team.
          </p>
          <p class="lg:col-span-2 xl:col-span-3">Awards Won:</p>
          <ul>
            <li class="mt-4">IMechE Class 1 Most Efficient Car</li>
            <li class="mt-8">
              Mercedes-AMG HPP Best High Voltage Powertrain Implementation
            </li>
          </ul>
        </div>
        <div
          class="lg:col-span-2 sm:col-auto md:col-auto xl:col-span-2 order-first lg:order-last"
        >
          <NuxtImg src="/img/Car-2019-Running.jpg" class="rounded-lg w-11/12" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.webgl-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.point {
  position: absolute;
  top: 50%;
  left: 50%;
}

.point-label {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 80px;
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

/* full screen button */
#fullscreen-button {
  margin: 1px;
  padding: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 5px;

  cursor: pointer;
  /* transform: scale(0, 0); */
  transition: transform 0.3s;

  /* efferct 1 */
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
  }

  &:hover .fullScreen {
    transform: scale(1.1, 1.1);
  }

  &:hover .minimize {
    transform: scale(0.8, 0.8);
  }
}

.fullScreen {
  /* border-radius: 50%; */
  transition: transform 0.3s;
}

.minimize {
  /* border-radius: 50%; */
  transition: transform 0.3s;
}
</style>
