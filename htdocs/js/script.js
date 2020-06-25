// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { TDSLoader } from './three.js/examples/jsm/loaders/TDSLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';

// Mocks
import { COLORS } from '../mocks/colors.js';

const LOADER = document.getElementById('js-loader');
const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');

let theModel;
let activeOption = 'all';

const colors = COLORS;
const BACKGROUND_COLOR = 0xf1f1f1;

// Initial material
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xF2DABA, shininess: 10 });

// Init the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

// Init the renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2);
camera.rotation.set(0, 0, 0);
// camera.position.set(-0.0023950808291633707, 0.0004497540766135944, 0.0019936118785608002);
// camera.rotation.set(-0.22188318403486668, -0.8643915982052599, -0.16995666717523358);

// Camera helper
// let cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

// Add controls
let controls = new OrbitControls(camera, renderer.domElement);

// Old controls
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.dampingFactor = 0.1;
// controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
// controls.autoRotateSpeed = 0.2; // 30

// New controls
controls.enableDamping = true;
controls.dampingFactor = 0.25;
// controls.enableZoom = false;

// Limit Y rotation
// controls.maxPolarAngle = Math.PI / 2;
// controls.minPolarAngle = Math.PI / 3;

// Limit X rotation
// controls.maxAzimuthAngle = -(Math.PI / 10);
// controls.minAzimuthAngle = -(Math.PI / 3.35);

// Limit distance
// controls.minDistance = 30;
// controls.maxDistance = 190;

// Add hemisphere light to scene   
let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemisphereLight.position.set(0, 50, 0);
scene.add(hemisphereLight);

// Add directional light to scene
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.54);
directionalLight.position.set(-8, 12, 8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(directionalLight);

function setObjectNameId(name = null){
    let nameId = null;

    if(typeof name == 'string'){
        if(name == 'Color_G01'){
            nameId = 'wall-1';
        }
        else if(name == 'Color_G02'){
            nameId = 'wall-2';
        }
        else if(name == 'Color_G03'){
            nameId = 'wall-3';
        }
    }

    return nameId;
}

// Loader manager
let loadergManager = new THREE.LoadingManager(function(){
    if(theModel){
        // Set the models initial variables
        theModel.scale.set(1, 1, 1);
        theModel.rotation.x = 300;
        theModel.position.x = -1.5;
        theModel.position.y = -1.5;
        theModel.position.z = 0;

        theModel.traverse(o => {
            if(o.isMesh){
                // Set shadows
                o.castShadow = true;
                o.receiveShadow = true;

                // Find walls
                if(Array.isArray(o.material)){
                    for(let mat of o.material){
                        // Set opacity
                        mat.opacity = 1;

                        // Set a new property to identify this object
                        o.nameId = setObjectNameId(mat.name);
                    }
                }
                else{
                    // Set opacity
                    o.material.opacity = 1;

                    // Set a new property to identify this object
                    o.nameId = setObjectNameId(o.material.name);
                }

                if(o.nameId != null){
                    o.material = INITIAL_MTL;
                }
            }
        });

        // Add the model to the scene
        scene.add(theModel);

        // Remove the loader
        LOADER.remove();
        DRAG_NOTICE.classList.add('start');
    }
});

// Load 3ds
var loader = new TDSLoader(loadergManager);
loader.setResourcePath('../assets/models/room/');
loader.load('../assets/models/room/room.3ds', function(object){
    theModel = object;
});

// Debug
let cameraRotationY = 0;
function debug(){
    if(cameraRotationY != camera.rotation.y){
        cameraRotationY = camera.rotation.y;
        console.log('camera position: ', camera.position);
        console.log('camera rotation: ', camera.rotation);
    }
}

document.onkeydown = function(e){
    switch(e.keyCode){
        case 37: // left
            camera.rotation.x += 0.1;
        break;
        case 38: // up
            camera.rotation.z -= 0.1;
        break;
        case 39: // right
            camera.rotation.x -= 0.1;
        break;
        case 40: // down
            camera.rotation.z += 0.1;
        break;

        // the model position for up/down
        case 83: // s
            theModel.position.y += 0.1;
        break;
        case 87: // w
            theModel.position.y -= 0.1;
        break;
    }
};


function animate() {
    // debug();
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

    if(resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;

    if(needResize){
        renderer.setSize(width, height, false);
    }

    return needResize;
}

// Function - Build Colors
function buildColors(colors) {
    for(let [i, color] of colors.entries()){
        let swatch = document.createElement('div');
        swatch.classList.add('tray__swatch');
        swatch.style.background = "#" + color.color;
        swatch.setAttribute('data-key', i);
        swatch.setAttribute('title', '0x' + color.color);
        TRAY.append(swatch);
    }
}

buildColors(colors);

// Select Option
const options = document.querySelectorAll(".option");

for (const option of options){
    option.addEventListener('click', selectOption);
}

function selectOption(e){
    let option = e.target;
    activeOption = e.target.dataset.option;

    for(const otherOption of options){
        otherOption.classList.remove('--is-active');
    }

    option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for(const swatch of swatches){
    swatch.addEventListener('click', selectSwatch);
}

function selectSwatch(e) {
    let color = colors[parseInt(e.target.dataset.key)];
    let new_mtl;
    let option = e.target;

    for (const otherSwatch of swatches) {
        otherSwatch.classList.remove('--is-active');
    }

    option.classList.add('--is-active');

    new_mtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.color),
        shininess: color.shininess ? color.shininess : 10
    });

    setMaterial(theModel, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl){
    parent.traverse(o => {
        if(o.isMesh && o.nameId != null){
            if(type == 'all'){
                o.material = mtl;
            }
            else if(o.nameId == type){
                o.material = mtl;
            }
        }
    });
}

let slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

function slide(wrapper, items){
    let posX1 = 0,
    posX2 = 0,
    posInitial,
    threshold = 20,
    posFinal,
    slides = items.getElementsByClassName('tray__swatch');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);


    function dragStart(e){
        e = e || window.event;
        posInitial = items.offsetLeft;
        difference = sliderItems.offsetWidth - slider.offsetWidth;
        difference = difference * -1;

        if(e.type == 'touchstart'){
            posX1 = e.touches[0].clientX;
        }
        else{
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e){
        e = e || window.event;

        if(e.type == 'touchmove'){
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        }
        else{
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        if(items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference){
            items.style.left = items.offsetLeft - posX2 + "px";
        }
    }

    function dragEnd(e){
        posFinal = items.offsetLeft;

        if(posFinal - posInitial < -threshold) {

        }
        else if(posFinal - posInitial > threshold){

        }
        else{
            items.style.left = posInitial + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }
}

slide(slider, sliderItems);