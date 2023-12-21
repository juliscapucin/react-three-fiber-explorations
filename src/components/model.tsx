import { useLoader } from "@react-three/fiber"
import { Suspense } from "react"
import { GLTFLoader } from "three-stdlib"

export default function Model() {
	const model = useLoader(GLTFLoader, "/models/christmas-tree.gltf")

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
