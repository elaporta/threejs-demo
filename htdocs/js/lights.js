// Add hemisphere light A to scene
let hemisphereLightA = new THREE.HemisphereLight(0xffffff, 0x404040, .9);
hemisphereLightA.position.set(-0.1, 3.6, 3.8);
scene.add(hemisphereLightA);
let hemisphereLightAHelper = new THREE.HemisphereLightHelper(hemisphereLightA, 3);
scene.add(hemisphereLightAHelper);

// Add point light A to scene
let pointLightA = new THREE.PointLight(0xffffff, .8, 4.5);
pointLightA.position.set(-2.69, -.2, -.19);
scene.add(pointLightA);
let pointLightAHelper = new THREE.PointLightHelper(pointLightA, 1);
scene.add(pointLightAHelper);

// Add point light B to scene
let pointLightB = new THREE.PointLight(0xffffff, .8, 3);
pointLightB.position.set(-0.01, -.1, -1.09);
scene.add(pointLightB);
let pointLightBHelper = new THREE.PointLightHelper(pointLightB, 1);
scene.add(pointLightBHelper);

// Add point light F to scene
let pointLightF = new THREE.PointLight(0xffffff, .75, 2.6);
pointLightF.position.set(-2.08, .4, -2.51);
scene.add(pointLightF);
let pointLightFHelper = new THREE.PointLightHelper(pointLightF, 1);
scene.add(pointLightFHelper);