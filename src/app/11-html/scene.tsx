import { OrbitControls, Html } from "@react-three/drei"
import { useRef } from "react"

export default function Scene() {
	const cubeRef = useRef(null)
	return (
		<>
			<OrbitControls />
			<mesh position-x={1} scale={1} ref={cubeRef}>
				<boxGeometry />
				<meshBasicMaterial color='hotpink' />
				<Html
					position={[-0.7, 0.5, 0.5]}
					wrapperClass='html-label-3d bg-blue-500'
					distanceFactor={5}
					occlude={[cubeRef]}
				>
					Hello Helper
				</Html>
			</mesh>
			<mesh position-x={-1} scale={1}>
				<boxGeometry />
				<meshBasicMaterial color='purple' />
			</mesh>
		</>
	)
}
