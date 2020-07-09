// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { WEBGL } from './three.js/examples/jsm/loaders/WEBGL.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { Reflector } from './three.js/examples/jsm/objects/Reflector.js';

// import { TDSLoader } from './three.js/examples/jsm/loaders/TDSLoader.js';
// import { MTLLoader } from './three.js/examples/jsm/loaders/MTLLoader.js';
// import { OBJLoader } from './three.js/examples/jsm/loaders/OBJLoader.js';
// import { TGALoader } from './three.js/examples/jsm/loaders/TGALoader.js';

import { COLORS } from './colors/colorsSorted.js';
import { KellyColorPicker } from './colors/html5kellycolorpicker.min.js';
import { ntc } from './colors/ntc.js';

// Dom elements
const LOADER = document.getElementById('js-loader');
const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');
const CONTAINER = document.getElementById('model-container');
const SELECTEDCOLOR = document.getElementById('selected-color');

// Render const
const WIDTH = CONTAINER.offsetWidth;
const HEIGHT = CONTAINER.offsetHeight;
const BACKGROUND_COLOR = 0xf1f1f1;
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xF2DABA, shininess: 10 });

// Private variables
let theModel;
let activeOption = 'all';
let colors = [];
let swatches;

// Colors init
ntc.init();
colors = COLORS;

// Init the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

// Init the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
// renderer.shadowMapType = THREE.PCFSoftShadowMap;
// renderer.physicallyCorrectLights = true;
CONTAINER.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(-0.2963585789463235, 1.2246467991473552e-16, 4.230488252069703);
camera.rotation.set(0, 0, 0);

// Camera resizing
function resize(){
    camera.aspect = CONTAINER.offsetWidth / CONTAINER.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(CONTAINER.offsetWidth, CONTAINER.offsetHeight);
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
let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(-8.4, -.5, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
scene.add(directionalLight);

// Directional light helper
let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);

// Add point light to scene
let pointLight = new THREE.PointLight(0xffffff, 1.2, 10);
pointLight.position.set(-2.5, -0.1, -1.5);
scene.add(pointLight);

// Point light helper
let pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// Texture Loader
let textureLoader = new THREE.TextureLoader();
let map, normalMap, roughnessMap;

// Walls textures
map = textureLoader.load('../assets/textures/T01_PAREDES/T01.jpg');
map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;
normalMap = textureLoader.load('../assets/textures/T01_PAREDES/T01_NRM.jpg');
roughnessMap = textureLoader.load('../assets/textures/T01_PAREDES/T01_ROUGH.jpg');
const WALLMAT = new THREE.MeshStandardMaterial({
    map: map,
    normalMap: normalMap,
    roughnessMap: roughnessMap
});

// Floor Textures
map = textureLoader.load('../assets/textures/T02_PISO/T02.jpg');
map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;
normalMap = textureLoader.load('../assets/textures/T02_PISO/T02_NRM.jpg');
roughnessMap = textureLoader.load('../assets/textures/T02_PISO/T02_ROUGH.jpg');
const FLOORMAT = new THREE.MeshStandardMaterial({
    map: map,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    transparent: true,
    opacity: .8
});

// Ceiling Textures
map = textureLoader.load('../assets/textures/T03_TECHO/T03.jpg');
map.wrapS = THREE.RepeatWrapping;
map.wrapT = THREE.RepeatWrapping;
normalMap = textureLoader.load('../assets/textures/T03_TECHO/T03_NRM.jpg');
roughnessMap = textureLoader.load('../assets/textures/T03_TECHO/T03_ROUGH.jpg');
const CEILINGMAT = new THREE.MeshStandardMaterial({
    map: map,
    normalMap: normalMap,
    roughnessMap: roughnessMap
});

// Load ground mirror
let groundGeometry = new THREE.PlaneBufferGeometry(10, 10);
let groundMirror = new Reflector(groundGeometry, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x777777 // or 0x889999
});
groundMirror.rotateX(- Math.PI / 2);
groundMirror.position.y = -1.62;
scene.add(groundMirror);

// function setObjectNameId(name = null){
//     let nameId = null;

//     if(typeof name == 'string'){
//         if(name == 'Color_G01'){
//             nameId = 'wall-1';
//         }
//         else if(name == 'Color_G02'){
//             nameId = 'wall-2';
//         }
//         else if(name == 'Color_G03'){
//             nameId = 'wall-3';
//         }
//     }

//     return nameId;
// }

// Loader manager
let loadergManager = new THREE.LoadingManager(function(){
    if(theModel){
        // Set the models initial variables
        theModel.scale.set(1, 1, 1);
        // theModel.position.set(-1.5, -1.5, 0);
        theModel.position.set(-4.2, -1.8, 4.2);
        // theModel.rotation.x = 300; // 3ds fix position
        theModel.castShadow = true;
        theModel.receiveShadow = true;

        theModel.traverse(o => {
            if(o.isMesh){

                // Set shadows
                o.castShadow = true;
                o.receiveShadow = true;

                // Find walls
                // if(Array.isArray(o.material)){console.log('aaaa');
                //     for(let mat of o.material){
                //         // Set a new property to identify this object
                //         o.nameId = setObjectNameId(mat.name);
                //     }
                // }
                // else{}

                if(o.material.name == 'T01 - PAREDES'){
                    o.material = WALLMAT;
                    o.nameId = 'wall-1';
                }

                if(o.material.name == 'T02 - PISO'){
                    o.material = FLOORMAT;
                }

                if(o.material.name == 'T03 - TECHO'){
                    o.material = CEILINGMAT;
                }

                // Set a new property to identify this object
                // o.nameId = setObjectNameId(o.material.name);

                // if(o.nameId != null){
                //     o.material = INITIAL_MTL;
                // }
            }
        });

        // Add the model to the scene
        scene.add(theModel);

        start();
    }
});

// Load gltf
let loader = new GLTFLoader(loadergManager);
loader.setPath('../assets/models/living/');
loader.load('living.gltf', function(gltf){
    scene.add(gltf.scene);
    theModel = gltf.scene.children[0];
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

// Debug info
function debugInfo(){
    if(theModel){
        console.log('Model Position: ', theModel.position);
        console.log('Model Rotation: ', theModel.rotation);
    }

    console.log('Camera Position: ', camera.position);
    console.log('Camera Rotation: ', camera.rotation);

    console.log('Point Light Position: ', pointLight.position);
    console.log('Directional Light Position: ', directionalLight.position);

    console.log('Ground Mirror Position: ', groundMirror.position);
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
        case 65: // a
            pointLight.position.x += 0.1;
        break;
        case 68: // d
            pointLight.position.x -= 0.1;
        break;
        case 69: // e
            pointLight.position.z += 0.1;
        break;
        case 81: // q
            pointLight.position.z -= 0.1;
        break;
        case 83: // s
            pointLight.position.y += 0.1;
        break;
        case 87: // w
            pointLight.position.y -= 0.1;
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
        swatch.style.background = '#' + color.hex;
        swatch.setAttribute('hex', color.hex);
        swatch.setAttribute('title', color.name);
        tr.append(swatch);

        if(i == colorsLength){
            TRAY.append(tr);
        }
    }

    // Swatches
    swatches = document.querySelectorAll('.tray__swatch');

    for(let swatch of swatches){
        swatch.addEventListener('click', selectSwatch);
    }
}

// buildColors(COLORS);

// Sum rgb
function sumRGBColor(r, g, b) {

    // Summing the channels does not calculate brightness, so this is incorrect:
    // return rgb[0] + rgb[1] + rgb[2];

    // To calculate relative luminance under sRGB and RGB colorspaces that use Rec. 709:
    return 0.2126*r + 0.7152*g + 0.0722*b;
}

// Sort colors function
// function sortColors(){
//     colors = COLORS.sort(function (c1, c2) {
//         return sumRGBColor(c1.r, c1.g, c1.b) > sumRGBColor(c2.r, c2.g, c2.b);
//     });

//     for(let i in colors){
//         let cat = ntc.name(colors[i].hex);
//         colors[i].category = cat[3];
//         console.log(JSON.stringify(colors[i]));
//     }
// }
// sortColors();

// Init color picker
const kellyColorPicker = new KellyColorPicker({
    place : 'color-picker',
    size : 150,
    inputFormat: 'rgba',
    userEvents: {
        change: function(e){
            let newColors = getMatchedColors(e.getCurColorRgb(), e.getCurColorHex());
            buildColors(newColors);
        }
    }
});

function getMatchedColors(pickedRgb, pickedHex){
    let targetValue = sumRGBColor(pickedRgb.r, pickedRgb.g, pickedRgb.b);
    let targetCategory = ntc.name(pickedHex)[3];

    let result = colors.filter(function(c){
        let match = false;
        let currentValue = sumRGBColor(c.r, c.g, c.b);
        let lessValue = currentValue - 50;
        let biggerValue = currentValue + 50;

        if(targetCategory == c.category){
            if((targetValue >= lessValue) && (targetValue <= biggerValue)){
                match = true;
            }
        }

        return match;
    });

    if(result.length == 0){
        result = colors;
    }

    return result;
}

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

function selectSwatch(e) {
    let option = e.target;
    let hex = option.getAttribute('hex');
    let color = parseInt('0x' + hex);
    let new_mtl = WALLMAT;
    new_mtl.color = new THREE.Color(color);

    // Display hex in selected color
    SELECTEDCOLOR.innerHTML = '#' + hex;

    for(const otherSwatch of swatches){
        otherSwatch.classList.remove('--is-active');
        otherSwatch.innerHTML = '';
    }

    option.classList.add('--is-active');
    option.innerHTML = '<i class="fa fa-check"></i>';

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

// Make image from renderer
function rendererToImage(){
    let imgData;

    try{
        let strMime = 'image/jpeg';
        imgData = renderer.domElement.toDataURL(strMime);
        imgData = imgData.replace(strMime, 'image/octet-stream');
    }
    catch(e){
        console.log(e);
    }
    finally{
        return imgData;
    }
}

// Screenshot function
function screenShot(){
    let strData = rendererToImage();
    let filename = new Date().toLocaleString() + '.jpg';

    if(strData){
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

    return false;
}
document.getElementById('screenshotbtn').addEventListener('click', screenShot);

// Facebook function
function facebookShare(){
    let imgLink = rendererToImage();

    if(imgLink){
        console.log(imgLink);
        // window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(imgLink)+'&t='+encodeURIComponent(imgLink),'sharer','toolbar=0,status=0,width=626,height=436');
    }

    return false;
}
document.getElementById('facebookbtn').addEventListener('click', facebookShare);