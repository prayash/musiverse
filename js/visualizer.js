// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(50, $(window).width() / $(window).height(), 1, 1000);
// camera.position.z = 100;

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize($(window).width(), $(window).height());

// var cubes = new Array();
// var controls;

// var container = document.getElementById( 'container' );
// container.appendChild( renderer.domElement );

// var i = 0;
// for(var x = 0; x < 30; x += 5) {
// 	var j = 0;
// 	cubes[i] = new Array();
// 	for(var y = 0; y < 30; y += 5) {
// 		var geometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);
		
// 		var material = new THREE.MeshPhongMaterial({
// 			color: randomFairColor(),
// 			specular: 0xffffff,
// 			shininess: 20,
// 			reflectivity: 5.5,
// 			// wireframe: true
// 		});
		
// 		cubes[i][j] = new THREE.Mesh(geometry, material);
// 		cubes[i][j].position = new THREE.Vector3(x, y, x);
// 		console.log("x: ", x, "y: ", y);
		
// 		scene.add(cubes[i][j]);
// 		j++;
// 	}
// 	i++;
// }

// // *****************************************************************
// // Lights

// var light = new THREE.AmbientLight(0x505050);
// scene.add(light);

// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight.position.set(0, 1, 1);
// scene.add(directionalLight);

// directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight.position.set(1, 1, 0);
// scene.add(directionalLight);

// directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight.position.set(0, -1, -1);
// scene.add(directionalLight);

// directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
// directionalLight.position.set(-1, -1, 0);
// scene.add(directionalLight);

// // *****************************************************************

// // Orbit Controls
// controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;

// // for(var i = 0; i < 7; i++) {
// // 	controls.pan(new THREE.Vector3( 1, 0, 0 ));
// // 	controls.pan(new THREE.Vector3( 0, 1, 0 ));
// // }

// function render () {
// 	// if(typeof array === 'object' && array.length > 0) {
// 	// 	var k = 0;
// 	// 	for(var i = 0; i < cubes.length; i++) {
// 	// 		for(var j = 0; j < cubes[i].length; j++) {
// 	// 			var scale = (array[k] + boost) / 30;
// 	// 			cubes[i][j].position.z = (scale < 1 ? 1 : scale);
// 	// 			cubes[i][j].scale.x = array[k] * 0.05;
// 	// 			// k += (k < array.length ? 1 : 0);
// 	// 		}
// 	// 	}
// 	// }

// 	requestAnimationFrame(render);
// 	controls.update();
// 	renderer.render(scene, camera);
// };

// render();

// function randomFairColor() {
// 	var min = 64;
// 	var max = 224;
// 	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
// 	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
// 	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
// 	return r + g + b;
// }
