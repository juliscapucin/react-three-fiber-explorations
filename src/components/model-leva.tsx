import { Suspense } from "react"
import { useGLTF } from "@react-three/drei"

import { useControls, button } from "leva"

export default function ModelLeva() {
	const model = useGLTF("/models/christmas-tree.gltf")

	// const { Xposition } = useControls({
	// 	Xposition: { value: 0, min: -10, max: 10, step: 0.1, label: "X position" },
	// })

	const { position, wireframe, scale } = useControls("tree", {
		scale: {
			options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			value: 1,
			label: "Scale",
		},
		position: {
			value: { x: 0, y: 0, z: 0 },
			min: -10,
			max: 10,
			step: 0.1,
			label: "Position",
		},
		wireframe: false,
		click: button(() => console.log("clicked")),
	})

	return (
		// ToDo: fix this
		<Suspense
			fallback={
				<mesh scale-y={2}>
					<boxGeometry />
					<meshBasicMaterial color='white' wireframe={true} />
				</mesh>
			}
		>
			{/* <primitive object={model.scene} position-x={position.x} /> */}
			<primitive
				object={model.scene}
				position={[position.x, position.y, position.z]}
				wireframe={wireframe}
				scale={scale}
			/>
		</Suspense>
	)
}

useGLTF.preload("/models/christmas-tree.gltf")
