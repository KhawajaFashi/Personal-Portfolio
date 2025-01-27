import React, { forwardRef, useRef } from 'react';
import cylImage from '../../assets/cyl.png'; // Import the image
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Cyl = forwardRef((_, ref) => {
    const tex = useTexture(cylImage);

    // Local ref for the cylinder mesh
    const localRef = useRef();
    const meshRef = ref || localRef; // Support both forwarded and local refs

    useFrame((state, delta) => {
        // Rotate the cylinder
        const { mouse } = state; // Access normalized mouse coordinates
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.3;
            const targetRotationX = -mouse.y * 0.2; // Increase the rotation magnitude

            // Adjust interpolation factor to make it slower and smoother
            const smoothingFactor = 0.04; // Smaller value for smoother and slower rotation
            meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * smoothingFactor;
        }
    });
    tex.repeat.set(1, 1);

    return (
        <group rotation={[0.11, 0, 0]}>
            <mesh ref={meshRef}>
                <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
                <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
});

export default Cyl;
