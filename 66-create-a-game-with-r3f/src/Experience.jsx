import Lights from './Lights.jsx';
import Level from './Level.jsx';
import { Physics } from '@react-three/rapier';
import { Player } from './Player.jsx';

export default function Experience() {
	return (
		<>
			<Physics debug={false}>
				<Lights />
				<Level />
				<Player />
			</Physics>
		</>
	);
}
