import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

// Tutorial Original: https://www.youtube.com/watch?v=f4s1h2YETNY
// Tutorial Curtain: https://www.youtube.com/watch?v=12yVUxIkag0

const WaveMaterial = shaderMaterial(
	{
		time: 0,
		resolution: new THREE.Vector2(),
		pointer: new THREE.Vector2(),
		uTexture: new THREE.Texture(),
		uProgress: 0,
	},
	/*glsl*/ `
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
	/*glsl*/ `
      uniform float time;
      uniform float uProgress;
      uniform vec2 resolution;
      uniform vec2 pointer;
      uniform sampler2D uTexture; // Texture uniform
      varying vec2 vUv;      

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      // Original
      // void main() {
      //   vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;      
      //   vec2 uv0 = uv;
      //   vec3 finalColor = vec3(0.0);
      //   uv = fract(uv * 1.5) - 0.5;     
      //   uv = sin(uv * 0.5) - pointer;     
      //   float d = length(uv) * exp(-length(uv0));
      //   vec3 col = palette(length(uv0) + time * 0.4);
      //   d = sin(d * 8.0 + time) / 8.0;
      //   d = abs(d);
      //   d = pow(0.02 / d, 2.0);
      //   finalColor += col * d;
      //   gl_FragColor = vec4(finalColor, 1.0);   
      // }

      // Displacement effect
      void main() {
        vec2 uv = (gl_FragCoord.xy * 0.8 ) / resolution.y;
        // uv = fract(uv * 1.5) - 0.5;     
        // uv = sin(uv * 0.5) - pointer; 

        // Displacement effect
        if(uv.x < 0.15){
          
        } else if(uv.x < 0.4){
          uv.x = uv.x + 0.3 * uProgress;
        } else if(uv.x < 0.6){
          uv.x = uv.x + 0.45 * uProgress;
        } else if(uv.x < 0.8){
          uv.x = uv.x + 0.6 * uProgress;
        } else if(uv.x < 1.0){
          uv.x = uv.x + 0.75 * uProgress;
        } else if(uv.x < 1.2){
          uv.x = uv.x + 0.8 * uProgress;
        } else if(uv.x < 1.4){
          uv.x = uv.x + 0.85 * uProgress;
        } else {
          uv.x = uv.x + 0.9 * uProgress;
        }

        vec2 displacedUV = uv;
        displacedUV = mix(uv, displacedUV, pointer.x); // Mix based on pointer.x for interaction

        vec3 textureColor = texture2D(uTexture, displacedUV).rgb;
        gl_FragColor = vec4(textureColor, 1.0);
      }

      // RGBA
      // void main() {
      //   vec2 p = vUv;
      //   vec4 cr = texture2D(uTexture, p + uProgress * vec2(0.1, 0.0));
      //   vec4 cg = texture2D(uTexture, p);
      //   vec4 cb = texture2D(uTexture, p - uProgress * vec2(0.1, 0.0));
      //   vec4 color = texture2D(uTexture, p);

      //   gl_FragColor = vec4(cr.r, cg.g, cb.b, 1.0);
      // }`
)

extend({ WaveMaterial })

export { WaveMaterial }
