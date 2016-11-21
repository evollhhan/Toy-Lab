/**
 * Light
 * 
 */

Core.prototype.Light = function() {

    // Helper
    var helper;

    // AmbientLight
    var abl = new THREE.AmbientLight( 0xffffff, 0.8 );
    this.scene.add( abl );

    // HemiLight
    // var hl = new THREE.HemisphereLight( 0x9be0fc, 0x125b79, 0.6 );
    // hl.position.set( 250, 200, 0 );
    // this.scene.add( hl ); 

    // var helper = new THREE.HemisphereLightHelper( hl );
    // this.scene.add( helper );

    // SpotLight
    // var spotLight = new THREE.SpotLight( 0xff3333, 2 );
    // spotLight.intensity = 1;
    // spotLight.castShadow = true;
    // spotLight.angle = PI / 8;
    // spotLight.penumbra = 0.2;
    // spotLight.decay = 1.5;
    // spotLight.distance = 200;
    // spotLight.shadow.mapSize.width = 256;
    // spotLight.shadow.mapSize.height = 256;
    // spotLight.rotation.x =  - PI / 2;
    // spotLight.position.set( 50, 150, 0 );
    // this.scene.add( spotLight );

    // var helper = new THREE.SpotLightHelper( spotLight );
    // this.scene.add( helper ); 

    // DirectionalLight Front
    var dl = new THREE.DirectionalLight( 0xc6c6c6, 1 );
    dl.position.set( 600, 300, -300 );
    dl.rotation.set( 0, 0, 0 );
    dl.position.multiplyScalar( 1.3 );
    dl.castShadow = true;
    dl.shadow.mapSize.width = 1024;
    dl.shadow.mapSize.height = 1024;

    dl.shadow.camera.left = -300;
    dl.shadow.camera.right = 300;
    dl.shadow.camera.top = 300;
    dl.shadow.camera.bottom = -300;
    dl.shadow.camera.far = 1200;
    
    this.scene.add( dl );

    helper = new THREE.DirectionalLightHelper( dl );
    this.scene.add( helper );

    // DirectionalLight Back
    // dl = new THREE.DirectionalLight( 0xffffff, 0.15 );
    // dl.position.set( -600, 300, 300 );
    // dl.rotation.set( 0, 0, 0 );
    // dl.position.multiplyScalar( 1.3 );
    // this.scene.add( dl );

    // helper = new THREE.DirectionalLightHelper( dl );
    // this.scene.add( helper );

    dl = new THREE.DirectionalLight( 0x00a5e6, 0.1 );
    dl.position.set( 0, 300, 0 );
    this.scene.add( dl );

    helper = new THREE.DirectionalLightHelper( dl );
    this.scene.add( helper );
    
    // dl = new THREE.DirectionalLight( 0x33ccff );
    // dl.position.x = Math.random() - 0.5;
    // dl.position.y = Math.random() - 0.5;
    // dl.position.z = Math.random() - 0.5;
    // dl.position.normalize();
    // this.scene.add( dl );    
    
}