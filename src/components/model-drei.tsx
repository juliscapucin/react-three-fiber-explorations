import { Suspense } from "react"
import { useGLTF } from "@react-three/drei"

export default function ModelDrei() {
	const model = useGLTF("/models/christmas-tree.gltf")

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
			<primitive object={model.scene} />
		</Suspense>
	)
}

useGLTF.preload("/models/christmas-tree.gltf")
