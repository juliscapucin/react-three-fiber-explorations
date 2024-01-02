import * as THREE from "three"
import React, { forwardRef, useMemo } from "react"
import { Uniform } from "three"
import { Effect } from "postprocessing"
import { useThree, useFrame } from "@react-three/fiber"

const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.x += 0.1 * sin(uv.y * 10.0 + time);
    uv.y += 0.1 * cos(uv.x * 10.0 + time);
    vec3 color = texture2D(texture, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
}
`

// Effect implementation
class MyCustomEffectImpl extends Effect {
	constructor(
		texture,
		{ time = 0, resolution = [window.innerWidth, window.innerHeight] } = {}
	) {
		super("MyCustomEffect", fragmentShader, {
			uniforms: new Map([
				["time", new Uniform(time)],
				["resolution", new Uniform(new THREE.Vector2(...resolution))],
				["texture", new Uniform(texture)],
			]),
		})
	}

	setTime(time) {
		this.uniforms.get("time").value = time
	}
}

type MyCustomEffectProps = {
	texture: THREE.Texture
}

// Effect component
export const CustomPostProcessing = forwardRef(
	({ texture }: MyCustomEffectProps, ref) => {
		const { size } = useThree()
		const effect = useMemo(
			() =>
				new MyCustomEffectImpl(texture, {
					resolution: [size.width, size.height],
				}),
			[texture, size]
		)

		useFrame(({ clock }) => {
			effect.setTime(clock.getElapsedTime())
		})

		return <primitive ref={ref} object={effect} dispose={null} />
	}
)
