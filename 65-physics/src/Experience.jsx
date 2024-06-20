import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
	BallCollider,
	CuboidCollider,
	CylinderCollider,
	InstancedRigidBodies,
	Physics,
	RigidBody,
} from '@react-three/rapier';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Experience() {
	const [hitSound] = useState(() => {
		return new Audio('/hit.mp3');
	});

	console.log(hitSound);
	const cube = useRef();
	const twister = useRef();
	const cubeJump = () => {
		const mass = cube.current.mass();
		console.log(mass);
		cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
		cube.current.applyTorqueImpulse({
			x: Math.random() - 0.5,
			y: Math.random() - 0.5,
			z: Math.random() - 0.5,
		});
		console.log(cube.current);
		console.log('jump');
	};
	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		const eulerRotation = new THREE.Euler(0, time * 3, 0);
		const quaternionRotation = new THREE.Quaternion();
		quaternionRotation.setFromEuler(eulerRotation);

		twister.current.setNextKinematicRotation(quaternionRotation);

		const angle = time * 0.5;
		const x = Math.cos(angle) * 2;
		const z = Math.sin(angle) * 2;

		twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
	});
	const colisionEnter = () => {
		// hitSound.currentTime = 0;
		// hitSound.volume = Math.random();
		// hitSound.play();
	};
	const hamburger = useGLTF('/hamburger.glb');
	// const cubes = useRef();

	const cubesCount = 30;
	const instances = useMemo(() => {
		const instances = [];
		for (let i = 0; i < cubesCount; i++) {
			instances.push({
				key: 'cubesInstances_' + i,
				position: [
					(Math.random() - 0.5) * 8,
					6 + i * 0.2,
					(Math.random() - 0.5) * 8,
				],
				rotation: [Math.random(), Math.random(), Math.random()],
			});
		}

		return instances;
	}, []);

	// useEffect(() => {
	// 	for (let i = 0; i < cubesCount; i++) {
	// 		const matrix = new THREE.Matrix4();
	// 		matrix.compose(
	// 			new THREE.Vector3(i * 2, 0, 0),
	// 			new THREE.Quaternion(),
	// 			new THREE.Vector3(1, 1, 1)
	// 		);
	// 		cubes.current.setMatrixAt(i, matrix);
	// 	}
	// }, []);
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight
				castShadow
				position={[1, 2, 3]}
				intensity={4.5}
			/>
			<ambientLight intensity={1.5} />

			<Physics
				// debug
				gravity={[0, -9.08, 0]}
			>
				<RigidBody colliders="ball">
					<mesh
						castShadow
						position={[-1.5, 2, 0]}
					>
						<sphereGeometry />
						<meshStandardMaterial color="orange" />
					</mesh>
				</RigidBody>

				<RigidBody
					friction={0.7}
					restitution={0}
					gravityScale={1}
					ref={cube}
					position={[1.5, 2, 0]}
					colliders={false}
					onCollisionEnter={colisionEnter}
					onCollisionExit={() => {
						console.log('exit');
					}}
					onSleep={() => {
						console.log('sleep');
					}}
					onWake={() => {
						console.log('wake');
					}}
				>
					<mesh
						onClick={cubeJump}
						castShadow
					>
						<boxGeometry />
						<meshStandardMaterial color="mediumpurple" />
					</mesh>
					<CuboidCollider
						mass={5}
						args={[0.5, 0.5, 0.5]}
					/>
				</RigidBody>

				<RigidBody
					friction={0.7}
					type="fixed"
				>
					<mesh
						receiveShadow
						position-y={-1.25}
					>
						<boxGeometry args={[10, 0.5, 10]} />
						<meshStandardMaterial color="greenyellow" />
					</mesh>
				</RigidBody>
				<RigidBody
					ref={twister}
					type="kinematicPosition"
					friction={0}
					position={[0, -0.8, 0]}
				>
					<mesh
						castShadow
						scale={[0.4, 0.4, 3]}
					>
						<boxGeometry />
						<meshStandardMaterial color="red" />
					</mesh>
				</RigidBody>
				<RigidBody
					// colliders={'hull'}
					position={[0, 4, 0]}
				>
					<primitive
						object={hamburger.scene}
						scale={[0.25, 0.25, 0.25]}
					/>
					<CylinderCollider args={[0.5, 1.25]} />
				</RigidBody>
				<RigidBody type="fixed">
					<CuboidCollider
						args={[5, 2, 0.5]}
						position={[0, 1, 5.5]}
					/>
					<CuboidCollider
						args={[5, 2, 0.5]}
						position={[0, 1, -5.5]}
					/>
					<CuboidCollider
						args={[0.5, 2, 5]}
						position={[5.5, 1, 0]}
					/>
					<CuboidCollider
						args={[0.5, 2, 5]}
						position={[-5.5, 1, 0]}
					/>
				</RigidBody>
				<InstancedRigidBodies instances={instances}>
					<instancedMesh
						castShadow
						// ref={cubes}
						args={[null, null, cubesCount]}
					>
						<boxGeometry />
						<meshStandardMaterial color="tomato" />
					</instancedMesh>
				</InstancedRigidBodies>
			</Physics>
		</>
	);
}
