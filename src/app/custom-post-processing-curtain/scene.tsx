import { useLayoutEffect, useRef, useState } from "react"
import { ReactThreeFiber, useLoader, useThree } from "@react-three/fiber"
import { CurtainMaterial } from "./CurtainMaterial"
import * as THREE from "three"

import gsap from "gsap"

const textures = [
	"/textures/texture-@tyu25.jpg",
	"/textures/texture-@pawel_czerwinski-01.jpg",
	"/textures/texture-@pawel_czerwinski-02.jpg",
	"/textures/texture-@fakurian-04.avif",
]

interface CurtainMaterialProps {
	uTexture: THREE.Texture
	uProgress: number
	uAlpha: number
	resolution: number[]
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			curtainMaterial: ReactThreeFiber.Object3DNode<
				THREE.ShaderMaterial,
				typeof THREE.ShaderMaterial
			> &
				CurtainMaterialProps
		}
	}
}

export default function Scene() {
	const ref = useRef<THREE.ShaderMaterial>(null)
	const { viewport, size } = useThree()

	const allTextures = useLoader(THREE.TextureLoader, textures)

	const [activeIndex, setActiveIndex] = useState(0)

	useLayoutEffect(() => {
		if (!ref.current) return

		const tl = gsap.timeline({
			onComplete: () => {
				// Increment the texture index and loop around if necessary
				setActiveIndex((prev) => (prev + 1) % allTextures.length)
				tl.restart()
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
