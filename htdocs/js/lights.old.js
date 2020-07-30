// Dependencies
import * as THREE from './three.js/build/three.module.js';

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xD9C1AE, .4);

// Add point light A to scene
const pointLightA = new THREE.PointLight(0xffffff, .8, 4.5);
pointLightA.position.set(-2.69, -.2, -.19);

// Add point light B to scene
const pointLightB = new THREE.PointLight(0xffffff, .8, 6);
pointLightB.position.set(0.11, -.1, -1.09);

// Add point light C to scene
const pointLightC = new THREE.PointLight(0xffffff, .8, 6);
pointLightC.position.set(-2.7, .2, -2.9);

// Add point light D to scene
const pointLightD = new THREE.PointLight(0xffffff, .8, 4);
pointLightD.position.set(-2.9, 0.19, 4.16);

// Add point light E to scene
const pointLightE = new THREE.PointLight(0xffffff, 1, 2);
pointLightE.position.set(.8, .19, -2.1);

// Add point light F to scene
const pointLightF = new THREE.PointLight(0xffffff, .75, 2);
pointLightF.position.set(-2.59, -.2, 0.69);

// Add point light G to scene
const pointLightG = new THREE.PointLight(0xffffff, .4, 4);
pointLightG.position.set(-6.39, 0.2, -5.1);

// Add point light H to scene
const pointLightH = new THREE.PointLight(0xffffff, .5, 10);
pointLightH.position.set(0.8, -0.2, 3.5);

// Add point light I to scene
const pointLightI = new THREE.PointLight(0xffffff, .75, .75);
pointLightI.position.set(1.9, -.99, -3.409);

// Add point light J to scene
const pointLightJ = new THREE.PointLight(0xffffff, .75, 4);
pointLightJ.position.set(-1.4, -.99, .191);

// Add point light K to scene
const pointLightK = new THREE.PointLight(0xffffff, .8, 4);
pointLightK.position.set(-2.48, -.2, -1.18);

export const LIGHTS = {
	ambientLight: ambientLight,
	pointLightA: pointLightA,
	pointLightB: pointLightB,
	pointLightC: pointLightC,
	pointLightD: pointLightD,
	pointLightE: pointLightE,
	pointLightF: pointLightF,
	pointLightG: pointLightG,
	pointLightH: pointLightH,
	pointLightI: pointLightI,
	pointLightJ: pointLightJ,
	pointLightK: pointLightK
}