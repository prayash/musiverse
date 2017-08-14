import * as THREE from 'three'

class Core {
  constructor(args) {
    this.geometry = new THREE.OctahedronGeometry(300, 2)
    this.group = this.create()
    // this.nodes = this.createNodesUsingGeometry()
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

  createNodesUsingGeometry() {
    const g = this.geometry
    const nodes = []
    const nodeG = new THREE.SphereGeometry(5, 32, 32)
    const nodeM = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      shading: THREE.FlatShading
    })

    for (var i in g.vertices) {
      nodes.push(new THREE.Mesh(nodeG, nodeM))
      nodes[i].position.set(g.vertices[i].x, g.vertices[i].y, g.vertices[i].z)
    }

    return nodes
  }
}

export default Core
