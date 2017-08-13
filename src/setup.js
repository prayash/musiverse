import * as THREE from 'three'
import createControls from 'orbit-controls'
import assign from 'object-assign'
import * as constants from './constants'

export default function setup(opt = {}) {
  const renderer = new THREE.WebGLRenderer(
    assign(
      {
        antialias: true,
        alpha: true
      },
      opt
    )
  )
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(constants.FOG_COLOR)

  // Add the <canvas> to DOM body
  const canvas = renderer.domElement
  document.body.appendChild(canvas)

  // Perspective camera
  const near = 1
  const far = 5000
  const fieldOfView = 75
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    window.innerWidth / window.innerHeight,
    near,
    far
  )
  camera.position.z = 500
  camera.position.y = window.innerHeight / 2
  camera.position.x = window.innerWidth / 2

  const target = new THREE.Vector3()

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(constants.FOG_COLOR, 0.0011) // 0xCCCCC fcf7e1

  let light = new THREE.DirectionalLight('#FFFFFF')
  light.position.set(1, 1, 1)
  scene.add(light)

  light = new THREE.DirectionalLight('#D92B6A')
  light.position.set(-5, -1, -10)
  scene.add(light)

  light = new THREE.AmbientLight('#222222')
  scene.add(light)

  const pointLight = new THREE.PointLight('#FFFFFF', 1.2, 200)
  pointLight.position.set(100, 100, 100)
  scene.add(pointLight)

  // 3D Orbit Controls
  const controls = createControls(
    assign(
      {
        canvas,
        distanceBounds: [1, 10],
        distance: 2.5,
        phi: 70 * Math.PI / 180
      },
      opt
    )
  )
  controls.rotateSpeed = 2.0
  controls.zoomSpeed = 1
  controls.panSpeed = 1
  controls.dampingFactor = 0.3
  controls.minDistance = 600
  controls.maxDistance = 1000

  // Update renderer size
  window.addEventListener('resize', resize)

  // Setup initial size & aspect ratio
  resize()

  return {
    updateControls,
    camera,
    scene,
    renderer,
    controls,
    canvas
  }

  function updateControls() {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height

    // update camera controls
    controls.update()
    // camera.position.fromArray(controls.position)
    // camera.up.fromArray(controls.up)
    // target.fromArray(controls.direction).add(camera.position)
    camera.lookAt(target)

    // Update camera matrices
    camera.aspect = aspect
    camera.updateProjectionMatrix()
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    updateControls()
  }
}

// module.exports = setup
