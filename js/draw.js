/**
 * Draw
 * 
 */

Core.prototype.Draw = function() {

    // Grid
    var Grid = function(scene, size, step) {

            var geometry = new THREE.Geometry();

            for( var i = -size; i <= size; i+=step ) {
                geometry.vertices.push( new THREE.Vector3( -size, 0, i) );
                geometry.vertices.push( new THREE.Vector3(  size, 0, i) );
                geometry.vertices.push( new THREE.Vector3( i, 0, -size) );
                geometry.vertices.push( new THREE.Vector3( i, 0,  size) );
            }

            var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
            var line = new THREE.LineSegments( geometry, material );
            scene.add( line );
        },

        // Cube
        Cube = function(scene, number) {

            var geometry = new THREE.BoxGeometry( 32, 32, 32 );
            var material = new THREE.MeshLambertMaterial( { color: 0x3366ff });
            for( var i = 0; i < number; i++ ) {
                var cube = new THREE.Mesh( geometry, material );
                cube.position.x = 16;
                cube.position.y = 16;
                cube.position.z = 16;
                scene.add( cube );
            }
        };

    // Ground Serface
    // Ground = function(width, height) {

    //     var planeCamera = new THREE.CubeCamera( 0.1, 5000, 256 );
    //     planeCamera.position.x = 0;
    //     planeCamera.position.z = 0;
    //     planeCamera.rotation.x = - PI / 2;
    //     scene.add( planeCamera );
        
    //     var geometry = new THREE.PlaneBufferGeometry( width, height );
    //     var material = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide });
    //     var plane = new THREE.Mesh( geometry, material );
    //     plane.position.x = 0;
    //     plane.position.z = 0;
    //     plane.rotation.x = PI / 2;
    //     this.scene.add( plane );
    // };
    
    /* Excute Here */
    // Grid(this.scene, 500, 50);
    Cube(this.scene, 1);
}