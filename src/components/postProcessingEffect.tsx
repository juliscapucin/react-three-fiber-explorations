import { EffectComposer, DotScreen } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

export default function PostProcessingEffect() {
	return (
		<EffectComposer>
			<DotScreen
				blendFunction={BlendFunction.NORMAL}
				angle={Math.PI * 0.5}
				scale={0.8}
			/>
		</EffectComposer>
	)
}
