import { useRef } from "react"

import * as THREE from "three"
import { useLoader, useFrame } from "@react-three/fiber"

const Particles = () => {
	const particles = useRef<THREE.Points>(null)

	const texture = useLoader(THREE.TextureLoader, "/textures/cherry-blossom.png")
	const verticesAmount = 2000
	const positionArray = new Float32Array(verticesAmount * 3)

	for (let i = 0; i < verticesAmount * 3; i++) {
		const verticeValue = parseFloat((Math.random() - 0.5).toFixed(2))
		console.log(verticeValue)
		positionArray[i] = verticeValue
	}

	useFrame((_, delta: number) => {
		if (!particles.current) return
		particles.current.rotation.y += delta * 0.1
		particles.current.rotation.x += delta * 0.1
	})

	return (
		<points ref={particles}>
			<bufferGeometry>
				<bufferAttribute
					attach='attributes-position'
					array={positionArray}
					itemSize={3}
					count={positionArray.length / 3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.05}
				alphaMap={texture}
				depthTest={false}
				transparent
			/>
		</points>
	)
}

export default Particles
