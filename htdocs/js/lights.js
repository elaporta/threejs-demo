// Dependencies
import * as THREE from './three.js/build/three.module.js';

// // Add ambient light to scene
// const ambientLight = new THREE.AmbientLight(0xffffff, .4);

// // Add hemisphere light A to scene
// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, .5);
// hemisphereLight.position.set(-0.1, 3.6, 3.8);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 3);

// Add point light A to scene
const pointLightA = new THREE.PointLight(0xffffff, .8, 4.5, 2);
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

// Add point light E to scene
const pointLightE = new THREE.PointLight(0xffffff, .6, 2.7, 2);
pointLightE.position.set(-2.09, -0.3, -0.99);
const pointLightEHelper = new THREE.PointLightHelper(pointLightE, 1);

// Add spot light A to scene
const spotLightA = new THREE.SpotLight(
	0xffffff, // color
	.6, // intensity
	6, // distance
	.7, // angle
	0, // penumbra
	2 // decay
);
spotLightA.position.set(-2.89, -0.4, 0.3);
spotLightA.target.position.set(-0.49, -0.79, -3.9);
spotLightA.castShadow = true;
spotLightA.shadow.mapSize = new THREE.Vector2(2048, 2048);
const spotLightAHelper = new THREE.SpotLightHelper(spotLightA, 5);

export const LIGHTS = {
	// ambientLight: ambientLight,
	// hemisphereLight: hemisphereLight,
	pointLightA: pointLightA,
	pointLightB: pointLightB,
	pointLightC: pointLightC,
	pointLightD: pointLightD,
	pointLightE: pointLightE,
	spotLightA: spotLightA
}

export const TARGETS = {
	spotLightA: spotLightA.target
}

export const HELPERS = {
	// hemisphereLight: hemisphereLightHelper,
	pointLightA: pointLightAHelper,
	pointLightB: pointLightBHelper,
	pointLightC: pointLightCHelper,
	pointLightD: pointLightDHelper,
	pointLightE: pointLightEHelper,
	spotLightA: spotLightAHelper
}