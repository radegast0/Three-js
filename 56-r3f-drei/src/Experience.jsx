import {
	Html,
	OrbitControls,
	TransformControls,
	PivotControls,
} from '@react-three/drei';
import React, { useRef } from 'react';

export default function Experience() {
	const cube = useRef();
    const sphere = useRef();
	return (
		<>
			<OrbitControls makeDefault />
			<directionalLight position={[1, 2, 3]} intensity={4.5} />
			<ambientLight intensity={1.5} />

			<PivotControls
				scale={2}
				axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
				lineWidth={4}
				depthTest={false}
				anchor={[0, 0, 0]}
			>
				<mesh ref={sphere} position-x={-2}>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
					<Html occlude={[sphere, cube]} distanceFactor={6} center position={[1, 1, 0]} wrapperClass="label">
						That's a sphere 👍
					</Html>
				</mesh>
			</PivotControls>

			<mesh ref={cube} position-x={2} scale={1.5}>
				<boxGeometry />
				<meshStandardMaterial color="mediumpurple" />
			</mesh>
			<TransformControls object={cube} />

			<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshStandardMaterial color="greenyellow" />
			</mesh>
		</>
	);
}
