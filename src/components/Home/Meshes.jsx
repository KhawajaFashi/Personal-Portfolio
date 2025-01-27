import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const Meshes = () => {
    const { scene, camera } = useThree();
    // const meshRef1 = useRef(!null);
    // const meshRef2 = useRef(!null);

    useEffect(() => {
        // Add specific objects to layer 1
        scene.children.forEach((object) => {
            if (object.isMesh) {
                object.layers.set(1); // Assign this object to layer 1
            }
        });
        camera.layers.enable(1); // Enable rendering of layer 1

        // Optional: Log the mesh details to debug any issues

    }, [scene, camera]);
    // useFrame(() => {
    //     meshRef1.current.rotation.x += 0.0025;
    //     meshRef1.current.rotation.y += 0.0015;
    //     meshRef2.current.rotation.x += 0.005;
    //     meshRef2.current.rotation.y += 0.001;
    // });

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls />

            {/* First Octahedron */}
            <group rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                <mesh>
                    <octahedronGeometry args={[2.35, 1]} />
                    <meshStandardMaterial color="red" wireframe side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* Second Octahedron wrapped in a group for positioning */}
            <group position={[5.1, -2, -1]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                <mesh>
                    <octahedronGeometry args={[2, 1]} />
                    <meshStandardMaterial color="red" wireframe side={THREE.DoubleSide} />
                </mesh>
            </group>
        </>
    );
};

export default Meshes;