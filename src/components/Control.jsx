import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Home from "./Home/Home";
import About from "./AboutSection/About";
import Skills from "./Skills/Skills";
import Project from "./ProjectSection/Project";
import Contact from "./Contact/Contact";
import NavBar from "./Home/NavBar";

const Control = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const updateMousePos = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePos);
        return () => window.removeEventListener("mousemove", updateMousePos);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            {/* Spotlight Effect */}
            {isDarkMode && (
                <div
                    className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
                    style={{
                        background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.97) 80%)`,
                    }}
                ></div>
            )}

            {/* Navigation Bar */}
            <NavBar />

            {/* Sections with IDs */}
            <div id="home"><Home /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Project /></div>
            <div id="contact"><Contact /></div>

            {/* Light/Dark Mode Toggle Button */}
            <motion.button
                onClick={toggleTheme}
                className="fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded-full shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </motion.button>
        </div>
    );
};

export default Control;
