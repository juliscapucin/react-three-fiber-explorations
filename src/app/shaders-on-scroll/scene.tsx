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
	const ref = useRef()
	const ref2 = useRef()
	const { viewport, size, camera } = useThree()

	const allTextures = useMemo(() => {
		return useLoader(THREE.TextureLoader, textures)
	}, [textures])

	useLayoutEffect(() => {
		let activeIndex = 0
		let positionX = 0

		const tl = gsap.timeline()

		tl.to(camera.position, {
			x: viewport.width * (textures.length - 1),
			duration: textures.length - 1,
			ease: "none",
		})
	}, [allTextures])

	return (
		<>
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
							ref={ref}
							key={CurtainMaterial.key}
							resolution={[
								size.width * viewport.dpr,
								size.height * viewport.dpr,
							]}
							uTexture={allTextures[index]}
							uProgress={0}
							uAlpha={1}
							transparent
						/>
					</mesh>
				)
			})}
		</>
	)
}
