"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
	useScroll,
	Text,
	Image,
	Scroll,
	Preload,
	ScrollControls,
} from "@react-three/drei"

export default function App() {
	return (
		<Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
			<ScrollControls damping={0.2} pages={3} distance={0.5}>
				<Scroll>
					<Typography />
					<Images />
				</Scroll>
				<Scroll html>
					<div style={{ transform: "translate3d(65vw, 192vh, 0)" }}>
						PMNDRS Pendant lamp
						<br />
						bronze, 38 cm
						<br />
						CHF 59.95
						<br />
					</div>
				</Scroll>
				{/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
               By default threejs will only process objects if they are "seen" by the camera leading 
               to jank as you scroll down. With <Preload> that's solved.  */}
				<Preload />
			</ScrollControls>
		</Canvas>
	)
}

function Images() {
	const group = useRef<THREE.Group>(null)
	const data = useScroll()
	const { width, height } = useThree((state) => state.viewport)
	useFrame(() => {
		if (!group.current) return

		group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
		group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
		group.current.children[2].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2
		group.current.children[3].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2
		group.current.children[4].material.zoom =
			1 + data.range(1.15 / 3, 1 / 3) / 2
		group.current.children[5].material.grayscale =
			1 - data.range(1.6 / 3, 1 / 3)
		group.current.children[6].material.zoom =
			1 + (1 - data.range(2 / 3, 1 / 3)) / 3
	})
	return (
		<group ref={group}>
			<Image position={[-2, 0, 0]} scale={[4, height, 1]} url='/1.jpg' />
			<Image position={[2, 0, 3]} scale={3} url='/6.jpg' />
			<Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url='/2.jpg' />
			<Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url='/8.jpg' />
			<Image position={[0.75, -height, 10.5]} scale={1.5} url='/4.jpg' />
			<Image
				position={[0, -height * 1.5, 7.5]}
				scale={[1.5, 3, 1]}
				url='/3.jpg'
			/>
			<Image
				position={[0, -height * 2 - height / 4, 0]}
				scale={[width, height / 1.1, 1]}
				url='/7.jpg'
			/>
		</group>
	)
}

function Typography() {
	const state = useThree()
	const { width, height } = state.viewport.getCurrentViewport(
		state.camera,
		[0, 0, 12]
	)
	// const shared = {
	// 	font: "/Inter-Regular.woff",
	// 	letterSpacing: -0.1,
	// 	color: "black",
	// }
	return (
		<>
			<Text
				anchorX='left'
				position={[-width / 2.5, -height / 10, 12]}
				// {...shared}
			>
				to
			</Text>
			<Text
				anchorX='right'
				position={[width / 2.5, -height * 2, 12]}
				// {...shared}
			>
				be
			</Text>
			<Text position={[0, -height * 4.624, 12]}>home</Text>
			{/* <Text children='home' position={[0, -height * 4.624, 12]} {...shared} /> */}
		</>
	)
}
