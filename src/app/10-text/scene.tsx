import { Text, Text3D, OrbitControls, Center, Float } from "@react-three/drei"

export default function Scene() {
	return (
		<>
			<OrbitControls />
			<Center>
				<Text
					fontSize={0.8}
					color='orange'
					font='./fonts/PPSupplyMono-Regular.otf'
					position-y={1.5}
					rotation-y={Math.PI * 0.2}
					maxWidth={9}
					textAlign='center'
				>
					JULI SCAPUCIN FRONT-END DEVELOPER & DESIGNER
				</Text>
			</Center>
			<Center>
				<Float speed={2} floatIntensity={0.5}>
					<Text3D
						font='./fonts/pp-regular-json.json'
						height={1}
						size={1.5}
						letterSpacing={-0.2}
						bevelEnabled
						bevelSegments={20}
					>
						HELLO
						<meshNormalMaterial />
					</Text3D>
				</Float>
			</Center>
		</>
	)
}
