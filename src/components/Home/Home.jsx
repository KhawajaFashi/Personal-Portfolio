import React from 'react';
import NavBar from './NavBar';
import HeroSection from './HeroSection';
import Meshes from './Meshes';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

const Home = () => {
    return (
        <div className='h-screen w-[98vw]'>
            {/* Navigation Bar */}
            <NavBar />

            {/* Hero Section */}
            <HeroSection />

            {/* 3D Canvas Background */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: -1 }}
            >
                <Canvas  >
                    <OrthographicCamera makeDefault={true} position={[0, 0, 5]} zoom={47}/>
                    <Meshes />
                </Canvas>
            </div>
        </div>
    );
};

export default Home;
