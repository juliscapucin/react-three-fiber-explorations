import { useRef } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { WaveMaterial } from "./WaveMaterial"
import { easing } from "maath"
import * as THREE from "three"

export default function Scene() {
	const ref = useRef()
	const { viewport, size } = useThree()
	const texture = useLoader(
		THREE.TextureLoader,
		"/textures/owl-@erik_karits.avif"
	)

	useFrame((state, delta) => {
		if (!ref.current) return
		const x = state.pointer.x * viewport.width * 0.1
		const y = state.pointer.y * viewport.height * 0.1

		ref.current.time += delta
		easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
		console.log(ref.current.uProgress)
		console.log(state.pointer)
		ref.current.uProgress = x
	})

	return (
		<mesh scale={[viewport.width, viewport.height, 1]}>
			<planeGeometry />
			{/* <meshBasicMaterial map={texture} side={THREE.DoubleSide} /> */}
			<waveMaterial
				ref={ref}
				key={WaveMaterial.key}
				resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
				uTexture={texture}
				uProgress={0}
			/>
		</mesh>
	)
}
