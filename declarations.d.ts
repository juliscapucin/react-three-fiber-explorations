declare module "glslify"
declare global {
	namespace JSX {
		interface IntrinsicElements {
			waveShaderMaterial: {
				ref?: React.MutableRefObject<any>
				uTime: number
				uTexture: THREE.Texture
				// Add other uniforms as props here
			}
		}
	}
}
