export default function ($scene) {
  let scene = $scene
  let loader = new THREE.TextureLoader()

  function createSnow () {
    loader.load(window.Resource.snow, texture => {
      let geom = new THREE.PlaneGeometry(64, 64)
      let materail = new THREE.MeshBasicMaterial({
        map: texture
      })
      materail.transparent = true
      let mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(0, 0, -600)
      scene.add(mesh)
    })
  }

  return {
    create () {
      createSnow()
    }
  }
}
