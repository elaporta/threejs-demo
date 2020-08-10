// Dependencies
import * as THREE from './three.js/build/three.module.js';

let LOADEDMATERIALS = {};

function init(){

	// Texture Loader
	let textureLoader = new THREE.TextureLoader();
	let map, normalMap, roughnessMap;

	// T01 - Walls textures
    map = textureLoader.load('assets/textures/T01_PAREDES/1K/T01.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T01_PAREDES/1K/T01_NRM.jpg');
	LOADEDMATERIALS.T01 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	});

	// T02 - Floor Textures
	map = textureLoader.load('assets/textures/T02_PISO_MARMOL/2K/T02.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T02_PISO_MARMOL/2K/T02_NRM.jpg');
	LOADEDMATERIALS.T02 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    transparent: true,
	    opacity: .9
	});

	// T03 - Ceiling Textures
	map = textureLoader.load('assets/textures/T03_TECHO/1K/T03.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T03_TECHO/1K/T03_NRM.jpg');
	roughnessMap = textureLoader.load('assets/textures/T03_TECHO/1K/T03_ROUGH.jpg');
	LOADEDMATERIALS.T03 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap,
	    transparent: true,
	    opacity: .7
	});

	// T07
	map = textureLoader.load('assets/textures/T07_METAL/1K/T07.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T07_METAL/1K/T07_NRM.jpg');
	roughnessMap = textureLoader.load('assets/textures/T07_METAL/1K/T07_ROUGH.jpg');
	LOADEDMATERIALS.T07 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T09
	map = textureLoader.load('assets/textures/T09_CORTINAS_G/1K/T09.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T09 = new THREE.MeshStandardMaterial({
	    map: map,
	    transparent: true,
	    opacity: .9
	});

	// T10
	map = textureLoader.load('assets/textures/T10_MESAS_MARMOL/1K/T10.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T10_MESAS_MARMOL/1K/T10_NRM.jpg');
	roughnessMap = textureLoader.load('assets/textures/T10_MESAS_MARMOL/1K/T10_ROUGH.jpg');
	LOADEDMATERIALS.T10 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T11
	map = textureLoader.load('assets/textures/T11_ALFOMBRA/1K/T11.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('assets/textures/T11_ALFOMBRA/1K/T11_NRM.png');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	roughnessMap = textureLoader.load('assets/textures/T11_ALFOMBRA/1K/T11_ROUGH.jpg');
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T11 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});
}

init();

export const MATERIALS = LOADEDMATERIALS;