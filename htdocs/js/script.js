// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { WEBGL } from './three.js/examples/jsm/loaders/WebGL.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './three.js/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from './three.js/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { Reflector } from './three.js/examples/jsm/objects/Reflector.js';

import { COLORS } from './colors/colorsSorted.js';
import { KellyColorPicker } from './colors/html5kellycolorpicker.min.js';
import { ntc } from './colors/ntc.js';

import { MATERIALS } from './materials.js';
import { LIGHTS, TARGETS, HELPERS } from './lights.js';

// DOM elements
const LOADER = document.getElementById('js-loader');
const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');
const CONTAINER = document.getElementById('model-container');
const SELECTEDCOLOR = document.getElementById('selected-color');

// Render const
const WIDTH = CONTAINER.offsetWidth;
const HEIGHT = CONTAINER.offsetHeight;
const BACKGROUND_COLOR = 0xf1f1f1;

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

// Init the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1;
CONTAINER.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(2.265756650575733, 0.2446215651360226, 5.4421050238158895);
camera.rotation.set(-0.044919569192272295, 0.39415330126621373, 0.017260204742749117);

// Camera resizing
function resize(){
    camera.aspect = CONTAINER.offsetWidth / CONTAINER.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(CONTAINER.offsetWidth, CONTAINER.offsetHeight);
}
window.addEventListener('resize', resize, false);

// Add controls
let controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.25;
// controls.enableZoom = false;

// Limit Y rotation
controls.maxPolarAngle = 1.7382304385754106;
controls.minPolarAngle = 1.253552748871017;

// Limit X rotation
controls.maxAzimuthAngle = 0.547924223149144;
controls.minAzimuthAngle = -0.7308629085677654;

// Limit distance
controls.minDistance = 0;
controls.maxDistance = 5.9;

// Add HDR background
let pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
let rgbeLoader = new RGBELoader()
.setDataType(THREE.UnsignedByteType)
.setPath('assets/textures/hdr/')
.load('background_1k.hdr', function(texture){
    let envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.background = envMap;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
});

// Add lights to scene
for(let i in LIGHTS){
    scene.add(LIGHTS[i]);
}

// // Add lights targets to scene
// for(let i in TARGETS){
//     scene.add(TARGETS[i]);
// }

// // Add lights helpers to scene
// for(let i in HELPERS){
//     scene.add(HELPERS[i]);
// }

// Load ground mirror
let groundGeometry = new THREE.PlaneBufferGeometry(9, 9);
let groundMirror = new Reflector(groundGeometry, {
    clipBias: 0.003,
    textureWidth: WIDTH * window.devicePixelRatio,
    textureHeight: HEIGHT * window.devicePixelRatio,
    color: 0x777777 // or 0x889999
});
groundMirror.rotateX(- Math.PI / 2);
groundMirror.position.y = -1.62;
scene.add(groundMirror);

function setObjectNameId(name = null){
    let nameId = null;

    if(typeof name == 'string'){
        if(name.includes('_W_')){
            nameId = 'wall-w';
        }
        else if(name.includes('_N_')){
            nameId = 'wall-n';
        }
        else if(name.includes('_E_')){
            nameId = 'wall-e';
        }
    }

    return nameId;
}

// Loader manager
let loadergManager = new THREE.LoadingManager(function(){
    if(theModel){
        // Set the models initial variables
        theModel.scale.set(1, 1, 1);
        theModel.position.set(-4.2, -1.8, 4.2);
        theModel.castShadow = true;
        theModel.receiveShadow = true;

        theModel.traverse(o => {

            if(o.isMesh){

                // Set shadows
                o.castShadow = true;
                o.receiveShadow = true;

                if(o.name.includes('T01')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                    o.material = MATERIALS.T01;
                    o.nameId = setObjectNameId(o.name);
                }

                if(o.name.includes('T02')){
                    o.castShadow = false;
                    o.material = MATERIALS.T02;
                }

                if(o.name.includes('T03')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                    o.material = MATERIALS.T03;
                }

                if(o.name.includes('T07')){
                    o.material = MATERIALS.T07;
                }

                if(o.name.includes('T08')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                }

                if(o.name.includes('T09')){
                    o.material = MATERIALS.T09;
                    o.castShadow = false;
                    o.receiveShadow = false;
                }

                if(o.name == 'Ventana_2_(Agua_1)'){
                    o.visible = false;
                }

                if(o.name.includes('T10')){
                    o.material = MATERIALS.T10;
                }

                if(o.name.includes('T11')){
                    o.material = MATERIALS.T11;
                }

                if(o.name.includes('T14')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                }

                if(o.name.includes('T15')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                }

                if(o.name.includes('T16')){
                    o.castShadow = false;
                    o.receiveShadow = false;
                }
            }
            else{
                // Zocalo fix
                if(o.name.includes('T01') && o.children.length > 0){
                    for(let child of o.children){
                        child.nameId = 'wall-w';
                        child.castShadow = false;
                    }
                }

                // Techo shadow fix
                if(o.name.includes('T03') && o.children.length > 0){
                    for(let child of o.children){
                        child.castShadow = false;
                    }
                }
            }
        });

        // Add the model to the scene
        scene.add(theModel);

        start();
    }
});

// Set draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('js/three.js/examples/js/libs/draco/');

// Load gltf
const gltfLoader = new GLTFLoader(loadergManager);
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setPath('assets/models/living/');
gltfLoader.load('draco.gltf', function(gltf){
    scene.add(gltf.scene);
    theModel = gltf.scene.children[0];
});

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

    // Remove the loading
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

for(const option of options){
    option.addEventListener('click', selectOption);
}

function selectOption(e){
    let option = e.target;

    if(e.target.dataset.option){
        activeOption = e.target.dataset.option;

        for(const otherOption of options){
            otherOption.classList.remove('--is-active');
        }

        option.classList.add('--is-active');
    }
}

let lastHex;

function selectSwatch(e) {
    let option = e.target;
    let hex = option.getAttribute('hex');

    if(hex == null){
        return false;
    }

    let color = parseInt('0x' + hex);
    let new_mtl = MATERIALS.T01.clone();
    new_mtl.color = new THREE.Color(color);
    new_mtl.shininess = 4;
    new_mtl.opacity = .7;

    if(hex != lastHex){
        lastHex = hex;

        // Display hex in selected color
        SELECTEDCOLOR.innerHTML = '#' + hex;

        for(const otherSwatch of swatches){
            otherSwatch.classList.remove('--is-active');
            otherSwatch.innerHTML = '';
        }

        option.classList.add('--is-active');
        option.innerHTML = '<i class="fa fa-check" hex="'+hex+'"></i>';
    }

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
        openIcon.className = 'fa fa-angle-left';
        sidebar.style.width = '93px';
    }
    else{
        openIcon.className = 'fa fa-angle-left open';
        sidebar.style.width = '323px';
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

// Debug info
function debugInfo(){
    console.log('Debug: ', camera);
    // alert(JSON.stringify(LIGHTS.pointLightC.position));
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
        case 73: // i
            debugInfo();
        break;

        // the model position for up/down
        case 65: // a
            LIGHTS.pointLightC.position.x -= 0.1;
        break;
        case 68: // d
            LIGHTS.pointLightC.position.x += 0.1;
        break;
        case 69: // e
            LIGHTS.pointLightC.position.z -= 0.1;
        break;
        case 81: // q
            LIGHTS.pointLightC.position.z += 0.1;
        break;
        case 83: // s
            LIGHTS.pointLightC.position.y -= 0.1;
        break;
        case 87: // w
            LIGHTS.pointLightC.position.y += 0.1;
        break;
    }
};