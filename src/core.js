import * as THREE from 'three'

class Core {
  constructor(args) {
    this.geometry = new THREE.OctahedronGeometry(300, 2)
    this.group = this.create()

    return this
  }

  attachTo(scene) {
    scene.add(this.group)
  }

  create() {
    const group = new THREE.Group()
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
    group.add(icosahedron)
    group.add(icosFrame)

    return group
  }
}

export default Core
