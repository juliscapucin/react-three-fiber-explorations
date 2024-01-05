import { PresentationControls } from "@react-three/drei"

export default function PresentationControl() {
	return (
		<PresentationControls
			global
			polar={[-Math.PI / 3, Math.PI / 3]}
			azimuth={[-Math.PI / 2, Math.PI / 2]}
			config={{ mass: 2, tension: 500 }}
			snap={{ mass: 4, tension: 1500 }}
		>
			<mesh>
				<boxGeometry />
				<meshBasicMaterial color='hotpink' />
			</mesh>
		</PresentationControls>
	)
}
