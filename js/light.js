/**
 * Light
 * 
 */

Core.prototype.Light = function() {

    var AmbientLight = function(scene) {
            var abl = new THREE.AmbientLight( 0xffffff );
            scene.add( abl );
        },

        DirectionalLight = function(scene) {
            var dl = new THREE.DirectionalLight( 0xff3333 );
            dl.position.x = 320;
            dl.position.y = 320;
            dl.position.z = 320;
            dl.position.normalize();
            scene.add( dl );

            dl = new THREE.DirectionalLight( 0xffff33 );
            dl.position.x = Math.random() - 0.5;
            dl.position.y = Math.random() - 0.5;
            dl.position.z = Math.random() - 0.5;
            dl.position.normalize();
            scene.add( dl );
        }; 

    
    /* Excute Here */
    AmbientLight(this.scene);
    DirectionalLight(this.scene);
}