import { Html, Image, useScroll } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Mesh } from "three"

export default function Images() {
	const { width, height } = useThree((state) => state.viewport)
	const scroll = useScroll()
	const imagesRef = useRef<Group>(null)

	// Zoom effect
	//
	// useFrame(() => {
	// 	if (!imagesRef.current) return

	// 	const positions = [
	// 		// scroll start, scroll end +=
	// 		[0, 1 / 3],
	// 		[1 / 8, 1 / 3],
	// 		[1 / 8, 1 / 3],
	// 		[1 / 8, 1 / 3],
	// 		[1 / 2, 1 / 3],
	// 		[1 / 2, 1 / 3],
	// 		[1 / 2, 1 / 2],
	// 	]

	// 	imagesRef.current.children.forEach((child, index) => {
	// 		const mesh = child as Mesh
	// 		if (mesh.material && "zoom" in mesh.material) {
	// 			// Ensure that the material has a 'zoom' property
	// 			;(mesh.material as any).zoom =
	// 				0.7 + scroll.range(positions[index][0], positions[index][1]) / 3
	// 		}
	// 	})
	// })

	return (
		<group ref={imagesRef}>
			<Image url='/5.jpg' scale={[5, 5]} position={[-9, height * 3, -3]} />
			<Image url='/6.jpg' scale={[5, 5]} position={[7, height * 2, -2]} />
			<Image url='/9.jpg' scale={[5, 5]} position={[-4, height, -2]} />
			<Image url='/3.jpg' scale={[5, 5]} position={[0, 0, 0]} />
			{/* <Image
				url='/4.jpg'
				scale={[5, 5]}
				position={[0, -height * 1.2, -1]}
				grayscale={1}
				zoom={1}
			/> */}
			<Image url='/5.jpg' scale={[5, 5]} position={[-9, -height, -3]} />
			<Image url='/6.jpg' scale={[5, 5]} position={[7, -height * 2, -2]} />
			<Image url='/9.jpg' scale={[5, 5]} position={[-4, -height * 3, -2]} />
			<Image url='/3.jpg' scale={[5, 5]} position={[0, -height * 4, 0]} />
			<Image url='/5.jpg' scale={[5, 5]} position={[-9, -height * 5, -3]} />
		</group>
	)
}
