import React, { useState, useEffect, useRef } from 'react';
import Home from './Home/Home';
import About from './AboutSection/About';
import Skills from './Skills/Skills';
import Project from './ProjectSection/Project';
import Contact from './Contact/Contact';
import { useScroll, useTransform, motion } from 'framer-motion';

const Control = () => {
const targetRef = useRef(null)
const {scrollProgress}= useScroll(
    {
        target: targetRef,
    }
)
const x=useTransform(scrollProgress, [0,1], ["100","0"]);
    return (
        <div>
            <Home />
            <About />
            <Skills />
            <Project /> {/* Pass ref to Project */}
            
            
         


       
<motion.div ref={targetRef} style={{x}} className='relative bottom-[100vh] -z-10'>

            


                <Contact />
                </motion.div>
        </div>
    );
};

export default Control;
