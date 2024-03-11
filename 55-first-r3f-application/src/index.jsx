import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import * as THREE from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));
const cameraSettings = {
	fov: 45,
	position: [3, 2, 6],
	near: 0.1,
	far: 200,
};

root.render(
	<>
		<Canvas
			dpr={[1,2]} // it's default
			gl={{
				antialias: true,
				toneMapping: THREE.ACESFilmicToneMapping,
				outputColorSpace: THREE.SRGBColorSpace,
			}}
			camera={cameraSettings}
		>
			<Experience />
		</Canvas>
	</>
);
