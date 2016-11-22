import { mClock } from './Math'

export default function ($scene) {
  let scene = $scene
  let loader = new THREE.TextureLoader()
  let GroupLight = new THREE.Group()
  GroupLight.name = 'S1_G_Light'
  let TweenSnow = []
  let LightSnow = []

// -- SNOW CREATION && ANIMATION
  // ---- CREATE SNOW
  function createSnow () {
    GroupLight.position.set(0, 0, -380)
    loader.load(window.Resource.snow, texture => {
      mClock(200, (x, y, no, theta) => {
        // light
        let light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(0, 0, 600)
        light.name = 'S1_snowLight'
        light.theta = theta

        // snow
        let geom = new THREE.PlaneGeometry(32, 32)
        let materail = new THREE.MeshLambertMaterial({
          map: texture,
          side: THREE.DoubleSide
        })
        materail.transparent = true
        let mesh = new THREE.Mesh(geom, materail)
        mesh.position.set(0, 0, -5)

        // Animate
        new TWEEN.Tween(light.position)
          .delay(no * 500)
          .to({ x: x, y: y, z: 0 }, 4000)
          .start()

        new TWEEN.Tween(light.rotation)
          .delay(no * 500)
          .to({ y: Math.PI * 2, x: Math.PI * 2 }, 4000)
          .onComplete(() => {
            new TWEEN.Tween(light)
              .to({ intensity: 6 }, 1000)
              .start()

            let t = new TWEEN.Tween(mesh.position)
              .to({ z: -10 }, 800)
              .easing(TWEEN.Easing.Linear.None)
              .yoyo(true)
              .repeat(Infinity)

            TweenSnow.push(t)
            t.start()

            // dev
            if (no === 12) {
              setTimeout(() => {
                moveOutSnow()
              }, 2000)
            }
          })
          .start()

        light.add(mesh)
        LightSnow.push(light)
        GroupLight.add(light)
      })
    })
    scene.add(GroupLight)
  }

  // SNOW OUT
  function moveOutSnow () {
    TweenSnow.forEach(t => {
      t.stop()
    })
    LightSnow.forEach((l, i) => {
      new TWEEN.Tween({theta: l.theta})
        .delay(i * 200)
        .to({theta: l.theta - Math.PI * 2}, 6000 - i * 200)
        .onUpdate(function () {
          l.position.x = 200 * Math.cos(this.theta)
          l.position.y = 200 * Math.sin(this.theta)
          l.position.z += 1.2
        })
        .start()
    })
  }

// FLOOR
  function createFloor1 () {
    let geom, materail, mesh
    loader.load(window.Resource.f1, texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(50, 50)
      geom = new THREE.PlaneGeometry(1600, 1600)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(0, 0, -500)
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)
    })
  }


  function createFloor2 () {
    let geom, materail, mesh
    loader.load(window.Resource.f2, texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(50, 50)
      geom = new THREE.RingBufferGeometry(200, 600, 64)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(0, 0, -360)
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)
    })
  }

  return {
    create () {
      createSnow()
      // createFloor1()
      // createFloor2()
    }
  }
}
