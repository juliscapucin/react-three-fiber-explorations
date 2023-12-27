import { PivotControls } from "@react-three/drei"

export default function PivotControl() {
	return (
		// anchor is relative to the object -1, 0, 0 is the left side of the object
		<PivotControls
			anchor={[-1, 0, 0]}
			depthTest={false} // make the pivot control fully visible
			axisColors={["red", "green", "yellow"]}
			lineWidth={7}
			scale={2}
		>
			<mesh>
				<boxGeometry />
				<meshBasicMaterial color='hotpink' />
			</mesh>
		</PivotControls>
	)
}
