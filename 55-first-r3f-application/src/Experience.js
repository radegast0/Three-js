import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
    const cubeRef = useRef()

    useFrame((state, delta)=>{
        cubeRef.current.rotation.y += delta
    })

	return (
		<>
			<mesh position={[-2, 0, 0]}>
				<sphereGeometry args={[1, 16, 16]} />
				<meshBasicMaterial color="orange" wireframe={false} />
			</mesh>

			<mesh ref={cubeRef} rotation={[0, Math.PI * 0.25, 0]} position={[2, 0, 0]} scale={1.5}>
				<boxGeometry scale={1} />
				<meshBasicMaterial color="mediumpurple" wireframe={false} />
			</mesh>

			<mesh position={[0, -1, 0]} rotation-x={-Math.PI * 0.5} scale={10}>
				<planeGeometry />
				<meshBasicMaterial color="greenyellow" wireframe={false} />
			</mesh>
		</>
	);
}
