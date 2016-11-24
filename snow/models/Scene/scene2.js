import { twistArc } from '../Shape/'

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
      mesh.position.set(0, 0, -405)
      mesh.rotation.set(0, 0, 0.2)

      new TWEEN.Tween(mesh.position)
        .delay(2100)
        .to({x: -120, y: 140}, 1200)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()

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
        .to({z: 0 - Math.PI / 12}, 3200)
        .onComplete(() => {
          new TWEEN.Tween(mesh.rotation)
            .to({z: 0 - Math.PI * 3 / 2}, 400)
            .start()
          new TWEEN.Tween(materail)
            .to({opacity: 0}, 400)
            .start()
        })
        .start()
    })
  }

  function create33b () {
    loader.load(window.ResourceS1.s33b, texture => {
      let geom, materail, mesh
      geom = new THREE.PlaneGeometry(232, 232)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      materail.opacity = 0
      mesh = new THREE.Mesh(geom, materail)
      mesh.name = 'S2_SM33B'
      mesh.position.set(5, -5, -395)
      mesh.scale.set(0.7, 0.7, 0.7)
      mesh.rotation.set(0, 0, 0)
      GroupScene2.add(mesh)

      new TWEEN.Tween(materail)
        .delay(3600)
        .to({opacity: 1}, 200)
        .start()

      new TWEEN.Tween(mesh.rotation)
        .delay(3600)
        .to({z: 0 - Math.PI / 2}, 16000)
        .start()
    })
  }

  let twistMesh = []
  function createTwistArc () {
    let shape = new THREE.Shape()
    twistArc(shape)
    let materail = new THREE.MeshLambertMaterial({ color: 0xffffff })
    materail.transparent = true
    let geom = new THREE.ShapeGeometry(shape)
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(-726.5, 0, 0))
    let mesh = new THREE.Mesh(geom, materail)
    mesh.position.set(0, 0, -405)
    mesh.visible = false

    for (let i = 0; i < 12; i++) {
      let cloneMesh = mesh.clone()
      twistMesh.push(cloneMesh)
      GroupScene2.add(cloneMesh)
    }
  }

  function animateTwistMesh () {
    twistMesh.forEach((m, i) => {
      m.visible = true
      new TWEEN.Tween(m.rotation)
        .to({z: 0 - Math.PI / 12 * i}, 2000)
        .start()
    })
  }

  function createMerry () {
    loader.load(window.ResourceS1.merry, texture => {
      let geom = new THREE.PlaneGeometry(256, 64)
      let materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      materail.opacity = 0
      let mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(65, 200, -390)
      mesh.rotation.set(0, 0, -0.26)
      mesh.name = 'S2_Merry'

      new TWEEN.Tween(materail)
        .to({ opacity: 1 }, 1200)
        .start()

      new TWEEN.Tween(mesh.position)
        .to({x: 58, y: 180, z: -405}, 1200)
        .easing(TWEEN.Easing.Cubic.Out)
        .start()

      GroupScene2.add(mesh)
    })
  }

  function createSnow () {
    loader.load(window.Resource.snow, texture => {
      let geom = new THREE.PlaneGeometry(32, 32)
      let materail = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      })
      materail.transparent = true
      let mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(100, 0, 40)

      new TWEEN.Tween(mesh.position)
        .to({x: -180, y: 140, z: -395}, 3200)
        .onComplete(() => {
          new TWEEN.Tween(materail)
            .delay(200)
            .to({opacity: 0}, 200)
            .start()
        })
        .start()

      new TWEEN.Tween(mesh.rotation)
        .to({x: Math.PI * 2, y: Math.PI * 2}, 3200)
        .start()

      GroupScene2.add(mesh)
    })
  }

  return {
    create () {
      createBackground()
      createBackgroundMask()
      create22()
      create33()
      create33b()
      createMerry()
      createSnow()
      createTwistArc()
      scene.add(GroupScene2)
    }
  }
}
