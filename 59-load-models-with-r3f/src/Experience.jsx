import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import Model from './Model';
import Placeholder from './Placeholder';
import Hamburger from './Hamburger';
import Fox from './Fox';

export default function Experience() {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight shadow-normalBias={0.04} castShadow position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<mesh
				receiveShadow
				position-y={-1}
				rotation-x={-Math.PI * 0.5}
				scale={10}
			>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
			<Suspense
				fallback={<Placeholder position={[0, 0.5, 0]} scale={[1.5, 2.5, 1.5]} />}
			>
				<Hamburger scale={0.35} />
			<Fox />
			</Suspense>
		</>
	);
}
