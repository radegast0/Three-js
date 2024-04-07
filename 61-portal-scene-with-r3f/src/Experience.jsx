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

const PortalMaterial = shaderMaterial(
	{
		uTime: 0,
		uColorStart: new THREE.Color('#ffffff'),
		uColorEnd: new THREE.Color('#000000'),
	},
	portalVertexShader,
	portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
	const { nodes } = useGLTF('./model/portal-baked.glb');
	const portalTexture = useTexture('./model/baked-original.jpg');

	const portalMaterial = useRef();
	useFrame((state, delta) => {
		portalMaterial.current.uTime += delta;
	});

	console.log(nodes);

	return (
		<>
			<color
				args={['#030202']}
				attach="background"
			/>

			<OrbitControls makeDefault />
			<Center>
				<mesh
					position={nodes.baked.position}
					rotation={nodes.baked.rotation}
					geometry={nodes.baked.geometry}
				>
					<meshBasicMaterial
						map={portalTexture}
						map-flipY={false}
					/>
				</mesh>
				<mesh
					position={nodes.Cube011.position}
					geometry={nodes.Cube011.geometry}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					position={nodes.Cube014.position}
					geometry={nodes.Cube014.geometry}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					position={nodes.Circle.position}
					geometry={nodes.Circle.geometry}
					rotation={nodes.Circle.rotation}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					geometry={nodes.Circle.geometry}
					rotation={nodes.Circle.rotation}
					position={[
						nodes.Circle.position.x,
						nodes.Circle.position.y,
						nodes.Circle.position.z + 0.01,
					]}
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
