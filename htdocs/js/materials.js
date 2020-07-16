// Dependencies
import * as THREE from './three.js/build/three.module.js';

let LOADEDMATERIALS = {};

function init(){

	// Texture Loader
	let textureLoader = new THREE.TextureLoader();
	let map, normalMap, roughnessMap;

	// T01 - Walls textures
	map = textureLoader.load('../assets/textures/T01_PAREDES/2K/T01.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T01_PAREDES/2K/T01_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T01_PAREDES/2K/T01_ROUGH.jpg');
	LOADEDMATERIALS.T01 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    // roughnessMap: roughnessMap
	});

	// T02 - Floor Textures
	map = textureLoader.load('../assets/textures/T02_PISO_MARMOL/2K/T02.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T02_PISO_MARMOL/2K/T02_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T02_PISO_MARMOL/2K/T02_ROUGH.jpg');
	LOADEDMATERIALS.T02 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    // roughnessMap: roughnessMap,
	    transparent: true,
	    opacity: .9
	});

	// T03 - Ceiling Textures
	map = textureLoader.load('../assets/textures/T03_TECHO/2K/T03.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T03_TECHO/2K/T03_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T03_TECHO/2K/T03_ROUGH.jpg');
	LOADEDMATERIALS.T03 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap,
	    transparent: true,
	    opacity: .7
	});

	// T05
	map = textureLoader.load('../assets/textures/T05_TELA_G/2K/T05.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T05_TELA_G/2K/T05_NRM.jpg');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	roughnessMap = textureLoader.load('../assets/textures/T05_TELA_G/2K/T05_ROUGH.jpg');
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T05 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T06
	map = textureLoader.load('../assets/textures/T06_TELA_N/2K/T06.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T06_TELA_N/2K/T06_NRM.jpg');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	roughnessMap = textureLoader.load('../assets/textures/T06_TELA_N/2K/T06_ROUGH.jpg');
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T06 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T07
	map = textureLoader.load('../assets/textures/T07_METAL/2K/T07.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T07_METAL/2K/T07_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T07_METAL/2K/T07_ROUGH.jpg');
	LOADEDMATERIALS.T07 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T08
	map = textureLoader.load('../assets/textures/T08_CORTINAS_B/2K/T08.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T08 = new THREE.MeshStandardMaterial({
	    map: map,
	    transparent: true,
	    opacity: .6
	});

	// T09
	map = textureLoader.load('../assets/textures/T09_CORTINAS_G/2K/T09.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T09 = new THREE.MeshStandardMaterial({
	    map: map,
	    transparent: true,
	    opacity: .9
	});

	// T10
	map = textureLoader.load('../assets/textures/T10_MESAS_MARMOL/2K/T10.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T10_MESAS_MARMOL/2K/T10_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T10_MESAS_MARMOL/2K/T10_ROUGH.jpg');
	LOADEDMATERIALS.T10 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T11
	map = textureLoader.load('../assets/textures/T11_ALFOMBRA/2K/T11.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T11_ALFOMBRA/2K/T11_NRM.png');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	roughnessMap = textureLoader.load('../assets/textures/T11_ALFOMBRA/2K/T11_ROUGH.jpg');
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T11 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T12
	map = textureLoader.load('../assets/textures/T12_TAZA/2K/T12.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T12_TAZA/2K/T12_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T12_TAZA/2K/T12_ROUGH.jpg');
	LOADEDMATERIALS.T12 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T13
	map = textureLoader.load('../assets/textures/T13_JARRONES/2K/T13.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T13_JARRONES/2K/T13_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T13_JARRONES/2K/T13_ROUGH.jpg');
	LOADEDMATERIALS.T13 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T14
	map = textureLoader.load('../assets/textures/T14_CUADRO_IZQ/2K/T14.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T14 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T15
	map = textureLoader.load('../assets/textures/T15_CUADRO_CENTRO/2K/T15.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T15 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T16
	map = textureLoader.load('../assets/textures/T16_CUADRO_DER/2K/T16.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T16 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T17
	map = textureLoader.load('../assets/textures/T17_PLANTA_1/2K/T17.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T17_PLANTA_1/2K/T17_NRM.jpg');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	roughnessMap = textureLoader.load('../assets/textures/T17_PLANTA_1/2K/T17_ROUGH.jpg');
	roughnessMap.wrapS = THREE.RepeatWrapping;
	roughnessMap.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T17 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T18
	map = textureLoader.load('../assets/textures/T18_PLANTA_2_(SUCULENTA)/2K/T18.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	normalMap = textureLoader.load('../assets/textures/T18_PLANTA_2_(SUCULENTA)/2K/T18_NRM.jpg');
	roughnessMap = textureLoader.load('../assets/textures/T18_PLANTA_2_(SUCULENTA)/2K/T18_ROUGH.jpg');
	LOADEDMATERIALS.T18 = new THREE.MeshStandardMaterial({
	    map: map,
	    normalMap: normalMap,
	    roughnessMap: roughnessMap
	});

	// T20
	map = textureLoader.load('../assets/textures/T20_LIBRO_CERRADO/2K/T20.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T20 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T21
	map = textureLoader.load('../assets/textures/T21_LIBRO_ABIERTO_HOJA_1/2K/T21.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T21 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T22
	map = textureLoader.load('../assets/textures/T22_LIBRO_ABIERTOHOJA_2/2K/T22.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T22 = new THREE.MeshStandardMaterial({
	    map: map
	});

	// T23
	map = textureLoader.load('../assets/textures/T23_LIBRO_ABIERTO_PAPEL_LISO/2K/T23.jpg');
	map.wrapS = THREE.RepeatWrapping;
	map.wrapT = THREE.RepeatWrapping;
	LOADEDMATERIALS.T23 = new THREE.MeshStandardMaterial({
	    map: map
	});
}

init();

export const MATERIALS = LOADEDMATERIALS;