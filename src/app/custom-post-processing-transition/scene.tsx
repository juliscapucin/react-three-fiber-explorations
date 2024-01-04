import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { useTexture, shaderMaterial, useCursor } from "@react-three/drei"

export const ImageFadeMaterial = shaderMaterial(
	{
		effectFactor: 1.2,
		dispFactor: 0,
		tex: undefined,
		tex2: undefined,
		disp: undefined,
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
	const ref = useRef()
	const refBg = useRef()
	const [texture1, texture2, dispTexture] = useTexture([
		"/pixelated-@jontyson.avif",
		"/pixelated@designedbyflores.avif",
		"/displacement/15.jpg",
	])

	const [hovered, setHover] = useState(false)
	useCursor(hovered ? true : false)

	useFrame(() => {
		if (!ref.current || !refBg.current) return
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
				/>
			</mesh>
		</>
	)
}
