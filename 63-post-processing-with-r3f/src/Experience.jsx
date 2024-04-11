import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { DepthOfField ,Bloom, EffectComposer, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'

export default function Experience()
{
    return <>
    
        <color attach="background" args={ ['white'] } />

        <EffectComposer disableNormalPass >
            {/* <Vignette offset={0.3} darkness={0.9} /> */}
            {/* <ToneMapping /> */}
            {/* <Noise premultiply /> */}
            {/* <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.5} /> */}
            {/* <DepthOfField focusDistance={0.025} focusLength={0.025} bokehScale={6} /> */}
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple'  />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}