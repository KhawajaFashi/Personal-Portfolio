import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectViewer from "./ProjectViewer";
import back from '../../assets/Projects_back.png'

const Project = () => {
    // const { scrollYProgress } = useScroll(); // Tracks vertical scroll progress

    // Scale effect: From 1 to 20 as user scrolls down
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const scale = useTransform(scrollYProgress, [0, 0.3], ["1", "20"]);

    // Opacity effect: Fades out when scrolling
    const opacity = useTransform(scrollYProgress, [0, 0.3], ["1", "0"]);
    const x = useTransform(scrollYProgress, [0.35, 1], ["1%", "-175%"]);
    const backgroundX = useTransform(scrollYProgress, [0.35, 1], ["0%", "200%"]);
    const [showNextContent, setShowNextContent] = useState(false);
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((value) => {
            if (value >= 0.28) {
                setShowNextContent(true);
            } else
                setShowNextContent(false);

        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div ref={targetRef} className="h-[600vh] bg-black relative">
            <div className="sticky h-screen flex top-0 items-center justify-center overflow-hidden">
                {!showNextContent ? (
                    <motion.div
                        className="text-[5em] font-bold text-white sticky"

                        style={{ scale, opacity }} // Animate scale & opacity with scroll
                    >
                        Projects
                    </motion.div>
                ) : (
                    <div className='relative h-[200vh] w-[98.7vw]'>
                        <motion.div
                                className="text-base text-white"
                            style={{
                                x,
                             }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <ProjectViewer />
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Project;
