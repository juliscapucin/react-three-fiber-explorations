import { Scroll, ScrollControls, useGLTF } from "@react-three/drei"

export default function ScrollControl() {
	const { scene } = useGLTF("/models/christmas-tree.gltf")
	// const { scene } = useGLTF("/models/desk.gltf")
	// const { scene } = useGLTF(
	// 	"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf"
	// )

	return (
		<>
			<ambientLight intensity={5} />
			<directionalLight />
			<ScrollControls pages={3}>
				<Scroll>
					<primitive object={scene} />
				</Scroll>
				<Scroll html>
					<h1 className='text-9xl'>Juli Scapucin</h1>
					<h1 className='text-9xl'>Amsterdam</h1>
					<h1 className='text-9xl'>Chritsmas</h1>
					<h1 className='text-9xl'>2024</h1>
				</Scroll>
			</ScrollControls>
		</>
	)
}
