import * as THREE from "three"
import { useFrame, useThree, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "@react-three/drei"
import { CustomGeometry } from "@/components"

export default function Scene() {
	const cubeRef = useRef<THREE.Mesh>(null)
	const planeRef = useRef<THREE.Mesh>(null)
	const sphereRef = useRef<THREE.Mesh>(null)
	const { camera, gl } = useThree() //camera, clock, gl, mouse, scene, onPointMissed

	const texture = useLoader(THREE.TextureLoader, "/textures/juli.jpeg")

	// change the camera position from here
	// camera.position.z = 5

	//animation frames
	useFrame((state, delta) => {
		if (!cubeRef.current || !planeRef.current) return
		//delta: time in seconds since last frame
		// cubeRef.current.rotation.x += delta
		// planeRef.current.rotation.y += delta
		// camera.position.y = Math.sin(state.clock.getElapsedTime()) * 3
	})

	return (
		<>
			<OrbitControls args={[camera, gl.domElement]} />
			<CustomGeometry />
			<group position={[0, 0, -5]}>
				<mesh ref={sphereRef} position={[3, 0, 0]}>
					<sphereGeometry />
					<meshBasicMaterial color='red' wireframe={true} />
				</mesh>
				<mesh ref={cubeRef} position={[-2, 0, 0]} scale={3}>
					<boxGeometry />
					<meshBasicMaterial color='hotpink' />
				</mesh>
				<mesh ref={planeRef} position={[-6, 0, 0]}>
					<planeGeometry args={[3, 6]} />
					<meshBasicMaterial map={texture} side={THREE.DoubleSide} />
					{/* <axesHelper args={[5]} /> */}
				</mesh>
			</group>
		</>
	)
}
