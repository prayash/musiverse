import * as THREE from 'three'
import animate from 'raf-loop'
import setup from './setup'
import constants from './constants'
import ParticleSystem from './particle-system'

const { AMOUNT_X, AMOUNT_Y, SEPARATION } = constants
const { renderer, camera, scene, updateControls } = setup()
const particles = []

buildIcosahedron()
const ps = new ParticleSystem({ scene })

function buildIcosahedron() {
  const icosGeometry = new THREE.OctahedronGeometry(250, 2)
  const icosFrameGeom = new THREE.OctahedronGeometry(300, 2)
  const icosMaterial = new THREE.MeshPhongMaterial({
    color: '#D92B6A',
    shading: THREE.FlatShading,
    vertexColors: THREE.FaceColors
  })
  const icosWire = new THREE.MeshPhongMaterial({
    color: '#FFFFFF',
    transparent: true,
    opacity: 0.2,
    wireframe: true
  })

  const icosahedron = new THREE.Mesh(icosGeometry, icosMaterial)
  const icosFrame = new THREE.Mesh(icosFrameGeom, icosWire)
  scene.add(icosahedron)
  scene.add(icosFrame)

  createNodesUsingGeometry(icosFrameGeom)
}

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
