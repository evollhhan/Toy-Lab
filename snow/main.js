import Clock from './models/clock'
import Scene from './models/Scene/scene1'

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
  let ck = new Clock(scene)
  ck.create()

  let s = new Scene(scene)
  s.create()
  // ck.scene1()

  // -- Render
  renderer = new THREE.WebGLRenderer({
    alpha: true
    // antialias: true
  })
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
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
