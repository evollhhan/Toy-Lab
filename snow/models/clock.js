import { mClock } from './Math/'
import Text from './Text/'

export default function ($scene) {
  let scene = $scene
  let GroupClock = new THREE.Group()
  let ClockMaterial = {}
  GroupClock.name = 'CLOCK'

  function drawClockPanel () {
    let geom, materail, mesh

    // Base Panel
    geom = new THREE.CircleGeometry(150, 48)
    ClockMaterial.panel = new THREE.MeshLambertMaterial({ color: 0x000000 })
    mesh = new THREE.Mesh(geom, ClockMaterial.panel)
    mesh.name = 'base_panel'
    GroupClock.add(mesh)

    // Ring Inner
    geom = new THREE.RingBufferGeometry(145, 150, 48)
    ClockMaterial.RingInner = new THREE.MeshLambertMaterial({ color: 0x8da1c5 })
    mesh = new THREE.Mesh(geom, ClockMaterial.RingInner)
    mesh.name = 'ring_inner'
    GroupClock.add(mesh)

    // Ring Outer
    geom = new THREE.RingBufferGeometry(150, 165, 48)
    ClockMaterial.RingOuter = new THREE.MeshLambertMaterial({ color: 0xebf1fc })
    mesh = new THREE.Mesh(geom, ClockMaterial.RingOuter)
    mesh.name = 'ring_outer'
    GroupClock.add(mesh)

    // Clock Num
    mClock(120, (x, y, no) => {
      let t = Text(no, {
        w: 32,
        h: 32,
        font: 'bold 28px Impact',
        color: '#ebf1fc'
      })
      let texture = new THREE.Texture(t)
      texture.needsUpdate = true
      geom = new THREE.PlaneBufferGeometry(32, 32)
      materail = new THREE.MeshLambertMaterial({ map: texture })
      materail.transparent = true
      mesh = new THREE.Mesh(geom, materail)
      mesh.position.set(x, y, 1)
      mesh.name = 'Clock_No_' + no
      GroupClock.add(mesh)
    })

    GroupClock.position.set(0, 0, -400)
    scene.add(GroupClock)
  }

  function addLight () {
    let light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(0, 0, 100)
    light.intensity = 0.2
    // light.intensity = 1
    light.castShadow = true
    scene.add(light)
  }

  return {
    create () {
      addLight()
      drawClockPanel()
    },
    scene1 () {
      ClockMaterial.panel.color.setHex(0xaf1f39)
    }
  }
}
