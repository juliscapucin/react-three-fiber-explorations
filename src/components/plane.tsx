import * as THREE from "three"
import { useGLTF } from "@react-three/drei"

import { useControls } from "leva"

export default function Plane() {
	const model = useGLTF("/models/christmas-tree.gltf")

	const { position, color } = useControls("plane", {
		position: {
			value: { x: 0, y: 0, z: 0 },
			min: -10,
			max: 10,
			step: 0.1,
			label: "Position",
		},
		color: { value: "#ff0000", label: "Color" },
	})

	return (
		<mesh position={[-6, 0, 0]}>
			<planeGeometry args={[3, 6]} />
			<meshBasicMaterial color={color} side={THREE.DoubleSide} />
		</mesh>
	)
}

useGLTF.preload("/models/christmas-tree.gltf")
