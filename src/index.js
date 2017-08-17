import * as THREE from 'three'
import animate from 'raf-loop'
import setup from './setup'

import Core from './core'
import ParticleSystem from './particle-system'

const { renderer, camera, scene, updateControls } = setup()
const particles = []

const ps = new ParticleSystem({ scene })
// scene.add(ps)

const core = new Core()
core.attachTo(scene)
// core.createNodesUsingGeometry()

let time = 0
animate(dt => {
  time += dt / 1000

  // camera.position.x++
  // camera.position.z++
  ps.wave(time)

  updateControls()
  renderer.render(scene, camera)
}).start()
