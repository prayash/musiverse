// *****************************************************************

var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
mouseX = 0, mouseY = 0,

windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,

SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, container, tick = 0, clock = new THREE.Clock(true), controls, scene, renderer, stats, options, spawnerOptions, particleSystem, cubeMesh;
var cubes = [];
var icosahedron;
var palette = ["#ECF0F1", "#7877f9", "#3498DB", "#ffa446"];

function init() {
  // *****************************************************************
  // - Initialization

  // * Camera
  camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000);
  camera.position.z = 800;
  camera.position.y = 500;
  camera.position.x = 300;

  // * Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x7aa8f8, 0.00105); // 0xCCCCC

  // * Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  // *****************************************************************
  // - Trackball Controls

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 2.0;
  controls.zoomSpeed = 1;
  controls.panSpeed = 1;
  controls.dampingFactor = 0.3;
  controls.minDistance = 80;
  controls.maxDistance = 1000;
  this.autoRotate = true;
  this.autoRotateSpeed = 2.0;

  // *****************************************************************
  // - Visuals

  // * Lines
  for (var i = 0; i < 300; i++) {
    var geometry = new THREE.Geometry();
    var vertex = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    vertex.normalize();
    vertex.multiplyScalar(500);
    geometry.vertices.push(vertex);

    var vertex2 = vertex.clone();
    vertex2.multiplyScalar(Math.random() * 0.3 + 1);
    geometry.vertices.push(vertex2);

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: Math.random() }));
    scene.add(line);
  }

  // * Icosahedron
  var icosGeometry = new THREE.OctahedronGeometry(350, 2)
  icosGeometry.colorsNeedUpdate = true;
  var icosMaterial = new THREE.MeshPhongMaterial({
    color: '#d92b6a',
    shading: THREE.FlatShading,
    vertexColors: THREE.FaceColors
  });
  icosahedron = new THREE.Mesh(icosGeometry, icosMaterial);
  scene.add(icosahedron);

  // * Polygons

  var polyGeometry = new THREE.CylinderGeometry( 0, 10, 20, 4, 1 );
  var polyMaterial =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
  for ( var i = 0; i < 100; i ++ ) {
    var mesh = new THREE.Mesh( polyGeometry, polyMaterial );
    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    mesh.updateMatrix();
    // mesh.matrixAutoUpdate = false;
    // scene.add(mesh);
  }

  // * Cubes
  for ( var i = 0; i < 255; i++ ) {
    var cubeGeometry = new THREE.CubeGeometry(15, 15, 15);
    var cubeMaterial = new THREE.MeshPhongMaterial({
      color: palette[Math.floor(Math.random() * palette.length)],
      specular: 0xffffff,
      shininess: 20,
      reflectivity: 1.5,
      shading: THREE.FlatShading
    });

    cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cubes[i].position.x = (Math.random() - 0.5) * 1000;
    cubes[i].position.y = (Math.random() - 0.5) * 1000;
    cubes[i].position.z = (Math.random() - 0.5) * 1000;
    cubes[i].updateMatrix();
    scene.add(cubes[i]);
  }

  // *****************************************************************
  // - Lights

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set( 1, 1, 1 );
  scene.add(light);

  light = new THREE.DirectionalLight(0x002288);
  light.position.set( -5, -1, -10 );
  scene.add(light);

  light = new THREE.AmbientLight(0x222222);
  scene.add(light);

  var pointLight = new THREE.PointLight( "#ffffff", 1.2, 200 );
  pointLight.position.set( 100, 100, 100 );
  scene.add( pointLight );

  // *****************************************************************
  // - Stats

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild( stats.domElement );

  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener( 'mousedown', onclick, false );
}

// *****************************************************************
// - Animation

function render() {
  var delta = clock.getDelta();
  controls.update(delta);
  stats.update();

  tick += delta;
  if (tick < 0) tick = 0;
  if (delta > 0) {
    if(typeof array === 'object' && array.length > 0) {
      var k = 0;
      for(var i = 0; i < cubes.length; i++) {
        var scale = (array[k] + boost) / 30;
        // cubes[i].position.x = (scale < 1 ? 1 : scale);
        cubes[i].scale.x = array[k] * 0.025 + 0.05;
        cubes[i].scale.z = array[k] * 0.025 + 0.05;
        cubes[i].scale.z = array[k] * 0.025 + 0.05;

        icosahedron.scale.x = array[k] * 20 + 1;
        icosahedron.scale.y = array[k] * 20 + 1;
        icosahedron.scale.z = array[k] * 20 + 1;
        icosahedron.rotation.x += 0.00001 + (array[k] * 0.0000025);
        k += (k < array.length ? 1 : 0);
      }
    }
  }


  // camera.position.x += ( mouseX - camera.position.x ) * .05;
  // camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);

  // * ¡Loop!
  requestAnimationFrame(render);
}

// *****************************************************************
// - Events

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onclick(){
  event.preventDefault();
}

// *****************************************************************
// - Init

init();
render();
