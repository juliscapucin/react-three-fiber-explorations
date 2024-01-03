import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export default function Scene() {
	const geometryRef = useRef<THREE.Mesh>(null)

	// const geometry = useMemo(() => {
	// 	let g = new THREE.BufferGeometry()
	// 	const points = [
	// 		new THREE.Vector3(-1, 1, -1), //c
	// 		new THREE.Vector3(-1, -1, 1), //b
	// 		new THREE.Vector3(1, 1, 1), //a

	// 		new THREE.Vector3(1, 1, 1), //a
	// 		new THREE.Vector3(1, -1, -1), //d
	// 		new THREE.Vector3(-1, 1, -1), //c

	// 		new THREE.Vector3(-1, -1, 1), //b
	// 		new THREE.Vector3(1, -1, -1), //d
	// 		new THREE.Vector3(1, 1, 1), //a

	// 		new THREE.Vector3(-1, 1, -1), //c
	// 		new THREE.Vector3(1, -1, -1), //d
	// 		new THREE.Vector3(-1, -1, 1), //b
	// 	]
	// 	g.setFromPoints(points)
	// 	g.computeVertexNormals()
	// 	return g
	// }, [])

	const geometry = useMemo(() => {
		const g = new THREE.BufferGeometry()
		const vertices = [
			// An icosahedron has 12 vertices, and here they are defined in 3D space
			new THREE.Vector3(-1, 0.618, 0),
			new THREE.Vector3(1, 0.618, 0),
			new THREE.Vector3(-1, -0.618, 0),
			new THREE.Vector3(1, -0.618, 0),
			new THREE.Vector3(0, -1, 0.618),
			new THREE.Vector3(0, 1, 0.618),
			new THREE.Vector3(0, -1, -0.618),
			new THREE.Vector3(0, 1, -0.618),
			new THREE.Vector3(0.618, 0, -1),
			new THREE.Vector3(0.618, 0, 1),
			new THREE.Vector3(-0.618, 0, -1),
			new THREE.Vector3(-0.618, 0, 1),
		]

		const faces = [
			// An icosahedron has 20 faces, each face is a triangle
			// defined by indices into the vertices array
			0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11,
			10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4,
			9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
		]

		const points = []
		for (let i = 0; i < faces.length; i += 3) {
			points.push(
				vertices[faces[i]],
				vertices[faces[i + 1]],
				vertices[faces[i + 2]]
			)
		}

		g.setFromPoints(points)
		g.computeVertexNormals()
		return g
	}, [])

	useFrame(({ mouse, viewport }) => {
		if (!geometryRef.current) return
		const x = mouse.x * viewport.width * 10
		const y = mouse.y * viewport.height * 10
		geometryRef.current.rotation.x = -y
		geometryRef.current.rotation.y = x
	})

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={3} castShadow />
			<mesh ref={geometryRef} geometry={geometry}>
				<meshNormalMaterial side={THREE.DoubleSide} />
			</mesh>
		</>
	)
}
