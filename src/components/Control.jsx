import React, { useState, useEffect, useRef } from 'react';
import Home from './Home/Home';
import About from './AboutSection/About';
import Skills from './Skills/Skills';
import Project from './ProjectSection/Project';
import Contact from './Contact/Contact';

const Control = () => {

    return (
        <div>
            <Home />
            <About />
            <Skills />
            <Project /> {/* Pass ref to Project */}
                <Contact />
        </div>
    );
};

export default Control;
