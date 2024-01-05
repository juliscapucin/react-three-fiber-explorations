import { useRef } from "react"

import * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { ModelDrei } from "@/components"

export default function Scene() {
	const planeRef = useRef<THREE.Mesh>(null)
	const { camera, gl } = useThree() //camera, clock, gl, mouse, scene, onPointMissed

	return (
		<>
			<OrbitControls args={[camera, gl.domElement]} />
			<ambientLight intensity={2} />
			{true && <ModelDrei />}
			<gridHelper args={[100, 100]} />
		</>
	)
}
