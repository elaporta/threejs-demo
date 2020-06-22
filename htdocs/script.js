const LOADER = document.getElementById('js-loader');

const TRAY = document.getElementById('js-tray-slide');
const DRAG_NOTICE = document.getElementById('js-drag-notice');

var theModel;

const MODEL_PATH = "chair.glb";

var activeOption = 'all';
var loaded = false;

const colors = [
    { color: '131417' },
    { color: '374047' },
    { color: '5f6e78' },
    { color: '7f8a93' },
    { color: '97a1a7' },
    { color: 'acb4b9' },
    { color: 'DF9998' },
    { color: '7C6862' },
    { color: 'A3AB84' },
    { color: 'D6CCB1' },
    { color: 'F8D5C4' },
    { color: 'A3AE99' },
    { color: 'EFF2F2' },
    { color: 'B0C5C1' },
    { color: '8B8C8C' },
    { color: '565F59' },
    { color: 'CB304A' },
    { color: 'FED7C8' },
    { color: 'C7BDBD' },
    { color: '3DCBBE' },
    { color: '264B4F' },
    { color: '389389' },
    { color: '85BEAE' },
    { color: 'F2DABA' },
    { color: 'F2A97F' },
    { color: 'D85F52' },
    { color: 'D92E37' },
    { color: 'FC9736' },
    { color: 'F7BD69' },
    { color: 'A4D09C' },
    { color: '4C8A67' },
    { color: '25608A' },
    { color: '75C8C6' },
    { color: 'F5E4B7' },
    { color: 'E69041' },
    { color: 'E56013' },
    { color: '11101D' },
    { color: '630609' },
    { color: 'C9240E' },
    { color: 'EC4B17' },
    { color: '281A1C' },
    { color: '4F556F' },
    { color: '64739B' },
    { color: 'CDBAC7' },
    { color: '946F43' },
    { color: '66533C' },
    { color: '173A2F' },
    { color: '153944' },
    { color: '27548D' },
    { color: '438AAC' }
];

const BACKGROUND_COLOR = 0xf1f1f1;

// Init the scene
const scene = new THREE.Scene();

// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

var cameraFar = 5;
var cameraFov = 24;

document.body.appendChild(renderer.domElement);

// Add a camera
var camera = new THREE.PerspectiveCamera(cameraFov, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;
camera.position.y = -70;

// Initial material
const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xF2DABA, shininess: 10 });

const INITIAL_MAP = [
    { childID: 'wall-1', mtl: INITIAL_MTL },
    { childID: 'wall-2', mtl: INITIAL_MTL },
    { childID: 'wall-3', mtl: INITIAL_MTL }
];

// loading manager
var loadingManager = new THREE.LoadingManager(function(){
    if(theModel){
        theModel.traverse(o => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        // Set the models initial scale   
        theModel.scale.set(2, 2, 2);
        theModel.position.set(-290,-100,0);

        // Set initial textures
        for (let object of INITIAL_MAP) {
            initColor(theModel, object.childID, object.mtl);
        }

        // Add the model to the scene
        scene.add(theModel);

        // Remove the loader
        LOADER.remove();
    }
});

// Init the object loader collada
var loader = new THREE.ColladaLoader(loadingManager);

loader.load( './assets/models/quarti/model.dae', function (collada){
    theModel = collada.scene;
});

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
    parent.traverse(o => {
        if(o.isMesh){

            // Find walls
            if(Array.isArray(o.material)){
                for(let mat of o.material){
                    if(mat.name == '_0098_DodgerBlue'){
                        o.nameID = 'wall-1'; // Set a new property to identify this object
                    }
                    else if(mat.name == '_0102_RoyalBlue'){
                        o.nameID = 'wall-2'; // Set a new property to identify this object
                    }
                    else if(mat.name == '_0101_CornflowerBlue'){
                        o.nameID = 'wall-3'; // Set a new property to identify this object
                    }
                }
            }
            else{
                if(o.material.name == '_0098_DodgerBlue'){
                    o.nameID = 'wall-1'; // Set a new property to identify this object
                }
                else if(o.material.name == '_0102_RoyalBlue'){
                    o.nameID = 'wall-2'; // Set a new property to identify this object
                }
                else if(o.material.name == '_0101_CornflowerBlue'){
                    o.nameID = 'wall-3'; // Set a new property to identify this object
                }
            }

            if(o.nameID == type){
                o.material = mtl;
                // o.nameID = type; // Set a new property to identify this object
            }
        }
    });
}

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);

// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);

// Add directional Light to scene    
scene.add(dirLight);

// Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;

controls.maxAzimuthAngle = Math.PI / 10;
controls.minAzimuthAngle = -(Math.PI / 10);

controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30
controls.minDistance = 30;
controls.maxDistance = 190;

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    if (theModel != null && loaded == false) {
        DRAG_NOTICE.classList.add('start');
    }
}

animate();

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}

// Function - Build Colors
function buildColors(colors) {
    for (let [i, color] of colors.entries()) {
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

for (const option of options) {
    option.addEventListener('click', selectOption);
}

function selectOption(e) {
    let option = e.target;
    activeOption = e.target.dataset.option;

    for (const otherOption of options) {
        otherOption.classList.remove('--is-active');
    }

    option.classList.add('--is-active');
}

// Swatches
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
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

function setMaterial(parent, type, mtl) {
    parent.traverse(o => {
        if (o.isMesh && o.nameID != null) {
            if(type == 'all'){
                o.material = mtl;
            }
            else if(o.nameID == type){
                o.material = mtl;
            }
        }
    });
}

var slider = document.getElementById('js-tray'),sliderItems = document.getElementById('js-tray-slide'),difference;

function slide(wrapper, items) {
  var posX1 = 0,
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


  function dragStart(e) {
    e = e || window.event;
    posInitial = items.offsetLeft;
    difference = sliderItems.offsetWidth - slider.offsetWidth;
    difference = difference * -1;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }

    if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
      items.style.left = items.offsetLeft - posX2 + "px";
    }
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {

    } else if (posFinal - posInitial > threshold) {

    } else {
      items.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

}

slide(slider, sliderItems);