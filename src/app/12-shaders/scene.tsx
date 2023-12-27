import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import {
	OrbitControls,
	MeshReflectorMaterial,
	Environment,
	MeshWobbleMaterial,
	MeshDistortMaterial,
	GradientTexture,
	useCursor,
} from "@react-three/drei"

export default function Scene() {
	return (
		<>
			<OrbitControls />
			<ambientLight intensity={0.5} />
			<Environment preset='warehouse' />

			<mesh>
				<boxGeometry args={[1, 1, 1, 32, 32, 32]} />
				<MeshWobbleMaterial />
			</mesh>

			{/* Gradient Plane */}
			<mesh position={[4, 0, 0]}>
				<planeGeometry args={[1, 3, 32, 32]} />
				<MeshDistortMaterial>
					<GradientTexture
						colors={["hotpink", "orange", "red"]}
						stops={[0.1, 0.5, 0.9]}
						// size={64}
						// height={0.5}
						// radius={1}
						// blur={0.2}
						// speed={0.2}
						// metalness={0.5}
						// roughness={0.5}
					/>
				</MeshDistortMaterial>
			</mesh>
			<mesh position-y={3}>
				<planeGeometry args={[1, 5, 1, 32]} />
				<MeshWobbleMaterial color='blue' speed={2} />
			</mesh>
			<mesh position={[3, 3, 1]}>
				<planeGeometry args={[1, 2, 32, 32]} />
				<MeshDistortMaterial
					color='yellow'
					speed={2}
					distort={2}
					// side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[-3, 3, 0]}>
				<planeGeometry args={[1, 2, 32, 32]} />
				<MeshDistortMaterial
					color='red'
					speed={2}
					distort={0.6}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh>
				<boxGeometry />
				<meshBasicMaterial color='hotpink' />
			</mesh>
			<mesh rotation-x={-Math.PI * 0.5} position-y={-0.75}>
				<planeGeometry args={[10, 10]} />
				<MeshReflectorMaterial
					resolution={512}
					color='gray'
					blur={[1000, 100]}
					mixBlur={1}
					mirror={0.75}
				/>
			</mesh>

			{/* <gridHelper args={[100, 100]} /> */}
		</>
	)
}
