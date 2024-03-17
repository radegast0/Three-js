import {
	OrbitControls,
	Text3D,
	Center,
	useMatcapTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
	// const [torusGeometry, setTorusGeometry] = useState();
	// const [material, setMaterial] = useState();

	const donutsGroup = useRef();
	const [matcapTexture] = useMatcapTexture('070B0C_B2C7CE_728FA3_5B748B', 256);

	useEffect(() => {
		matcapTexture.colorSpace = THREE.SRGBColorSpace;
		material.matcap = matcapTexture;
		material.needsUpdate = true;
	}, []);

	useFrame((state, delta) => {
		for (const donut of donutsGroup.current.children) {
			donut.rotation.x += 0.1 * delta;
			donut.rotation.y += 0.1 * delta;
		}
	});

	return (
		<>
			<Perf position="top-left" />
			<OrbitControls makeDefault />
			{/* <torusGeometry ref={setTorusGeometry} /> */}
			{/* <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial} /> */}

			<Center>
				<Text3D
					font="./fonts/helvetiker_regular.typeface.json"
					size={0.75}
					height={0.2}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.02}
					bevelOffset={0.001}
					bevelSegments={5}
					material={material}
				>
					Fatih Yonucuoglu
				</Text3D>
			</Center>

			<group ref={donutsGroup}>
				{[...Array(100)].map((value, index) => (
					<mesh
						geometry={torusGeometry}
						key={index}
						material={material}
						position={[
							(Math.random() - 0.5) * 10,
							(Math.random() - 0.5) * 10,
							(Math.random() - 0.5) * 10,
						]}
						scale={0.2 + Math.random() * 0.2}
						rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
					/>
				))}
			</group>
		</>
	);
}
