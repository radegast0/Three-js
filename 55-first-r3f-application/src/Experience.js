import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CustomObject from './CustomObject';

extend({ OrbitControls });

export default function Experience() {
	// const three = useThree();
	const { camera, gl } = useThree();

	const cubeRef = useRef();
	const groupRef = useRef();

	useFrame((state, delta) => {
		// const angle = state.clock.getElapsedTime();

		// state.camera.position.x = Math.sin(angle) * 8
		// state.camera.position.z = Math.cos(angle) * 8
		// state.camera.lookAt(0, 0, 0)

		cubeRef.current.rotation.y += delta;
	});

	return (
		<>
			<orbitControls args={[camera, gl.domElement]} />
			<ambientLight intensity={0.5} />
			<directionalLight position={[1, 2, 3]} intensity={4.5} />

			<group ref={groupRef}>
				<mesh position={[-2, 0, 0]}>
					<sphereGeometry args={[1, 16, 16]} />
					<meshStandardMaterial color="orange" wireframe={false} />
				</mesh>

				<mesh
					ref={cubeRef}
					rotation={[0, Math.PI * 0.25, 0]}
					position={[2, 0, 0]}
					scale={1.5}
				>
					<boxGeometry scale={1} />
					<meshStandardMaterial color="mediumpurple" wireframe={false} />
				</mesh>
			</group>

			<mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" wireframe={false} />
			</mesh>

			{/* <CustomObject /> */}
		</>
	);
}
