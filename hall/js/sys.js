var PI = Math.PI,
 
    EXAMPLE = function() {

    };

function Core(scene, camera) {

    this.scene = scene;

    this.camera = camera;

}

function D2R(degree) {

    return degree / 180 * PI;

}