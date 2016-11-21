function Title ($scene) {
  let scene = $scene

  // let devCube = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ color: 0xffffff }))
  let light
  let lx = 50
  let lz = -1200
  let d = 0

  function createTitle () {
    let material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    let shape = new THREE.Shape()

    shape.moveTo(24.289, 0)
    shape.bezierCurveTo(46.932, 8.093, 70.461, 14.331, 92.049, 24.635)
    shape.bezierCurveTo(152.055, 53.277, 185.079, 101.453, 189.3742, 168.214)
    shape.bezierCurveTo(191.5882, 202.64, 194.0112, 237.1341, 194.0932, 271.603)
    shape.bezierCurveTo(194.5483, 461.7725, 194.2153, 651.942, 194.377, 842.1121)
    shape.bezierCurveTo(194.418, 889.991, 215.0151, 928.4111, 253.991, 954.9381)
    shape.bezierCurveTo(281.052, 973.3561, 309.7563, 958.9751, 332.392, 944.9091)
    shape.bezierCurveTo(352.379, 932.4891, 366.138, 910.046, 386.333, 888.0051)
    shape.bezierCurveTo(364.126, 892.7521, 349.676, 899.5852, 336.548, 897.613)
    shape.bezierCurveTo(322.915, 895.566, 308.496, 887.2371, 298.116, 877.652)
    shape.bezierCurveTo(281.28, 862.105, 282.337, 832.0631, 297.127, 809.152)
    shape.bezierCurveTo(307.535, 793.029, 336.8763, 784.1851, 360.857, 792.923)
    shape.bezierCurveTo(381.8325, 800.565, 392.3424, 815.988, 394.0324, 840.394)
    shape.bezierCurveTo(400.5303, 934.251, 331.2294, 974.229, 270.8304, 970.902)
    shape.bezierCurveTo(199.3276, 966.9631, 136.1503, 940.38, 98.5423, 876.287)
    shape.bezierCurveTo(83.2603, 850.243, 74.2404, 816.601, 73.9553, 786.307)
    shape.bezierCurveTo(71.9173, 569.452, 73.4572, 352.565, 72.4583, 135.6963)
    shape.bezierCurveTo(72.202, 80.201, 51.848, 33.121, 0, 4.858)
    shape.bezierCurveTo(8.096, 3.239, 16.192, 1.619, 24.289, 0)

    let geom = new THREE.ExtrudeGeometry(shape, {
      amount: 80,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0,
      steps: 1
    })

    let mesh = new THREE.Mesh(geom, material)

    mesh.name = 'L'
    mesh.position.set(0, 400, -1200)
    mesh.rotation.set(0, Math.PI, Math.PI)
    scene.add(mesh)
  }

  function createLight () {
    light = new THREE.PointLight(0xff0000, 4, 600)
    light.position.set(lx, 0, lz)
    light.name = 'Light'
    scene.add(light)

    let helper = new THREE.PointLightHelper(light)
    scene.add(helper)
  }

  return {
    create () {
      createLight()
      createTitle()
    },
    update () {
      d = lx === 400 ? 1 : d
      d = lx === -100 ? 0 : d
      lx = d ? lx - 1 : lx + 1
      lz = calcY(lx, d)
      // console.log(lx, ly)
      light.position.set(lx, 0, lz)
    }
  }
}

function calcY (x, d) {
  let sqrt = Math.sqrt(Math.pow(250, 2) - Math.pow(x - 150, 2))
  sqrt = d ? 0 - sqrt - 1200 : sqrt - 1200
  return sqrt
}
