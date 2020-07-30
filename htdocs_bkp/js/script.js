// Dependencies
import * as THREE from './three.js/build/three.module.js';
import { WEBGL } from './three.js/examples/jsm/loaders/WEBGL.js';
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js';
import { Reflector } from './three.js/examples/jsm/objects/Reflector.js';

import { COLORS } from './colors/colorsSorted.js';
import { KellyColorPicker } from './colors/html5kellycolorpicker.min.js';
import { ntc } from './colors/ntc.js';

import { MATERIALS } from './materials.js';

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
CONTAINER.appendChild(renderer.domElement);

// Add a camera
let camera = new THREE.PerspectiveCamera(35, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(2.913008425923964, 3.532586021620339e-16, 4.97970708939187);
camera.rotation.set(-7.093963476578185e-17, 0.529299082785851, 3.5819440588148225e-17);

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
controls.enableZoom = true;

// Limit Y rotation
controls.maxPolarAngle = 1.7382304385754106;
controls.minPolarAngle = 1.253552748871017;

// Limit X rotation
controls.maxAzimuthAngle = 0.547924223149144;
controls.minAzimuthAngle = -0.7308629085677654;

// Limit distance
controls.minDistance = 0;
controls.maxDistance = 5.9;

// Add ambient light
let ambientLight = new THREE.AmbientLight(0x615d54, .7); // 0x404040 soft white light
scene.add(ambientLight);


// Add point light A to scene
let pointLightA = new THREE.PointLight(0xffffff, .8, 4.5);
pointLightA.position.set(-2.69, -.2, -.19);
scene.add(pointLightA);

// Add point light B to scene
let pointLightB = new THREE.PointLight(0xffffff, .8, 6);
pointLightB.position.set(0.11, -.1, -1.09);
scene.add(pointLightB);

// Add point light C to scene
let pointLightC = new THREE.PointLight(0xffffff, .8, 6);
pointLightC.position.set(-2.7, .2, -2.9);
scene.add(pointLightC);

// Add point light D to scene
let pointLightD = new THREE.PointLight(0xffffff, .8, 4);
pointLightD.position.set(-2.9, 0.19, 4.16);
scene.add(pointLightD);

// Add point light E to scene
let pointLightE = new THREE.PointLight(0xffffff, 1, 2);
pointLightE.position.set(.8, .19, -2.1);
scene.add(pointLightE);

// Add point light F to scene
let pointLightF = new THREE.PointLight(0xffffff, .75, 2);
pointLightF.position.set(-2.59, -.2, 0.69);
scene.add(pointLightF);

// Add point light G to scene
let pointLightG = new THREE.PointLight(0xffffff, .4, 4);
pointLightG.position.set(-6.39, 0.2, -5.1);
scene.add(pointLightG);

// Add point light H to scene
let pointLightH = new THREE.PointLight(0xffffff, .5, 10);
pointLightH.position.set(0.8, -0.2, 3.5);
scene.add(pointLightH);

// Add point light I to scene
let pointLightI = new THREE.PointLight(0xffffff, .75, .75);
pointLightI.position.set(1.9, -.99, -3.409);
scene.add(pointLightI);

// Add point light J to scene
let pointLightJ = new THREE.PointLight(0xffffff, .75, 4);
pointLightJ.position.set(-1.4, -.99, .191);
scene.add(pointLightJ);

// Add point light K to scene
let pointLightK = new THREE.PointLight(0xffffff, .8, 4);
pointLightK.position.set(-2.48, -.2, -1.18);
scene.add(pointLightK);

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
                    o.material = MATERIALS.T08;
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

                if(o.name.includes('T13')){
                    o.material = MATERIALS.T13;
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

                if(o.name.includes('T17')){
                    o.material = MATERIALS.T17;
                }

                if(o.name.includes('T18')){
                    o.material = MATERIALS.T18;
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

// Load gltf
let loader = new GLTFLoader(loadergManager);
loader.setPath('../assets/models/living/');
loader.load('living.gltf', function(gltf){
    scene.add(gltf.scene);
    theModel = gltf.scene.children[0];
});

function animate() {
    // directionalLightAHelper.update();
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

    if(e.target.dataset.option){
        activeOption = e.target.dataset.option;

        for(const otherOption of options){
            otherOption.classList.remove('--is-active');
        }

        option.classList.add('--is-active');
    }
}

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