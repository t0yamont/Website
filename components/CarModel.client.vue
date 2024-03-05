<script setup>
import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { useWindowSize } from '@vueuse/core'
import gsap from 'gsap'
import GUI from 'lil-gui'


// Variables
let renderer
let controls
let car
let targetLabel
const experience = ref(null)
const point0 = ref(null)
const point1 = ref(null)
const point2 = ref(null)




// const gui = new GUI()
const axis = new THREE.AxesHelper()

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const points = ref([
    { position: new THREE.Vector3(0.2, 0.3, -1.2), element: null },
    { position: new THREE.Vector3(-0.5, 0.5, 0), element: null },
    { position: new THREE.Vector3(.7, 0.3, 0.7), element: null }
])


const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xa0a0a0, 10, 50)
scene.background = new THREE.Color(0xa0a0a0)
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(75, width.value / height.value, 0.1, 100)
camera.position.set(-2.5, 1.6, 0.3)
camera.lookAt(0, 0, 0)
scene.add(camera)
// gui.add(camera.position, 'x', -50, 50)
// gui.add(camera.position, 'y', -50, 50)
// gui.add(camera.position, 'z', -50, 50)

const updateCamera = () => {
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
}

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    wireframe: true,
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
// scene.add(overlay)



const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const bodyBakedTexture = textureLoader.load('/Car/final201.png')
bodyBakedTexture.flipY = false
bodyBakedTexture.colorSpace = THREE.SRGBColorSpace
const bodyBakedMaterial = new THREE.MeshBasicMaterial({ map: bodyBakedTexture })

// const otherBakedTexture = textureLoader.load('/Car/other301.png')
const otherBakedTexture = textureLoader.load('/Car/other701.png')
otherBakedTexture.flipY = false
otherBakedTexture.colorSpace = THREE.SRGBColorSpace

const otherBakedMaterial = new THREE.MeshBasicMaterial({ map: otherBakedTexture })

// load another texture named plane.jpg and create a material for it
// const planeTexture = textureLoader.load('/Car/plane.jpg')
// planeTexture.flipY = false
// planeTexture.colorSpace = THREE.SRGBColorSpace

const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false})

//create a plane mesh
const planeGeometry = new THREE.PlaneGeometry(1, 1)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = - Math.PI / 2;
plane.scale.set(10, 10, 10)
plane.receiveShadow = true
scene.add(plane)


// Model loading
gltfLoader.load('/Car/car1401.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.name.includes("Car")) {
            child.material = bodyBakedMaterial
        } else {
            child.material = otherBakedMaterial
        }
    })
    // gltf.scene.position.x = -1
    scene.add(gltf.scene)
})


// Event Handlers
const pointer = new THREE.Vector2()

const onPointerMove = (_event) => {
    pointer.x = (_event.clientX / width.value) * 2 - 1
    pointer.y = -(_event.clientY / height.value) * 2 + 1
}

let contentDiv, lastContent

const clickHandler = (_event) => {
    const parent = _event.target.parentNode
    const label = parent.children[0]
    contentDiv = parent.children[1]

    targetLabel = label.innerHTML

    if (lastContent !== contentDiv && lastContent !== undefined) {
        if (label.innerHTML.includes("Label1")) {
            gsap.to(camera.position, { duration: 1, x: 0.022, y: 1.14, z: -1.918 })
        } else if (label.innerHTML.includes("Label3")) {
            gsap.to(camera.position, { duration: 1, x: 1.1329, y: 1.24, z: 0.85 })
        } else {
            gsap.to(camera.position, { duration: 1, x: -1.09, y: 1.424, z: 1.251 })
        }
        contentDiv.classList.add("active")
        lastContent.classList.remove("active")

    } else if (lastContent !== contentDiv && lastContent === undefined) {
        if (label.innerHTML.includes("Label1")) {
            gsap.to(camera.position, { duration: 1, x: 0.022, y: 1.14, z: -1.918 })
        } else if (label.innerHTML.includes("Label3")) {
            gsap.to(camera.position, { duration: 1, x: 1.1329, y: 1.24, z: 0.85 })
        } else {
            gsap.to(camera.position, { duration: 1, x: -1.09, y: 1.424, z: 1.251 })
        }
        contentDiv.classList.add("active")
    } else {
        if (label.innerHTML.includes("Label1")) {
            gsap.to(camera.position, { duration: 1, x: 0.022, y: 1.14, z: -1.918 })
        } else if (label.innerHTML.includes("Label3")) {
            gsap.to(camera.position, { duration: 1, x: 1.1329, y: 1.24, z: 0.85 })
        } else {
            gsap.to(camera.position, { duration: 1, x: -1.09, y: 1.424, z: 1.251 })
        }
        contentDiv.classList.add("active")
    }
    lastContent = contentDiv
}

const returnHandler = (_event) => {
    _event.stopPropagation()
    const parent = _event.target.parentNode
    parent.classList.remove("active")

    //if label is equal to Label1 then return to x,z position of 0.022, -1.918 but if label is equal to Label3 then return to x,z position of 1.1329, 0.85
    // else return to x,z position of -1.09, 1.251
    // for y position it will always be 1.6

    if (targetLabel.includes("Label1")) {
        gsap.to(camera.position, { duration: 1, x: 0.022, y: 2, z: -1.918 })
    } else if (targetLabel.includes("Label3")) {
        gsap.to(camera.position, { duration: 1, x: 1.1329, y: 2, z: 0.85 })
    } else {
        gsap.to(camera.position, { duration: 1, x: -1.09, y: 2, z: 1.251 })
    }

}

const updateRenderer = () => {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

const setRenderer = () => {
    if (experience.value) {
        renderer = new THREE.WebGLRenderer({
            canvas: experience.value,
            alpha: true
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableDamping = true
        //set polarangle to 0 so that the camera will not go below the x-axis
        controls.maxPolarAngle = Math.PI / 2 - 0.2
        updateRenderer()
    }
}

watch(aspectRatio, () => {
    updateCamera()
    updateRenderer()
})

onMounted(() => {
    if (point0.value && point1.value && point2.value) {
        points.value[0].element = point0.value
        points.value[1].element = point1.value
        points.value[2].element = point2.value
    }
    setRenderer()
    window.addEventListener('pointermove', onPointerMove)
    tick()
})

const tick = () => {
    controls.update()

    for (const point of points.value) {
        if (point.element) {
            const screenPosition = point.position.clone().project(camera)
            raycaster.setFromCamera(screenPosition, camera)

            car = scene.children[scene.children.length - 1].children.filter(child => child.name.includes("SE7" || "chair" || "Body" || "Back"))
            const intersects = raycaster.intersectObjects(car, true)

            if (intersects.length === 0) {
                point.element.classList.add('visible')
            } else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)

                point.element.classList.remove('visible')
                if (intersectionDistance < pointDistance) {
                    point.element.classList.remove('visible')
                } else {
                    point.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * width.value * 0.5
            const translateY = (-screenPosition.y * height.value * 0.5) + 100
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}


</script>

<template>
    <div class="webgl-wrapper bg-mint-400">
        <canvas ref="experience"></canvas>

        <div class="point" ref="point0" @click="clickHandler">
            <div class="point-label">
                Label1
            </div>
            <div class="point-desc point-desc1">
                <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit, Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit</p>
                <button class="return" @click="returnHandler"> X </button>

            </div>
        </div>
        <div class="point" ref="point1" @click="clickHandler">
            <div class="point-label">Label2</div>
            <div class="point-desc point-desc2">
                <p>Ventilation with air purifier and detection of environment toxicity.</p>
                <button class="return" @click="returnHandler"> X </button>
            </div>
        </div>
        <div class="point" ref="point2" @click="clickHandler">
            <div class="point-label">Label3</div>
            <div class="point-desc point-desc3">
                <p>Cameras supporting night vision and heat vision with automatic adjustment.</p>
                <button class="return" @click="returnHandler"> X </button>
            </div>

        </div>
    </div>

    <div class="dummy"></div>
</template>

<style scoped>
.dummy {
    width: 100vw;
    height: 100svh;
    height: 100vh;
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
    outline-color: rgba(255, 255, 255, .5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
        border: 1px solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
        outline-color: rgba(255, 255, 255, 0);
        outline-offset: 15px;
        text-shadow: 1px;
    }

    /* effect 2 */
}

.return {

    align-self: flex-start;
    font-size: small;
    /* efferct 1 */
    padding: 4px 8px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 30%;
    background: #ff000077;
    border: 1px solid #ffffff77;
    color: #ffffff;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;

    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
    outline: 1px solid;
    outline-color: rgba(255, 255, 255, .5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

    &:hover {
        border: 1px solid;
        box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
        outline-color: rgba(255, 255, 255, 0);
        outline-offset: 15px;
        text-shadow: 1px;
        cursor: pointer;
    }
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

.point .point-desc1 {
    top: -38px;
    left: 200px;
}

.point .point-desc1.active {
    pointer-events: visible;
    opacity: 1;
}


.point .point-desc2 {
    top: -40px;
    left: -400px;
    width: 350px ;
}

.point .point-desc2.active {
    pointer-events: visible;
    opacity: 1;
}

.point .point-desc3 {
    top: -50px;
    left: 100px;
}

.point .point-desc3.active {
    pointer-events: visible;
    opacity: 1;
}

.point.visible .label {
    transform: scale(1, 1);
}
</style>
