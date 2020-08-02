// Dependencies
import * as THREE from './three.js/build/three.module.js';

// Add ambient light to scene
const ambientLight = new THREE.AmbientLight(0xffffff, .4);

// Add hemisphere light A to scene
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, .5);
hemisphereLight.position.set(-0.1, 3.6, 3.8);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 3);

// Add point light A to scene
const pointLightA = new THREE.PointLight(0xffffff, .8, 4.5);
pointLightA.position.set(-2.69, -.2, -.19);
const pointLightAHelper = new THREE.PointLightHelper(pointLightA, 1);

// Add point light B to scene
const pointLightB = new THREE.PointLight(0xffffff, .8, 3);
pointLightB.position.set(-0.01, -.1, -1.09);
const pointLightBHelper = new THREE.PointLightHelper(pointLightB, 1);

// Add point light C to scene
const pointLightC = new THREE.PointLight(0xffffff, .75, 2.6);
pointLightC.position.set(-2.08, .4, -2.51);
const pointLightCHelper = new THREE.PointLightHelper(pointLightC, 1);

// Add point light D to scene
const pointLightD = new THREE.PointLight(0xffffff, .6, 4);
pointLightD.position.set(-4.69, -.7, -3.59);
const pointLightDHelper = new THREE.PointLightHelper(pointLightD, 1);

export const LIGHTS = {
	ambientLight: ambientLight,
	hemisphereLight: hemisphereLight,
	pointLightA: pointLightA,
	pointLightB: pointLightB,
	pointLightC: pointLightC,
	pointLightD: pointLightD
}

export const HELPERS = {
	hemisphereLight: hemisphereLightHelper,
	pointLightA: pointLightAHelper,
	pointLightB: pointLightBHelper,
	pointLightC: pointLightCHelper,
	pointLightD: pointLightDHelper
}