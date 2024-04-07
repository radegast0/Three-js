import { Bounds, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Suspense } from 'react';
import Model from './Model';
import Placeholder from './Placeholder';
import Hamburger from './Hamburger';
import Fox from './Fox';
import Custom from './Custom';
import Custom2 from './Custom2';
import Test from './Test';
import SelectToZoom from './SelectToZoom';

export default function Experience() {
	return (
		<>
			<Perf position="top-left" />

			<OrbitControls makeDefault />

			<directionalLight
				shadow-normalBias={0.04}
				castShadow
				position={[1, 2, 3]}
				intensity={4.5}
			/>
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
			<Bounds fit clip observe margin={3} >
				<SelectToZoom>
					<Test
						x={1.5}
						y={1}
						z={1}
					/>
					<Test
						x={-1.5}
						y={1}
						z={-1}
					/>
					<Test
						x={0}
						y={1}
						z={0}
					/>
				</SelectToZoom>
			</Bounds>

			{/* <Suspense
				fallback={<Placeholder position={[0, 0.5, 0]} scale={[1.5, 2.5, 1.5]} />}
			>
				<Hamburger scale={0.35} />
			<Fox />
			
			</Suspense> */}
			{/* <Custom /> */}
			{/* <Custom2 /> */}
		</>
	);
}
