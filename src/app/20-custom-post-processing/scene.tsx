import { useLayoutEffect, useRef } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { CurtainMaterial } from "./CurtainMaterial"
import { easing } from "maath"
import * as THREE from "three"

import gsap from "gsap"

export default function Scene() {
	const ref = useRef()
	const ref2 = useRef()
	const { viewport, size, camera } = useThree()
	const texture = useLoader(
		THREE.TextureLoader,
		"/textures/texture-@tyu25.avif"
	)
	const texture2 = useLoader(
		THREE.TextureLoader,
		"/textures/stripes-@mrparalloid.avif"
	)

	useFrame((state, delta) => {
		if (!ref.current) return
		const x = state.pointer.x * viewport.width * 0.1
		const y = state.pointer.y * viewport.height * 0.1

		ref.current.time += delta
		easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
	})

	useLayoutEffect(() => {
		if (!ref.current) return

		const tl = gsap.timeline({ repeat: -1, yoyo: true })

		tl.to(ref.current.uniforms.uProgress, {
			value: 0.6,
			duration: 3,
			ease: "power2.inOut",
		}).to(
			ref.current.uniforms.uAlpha,
			{
				value: 0.0,
				duration: 3,
				ease: "power2.inOut",
			},
			"<"
		)
	}, [ref])

	return (
		<>
			<mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
				<planeGeometry />
				<curtainMaterial
					ref={ref}
					key={CurtainMaterial.key}
					resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
					uTexture={texture}
					uProgress={0}
					uAlpha={1}
					transparent
				/>
			</mesh>
		</>
	)
}
