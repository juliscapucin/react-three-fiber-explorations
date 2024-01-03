import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { CurtainMaterial } from "./CurtainMaterial"
import { easing } from "maath"
import * as THREE from "three"

import gsap from "gsap"

const textures = [
	"/textures/texture-@fakurian-01.avif",
	"/textures/texture-@phillbrown-01.avif",
	"/textures/architecture-@andersjilden-01.jpg",
	"/textures/texture-@fakurian-04.avif",
]

export default function Scene() {
	const ref = useRef()
	const ref2 = useRef()
	const { viewport, size, camera } = useThree()

	const allTextures = useMemo(() => {
		return useLoader(THREE.TextureLoader, textures)
	}, [textures])

	const [activeIndex, setActiveIndex] = useState(0)

	useLayoutEffect(() => {
		if (!ref.current) return

		const tl = gsap.timeline({
			onComplete: () => {
				// Increment the texture index and loop around if necessary
				setActiveIndex((prev) => (prev + 1) % allTextures.length)
				tl.restart() // Restart the animation
			},
		})

		tl.to(ref.current.uniforms.uAlpha, {
			value: 1,
			duration: 1,
			ease: "power2.inOut",
		})
			.to(ref.current.uniforms.uProgress, {
				value: 0.6,
				duration: 3,
				ease: "power2.inOut",
			})
			.to(
				ref.current.uniforms.uAlpha,
				{
					value: 0.0,
					duration: 3,
					ease: "power2.inOut",
				},
				"<"
			)
	}, [ref, allTextures])

	return (
		<>
			<mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
				<planeGeometry />
				<curtainMaterial
					ref={ref}
					key={CurtainMaterial.key}
					resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
					uTexture={allTextures[activeIndex % allTextures.length]} // Ensure looping of textures
					uProgress={0}
					uAlpha={0}
					transparent
				/>
			</mesh>
		</>
	)
}
