import { useFrame } from '@react-three/fiber';
import {
	Stage,
	Lightformer,
	Environment,
	Sky,
	BakeShadows,
	OrbitControls,
	useHelper,
} from '@react-three/drei';
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Experience() {
	const directionalLight = useRef();
	useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
	const cube = useRef();

	useFrame((state, delta) => {
		cube.current.rotation.y += delta * 0.2;
	});

	const { sunPosition } = useControls('sky', {
		sunPosition: { value: [1, 2, 3] },
	});

	const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
		useControls('envMap', {
			envMapIntensity: { value: 3.5, min: 0, max: 12 },
			envMapHeight: { value: 7, min: 0, max: 100 },
			envMapRadius: { value: 20, min: 10, max: 1000 },
			envMapScale: { value: 100, min: 10, max: 1000 },
		});

	return (
		<>
			{/* <Environment
				// background
				preset="sunset"
				ground={{
					height: envMapHeight,
					radius: envMapRadius,
					scale: envMapScale,
				}}
				resolution={32}
				files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
				files={[
					'./environmentMaps/2/px.jpg',
					'./environmentMaps/2/nx.jpg',
					'./environmentMaps/2/py.jpg',
					'./environmentMaps/2/ny.jpg',
					'./environmentMaps/2/pz.jpg',
					'./environmentMaps/2/nz.jpg',
				]}
			>
				<Lightformer
					position-z={-5}
					scale={10}
					form="ring"
					color="red"
					intensity={10}
				/>
				<color
					args={['black']}
					attach="background"
				/>{' '}
				
				<mesh
					position-z={-5}
					scale={10}
				>
					<planeGeometry />
					<meshBasicMaterial color={[10, 0, 0]} />
				</mesh>{' '}
				
			</Environment>{' '} */}
			
			{/* <BakeShadows /> 
			<Perf position="top-left" /> */}
			<OrbitControls makeDefault />
			 {/* <directionalLight
				ref={directionalLight}
				position={[1, 2, 3]}
				intensity={4.5}
				castShadow={true}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={10}
				shadow-camera-top={5}
				shadow-camera-right={5}
				shadow-camera-bottom={-5}
				shadow-camera-left={-5}
			/>  */}
			{/* <ambientLight intensity={1.5} /> */}
			<Sky />
			{/* <Stage
				shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
				environment="sunset"
				preset="portrait"
				intensity={6}
			> */}
				<mesh
					castShadow
					position={[-2, 1, 0]}
				>
					<sphereGeometry />
					<meshStandardMaterial
						envMapIntensity={envMapIntensity}
						color="orange"
					/>
				</mesh>

				<mesh
					castShadow
					ref={cube}
					position={[2, 1, 0]}
					scale={1.5}
				>
					<boxGeometry />
					<meshStandardMaterial
						envMapIntensity={envMapIntensity}
						color="mediumpurple"
					/>
				</mesh>
			{/* </Stage> */}
			{/* <mesh
				receiveShadow
				position-y={0}
				rotation-x={-Math.PI * 0.5}
				scale={10}
			>
				<planeGeometry />
				<meshStandardMaterial
					envMapIntensity={envMapIntensity}
					color="greenyellow"
				/>
			</mesh> */}
		</>
	);
}
