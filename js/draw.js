/**
 * Draw
 * 
 */

Core.prototype.Draw = function(list) {

    // const data
    var ELEVATION = 2;

    // Common Use Variables
    var loader, texture, shape, geometry, material, mesh;

    // For Counting
    var i, len;

/**
 *  Grid
 * 
 **/ 
    if( list.Grid ) {
        geometry = new THREE.Geometry();
        len = list.Grid.size;
        for( i = -list.Grid.size; i <= len; i+=list.Grid.step ) {
            geometry.vertices.push( new THREE.Vector3( -list.Grid.size, 0, i) );
            geometry.vertices.push( new THREE.Vector3(  list.Grid.size, 0, i) );
            geometry.vertices.push( new THREE.Vector3( i, 0, -list.Grid.size) );
            geometry.vertices.push( new THREE.Vector3( i, 0,  list.Grid.size) );
        }
        material = new THREE.LineBasicMaterial( { color: 0xcccccc } );
        var line = new THREE.LineSegments( geometry, material );
        this.scene.add( line );
    }

/**
 *  City Building
 * 
 **/ 
    var City = new THREE.Group();
    material = new THREE.MeshLambertMaterial( { color: 0x94bece , side: THREE.DoubleSide });

    /**
     * Basic 1
     */
    function drawB1(data, geometry) {
        material = new THREE.MeshLambertMaterial( { color: 0x94bece , side: THREE.DoubleSide });
        mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set(data[0], data[2], data[1]);
        mesh.position.set( data[3], ELEVATION + data[6], data[4] );
        mesh.rotation.set( 0, D2R(data[5]), 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.name = data[7];
        City.add( mesh );
    }
    // B1x2
    loader = new THREE.JSONLoader();
    loader.load('../model/B1x10x10x1.js', function(geometry) {
        len = list.B1x1.length;
        for( i = 0; i < len; i++ ) drawB1(list.B1x1[i], geometry);
    });
    loader.load('../model/B1x10x10x2.js', function(geometry) {
        len = list.B1x2.length;
        for( i = 0; i < len; i++ ) drawB1(list.B1x2[i], geometry);
    });
    // B1x4
    loader.load('../model/B1x10x10x4.js', function(geometry) {
        len = list.B1x4.length;
        for( i = 0; i < len; i++ ) drawB1(list.B1x4[i], geometry);
    });

    /**
     * Normal 2
     */
    if( list.N2 ) {
        len = list.N2.length;
        for( i = 0; i < len; i++ ) {
            geometry = new THREE.BoxBufferGeometry( list.N2[i][0], list.N2[i][1], list.N2[i][2] );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( list.N2[i][3], list.N2[i][2] / 2 + ELEVATION + list.N2[i][6], list.N2[i][4] );
            mesh.rotation.set( - PI / 2, 0, D2R(list.N2[i][5]) );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.name = list.N2[i][7];
            City.add( mesh );
        }
    }

    /**
     * Normal 3
     */
    if( list.N3 ) {
        function drawN3(ctx, width, height, curveInner, curveOuter) {
            ctx.moveTo( 0, curveInner );
            ctx.lineTo( 0, height - curveInner );
            ctx.quadraticCurveTo( width / 2, height + curveOuter, width, height - curveInner );
            ctx.lineTo( width, curveInner );
            ctx.quadraticCurveTo( width / 2, -curveOuter, 0, curveInner );
        }
        
        len = list.N3.length;
        for( i = 0; i < len; i++ ) {
            shape = new THREE.Shape();
            drawN3( shape, list.N3[i][0], list.N3[i][1], list.N3[i][3], list.N3[i][4] );
            geometry = new THREE.ExtrudeGeometry( shape, {
                amount: list.N3[i][2],
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0,
                steps: 1
            });
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( list.N3[i][5], 1 + ELEVATION + list.N3[i][8], list.N3[i][6] );
            mesh.rotation.set( - PI / 2, 0, D2R(list.N3[i][7]) );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.name = list.N3[i][9];
            City.add( mesh );
        }
    }

    /**
     *  Land
     * 
     **/ 
    loader = new THREE.JSONLoader();
    loader.load('../model/land.js', function(geometry) {
        material = new THREE.MeshLambertMaterial( { color: 0xc6c6c6 , side: THREE.DoubleSide });
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( -405, -1, -520 );
        mesh.scale.set( 29, 4, 29 );
        mesh.receiveShadow = true;
        mesh.name = "land";
        City.add( mesh );
    });

    /**
     *  Road
     * 
     **/ 
    loader = new THREE.TextureLoader();
    texture = loader.load( '../images/texture/road.png' );
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    function drawRoadPath(ctx) {
        ctx.moveTo(0,0);
        ctx.lineTo(1,0);
        ctx.lineTo(1,1);
        ctx.lineTo(0,1);
        ctx.lineTo(0,0);
    }
    shape = new THREE.Shape();
    drawRoadPath( shape );
    geometry = new THREE.ShapeGeometry( shape );
    material = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide, map: texture, transparent: true } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( -410, 3.1, 510 );
    mesh.rotation.set( PI / 2, -PI , PI );
    mesh.receiveShadow = true;
    mesh.scale.set(1024,1024,1);
    mesh.name = 'road';
    City.add( mesh );

    // Excute
    this.scene.add( City );
}