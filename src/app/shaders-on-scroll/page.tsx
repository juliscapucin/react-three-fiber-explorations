"use client"

import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	return (
		<section className='h-full bg-colorBlack overflow-clip'>
			<Canvas camera={{ position: [0, 0, 2] }}>
				<Scene />
			</Canvas>
		</section>
	)
}

export default page
