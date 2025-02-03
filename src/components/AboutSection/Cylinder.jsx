import { Canvas } from '@react-three/fiber';
import React from 'react';
import Cyl from './Cyl';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const Cylinder = () => {
    return (
        <div className="w-[98.75vw] h-screen bg-black">
            <Canvas flat camera={{ fov: 30, position: [0, 0, 5] }}>
                {/* Orbit controls */}
                {/* <OrbitControls enableZoom={false} enableDamping dampingFactor={0.1} /> */}

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                {/* Cylinder with dynamic rotation */}
                <Cyl/>

                {/* Postprocessing Effects */}
                <EffectComposer>
                    <Bloom
                        mipmapBlur
                        intensity={1.5}
                        luminanceThreshold={0}
                        luminanceSmoothing={0}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Cylinder;
