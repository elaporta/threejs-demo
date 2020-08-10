// Dependencies
import * as THREE from './three.js/build/three.module.js';

// Add point light A to scene
const pointLightA = new THREE.PointLight(0xffffff, .8, 3.5, 2);
pointLightA.position.set(-2.69, -.2, -.19);
const pointLightAHelper = new THREE.PointLightHelper(pointLightA, 1);

// Add point light B to scene
const pointLightB = new THREE.PointLight(0xffffff, .8, 2);
pointLightB.position.set(-0.01, -.1, -1.09);
const pointLightBHelper = new THREE.PointLightHelper(pointLightB, 1);

// Add point light C to scene
const pointLightC = new THREE.PointLight(0xffffff, .75, 2.1);
// pointLightC.position.set(-2.08, .4, -2.51);
pointLightC.position.set(-2.18, -0.1, -2.81);
const pointLightCHelper = new THREE.PointLightHelper(pointLightC, 1);

// Add point light D to scene
const pointLightD = new THREE.PointLight(0xffffff, .6, 3.5);
pointLightD.position.set(-4.69, -.7, -3.59);
const pointLightDHelper = new THREE.PointLightHelper(pointLightD, 1);

export const LIGHTS = {
	pointLightA: pointLightA,
	pointLightB: pointLightB,
	pointLightC: pointLightC,
	pointLightD: pointLightD
};

export const TARGETS = {};

export const HELPERS = {
	pointLightA: pointLightAHelper,
	pointLightB: pointLightBHelper,
	pointLightC: pointLightCHelper,
	pointLightD: pointLightDHelper
};