import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { CurtainMaterial } from "./CurtainMaterial"
import { easing } from "maath"
import * as THREE from "three"

import gsap from "gsap"

const textures = [
	"/textures/texture-@tyu25.jpg",
	"/textures/texture-@pawel_czerwinski-01.jpg",
	"/textures/texture-@pawel_czerwinski-02.jpg",
	"/textures/texture-@fakurian-04.avif",
]

export default function Scene() {
	const [index, setIndex] = useState(0)
	const materialRef = useRef()
	const groupRef = useRef<THREE.Group>(null)
	const { viewport, size, camera } = useThree()

	const allTextures = useLoader(THREE.TextureLoader, textures)

	useLayoutEffect(() => {
		if (!groupRef.current) return

		const activeMaterial =
			groupRef.current.children[index].material.uniforms.uProgress

		const tl = gsap.timeline({
			onComplete: () => {
				setIndex((prev) => {
					if (prev + 1 < allTextures.length) return prev + 1
					else return prev
				})
			},
		})

		tl.to(camera.position, {
			x: viewport.width * (index + 1 < allTextures.length ? index + 1 : index),
			duration: 3,
			ease: "power4.inOut",
		}).to(
			activeMaterial,
			{
				value: 0.6,
				duration: 2.5,
				ease: "power4.inOut",
			},
			"0"
		)
	}, [allTextures, groupRef, index])

	return (
		<group ref={groupRef}>
			{allTextures.map((texture, index) => {
				const positionX = viewport.width * index

				return (
					<mesh
						key={`shaders-on-scroll-${index}`}
						scale={[viewport.width, viewport.height, 1]}
						position={[positionX, 0, 0]}
					>
						<planeGeometry />
						<curtainMaterial
							key={CurtainMaterial.key}
							resolution={[
								size.width * viewport.dpr,
								size.height * viewport.dpr,
							]}
							uTexture={texture}
							uProgress={0}
							uAlpha={1}
							transparent
						/>
					</mesh>
				)
			})}
		</group>
	)
}
