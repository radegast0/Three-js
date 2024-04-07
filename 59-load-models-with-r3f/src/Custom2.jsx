import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

const Custom2 = () => {
	const model = useGLTF('./mech_drone-v1.glb');
	const animations = useAnimations(model.animations, model.scene);

	useEffect(() => {
		const action = animations.actions['Take 001'];
		action.fadeIn(1.5).play();
	}, []);

    useFrame((state, delta) => {
        model.scene.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5; 
    });

	console.log(model.animations);

	return (
		<>
			<primitive
				scale={5}
				object={model.scene}
			/>
		</>
	);
};

export default Custom2;
