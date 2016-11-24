export default function ($scene) {
  let scene = $scene
  let loader = new THREE.TextureLoader()

  function createFloor () {
    loader.load(window.Resource.floor, texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(8, 8)

      let geom = new THREE.PlaneBufferGeometry(2048, 2048)
      let material = new THREE.MeshLambertMaterial({
        map: texture
      })
      let mesh = new THREE.Mesh(geom, material)
      mesh.position.set(0, -400, -1400)
      mesh.rotation.set(0 - Math.PI / 2, 0, -0.7)
      mesh.name = 'Floor'
      scene.add(mesh)
    })
  }

  function createLight () {
    let spotlight = new THREE.SpotLight(0xffffff)
    spotlight.position.set(0, 400, -1400)
    spotlight.rotation.set(0.8, 0.08, 0)
    window.spotlight = spotlight
    spotlight.name = 'Floor_Light'
    spotlight.angle = 0.3
    spotlight.intensity = 1
    scene.add(spotlight)

    let helper = new THREE.SpotLightHelper(spotlight)
    scene.add(helper)
  }

  function createCube () {
    let geom = new THREE.BoxBufferGeometry(120, 120, 120)
    let material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    let mesh = new THREE.Mesh(geom, material)
    mesh.position.set(0, -200, -1200)
    mesh.name = 'Cube'
    scene.add(mesh)
  }

  return {
    create () {
      createFloor()
      createCube()
      createLight()
    }
  }
}
