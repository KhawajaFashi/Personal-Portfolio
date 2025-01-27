import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KF_logo from "../../assets/KF_logo.jpg";
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

    const linkVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: () => ({
            opacity: 1,
            y: 0,
            transition: { type: "tween", duration: 0.5 },
        }),
        exit: { y: -50, opacity: 0, duration: 0.7 }
    };
    let handleClick = function () {
        setIsRotated((prev) => !prev);
        let interval = setTimeout(() => {
            setShowLinks((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }

    return (
        <div className="p-4 h-8">
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
                        className="flex flex-col justify-center items-center z-20"
                        style={{
                            position: "relative",
                            visibility: showLinks ? "visible" : "hidden", // Prevent layout shifts
                        }}
                    >
                        <AnimatePresence>
                            {showLinks &&
                                links.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        className="pr-4 pl-4 pt-2 pb-4 gap-9 text-black z-10 bg-slate-400"
                                        variants={linkVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        style={{
                                            position: "absolute", // Prevent layout shifting
                                            top: `${index * 50}px`, // Adjust spacing
                                            borderRadius: "7px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                        </AnimatePresence>
                    </li>
                </div>
            </ul >
        </div >
    );
};

export default NavBar;
