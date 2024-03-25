import {
	useGLTF,
	OrbitControls,
	useTexture,
	Center,
	Sparkles,
	shaderMaterial,
} from '@react-three/drei';
import portalVertexShader from './shaders/portal/vertex.glsl';
import portalFragmentShader from './shaders/portal/fragment.glsl';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const PortalMaterial = shaderMaterial({
	uTime: 0,
	uColorStart: new THREE.Color('#ffffff'),
	uColorEnd: new THREE.Color('#000000'),
	},
	portalVertexShader,
	portalFragmentShader,
);

extend({ PortalMaterial });

export default function Experience() {
	const { nodes } = useGLTF('./model/portal.glb');
	const bakedTexture = useTexture('./model/baked.jpg');

	const portalMaterial = useRef();
	useFrame((state, delta)=>{
		portalMaterial.current.uTime += delta;
	})

	return (
		<>
			<color
				args={['#030202']}
				attach="background"
			/>

			<OrbitControls makeDefault />

			<Center>
				<mesh geometry={nodes.baked.geometry}>
					<meshBasicMaterial
						map={bakedTexture}
						map-flipY={false}
					/>
				</mesh>
				<mesh
					position={nodes.poleLightA.position}
					geometry={nodes.poleLightA.geometry}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					position={nodes.poleLightB.position}
					geometry={nodes.poleLightB.geometry}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					geometry={nodes.portalLight.geometry}
					rotation={nodes.portalLight.rotation}
					position={nodes.portalLight.position}
				>
					<portalMaterial ref={portalMaterial} />
				</mesh>
				<Sparkles
					size={6}
					scale={[4, 3, 4]}
					position-y={1}
					speed={0.2}
					count={40}
				/>
			</Center>
		</>
	);
}
