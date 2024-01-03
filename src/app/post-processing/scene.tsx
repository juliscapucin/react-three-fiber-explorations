import { PostProcessingEffect } from "@/components"

export default function Scene() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={3} castShadow />

			<PostProcessingEffect />
			<mesh castShadow>
				<sphereGeometry args={[2, 4, 4]} />
				<meshNormalMaterial />
			</mesh>
		</>
	)
}
