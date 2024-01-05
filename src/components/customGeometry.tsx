import * as THREE from "three"
import { useLoader } from "@react-three/fiber"

export const CustomGeometry = () => {
	const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])

	return (
		<mesh>
			<bufferGeometry>
				<bufferAttribute
					attach='attributes-position' // corresponds to geometry.attributes.position
					array={positionArray}
					itemSize={3} // 3 values per vertex
					count={3} // 3 vertices
				/>
			</bufferGeometry>
			<meshBasicMaterial color='yellow' side={THREE.DoubleSide} />
		</mesh>
	)
}

export default CustomGeometry
