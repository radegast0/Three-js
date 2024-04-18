import {
	Text,
	PresentationControls,
	Float,
	useGLTF,
	Environment,
	ContactShadows,
	Html,
} from '@react-three/drei';

export default function Experience() {
	const computer = useGLTF(
		'https://threejs-journey.com/resources/models/macbook_model.gltf'
	);
	return (
		<>
			<color
				attach="background"
				args={['#241a1a']}
			/>
			<PresentationControls
				global
				rotation={[0.13, 0.1, 0]}
				polar={[-0.4, 0.2]}
				azimuth={[-1, 0.75]}
				config={{ mass: 2, tension: 400 }}
				snap={true}
			>
				<Environment preset="city" />

				<Float rotationIntensity={0.4}>
					<rectAreaLight
						width={2.5}
						height={1.65}
						intensity={65}
						color={'#ff6900'}
						rotation={[0.1, Math.PI, 0]}
						position={[0, 0.55, -1.15]}
					/>
					<primitive
						position-y={-1.2}
						object={computer.scene}
					>
						<Html
							transform
							wrapperClass="htmlScreen"
							distanceFactor={1.17}
							position={[0, 1.56, -1.4]}
							rotation-x={-0.256}
						>
							<iframe src="https://docs.google.com/forms/d/e/1FAIpQLScjKWKeohtRaUrtlzvJwkaIKbXJMPaEfrVtdhFMUt9l3RaZaQ/viewform?embedded=true" width="1280" height="610" frameborder="0" marginheight="0" marginwidth="0">Yükleniyor…</iframe>
						</Html>
					</primitive>
					<Text fontSize={1} position={[2,0.75,0.75]} rotation-y={-1.25} maxWidth={2} textAlign='center' font="./bangers-v20-latin-regular.woff">Fatih Yonucuoglu</Text>
				</Float>
			</PresentationControls>
			<ContactShadows
				position={[0, -1.4, 0]}
				opacity={0.5}
				blur={2.4}
				scale={5}
			/>
		</>
	);
}
