import { useRef } from "react"
import * as THREE from "three"
import { useFrame, useLoader } from "@react-three/fiber"
const { lerp } = THREE.MathUtils

export default function Scene() {
	const texture = useLoader(
		THREE.TextureLoader,
		"/textures/owl-@erik_karits.jpg"
	)
	const mask = useLoader(THREE.TextureLoader, "/mask.jpg")
	const groupRef = useRef<THREE.Group>(null)

	useFrame(({ mouse, viewport }) => {
		if (!groupRef.current) return
		const x = mouse.x * viewport.width * 0.02
		const y = mouse.y * viewport.height * 0.02
		// groupRef.current.rotation.x = y
		// groupRef.current.rotation.y = -x

		groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, y, 0.1)
		groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, -x, 0.1)
	})

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={3} castShadow />
			<group ref={groupRef}>
				<mesh position={[0, 0, 1]}>
					<planeGeometry args={[6, 6]} />
					<meshBasicMaterial map={texture} alphaMap={mask} transparent />
				</mesh>
				<mesh position={[0, 0, 0]}>
					<planeGeometry args={[7, 7]} />
					<meshBasicMaterial map={texture} alphaMap={mask} transparent />
				</mesh>
				<mesh position={[0, 0, -1]}>
					<planeGeometry args={[8, 8]} />
					<meshBasicMaterial map={texture} />
				</mesh>
			</group>
		</>
	)
}
