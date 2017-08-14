import * as THREE from 'three'
import animate from 'raf-loop'
import setup from './setup'
import constants from './constants'

import Core from './core'
import ParticleSystem from './particle-system'

const { AMOUNT_X, AMOUNT_Y, SEPARATION } = constants
const { renderer, camera, scene, updateControls } = setup()
const particles = []

const ps = new ParticleSystem({ scene })
// scene.add(ps)

const core = new Core()
core.attachTo(scene)

createNodesUsingGeometry(core.geometry)

function createNodesUsingGeometry(g) {
  const spheres = []
  const sphereG = new THREE.SphereGeometry(5, 32, 32)
  const sphereM = new THREE.MeshBasicMaterial({
    color: '#FFFFFF',
    transparent: true,
    shading: THREE.FlatShading
  })

  for (var i in g.vertices) {
    spheres.push(new THREE.Mesh(sphereG, sphereM))
    spheres[i].position.set(g.vertices[i].x, g.vertices[i].y, g.vertices[i].z)
    scene.add(spheres[i])
  }
}

let time = 0
animate(dt => {
  time += dt / 1000

  // camera.position.x++
  // camera.position.z++

  updateControls()
  renderer.render(scene, camera)
}).start()
