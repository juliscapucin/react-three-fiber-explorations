import { MutableRefObject, useRef, useState } from "react"
import * as THREE from "three"
import { useControls } from "leva"

import {
	Cloud,
	Clouds,
	OrbitControls,
	Sky,
	Sparkles,
	Stars,
	useHelper,
} from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"

export default function Scene() {
	const [active, setActive] = useState(false)
	const [boxScale, setBoxScale] = useState(1)

	const lightRef = useRef<THREE.DirectionalLight>(
		null
	) as MutableRefObject<THREE.DirectionalLight>
	useHelper(lightRef, THREE.DirectionalLightHelper, 1)

	const hoverOverHandler = () => setActive((prev) => !prev)
	const wheelHandler = (e: ThreeEvent<WheelEvent>) => {
		if (!e) return
		if (e.deltaY < 0) setBoxScale((prev) => prev - 0.1)
		else setBoxScale((prev) => prev + 0.1)
	}

	const { sunPosition } = useControls("sky", {
		sunPosition: {
			value: [0, 1, 0],
			step: 0.1,
			label: "Sun Position",
		},
	})

	return (
		<>
			<ambientLight intensity={2} />
			<directionalLight
				ref={lightRef}
				position={[10, 10, 5]}
				intensity={3}
				castShadow
			/>
			<OrbitControls />
			{/* <Sparkles
				count={300}
				speed={0.2}
				opacity={3}
				color='#e900f1'
				size={4}
				position={[0, 2, 0]}
			/> */}

			<Stars
				radius={10}
				depth={50}
				count={5000}
				factor={4}
				saturation={0}
				fade
				speed={1}
			/>

			<Clouds material={THREE.MeshBasicMaterial}>
				<Cloud
					speed={1}
					segments={40}
					bounds={[10, 2, 2]}
					volume={10}
					color='orange'
				/>
				<Cloud seed={1} scale={2} volume={5} color='hotpink' fade={100} />
			</Clouds>

			<Sky
				distance={450000}
				sunPosition={sunPosition}
				inclination={0}
				azimuth={0.25}
			/>

			{/* Plane */}
			<mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI * 0.5}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial color='#040117' side={THREE.DoubleSide} />
			</mesh>
		</>
	)
}
