"use client"

import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	const asciiRef = useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	if (!asciiRef.current) return
	// 	asciiRef.current.classList.remove("translate-x-full")
	// 	asciiRef.current.classList.add("-translate-x-full")
	// }, [])

	return (
		<section className='h-full bg-colorBlack overflow-clip'>
			<div ref={asciiRef} className='h-full transition-transform duration-[2s]'>
				<Canvas
					shadows
					camera={{ fov: 75, near: 0.01, far: 1000, position: [0, 0, 5] }}
					gl={{ alpha: true }}
					dpr={[1, 1.5]}
				>
					{/* <color attach='background' args={["black"]} /> */}
					<Scene />
				</Canvas>
			</div>
		</section>
	)
}

export default page
