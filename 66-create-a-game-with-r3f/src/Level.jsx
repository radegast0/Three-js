import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const floor3Material = new THREE.MeshStandardMaterial({ color: 'orangered' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'tomato' });

export const BlockStart = ({ position = [0, 0, 0] }) => {
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				receiveShadow
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				material={floorMaterial}
			/>
		</group>
	);
};

export const BlockEnd = ({ position = [0, 0, 0] }) => {
	const hamburger = useGLTF('./hamburger.glb');

	hamburger.scene.children.forEach((mesh) => {
		mesh.castShadow = true;
	});
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				receiveShadow
				position={[0, 0, 0]}
				scale={[4, 0.2, 4]}
				material={floorMaterial}
			/>
			<RigidBody
				restitution={0.2}
				friction={0}
				colliders="hull"
				type="fixed"
				position={[0, 0.25, 0]}
			>
				<primitive
					object={hamburger.scene}
					scale={0.2}
				/>
			</RigidBody>
		</group>
	);
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
	const [speed] = useState(
		() => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1)
	);
	const obstacle = useRef();

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const rotation = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(0, time * speed, 0)
		);
		obstacle.current.setNextKinematicRotation(rotation);
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				receiveShadow
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				material={floor2Material}
			/>
			<RigidBody
				ref={obstacle}
				friction={0}
				restitution={0.2}
				position={[0, 0.3, 0]}
				type="kinematicPosition"
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[3.5, 0.3, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
};
export const BlockLimbo = ({ position = [0, 0, 0] }) => {
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
	const obstacle = useRef();

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const y = Math.sin(time + timeOffset) + 1.15;
		obstacle.current.setNextKinematicTranslation({
			x: position[0],
			y: y + position[1],
			z: position[2],
		});
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				receiveShadow
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				material={floor2Material}
			/>
			<RigidBody
				ref={obstacle}
				friction={0}
				restitution={0.2}
				position={[0, 0.3, 0]}
				type="kinematicPosition"
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[3.5, 0.3, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
	const obstacle = useRef();

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const x = Math.sin(time + timeOffset) * 1.25;
		obstacle.current.setNextKinematicTranslation({
			x: x + position[0],
			y: position[1] + 0.75,
			z: position[2],
		});
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				receiveShadow
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				material={floor2Material}
			/>
			<RigidBody
				ref={obstacle}
				friction={0}
				restitution={0.2}
				position={[0, 0.3, 0]}
				type="kinematicPosition"
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[1.5, 1.5, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
};

function Bounds({ length = 1 }) {
	return (
		<RigidBody
			type="fixed"
			restitution={0.2}
			friction={0}
		>
			<mesh
				position={[2.15, 0.75, -(length * 2) + 2]}
				geometry={boxGeometry}
				scale={[0.3, 1.5, 4 * length]}
				material={wallMaterial}
				castShadow
			/>
			<mesh
				position={[-2.15, 0.75, -(length * 2) + 2]}
				geometry={boxGeometry}
				scale={[0.3, 1.5, 4 * length]}
				material={wallMaterial}
				receiveShadow
			/>
			<mesh
				position={[0, 0.75, -(length * 4) + 2.15]}
				geometry={boxGeometry}
				scale={[4, 1.5, 0.3]}
				material={wallMaterial}
				receiveShadow
			/>
			<CuboidCollider
				args={[2, 0.1, 2 * length]}
				position={[0, -0.1, -(length * 2) + 2]}
				restitution={0.2}
				friction={1}
			/>
		</RigidBody>
	);
}

const Level = ({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo] }) => {
	const blocks = useMemo(() => {
		const blocks = [];

		for (let i = 0; i < count; i++) {
			const type = types[Math.floor(Math.random() * types.length)];
			blocks.push(type);
		}

		return blocks;
	}, []);

	return (
		<>
			<BlockStart position={[0, 0, 0]} />
			{blocks.map((Block, index) => (
				<Block
					key={index}
					position={[0, 0, -(index + 1) * 4]}
				/>
			))}
			<BlockEnd position={[0, 0, -(count + 1) * 4]} />
			<Bounds length={count + 2} />
		</>
	);
};

export default Level;
