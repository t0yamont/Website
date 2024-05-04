<script>
import * as THREE from "three";
import { ref, onMounted } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import GUI from "lil-gui";

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
    let cameraPosition = {
      x: 0.022,
      y: 1.14,
      z: -1.918,
    };
    // let contentDiv, lastContent, targetLabel;

    const points = ref([
      { position: new THREE.Vector3(0.2, 0.5, -1.2), element: null },
      { position: new THREE.Vector3(-0.5, 0.5, 0), element: null },
      { position: new THREE.Vector3(0.7, 0.3, 0.7), element: null },
    ]);

    onMounted(async () => {
      function checkDevice() {
        if (window.innerWidth < 1124 && enable.value === true) {
          enable.value = false;
          if (camera && controls) {
            camera.fov = 45;
            controls.minDistance = 2.0;
            controls.maxDistance = 2.5;
            camera.zoom = 0.5;
            controls.update();
            camera.updateProjectionMatrix();
          }
        } else if (window.innerWidth >= 1124 && enable.value === false) {
          if (camera && controls) {
            camera.fov = 65;
            camera.zoom = 1;
            camera.updateProjectionMatrix();
          }
        }
      }
      checkDevice();

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
        // controls.autoRotate = false;
        // controls.update();
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
              child.material = otherBakedMaterial;l
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

      function addGUI() {
        const gui = new GUI();
        gui.add(camera.position, "x", -10, 10, 0.01);
        gui.add(camera.position, "y", -10, 10, 0.01);
        gui.add(camera.position, "z", -10, 10, 0.01);
        gui.add(camera, "fov", 1, 180).onChange(() => {
          camera.updateProjectionMatrix();
        });
        gui.add(camera, "near", 0.01, 10).onChange(() => {
          camera.updateProjectionMatrix();
        });
        gui.add(camera, "far", 0.01, 10).onChange(() => {
          camera.updateProjectionMatrix();
        });
        gui.add(camera, "zoom", 0.01, 10).onChange(() => {
          camera.updateProjectionMatrix();
        });
        gui.open();
      }

      // addGUI();

      function init() {
        scene = new THREE.Scene();

        // Initialize camera, scene, and renderer
        camera = new THREE.PerspectiveCamera(
          65,
          experience.value.parentNode.clientWidth /
            experience.value.parentNode.clientHeight,
          0.01,
          10
        );

        //  x: 0.022,
        // y: 1.14,
        //     z: -1.918,

        camera.position.set(
          cameraPosition.x,
          cameraPosition.y,
          cameraPosition.z
        );
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
        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 0.1;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;
        controls.maxPolarAngle = Math.PI / 2 - 0.3;
        // renderer.render(scene, camera);
        controls.minDistance = 2.0;
        controls.maxDistance = 2.5;
        if (enable.value === false) {
          camera.fov = 45;
          controls.minDistance = 2.0;
          controls.maxDistance = 2.5;
          camera.zoom = 0.5;
          controls.update();
          camera.updateProjectionMatrix();
        }
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

        checkDevice();
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

      const scrollHandler = (event) => {
        event.preventDefault();
        const elm = document.getElementById("breadcrumbs");

        elm.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      const scrollDown = document.querySelector(".scroll-down");
      scrollDown.addEventListener("click", scrollHandler);
    });

    return { experience, enable, fullscreen };
  },
};
</script>

<template>
  <NuxtLayout name="electric">
    <div
      class="webgl-wrapper px-6 md:px-12 lg:px-24 relative overflow flex justify-center content-center flex-col"
    >
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
          <div v-if="fullscreen" class="minimize">
            <svg
              fill="#fff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 385.331 385.331"
              xml:space="preserve"
            >
              <g>
                <g id="Fullscreen_Exit">
                  <path
                    d="M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181
			c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084
			c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z"
                  />
                  <path
                    d="M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03
			c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012
			c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z"
                  />
                  <path
                    d="M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423
			c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084
			c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z"
                  />
                  <path
                    d="M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012
			c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242
			H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z"
                  />
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </g>
            </svg>
          </div>
          <div v-else class="fullScreen">
            <svg
              fill="#fff"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 472.615 472.615"
              xml:space="preserve"
            >
              <g>
                <g>
                  <polygon
                    points="311.913,0 311.913,19.692 439.001,19.692 284.635,174.057 298.558,187.981 452.923,33.616 452.923,160.707 
			472.615,160.707 472.615,0 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="33.616,19.692 160.712,19.692 160.712,0 0,0 0,160.707 19.692,160.707 19.692,33.616 174.058,187.981 
			187.981,174.057 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="452.923,311.908 452.923,439 298.558,284.635 284.635,298.558 439.001,452.923 311.913,452.923 311.913,472.615 
			472.615,472.615 472.615,311.908 		"
                  />
                </g>
              </g>
              <g>
                <g>
                  <polygon
                    points="187.981,298.558 174.058,284.635 19.692,439 19.692,311.908 0,311.908 0,472.615 160.712,472.615 
			160.712,452.923 33.616,452.923 		"
                  />
                </g>
              </g>
            </svg>
          </div>
        </button>

        <div class="point" id="point0" ref="point0" @click="clickHandler">
          <div class="point-label" v-if="enable">Powertrain</div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <div class="trigger-scroll mt-2 lg:mt-6 relative">
          <button class="scroll-down" @click="scrollHandler"></button>
        </div>
      </div>
    </div>

    <div class="py-4 md:py-12 px-6 md:px-12 lg:px-24">
      <span id="breadcrumbs" class="my-4"
        ><NuxtLink class="underline" to="/">Home</NuxtLink> ><span
          >Electric</span
        ></span
      >
      <h1 class="mb-10">SURTES Electric</h1>
      <div
        class="mb-12 lg:mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 py-4 items-center"
        id="first-section"
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

/* scroll down button */

.scroll-down {
  opacity: 1;
  scroll-behavior: smooth;
}

.scroll-down {
  scroll-behavior: smooth;
  display: block;
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  border-radius: 50%;
  z-index: 2;
  transform: scale(1);
}

.scroll-down:before {
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 6px);
  transform: rotate(-45deg);
  display: block;
  width: 12px;
  height: 12px;
  content: "";
  border: 2px solid white;
  border-width: 0px 0 2px 2px;
  scroll-behavior: smooth;
}
</style>
