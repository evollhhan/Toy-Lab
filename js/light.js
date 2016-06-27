/**
 * Light
 * 
 */

Core.prototype.Light = function() {

    // AmbientLight
    var abl = new THREE.AmbientLight( 0xffffff );
    this.scene.add( abl );

    // Sunlight
    var hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    this.scene.add( hemiLight ); 

   // DirectionalLight
    // var dl = new THREE.DirectionalLight( 0x3366ff );
    // dl.position.x = 320;
    // dl.position.y = 320;
    // dl.position.z = 320;
    // dl.position.normalize();
    // this.scene.add( dl );

    // dl = new THREE.DirectionalLight( 0x33ccff );
    // dl.position.x = Math.random() - 0.5;
    // dl.position.y = Math.random() - 0.5;
    // dl.position.z = Math.random() - 0.5;
    // dl.position.normalize();
    // this.scene.add( dl );    
    
}