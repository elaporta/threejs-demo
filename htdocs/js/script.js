// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { WEBGL } from './three.js/examples/jsm/loaders/WEBGL.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { COLORS } from './colors.js';

// import { TDSLoader } from './three.js/examples/jsm/loaders/TDSLoader.js';
// import { MTLLoader } from './three.js/examples/jsm/loaders/MTLLoader.js';
// import { OBJLoader } from './three.js/examples/jsm/loaders/OBJLoader.js';
// import { TGALoader } from './three.js/examples/jsm/loaders/TGALoader.js';

const LOADER = document.getElementById('js-loader');
const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');

let theModel;
let activeOption = 'all';
const colors = COLORS;

const BACKGROUND_COLOR = 0xf1f1f1;
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xF2DABA, shininess: 10 });

// Init the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

// Init the renderer
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
document.body.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 2);
camera.rotation.set(0, 0, 0);

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
let directionalLight = new THREE.DirectionalLight(0xfffedb, 0.50);
// directionalLight.position.set(-8, 12, 8);
directionalLight.position.set(30, 5, 0);
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
        // theModel.rotation.x = 300; // 3ds fix position
        theModel.position.set(-1.5, -1.5, 0);

        theModel.traverse(o => {
            if(o.isMesh){

                // Set shadows
                o.castShadow = true;
                o.receiveShadow = true;

                if(o.name == 'Ventana_1_(Agua1)' || o.name == 'Ventana_2_(Agua_1)'){
                    o.material.opacity = 0.08;
                }

                // Find walls
                if(Array.isArray(o.material)){
                    for(let mat of o.material){
                        // Set opacity
                        // mat.opacity = 1;

                        // Set a new property to identify this object
                        o.nameId = setObjectNameId(mat.name);
                    }
                }
                else{
                    // Set opacity
                    // o.material.opacity = 1;

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

        start();
    }
});

// Load tga
// let loaderTga = new TGALoader();
// let textureMadera = loaderTga.load( '../assets/models/living/textures/Madera_1_AO.tga' );
// let materialMadera = new THREE.MeshPhongMaterial( { color: 0x946F43, map: textureMadera } );

// Load 3ds
// let loader = new TDSLoader(loadergManager);
// loader.setResourcePath('../assets/models/living/');
// loader.load('../assets/models/living/living.3ds', function(object){
//     theModel = object;
// });

// Load obj / mtl
// let loader = new MTLLoader(loadergManager);
// loader.setPath('../assets/models/living/');
// loader.load('living.mtl', function(materials){
//     materials.preload();

//     new OBJLoader(loadergManager)
//         .setMaterials(materials)
//         .setPath('../assets/models/living/')
//         .load('living.obj', function(object){
//             theModel = object;
//         });
// });

// Load gltf
let loader = new GLTFLoader(loadergManager);
loader.setPath('../assets/models/living/');
loader.load('living.gltf', function(object){
    scene.add(object.scene);
    theModel = object.scene.children[0];
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

// WebGL compatibility check
if(WEBGL.isWebGLAvailable()){
    animate();
}
else{
    let warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('webgl').appendChild(warning);
}

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
    let colorsLength = colors.length -1;
    let counter = 0;
    let tr = document.createElement('tr');
    tr.classList.add('tray__swatch__group');

    for(let [i, color] of colors.entries()){
        counter++;

        if(counter >= 5){
            counter = 1;
            TRAY.append(tr);
            tr = document.createElement('tr');
            tr.classList.add('tray__swatch__group');
        }

        let swatch = document.createElement('td');
        swatch.classList.add('tray__swatch');
        swatch.style.background = '#' + color.color;
        swatch.setAttribute('data-key', i);
        swatch.setAttribute('title', '0x' + color.color);
        tr.append(swatch);

        if(i == colorsLength){
            TRAY.append(tr);
        }
    }
}

buildColors(colors);

// Select Option
const options = document.querySelectorAll('.option');

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
const swatches = document.querySelectorAll('.tray__swatch');

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

// let slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

// function slide(wrapper, items){
//     let posX1 = 0,
//     posX2 = 0,
//     posInitial,
//     threshold = 20,
//     posFinal,
//     slides = items.getElementsByClassName('tray__swatch');

//     // Mouse events
//     items.onmousedown = dragStart;

//     // Touch events
//     items.addEventListener('touchstart', dragStart);
//     items.addEventListener('touchend', dragEnd);
//     items.addEventListener('touchmove', dragAction);


//     function dragStart(e){
//         e = e || window.event;
//         posInitial = items.offsetLeft;
//         difference = sliderItems.offsetWidth - slider.offsetWidth;
//         difference = difference * -1;

//         if(e.type == 'touchstart'){
//             posX1 = e.touches[0].clientX;
//         }
//         else{
//             posX1 = e.clientX;
//             document.onmouseup = dragEnd;
//             document.onmousemove = dragAction;
//         }
//     }

//     function dragAction(e){
//         e = e || window.event;

//         if(e.type == 'touchmove'){
//             posX2 = posX1 - e.touches[0].clientX;
//             posX1 = e.touches[0].clientX;
//         }
//         else{
//             posX2 = posX1 - e.clientX;
//             posX1 = e.clientX;
//         }

//         if(items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference){
//             items.style.left = items.offsetLeft - posX2 + 'px';
//         }
//     }

//     function dragEnd(e){
//         posFinal = items.offsetLeft;

//         if(posFinal - posInitial < -threshold) {

//         }
//         else if(posFinal - posInitial > threshold){

//         }
//         else{
//             items.style.left = posInitial + 'px';
//         }

//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }

// slide(slider, sliderItems);

// Sidebar
let sidebarOpen = false;
let sidebar = document.getElementById('sidebar');
let openIcon = document.getElementById('sidebar-open-icon');

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function sidebarClick() {
    if(sidebarOpen){
        sidebar.style.width = '0';
        sidebar.style.overflowY = 'hidden';
        openIcon.className = 'fa fa-angle-left'; // <
    }
    else{
        sidebar.style.width = '250px';
        sidebar.style.overflowY = 'auto';
        openIcon.className = 'fa fa-angle-left open'; // >
    }

    sidebarOpen = !sidebarOpen;
}

document.getElementById('sidebar-open-btn').addEventListener('click', sidebarClick);

// Screenshot btn
// function screenShot() {
//     window.open( renderer.domElement.toDataURL('image/png'), 'Final' );
//     return false;
// }
// document.getElementById('screenshotbtn').addEventListener('click', screenShot);

function start(){
    // Remove the loader
    LOADER.remove();
    DRAG_NOTICE.classList.add('start');

    // Side menu open effect
    document.getElementById('sidebar-open-btn').click();
}