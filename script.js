// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#2E2B40");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );


// Mouse Control

var mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   debugger;

}
window.addEventListener( 'mousemove', onMouseMove, false );



// Instantiate a loader
var loader = new THREE.GLTFLoader();
var donkey;

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
THREE.DRACOLoader.setDecoderPath( 'examples/js/libs/draco' );
loader.setDRACOLoader( new THREE.DRACOLoader() );

// Load a glTF resource
loader.load(
	// resource URL
  'forklift.gltf',
	// 'demo.glb',
	// called when the resource is loaded
	function ( gltf ) {
		donkey = gltf;
		scene.add( gltf.scene );
		var light = new THREE.PointLight( 0xffffff, 10, 100 );
		light.position.set( 10, 10, 10 );
		scene.add( light );
		debugger

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Scene
		gltf.scenes; // Array<THREE.Scene>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
); 


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "#fff" } );
var cube01 = new THREE.Mesh( geometry, material );
cube01.position.z = 0.1;
// scene.add( cube01 );




// Render Loop
var render = function () {
  requestAnimationFrame( render );
	if(donkey){
		donkey.scene.rotation.y += 0.01;
	}
//   cube01.rotation.y += 0.01;
  // Render the scene
  renderer.render(scene, camera);
};

render();