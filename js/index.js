if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, controls, scene, renderer;

init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xcccccc );
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 400, 200, 0 );

  // controls

  controls = new THREE.MapControls( camera, renderer.domElement );

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2.1;

// model

var onProgress = function ( xhr ) {

  if ( xhr.lengthComputable ) {

    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

  }

};

var onError = function ( xhr ) { };



// FLOOR

floorMat = new THREE.MeshStandardMaterial( {
  roughness: 0.8,
  color: 0xffffff,
  metalness: 0.1,
  bumpScale: 0.0005
});
var textureLoader = new THREE.TextureLoader();
textureLoader.load( "textures/hardwood2_bump.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  floorMat.map = map;
  floorMat.needsUpdate = true;
} );
// textureLoader.load( "textures/hardwood2_bump.jpg", function( map ) {
//   map.wrapS = THREE.RepeatWrapping;
//   map.wrapT = THREE.RepeatWrapping;
//   map.anisotropy = 4;
//   map.repeat.set( 10, 24 );
//   floorMat.bumpMap = map;
//   floorMat.needsUpdate = true;
// } );
textureLoader.load( "textures/hardwood2_roughness.jpg", function( map ) {
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  map.repeat.set( 10, 24 );
  floorMat.roughnessMap = map;
  floorMat.needsUpdate = true;
} );

var floorGeometry = new THREE.PlaneBufferGeometry( 400, 400 );
var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
floorMesh.receiveShadow = true;
floorMesh.rotation.x = -Math.PI / 2.0;
scene.add( floorMesh );

// var grid = new THREE.GridHelper( 200, 200, 0xffffff, 0x555555 );
// //grid.rotateOnAxis( new THREE.Vector3( 1, 0, 0 ), 0 * ( Math.PI/180 ) );
// scene.add( grid );

// GROUND
// var groundGeometry = new THREE.BoxBufferGeometry( 200, 0.01, 200 );
// var groundMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(169,169,169)' } );
// groundMesh = new THREE.Mesh( groundGeometry, groundMaterial );
// groundMesh.position.y = 0.0; //this value must be slightly lower than the planeConstant (0.01) parameter above
// scene.add( groundMesh );


//THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

new THREE.MTLLoader()
  .setPath( './models/' )
  .load( 'x4.mtl', function ( materials ) {

    materials.preload();

    new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( './models/' )
      .load( 'x4.obj', function ( object ) {

        object.scale.set(100, 100,100)
				object.position.set(0,0,60)
        scene.add( object );

      }, onProgress, onError );



  } );

  new THREE.MTLLoader()
  .setPath( './models/' )
  .load( 'bench_color.mtl', function ( materials ) {

    materials.preload();

    new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( './models/' )
      .load( 'bench_color.obj', function ( object ) {

        object.scale.set(10,10,10)
				object.position.set(0,13,0)
        scene.add( object );

      }, onProgress, onError );


  } );

  new THREE.MTLLoader()
  .setPath( './models/' )
  .load( 'Slide.mtl', function ( materials ) {

    materials.preload();

    new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( './models/' )
      .load( 'Slide.obj', function ( object ) {

        object.scale.set(0.2,0.2,0.2)
				object.position.set(150,0,-150)
        scene.add( object );

      }, onProgress, onError );


  } );

  
  
  new THREE.MTLLoader()
  .setPath( './models/' )
  .load( 'swing.mtl', function ( materials ) {

    materials.preload();

    new THREE.OBJLoader()
      .setMaterials( materials )
      .setPath( './models/' )
      .load( 'swing.obj', function ( object ) {

        object.scale.set(50,50,50)
				object.position.set(40,25,-150)
        scene.add( object );

      }, onProgress, onError );


  } );


 
//

//   // Create a material
// var textureLoader = new THREE.TextureLoader();
// var map = textureLoader.load('./models/wood.jpg');
// var material = new THREE.MeshPhongMaterial({map: map});

// var textureLoader1 = new THREE.TextureLoader();
// var map1 = textureLoader1.load('./models/green1.jpg');
// var material1 = new THREE.MeshPhongMaterial({map: map1});



//   // world

//  				var loader = new THREE.ObjectLoader();
// 				loader.load("./models/bench.json", function ( obj ) {
//           obj.traverse( function ( node ) {
//             if ( node.isMesh ) node.material = material;
//           } );
// 				obj.scale.set(10,10,10)
// 				obj.position.set(0,0.5,0)
// 					scene.add( obj );
// 				},
//         );
        
    

// 				loader.load("./models/tree3.json", function ( obj ) {
//           obj.traverse( function ( node ) {
//             if ( node.isMesh ) node.material = material1;
//           } );
// 				obj.scale.set(0.1, 0.1,0.1)
// 				obj.position.set(20,-10,60)
// 					scene.add( obj );
// 				},
//         );
        
        
// 				loader.load("./models/tree3.json", function ( obj ) {
//           obj.traverse( function ( node ) {
//             if ( node.isMesh ) node.material = material1;
//           } );
//           obj.scale.set(0.1, 0.1,0.1)
//           obj.position.set(20,-10,-60)
// 					scene.add( obj );
// 				},
// 				);


  
  // lights

  var light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0x222222 );
  light.position.set( - 1, - 1, - 1 );
  scene.add( light );

  var light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );

  //

  window.addEventListener( 'resize', onWindowResize, false );


          var gui = new dat.GUI();

  gui.add(controls, 'screenSpacePanning');
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();

}

function render() {

  renderer.render( scene, camera );

}
