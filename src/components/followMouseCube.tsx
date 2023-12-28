import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function FollowMouseCube({
	position,
	color,
}: {
	position: [number, number, number]
	color: string
}) {
	const cubeRef = useRef<THREE.Mesh>(null)

	useFrame(({ mouse, viewport }) => {
		if (!cubeRef.current) return
		const x = (mouse.x * viewport.width) / 2.5
		const y = (mouse.y * viewport.height) / 2.5
		cubeRef.current.lookAt(x, y, 1)
		// cubeRef.current.material.color.lerp(hovered ? lime : black, 0.05)
	})
	return (
		<mesh ref={cubeRef} position={position} castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} />
		</mesh>
	)
}
