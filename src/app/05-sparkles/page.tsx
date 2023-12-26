"use client"

import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	return (
		<section className='h-full bg-slate-950'>
			<Canvas
				shadows
				camera={{ fov: 45, near: 0.01, far: 1000, position: [0, 50, 100] }}
				gl={{ alpha: true }}
				dpr={[1, 1.5]}
			>
				<Scene />
			</Canvas>
		</section>
	)
}

export default page
