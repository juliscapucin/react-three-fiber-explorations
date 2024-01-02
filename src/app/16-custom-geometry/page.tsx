"use client"

import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	return (
		<section className='h-full bg-colorBlack overflow-clip'>
			<Canvas
				shadows
				camera={{ fov: 75, near: 0.01, far: 1000, position: [0, 0, 0.1] }}
				gl={{ alpha: true }}
				dpr={[1, 1.5]}
			>
				<Scene />
			</Canvas>
		</section>
	)
}

export default page
