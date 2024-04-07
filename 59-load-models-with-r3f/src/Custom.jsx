import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';


const Custom = () => {
    const model = useGLTF('./mech_drone/scene.gltf');
    const animations = useAnimations(model.animations, model.scene);

    useEffect(() => {
       
            const action = animations.actions['Take 001'];
            action.play();
            

    }, []);

    useFrame((state, delta) => {
        model.scene.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5; 
    });

    return (
        <>
            <primitive object={model.scene} rotation={[0,Math.PI ,0]} position={[-2.5, 0, 2.5]} scale={5} />
        </>
    );
};

export default Custom;
