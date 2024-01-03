import { FollowMouseCube } from "@/components"

const cubes: { position: [number, number, number]; color: string }[] = [
	{ position: [-3, 2, 0], color: "red" },
	{ position: [0, 2, 0], color: "red" },
	{ position: [3, 2, 0], color: "red" },
	{ position: [-3, -1, 0], color: "red" },
	{ position: [0, -1, 0], color: "red" },
	{ position: [3, -1, 0], color: "red" },
]

export default function Scene() {
	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 5]} intensity={3} castShadow />

			{cubes.map(({ position, color }, index) => (
				<FollowMouseCube
					key={`follow-mouse-cube-${index}`}
					position={position}
					color={color}
				/>
			))}
		</>
	)
}
