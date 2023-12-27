import { Scroll, ScrollControls, useGLTF } from "@react-three/drei"
import { Images } from "@/components"

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
			<ScrollControls pages={4} damping={0.2} infinite>
				<Scroll>
					{/* <primitive object={scene} scale={0.5} /> */}
					<Images />
				</Scroll>
				<Scroll html>
					<div className='fixed top-0 left-0'>
						<h1 className='text-9xl'>Juli Scapucin</h1>
						<h1 className='text-9xl'>Amsterdam</h1>
						<h1 className='text-9xl'>Chritsmas</h1>
						<h1 className='text-9xl'>2024</h1>
					</div>
				</Scroll>
			</ScrollControls>
		</>
	)
}
