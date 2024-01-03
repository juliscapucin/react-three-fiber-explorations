"use client"

import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	return (
		<section className='h-full bg-colorBlack overflow-clip'>
			<div className='h-full transition-transform duration-[2s]'>
				<Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
					<Scene />
				</Canvas>
			</div>
		</section>
	)
}

export default page
