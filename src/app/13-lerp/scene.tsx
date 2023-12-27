import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import {
	GradientTexture,
	MeshDistortMaterial,
	OrbitControls,
	useCursor,
	Image,
} from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"

export default function Scene() {
	const cubeRef = useRef<THREE.Mesh>(null)
	const gradientPlaneRef = useRef<THREE.Mesh>(null)
	const imageRef = useRef<THREE.Mesh>(null)
	const [cubeHovered, setCubeHovered] = useState(false)
	const [planeHovered, setPlaneHovered] = useState(false)
	const [imageHovered, setImageHovered] = useState(false)

	const texture = useLoader(THREE.TextureLoader, "/textures/juli.jpeg")

	useCursor(cubeHovered || planeHovered || imageHovered ? true : false)

	const { lerp } = THREE.MathUtils

	useFrame(() => {
		cubeRef.current!.rotation.x = lerp(
			cubeRef.current!.rotation.x,
			cubeHovered ? 0.5 : 0,
			0.1
		)

		if (
			gradientPlaneRef.current &&
			gradientPlaneRef.current!.material &&
			"distort" in gradientPlaneRef.current!.material
		) {
			gradientPlaneRef.current!.material.distort = lerp(
				(gradientPlaneRef.current.material as any).distort,
				planeHovered ? 0.4 : 0,
				planeHovered ? 0.05 : 0.01
			)
		}

		if (
			imageRef.current &&
			imageRef.current!.material &&
			"distort" in imageRef.current!.material
		) {
			imageRef.current!.material.distort = lerp(
				(imageRef.current.material as any).distort,
				imageHovered ? 0.4 : 0,
				imageHovered ? 0.05 : 0.01
			)
		}
	})

	return (
		<>
			<OrbitControls />
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 5, 5]} intensity={2} />

			<mesh
				ref={cubeRef}
				onPointerOver={() => setCubeHovered(true)}
				onPointerOut={() => setCubeHovered(false)}
			>
				<boxGeometry args={[1, 1, 1]} />
				<meshBasicMaterial color='orange' />
			</mesh>
			<mesh
				ref={imageRef}
				position={[-3, 0, 0]}
				onPointerOver={() => setImageHovered(true)}
				onPointerOut={() => setImageHovered(false)}
			>
				<planeGeometry args={[3, 3]} />
				<MeshDistortMaterial map={texture} side={THREE.DoubleSide} />
			</mesh>

			{/* Gradient Plane */}
			<mesh
				ref={gradientPlaneRef}
				onPointerOver={() => setPlaneHovered(true)}
				onPointerOut={() => setPlaneHovered(false)}
				position={[2, 0, 0]}
			>
				<planeGeometry args={[3, 3, 32, 32]} />
				<MeshDistortMaterial>
					<GradientTexture
						colors={["hotpink", "orange", "red"]}
						stops={[0.1, 0.5, 0.9]}
					/>
				</MeshDistortMaterial>
			</mesh>

			{/* <gridHelper args={[100, 100]} /> */}
		</>
	)
}
