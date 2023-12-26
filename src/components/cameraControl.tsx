import { Grid, CameraControls } from "@react-three/drei"
import { button, buttonGroup, useControls } from "leva"
import { useRef } from "react"
import * as THREE from "three"

export default function CameraControl() {
	const cameraControlRef = useRef<CameraControls>(null)

	const { DEG2RAD } = THREE.MathUtils

	const cameraControls = useControls({
		horizontalRotation: buttonGroup({
			label: "Horizontal Rotation",
			opts: {
				"45deg": () => cameraControlRef.current?.rotate(DEG2RAD * 45, 0, true),
				"-90deg": () =>
					cameraControlRef.current?.rotate(DEG2RAD * -90, 0, true),
				"360deg": () =>
					cameraControlRef.current?.rotate(DEG2RAD * 360, 0, true),
			},
		}),
		verticalRotation: buttonGroup({
			label: "Vertical Rotation",
			opts: {
				"20deg": () => cameraControlRef.current?.rotate(0, 20 * DEG2RAD, true),
				"-40deg": () =>
					cameraControlRef.current?.rotate(0, -40 * DEG2RAD, true),
			},
		}),
		truckGroup: buttonGroup({
			label: "Truck",
			opts: {
				"(1, 0)": () => cameraControlRef.current?.truck(1, 0, true),
				"(0, +1)": () => cameraControlRef.current?.truck(0, 1, true),
				"(-1, -1)": () => cameraControlRef.current?.truck(-1, -1, true),
			},
		}),
		zoom: buttonGroup({
			label: "Zoom",
			opts: {
				"0.25": () => cameraControlRef.current?.zoom(0.25, true),
				"-0.25": () => cameraControlRef.current?.zoom(-0.25, true),
			},
		}),
		lookAtBox: button(() => {
			cameraControlRef.current?.setLookAt(0, 1, 3, 0, 0, 0, true)
		}),
	})
	return (
		<>
			<Grid
				args={[30, 30]}
				cellSize={0.25}
				cellColor='#6f6f6f'
				sectionSize={1}
				sectionThickness={1.5}
				sectionColor='#6364A6'
				// fadeDistance={20}
				// fadeStrength={0.75}
			/>
			<mesh>
				<boxGeometry />
				<meshBasicMaterial color='hotpink' />
			</mesh>
		</>
	)
}
