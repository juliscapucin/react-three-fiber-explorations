import { MutableRefObject, useRef, useState } from "react"
import * as THREE from "three"

import { OrbitControls, useHelper } from "@react-three/drei"
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
			<mesh
				castShadow
				position={[1, 1, 1]}
				onClick={(e) => e.stopPropagation}
				onPointerOver={hoverOverHandler}
				onPointerOut={hoverOverHandler}
				onPointerMissed={() => console.log("missed")}
				onWheel={(e) => wheelHandler(e)}
				onPointerUp={(e) => console.log(e)}
				onPointerDown={(e) => console.log(e)}
				scale={boxScale}
			>
				<boxGeometry args={[1, 6]} />
				<meshStandardMaterial
					color={active ? "#ff0000" : "#cccccc"}
					// wireframe={wireframe}
				/>
			</mesh>
			<mesh castShadow position={[5, 1, 1]}>
				<boxGeometry args={[1, 6]} />
				<meshStandardMaterial
					color={active ? "#ff00dd" : "#bbff00"}
					// wireframe={wireframe}
				/>
			</mesh>
			<mesh castShadow onClick={(e) => e.stopPropagation} position={[3, 1, 1]}>
				<boxGeometry args={[3, 6]} />
				<meshStandardMaterial color='blue' />
			</mesh>
			{/* Plane */}
			<mesh
				receiveShadow
				onClick={(e) => e.stopPropagation}
				position={[0, 0, 0]}
				rotation-x={-Math.PI * 0.5}
			>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial color='orange' side={THREE.DoubleSide} />
			</mesh>
			<gridHelper args={[100, 100]} />
		</>
	)
}
