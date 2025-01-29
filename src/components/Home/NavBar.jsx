import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KF_logo from "../../assets/KF_logo.png";
import { IconContext } from "react-icons";
import { IoFolderOpen } from "react-icons/io5";

const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const links = [
        { name: "Home" },
        { name: "About" },
        { name: "Skills" },
        { name: "Projects" },
        { name: "Contact" },
    ];

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delay between animations of each child
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.1, // Faster exit animation
                staggerDirection: -1, // Reverse order on exit
            },
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { type: "tween", duration: 0.5, ease: "easeInOut" },
        },
    };

    let handleClick = function () {
        setIsRotated((prev) => !prev);
        let interval = setTimeout(() => {
            setShowLinks((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }

    return (
        <div className="pr-20 pl-8 pt-4 pb-5 h-28 fixed top-0 z-50 w-screen">
            <ul className="flex justify-between items-center">
                {/* Logo */}
                <li>
                    <img
                        src={KF_logo}
                        alt="Logo"
                        style={{
                            width: "100px",
                        }}
                    />
                </li>

                {/* Name */}
                <li>
                    <span>Khawaja Fashi</span>
                </li>

                {/* Links with Folder Icon */}
                <div
                    className="flex flex-col justify-center items-center z-20"
                >
                    {/* Folder Icon */}
                    <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <motion.button
                            id="btn"
                            animate={{
                                rotate: isRotated ? 180 : 0, // Rotate based on state
                            }}
                            transition={{ duration: 0.5 }}
                            className="h-16 border-none"
                            style={{
                                outline: "none",
                                background: "none"
                            }}
                            onClick={handleClick}
                        >
                            <IoFolderOpen />
                        </motion.button>
                    </IconContext.Provider>

                    {/* Links */}
                    <li
                        className="flex flex-col justify-center items-center"
                        style={{
                            position: "relative",
                            visibility: showLinks ? "visible" : "hidden", // Prevent layout shifts
                        }}
                    >
                        <AnimatePresence>
                            {showLinks &&
                                <motion.div
                                    className="flex flex-col items-center justify-center"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    style={{
                                        position: "relative",
                                        visibility: showLinks ? "visible" : "hidden", // Prevent layout shifts
                                    }}
                                >

                                    {links.map((link, index) => (
                                        <motion.a
                                            key={link.name}
                                            className="text-white z-10 bg-black w-24 h-8 p-1 text-center"
                                            variants={linkVariants}
                                            style={{
                                                position: "absolute", // Prevent layout shifting
                                                top: `${index * 40}px`, // Adjust spacing
                                                borderRadius: "40px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </li>
                </div>
            </ul >
        </div >
    );
};

export default NavBar;
