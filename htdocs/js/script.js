// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { WEBGL } from './three.js/examples/jsm/loaders/WEBGL.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { COLORS } from './colors.js';
import { KellyColorPicker } from './html5kellycolorpicker/html5kellycolorpicker.min.js';
// import { TDSLoader } from './three.js/examples/jsm/loaders/TDSLoader.js';
// import { MTLLoader } from './three.js/examples/jsm/loaders/MTLLoader.js';
// import { OBJLoader } from './three.js/examples/jsm/loaders/OBJLoader.js';
// import { TGALoader } from './three.js/examples/jsm/loaders/TGALoader.js';

const LOADER = document.getElementById('js-loader');
const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');

let theModel;
let activeOption = 'all';

const BACKGROUND_COLOR = 0xf1f1f1;
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xF2DABA, shininess: 10 });

// Init the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

// Init the renderer
const container = document.getElementById('model-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(container.offsetHeight, container.offsetHeight);
renderer.shadowMap.enabled = true;
// renderer.shadowMapType = THREE.PCFSoftShadowMap;
// renderer.physicallyCorrectLights = true;
container.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(35, container.offsetHeight / container.offsetHeight, 0.1, 1000);
// camera.position.set(0, 0, 2);
camera.position.set(-0.2963585789463235, 1.2246467991473552e-16, 4.230488252069703);
camera.rotation.set(0, 0, 0);
resize();

// Camera resizing
function resize(){
    const container = document.getElementById('model-container');
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}
window.addEventListener('resize', resize, false);

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
// let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.61);
// hemisphereLight.position.set(0, 50, 0);
// scene.add(hemisphereLight);

// Add ambient light
let ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Add directional light to scene
let directionalLight = new THREE.DirectionalLight(0xfffedb, 0.50);
directionalLight.position.set(-9, 1.5, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
scene.add(directionalLight);

// Directional light helper
let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLightHelper);

// Add point light to scene
let pointLight = new THREE.PointLight(0xfffedb, 1, 100);
pointLight.position.set(-0.5, 1.2, 0);
scene.add(pointLight);

// Point light helper
let pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

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
                // o.shininess = 0;

                if(o.name == 'Ventana_1_(Agua1)' || o.name == 'Ventana_2_(Agua_1)'){
                    o.material.opacity = 0.08;
                    o.visible = false;
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

function debugInfo(){
    if(theModel){
        console.log('Model Position: ', theModel.position);
        console.log('Model Rotation: ', theModel.rotation);
    }
    console.log('Camera Position: ', camera.position);
    console.log('Camera Rotation: ', camera.rotation);
}

// Key controls movement
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

        // debug info
        case 73: // s
            debugInfo();
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
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// WebGL compatibility check
if(WEBGL.isWebGLAvailable()){
    animate();
}
else{
    DRAG_NOTICE.remove();
    let warning = WEBGL.getWebGLErrorMessage();
    document.getElementById('webgl').appendChild(warning);
}

function start(){

    // Remove the loader
    LOADER.remove();
    DRAG_NOTICE.classList.add('start');

    // Side menu open effect
    document.getElementById('sidebar-open-btn').click();
}

// Function - Build Colors
function buildColors(colors) {
    let colorsLength = colors.length -1;
    let counter = 0;
    TRAY.innerHTML = '';
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
        swatch.style.background = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
        swatch.setAttribute('data-key', i);
        // swatch.setAttribute('title', 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')');
        tr.append(swatch);

        if(i == colorsLength){
            TRAY.append(tr);
        }
    }
}

// buildColors(COLORS);

// Init color picker
const kellyColorPicker = new KellyColorPicker({
    place : 'color-picker',
    size : 150,
    inputFormat: 'rgba',
    userEvents: {
        change: function(e){
            console.log(e.getCurColorRgb());

            let newColors = COLORS.slice(0, 16);
            buildColors(newColors);
        }
    }
});

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
    let color = COLORS[parseInt(e.target.dataset.key)];
    let new_mtl;
    let option = e.target;

    for(const otherSwatch of swatches){
        otherSwatch.classList.remove('--is-active');
        otherSwatch.innerHTML = '';
    }

    option.classList.add('--is-active');
    option.innerHTML = '<i class="fa fa-check"></i>';

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

// Sidebar
let sidebarOpen = false;

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function sidebarClick() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('sidebar-open-btn');
    const openIcon = document.getElementById('sidebar-open-icon');

    if(sidebarOpen){
        openBtn.style.right = '0';
        openIcon.className = 'fa fa-angle-left'; // <
        sidebar.style.width = '0';
        sidebar.style.padding = '0';
    }
    else{
        openBtn.style.right = '250px';
        openIcon.className = 'fa fa-angle-left open'; // >
        sidebar.style.width = '260px';
        sidebar.style.padding = '1.5rem';
    }

    sidebarOpen = !sidebarOpen;
}

document.getElementById('sidebar-open-btn').addEventListener('click', sidebarClick);

// Screenshot function
const saveFile = function (strData, filename){
    let link = document.createElement('a');
    if(typeof link.download === 'string'){
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    }
    else{
        location.replace(uri);
    }
}
function screenShot(){
    let imgData, imgNode;
    let strDownloadMime = 'image/octet-stream';

    try{
        let strMime = 'image/jpeg';
        imgData = renderer.domElement.toDataURL(strMime);
        saveFile(imgData.replace(strMime, strDownloadMime), 'test.jpg');
    }
    catch(e){
        console.log(e);
        return;
    }
}
document.getElementById('screenshotbtn').addEventListener('click', screenShot);