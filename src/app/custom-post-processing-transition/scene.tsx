import * as THREE from "three"
import { useRef, useState } from "react"
import { ReactThreeFiber, extend, useFrame, useThree } from "@react-three/fiber"
import { useTexture, shaderMaterial, useCursor } from "@react-three/drei"

interface ImageFadeMaterialProps {
	disp: THREE.Texture
	tex: THREE.Texture
	tex2: THREE.Texture
	effectFactor: number
	dispFactor: number
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			imageFadeMaterial: ReactThreeFiber.Object3DNode<
				THREE.ShaderMaterial,
				typeof THREE.ShaderMaterial
			> &
				ImageFadeMaterialProps
		}
	}
}

export const ImageFadeMaterial = shaderMaterial(
	{
		effectFactor: 1.2,
		dispFactor: 0,
		tex: new THREE.Texture(),
		tex2: new THREE.Texture(),
		disp: new THREE.Texture(),
	},
	` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
	` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;

    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
		
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
)

extend({ ImageFadeMaterial })

export default function Scene() {
	const { viewport } = useThree()
	const ref = useRef<THREE.ShaderMaterial & { dispFactor?: number }>(null)
	const refBg = useRef<THREE.ShaderMaterial & { dispFactor?: number }>(null)
	const [texture1, texture2, dispTexture] = useTexture([
		"/pixelated@paulina_milde_jachowska-01.avif",
		"/pixelated@paulina_milde_jachowska-02.avif",
		"/displacement/15.jpg",
	])

	const [hovered, setHover] = useState(false)
	useCursor(hovered ? true : false)

	useFrame(() => {
		if (!ref.current || !refBg.current || !ref.current.dispFactor) return
		ref.current.dispFactor = THREE.MathUtils.lerp(
			ref.current.dispFactor,
			hovered ? 1 : 0,
			0.075
		)
		refBg.current.dispFactor = THREE.MathUtils.lerp(
			ref.current.dispFactor,
			hovered ? 1 : 0,
			0.075
		)
	})
	return (
		<>
			<mesh
				scale={[viewport.width, viewport.height, 1]}
				position={[0, 0, 0]}
				onPointerOver={(e) => setHover(true)}
				onPointerOut={(e) => setHover(false)}
			>
				<planeGeometry />
				<imageFadeMaterial
					ref={refBg}
					tex={texture1}
					tex2={texture2}
					disp={dispTexture}
					toneMapped={false}
					dispFactor={0}
					effectFactor={0}
				/>
			</mesh>
			<mesh
				scale={[viewport.width * 0.4, viewport.height * 0.6, 1]}
				position={[0, 0, 0]}
				onPointerOver={(e) => setHover(true)}
				onPointerOut={(e) => setHover(false)}
			>
				<planeGeometry />
				<imageFadeMaterial
					ref={ref}
					tex={texture2}
					tex2={texture1}
					disp={dispTexture}
					toneMapped={false}
					dispFactor={0}
					effectFactor={0}
				/>
			</mesh>
		</>
	)
}
