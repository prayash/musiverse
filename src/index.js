import * as THREE from 'three'
import animate from 'raf-loop'
import setup from './setup'
import * as constants from './constants'

const { renderer, camera, scene, updateControls } = setup()
const particles = []

buildIcosahedron()

function buildIcosahedron() {
  let icosGeometry = new THREE.OctahedronGeometry(350, 2)
  let icosFrameGeom = new THREE.OctahedronGeometry(400, 2)

  let icosMaterial = new THREE.MeshPhongMaterial({
    color: '#D92B6A',
    shading: THREE.FlatShading,
    vertexColors: THREE.FaceColors
  })
  let icosWire = new THREE.MeshPhongMaterial({
    color: '#FFFFFF',
    transparent: true,
    opacity: 0.2,
    wireframe: true
  })

  let icosahedron = new THREE.Mesh(icosGeometry, icosMaterial)
  let icosFrame = new THREE.Mesh(icosFrameGeom, icosWire)
  scene.add(icosahedron)
  scene.add(icosFrame)

  const spheres = []
  const sphereG = new THREE.SphereGeometry(5, 32, 32)
  const sphereM = new THREE.MeshBasicMaterial({
    color: '#FFFFFF',
    transparent: true,
    shading: THREE.FlatShading
  })
  for (var i in icosFrameGeom.vertices) {
    spheres.push(new THREE.Mesh(sphereG, sphereM))
    spheres[i].position.set(
      icosFrameGeom.vertices[i].x,
      icosFrameGeom.vertices[i].y,
      icosFrameGeom.vertices[i].z
    )
    scene.add(spheres[i])
  }
}

const pGeo = new THREE.SphereGeometry(10, 16, 16)
const pMat = new THREE.MeshBasicMaterial({
  color: '#ff7af6',
  transparent: false,
  shading: THREE.FlatShading
})

for (var i = 0; i < 50; i++) {
  let particle = (particles[i] = new THREE.Mesh(pGeo, pMat))
  particle.position.set(i * 10, 0, 0)
  scene.add(particle)
}

let time = 0
animate(dt => {
  time += dt / 1000

  updateControls()
  renderer.render(scene, camera)
}).start()
