"use client"

import { Canvas } from "@react-three/fiber"
import Scene from "./scene"
import { Perf } from "r3f-perf"

const page = () => {
	return (
		<section className='h-full bg-slate-950'>
			<Canvas
				camera={{ fov: 45, near: 0.01, far: 1000, position: [0, 50, 100] }}
				gl={{ antialias: false, alpha: true }}
				dpr={[1, 1.5]}
			>
				<Scene />
				{/* Performance monitor */}
				<Perf />
			</Canvas>
		</section>
	)
}

export default page
