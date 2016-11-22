export default function ($scene) {
  let scene = $scene
  let loader = new THREE.TextureLoader()
  let GroupScene2 = new THREE.Group()
  GroupScene2.name = 'SCENE2'

  function createBackground () {
    let geom, materail, mesh
    geom = new THREE.PlaneGeometry(1400, 1400)
    materail = new THREE.MeshLambertMaterial({ color: 0xdb294c })
    mesh = new THREE.Mesh(geom, materail)
    mesh.position.set(0, 0, -420)
    mesh.name = 'S2_BG'
    GroupScene2.add(mesh)
  }

  function createBackgroundMask () {
    loader.load(window.ResourceS1.sBgMask, texture => {
      let geom, materail, mesh
      geom = new THREE.PlaneGeometry(1320, 660)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      materail.opacity = 0.1
      mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(0, 0, -419)
      mesh.name = 'S2_BG_Mask'
      GroupScene2.add(mesh)

      new TWEEN.Tween(mesh.position)
        .to({ x: -100 }, 16000)
        .start()
    })
  }

  function create22 () {
    loader.load(window.ResourceS1.s22, texture => {
      let geom, materail, mesh
      geom = new THREE.PlaneGeometry(180, 180)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      mesh = new THREE.Mesh(geom, materail)
      mesh.name = 'S2_SM22'
      mesh.position.set(-120, 140, -405)
      mesh.rotation.set(0, 0, 0.2)
      GroupScene2.add(mesh)
    })
  }

  function create33 () {
    loader.load(window.ResourceS1.s33, texture => {
      let geom, materail, mesh
      geom = new THREE.PlaneGeometry(128, 256)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      mesh = new THREE.Mesh(geom, materail)
      mesh.name = 'S2_SM33'
      mesh.position.set(5, -5, -395)
      mesh.scale.set(0.7, 0.7, 0.7)
      GroupScene2.add(mesh)

      new TWEEN.Tween(mesh.rotation)
        .to({z: 0 - Math.PI / 6}, 4000)
        .onComplete(() => {
          new TWEEN.Tween(mesh.rotation)
            .to({z: 0 - Math.PI * 2}, 600)
            .start()
          new TWEEN.Tween(materail)
            .delay(400)
            .to({opacity: 0}, 200)
            .start()
        })
        .start()
    })
  }

  function create33Big () {
    loader.load(window.ResourceS1.s33, texture => {
      let geom, materail, mesh
      geom = new THREE.PlaneGeometry(128, 256)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      mesh = new THREE.Mesh(geom, materail)
      mesh.name = 'S2_SM33'
      mesh.position.set(5, -5, -395)
      mesh.scale.set(0.7, 0.7, 0.7)
      GroupScene2.add(mesh)

      new TWEEN.Tween(mesh.rotation)
        .to({z: 0 - Math.PI / 6}, 4000)
        .onComplete(() => {
          new TWEEN.Tween(mesh.rotation)
            .to({z: 0 - Math.PI * 2}, 600)
            .start()
        })
        .start()
    })
  }

  return {
    create () {
      createBackground()
      createBackgroundMask()
      create22()
      create33()
      scene.add(GroupScene2)
    }
  }
}
