import * as THREE from "three"
import { useRef, useMemo } from "react"
import { useFrame, createPortal, extend, useThree } from "@react-three/fiber"
import { useFBO, PerspectiveCamera, shaderMaterial } from "@react-three/drei"
import glsl from "glslify"

function TextureScene() {
	const groupRef = useRef<THREE.Group>(null)
	useFrame(() => {
		if (!groupRef.current) return

		groupRef.current.rotation.x =
			groupRef.current.rotation.y =
			groupRef.current.rotation.z +=
				0.01
	})
	return (
		<group ref={groupRef}>
			<mesh>
				<boxGeometry args={[5, 5]} />
				<meshNormalMaterial />
			</mesh>
			<mesh>
				<boxGeometry args={[5, 5]} />
				<meshNormalMaterial />
			</mesh>
			<mesh>
				<boxGeometry args={[5, 5]} />
				<meshNormalMaterial />
			</mesh>
		</group>
	)
}

const WaveShaderMaterial = shaderMaterial(
	// uniforms
	{ uTime: 0, uTexture: new THREE.Texture() },
	// vertex shader
	glsl`
	  varying vec2 vUv;
	  void main() {
		 vUv = uv;
		 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	  }
	`,
	// fragment shader
	glsl`
	  precision mediump float;
	  uniform float uTime;
	  uniform sampler2D uTexture;
	  uniform vec3 uColor;
 
	  varying vec2 vUv;
 
	  void main() {
		vec3 textureColor = texture2D(uTexture, vUv).rgb;
		vec3 color = vec3(vUv, 1.0);
		color = texture2D(uTexture, vUv + vec2(sin(uTime + vUv.x * 15.0) * 0.2, sin(uTime + vUv.y * 15.0) * 0.02)).rgb;
		gl_FragColor = vec4(color, 1.0); // Set the fragment's color
	  }
	`
)

extend({ WaveShaderMaterial })

type SceneProps = {
	multisample?: boolean
	samples: number
	stencilBuffer: boolean
	format: any
}

const Scene = ({ multisample, samples, stencilBuffer, format }: SceneProps) => {
	const target = useFBO({ samples, stencilBuffer, format })
	const camRef = useRef<THREE.PerspectiveCamera | null>(null)
	const shaderRef = useRef(null)

	const { size } = useThree() // Get size from React Three Fiber

	const aspectRatio = size.width / size.height
	const planeHeight = 10 // You can set the plane height
	const planeWidth = planeHeight * aspectRatio // Width based on aspect ratio

	const cameraZPosition = planeHeight / 2 / Math.tan(Math.PI / 8) // Adjust based on FOV (here assumed to be 45 deg)

	const scene = useMemo(() => {
		const scene = new THREE.Scene()
		// scene.background = new THREE.Color()
		return scene
	}, [])

	useFrame((state) => {
		if (!camRef.current || !shaderRef.current) return

		camRef.current.position.z =
			5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
		state.gl.setRenderTarget(target)
		state.gl.render(scene, camRef.current)
		state.gl.setRenderTarget(null)
	})

	useFrame(({ clock }) => {
		if (!shaderRef.current) return
		shaderRef.current.uTime = clock.getElapsedTime()
	})

	return (
		<>
			<PerspectiveCamera ref={camRef} position={[0, 0, 1]} />
			{createPortal(<TextureScene />, scene)}
			<mesh>
				<planeGeometry args={[planeWidth, planeHeight]} />
				<waveShaderMaterial ref={shaderRef} uTexture={target.texture} />
			</mesh>
		</>
	)
}

export default Scene
