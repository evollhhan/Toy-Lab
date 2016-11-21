import Scene1 from './models/scene1'

let stage, scene, renderer, camera

function getAspect () {
  return window.innerWidth / window.innerHeight
}

function init () {
  // -- Stage
  stage = document.querySelector('.renderObject')

  // -- Scene
  scene = new THREE.Scene()
  window.scene = scene

  // -- Camera
  camera = new THREE.PerspectiveCamera(75, getAspect(), 1, 5000)
  camera.position.set(0, 0, 0)

  // -- Create Element
  let s1 = new Scene1(scene)
  s1.create()

  // -- Render
  renderer = new THREE.WebGLRenderer({
    alpha: true
  })
  renderer.setClearColor(0x000000)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = false
  stage.appendChild(renderer.domElement)
}

function animate () {
  requestAnimationFrame(animate)
  render()
}

function render () {
  TWEEN.update()
  renderer.clear()
  renderer.render(scene, camera)
}

init()
animate()
