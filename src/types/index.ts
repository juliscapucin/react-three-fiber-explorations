interface CustomMaterial extends THREE.Material {
	zoom?: number
	grayscale?: number
}

export type CustomMesh = THREE.Mesh<THREE.BufferGeometry, CustomMaterial>
