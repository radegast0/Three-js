import {
	Float,
	Text,
	Html,
	OrbitControls,
	TransformControls,
	PivotControls,
	MeshReflectorMaterial,
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
					<Html
						occlude={[sphere, cube]}
						distanceFactor={6}
						center
						position={[1, 1, 0]}
						wrapperClass="label"
					>
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
				{/* <meshStandardMaterial color="greenyellow" /> */}
				<MeshReflectorMaterial blur={[1000, 1000]} mixBlur={1} mirror={0.5} resolution={512} color='greenyellow' />
			</mesh>
			<Float floatIntensity={2} speed={5}>
				<Text
					color="salmon"
					maxWidth={2}
					textAlign="center"
					position-y={2}
					fontSize={1}
					font="./bangers-v20-latin-regular.woff"
				>
					Send Nudes
				</Text>
			</Float>
		</>
	);
}
