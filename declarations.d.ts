declare module "glslify"
declare global {
	namespace JSX {
		interface IntrinsicElements {
			curtainMaterial: ReactThreeFiber.Object3DNode<
				CurtainMaterial,
				typeof CurtainMaterial
			>
		}
	}
}
