"use client"

import { Canvas, RootState } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	// const creatingCanvasHandler = (state: RootState) => {
	// 	console.log(state)
	//    //{ gl, camera, scene, size, viewport, aspect, clock, mouse, ...events }
	// }

	return (
		<section className='h-3/4 bg-slate-950'>
			<Canvas
				camera={{ fov: 45, near: 0.01, far: 1000, position: [0, 0, 100] }}
				gl={{ antialias: false, alpha: true }}
				dpr={[1, 1.5]}
				// onCreated={creatingCanvasHandler}
			>
				<axesHelper args={[5]} />
				<gridHelper args={[100, 100, 0xff0000, "green"]} />
				<Scene />
			</Canvas>
		</section>
	)
}

export default page
