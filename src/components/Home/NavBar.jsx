import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KF_logo from "../../assets/KF_logo.png";
import { IconContext } from "react-icons";
import { IoFolderOpen } from "react-icons/io5";

const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

    const links = useMemo(() => [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ], []);


    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
        exit: {
            transition: { staggerChildren: 0.1, staggerDirection: -1 },
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

    const handleClick = () => {
        setIsRotated((prev) => !prev);
        setTimeout(() => {
            setShowLinks((prev) => !prev);
        }, 500);
    };

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsRotated(false); // Close menu after scrolling
        }
        setShowLinks(false); // Close menu after clicking
    };

    return (
        <div className="pr-20 pl-8 pt-4 pb-5 h-28 fixed top-0 z-50 w-screen text-white">
            <ul className="flex justify-between items-center">
                {/* Logo */}
                <li>
                    <img src={KF_logo} alt="Logo" style={{ width: "100px" }} />
                </li>

                {/* Name */}
                <li>
                    <span>Khawaja Fashi</span>
                </li>

                {/* Links with Folder Icon */}
                <div className="flex flex-col justify-center items-center z-20">
                    {/* Folder Icon */}
                    <IconContext.Provider value={{ color: "black", size: "2em" }}>
                        <motion.button
                            animate={{ rotate: isRotated ? 180 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-16 border-none bg-transparent"
                            onClick={handleClick}
                        >
                            <IoFolderOpen />
                        </motion.button>
                    </IconContext.Provider>

                    {/* Links */}
                    <li className="flex flex-col justify-center items-center relative">
                        <AnimatePresence>
                            {showLinks && (
                                <motion.div
                                    className="flex flex-col items-center justify-center"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {links.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            className="z-10 bg-black w-24 h-8 p-1 text-center rounded-2xl cursor-pointer"
                                            variants={linkVariants}
                                            style={{ position: "absolute", top: `${index * 40}px` }}
                                            onClick={() => handleScroll(link.id)}
                                        >
                                            {link.name}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default NavBar;
