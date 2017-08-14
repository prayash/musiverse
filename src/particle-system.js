import * as THREE from 'three'
import constants from './constants'
const { AMOUNT_X, AMOUNT_Y, SEPARATION } = constants

const createParticle = () =>
  new THREE.Mesh(
    new THREE.SphereGeometry(5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: '#ff7af6',
      transparent: false,
      shading: THREE.FlatShading
    })
  )

class ParticleSystem {
  constructor(params) {
    this.particles = []
    this.scene = params.scene
    this.create()
    return this
  }

  create() {
    let i = 0
    for (var ix = 0; ix < AMOUNT_X; ix++) {
      for (var iy = 0; iy < AMOUNT_Y; iy++) {
        let particle = (this.particles[i++] = createParticle())
        const x = ix * SEPARATION - AMOUNT_X * SEPARATION / 2
        const z = iy * SEPARATION - AMOUNT_Y * SEPARATION / 2

        particle.position.set(x, 0, z)
        this.scene.add(particle)
      }
    }
  }
}

export default ParticleSystem
