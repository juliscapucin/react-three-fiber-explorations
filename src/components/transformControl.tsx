import { OrbitControls, TransformControls } from "@react-three/drei"

export default function TransformControl() {
	return (
		<>
			{/* makeDefault isolates orbitControls from transformControls */}
			<OrbitControls makeDefault />
			<TransformControls>
				<mesh>
					<boxGeometry />
					<meshBasicMaterial color='hotpink' />
				</mesh>
			</TransformControls>
		</>
	)
}
