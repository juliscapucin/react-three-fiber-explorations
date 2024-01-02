"use client"

// tutorial in this article: https://dev.to/eriksachse/create-your-own-post-processing-shader-with-react-three-fiber-usefbo-and-dreis-shadermaterial-with-ease-1i6d

import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import Scene from "./scene"

const page = () => {
	return (
		<section className='h-full bg-colorBlack overflow-clip'>
			<div className='h-full transition-transform duration-[2s]'>
				<Canvas
					camera={{ fov: 75, near: 0.01, far: 1000, position: [0, 0, 5] }}
					gl={{ alpha: true }}
					dpr={[1, 1.5]}
				>
					<Scene
						// multisample={true} // not working
						samples={8}
						stencilBuffer={false}
						format={THREE.RGBAFormat}
					/>
				</Canvas>
			</div>
		</section>
	)
}

export default page
