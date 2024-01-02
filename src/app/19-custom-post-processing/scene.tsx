import * as THREE from "three"
import { useRef, useMemo } from "react"
import { useFrame, createPortal, extend } from "@react-three/fiber"
import { useFBO, PerspectiveCamera, shaderMaterial } from "@react-three/drei"
import glsl from "glslify"

function TextureScene() {
	const mesh = useRef<THREE.Mesh>(null)
	useFrame(() => {
		if (!mesh.current) return

		mesh.current.rotation.x =
			mesh.current.rotation.y =
			mesh.current.rotation.z +=
				0.01
	})
	return (
		<mesh ref={mesh}>
			<boxGeometry />
			<meshNormalMaterial />
		</mesh>
	)
}

const WaveShaderMaterial = shaderMaterial(
	{ uTime: 0, uTexture: new THREE.Texture() },
	glsl`
	  varying vec2 vUv;
	  void main() {
		 vUv = uv;
		 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	  }
	`,
	glsl`
	  precision mediump float;
	  uniform float uTime;
	  uniform sampler2D uTexture;
	  uniform vec3 uColor;
 
	  varying vec2 vUv;
 
	  void main() {
		 vec3 texture = texture2D(uTexture, vUv).rgb;
		 gl_FragColor = vec4(texture, 1.0);
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
	const scene = useMemo(() => {
		const scene = new THREE.Scene()
		scene.background = new THREE.Color()
		return scene
	}, [])

	useFrame((state) => {
		if (!camRef.current) return

		camRef.current.position.z =
			5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
		state.gl.setRenderTarget(target)
		state.gl.render(scene, camRef.current)
		state.gl.setRenderTarget(null)
	})

	return (
		<>
			<PerspectiveCamera ref={camRef} position={[0, 0, 3]} />
			{createPortal(<TextureScene />, scene)}
			<mesh>
				<planeGeometry args={[2, 2]} />
				<waveShaderMaterial ref={shader} uTexture={target.texture} />
			</mesh>
		</>
	)
}

export default Scene
