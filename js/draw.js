/**
 * Draw
 * 
 */

Core.prototype.Draw = function(list) {

    // const data
    var ELEVATION = 2;

    // Common Use Variables
    var shape, geometry, material, mesh;

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
    material = new THREE.MeshLambertMaterial( { color: 0xcccccc , side: THREE.DoubleSide });

    // normal 1
    if( list.N1 ) {        
        function drawN1(ctx, width, height, radius ){
            ctx.moveTo( 0, radius );
            ctx.lineTo( 0, height - radius );
            ctx.quadraticCurveTo( 0, height, radius, height );
            ctx.lineTo( width - radius, height );
            ctx.quadraticCurveTo( width, height, width, height - radius );
            ctx.lineTo( width, radius );
            ctx.quadraticCurveTo( width, 0, width - radius, 0 );
            ctx.lineTo( radius, 0 );
            ctx.quadraticCurveTo( 0, 0, 0, radius );
        };
        
        len = list.N1.length;
        for( i = 0; i < len; i++ ) {
            shape = new THREE.Shape();
            drawN1( shape, list.N1[i][0], list.N1[i][1], list.N1[i][3] );
            geometry = new THREE.ExtrudeGeometry( shape, {
                amount: list.N1[i][2],
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0,
                steps: 1
            });
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( list.N1[i][4], 1 + ELEVATION, list.N1[i][5] );
            mesh.rotation.set( - PI / 2, 0, 0 );
            City.add( mesh );
        }
    }

    // normal 2
    if( list.N2 ) {
        len = list.N2.length;
        for( i = 0; i < len; i++ ) {
            geometry = new THREE.BoxBufferGeometry( list.N2[i][0], list.N2[i][1], list.N2[i][2] );
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( list.N2[i][3], list.N2[i][2] / 2 + ELEVATION, list.N2[i][4] );
            mesh.rotation.set( - PI / 2, 0, 0 );
            City.add( mesh );
        }
    }

    // normal 3
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
            drawN3( shape, list.N3[i][0], list.N3[i][1], list.N3[i][2], list.N3[i][3] );
            geometry = new THREE.ExtrudeGeometry( shape, {
                amount: 100,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0,
                steps: 1
            });
            mesh = new THREE.Mesh( geometry, material );
            mesh.position.set( list.N3[i][4], 1 + ELEVATION, list.N3[i][5] );
            mesh.rotation.set( - PI / 2, 0, 0 );
            City.add( mesh );
        }
    }

    /**
     *  Land
     * 
     *  !! The Land Path Data is made in AI-SVG and converted.
     *  !! Dont modified these path data unless the land was redesigned.
     **/ 
    function drawLand(ctx) {
        ctx.moveTo(767.282,676.143);
        ctx.bezierCurveTo(753.49,664.968,738.208,656.334,722.236,649.237);
        ctx.bezierCurveTo(636.208,611.013,546.588,592.218,452.128,601.357);
        ctx.bezierCurveTo(445.408,602.007,443.729,600.007,443.171,593.351);
        ctx.bezierCurveTo(439.924,554.558,435.705,515.847,432.532,477.049);
        ctx.bezierCurveTo(429.359,438.236,426.652,399.3777,424.445,360.499);
        ctx.bezierCurveTo(422.566,327.376,422.657,294.146,421.481,261.0225);
        ctx.bezierCurveTo(419.710,211.0995,422.693,161.3724,423.515,111.5645);
        ctx.bezierCurveTo(423.609,105.8405,422.046,104.8784,417.283,105.3876);
        ctx.bezierCurveTo(406.359,106.5565,396.167,110.4596,386.178,114.5156);
        ctx.bezierCurveTo(353.6944,127.7106,321.546,141.7435,288.9634,154.6796);
        ctx.bezierCurveTo(282.123,157.3957,281.126,160.7827,282.423,166.7495);
        ctx.bezierCurveTo(295.561,227.2125,305.361,288.2795,315.501,349.2873);
        ctx.bezierCurveTo(326.799,417.2683,334.518,485.7344,343.669,554.005);
        ctx.bezierCurveTo(348.503,590.062,351.622,626.314,355.696,662.452);
        ctx.bezierCurveTo(361.167,710.973,366.2304,759.523,370.603,808.15);
        ctx.bezierCurveTo(372.947,834.211,375.611,860.247,377.594,886.336);
        ctx.bezierCurveTo(378.118,893.218,380.894,895.024,387.1824,894.695);
        ctx.bezierCurveTo(394.840,894.294,402.534,894.599,412.4994,894.599);
        ctx.bezierCurveTo(422.643,894.404,435.0284,894.132,447.473,893.11);
        ctx.bezierCurveTo(494.2904,889.262,540.809,883.786,586.287,871.565);
        ctx.bezierCurveTo(638.31,857.586,688.519,839.300,732.369,806.949);
        ctx.bezierCurveTo(753.079,791.671,772.127,774.356,783.097,750.483);
        ctx.bezierCurveTo(796.85,720.557,792.487,696.563,767.283,676.143);
        ctx.closePath();
        ctx.moveTo(625.537,743.837);
        ctx.bezierCurveTo(597.39,766.903,567.662,787.871,538.068,809.005);
        ctx.bezierCurveTo(534.516,811.542,531.307,814.838,525.917,815.647);
        ctx.bezierCurveTo(522.082,788.69,518.273,761.913,514.466,735.136);
        ctx.bezierCurveTo(512.583,721.890,510.772,708.631,508.81,695.396);
        ctx.bezierCurveTo(506.838,682.099,508.3043,680.434,520.951,684.310);
        ctx.bezierCurveTo(555.702,694.957,589.296,708.754,622.906,722.48);
        ctx.bezierCurveTo(644.898,731.462,642.81,729.684,625.538,743.837);
        ctx.closePath()
    }
    shape = new THREE.Shape();
    drawLand( shape );
    geometry = new THREE.ExtrudeGeometry( shape, {
        amount: ELEVATION,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0,
        steps: 1
    });
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( -400, 2, -500 );
    mesh.rotation.set( PI / 2, 0, 0 );
    City.add( mesh );

    // Excute
    this.scene.add( City );
}