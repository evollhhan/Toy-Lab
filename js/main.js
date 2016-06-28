/**
 * New Project
 * 
 */


function Halo(Draw) {

    /**
     * Dev Control
     */
    var camx = document.getElementById('cam_x'),
        camy = document.getElementById('cam_y'),
        camz = document.getElementById('cam_z'),
        play = document.getElementById('play'),
        playId = null;

    // Stage Element
    var stage = document.getElementById('stage');

    // Basic Element Define
    var camera, scene, renderer;

    //
    var cameraControls;

    //
    var groundMirror, verticalMirror;

    /**
     * Init Scene
     */
    scene = new THREE.Scene();

    /**
     * Init Renderer
     */ 
    renderer = new THREE.WebGLRenderer({
        canvas: stage,
        antialias: true
    });
    renderer.setClearColor( 0xffffff );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /**
     * Init Camera ( PerspectiveCamera )
    */     
    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 10000 );
    // camera.target = new THREE.Vector3( 0, 0, 0 );
    camera.position.set( 0, 75, 160 );

    /**
     * Init Camera ( OrthographicCamera )
     */
    // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -500, 1000 );
    // camera.position.x = 100;
    // camera.position.y = 100;
    // camera.position.z = 100;

    /**
     * OrbitControl
     */
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set( 0, 0, 0);
    cameraControls.maxDistance = 10000;
    cameraControls.minDistance = 100;
    cameraControls.update(); 

    /**
     * Reflector
     */
    var planeGeo = new THREE.PlaneBufferGeometry( 1000, 1000 );
    
    // MIRROR planes
    groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color: 0xebebeb } );
    var mirrorMesh = new THREE.Mesh( planeGeo, groundMirror.material );
    mirrorMesh.add( groundMirror );
    mirrorMesh.rotateX( - Math.PI / 2 );
    // scene.add( mirrorMesh )

    verticalMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: window.innerWidth, textureHeight: window.innerHeight, color:0xebebeb } );
    // var verticalMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 60, 60 ), verticalMirror.material );
    // verticalMirrorMesh.add( verticalMirror );
    // verticalMirrorMesh.position.y = 35;
    // verticalMirrorMesh.position.z = 100;
    // scene.add( verticalMirrorMesh );

    /**
     * Window Resize Event
     */
    function onWindowResize() {
        camera.left = window.innerWidth / - 2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / - 2;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        render();
    }
    window.addEventListener( 'resize', onWindowResize, false );

    /**
     * Render Events
     */
    function render() {
        cameraControls.update();
        camera.updateProjectionMatrix();
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }

    function renderAnimate() {
        cameraControls.update();
        // groundMirror.renderWithMirror( verticalMirror );
        // verticalMirror.renderWithMirror( groundMirror );
        // var timer = Date.now() * 0.0001;
		// camera.position.x = Math.cos( timer ) * 200;
		// camera.position.z = Math.sin( timer ) * 200;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );       
    }

    /**
     * Animate Events
     */
    function animate() {
        playId = requestAnimationFrame( animate );
        renderAnimate();
    }

    function cancelAnimate() {
        cancelAnimationFrame( playId );
    }

    window.scene = scene;

    /**
     * Export Public Methods
     */
    return {

        run: function() {
            window.core = new Core(scene, camera);
            core.Draw(DRAWDATA);
            core.Light();
            animate();
        },

        devControl:  {

            // camera
            ChangeCam: function() {
                var recam = function() {
                        camera.position.x = camx.value;
                        camera.position.y = camy.value;
                        camera.position.z = camz.value;
                        console.log(camx.value, camy.value, camz.value);
                        render();
                    };
                camx.addEventListener('input', recam);
                camy.addEventListener('input', recam);
                camz.addEventListener('input', recam);
            },

            // animate
            Play: function() {
                var playControl = function() {
                    if( play.checked ) animate();
                    else cancelAnimate();
                }
                play.addEventListener('change', playControl);
            },

            // maker
            Maker: function() {
                document.querySelector('#obj_c').addEventListener('click', function(){
                    scene.children = [];
                    var d = eval('[' + document.querySelector('#obj_i').value + ']');
                    console.info( d );
                    switch( document.querySelector('#obj_s').value ) {
                        case '1': DRAWDATA.N1.push(d);break;
                        case '2': DRAWDATA.N2.push(d);break;
                        case '3': DRAWDATA.N3.push(d);break;
                        default:break;
                    }            
                    core.Draw(DRAWDATA);
                    core.Light();
                    console.info( DRAWDATA );
                });
                document.querySelector('#obj_z').addEventListener('click', function(){
                    scene.children = [];
                    switch( document.querySelector('#obj_s').value ) {
                        case '1': DRAWDATA.N1.pop();break;
                        case '2': DRAWDATA.N2.pop();break;
                        case '3': DRAWDATA.N3.pop();break;
                        default:break;
                    }            
                    core.Draw(DRAWDATA);
                    core.Light();   
                    console.info( DRAWDATA );                 
                });
            }
        }
    }
}

function init() {

    var main = new Halo();
    main.run();

	// example();

    // main.devControl.ChangeCam();
    // main.devControl.Play();
    main.devControl.Maker();
}








