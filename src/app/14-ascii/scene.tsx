import { MeshDistortMaterial, AsciiRenderer } from "@react-three/drei"

export default function Scene() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={3} castShadow />

			<mesh castShadow>
				<sphereGeometry args={[3, 2, 32, 32]} />
				<MeshDistortMaterial
					color='red'
					speed={1}
					distort={2}
					// side={THREE.DoubleSide}
				/>
			</mesh>
			<AsciiRenderer
				fgColor='green'
				bgColor='transparent'
				characters=' _/.>= '
			/>

			{/* <gridHelper args={[100, 100]} /> */}
		</>
	)
}
