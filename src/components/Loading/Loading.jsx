import React, { useEffect, useState } from 'react';
import AnimatedSignature from './AnimatedSignature';
import LoadingBar from './LoadingBar';
import { AnimatePresence, motion } from 'framer-motion';
import Transitions from '../Transition/Transitions';

const Loading = () => {
    const [backgroundTransitionDone, setBackgroundTransitionDone] = useState(false);
    const [showTransitions, setShowTransitions] = useState(false);
    const [showContent, setShowContent] = useState(true);
    // This effect will trigger when the background animation is complete
    useEffect(() => {
        const timer = setTimeout(() => {
            setBackgroundTransitionDone(true); // Set state to show content after the background is done
        }, 850); // Matches the background transition time
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTransitions(true); // Set the flag to show Transitions after 10 seconds
            console.log("In setTimeout");
            setShowContent(false);
        }, 6000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <motion.div
            style={styles.wrapper}>
            {(() => {
                if (!backgroundTransitionDone) {
                    return (
                        <motion.div
                            className='absolute top-0 left-0 w-full h-full bg-black'
                            animate={{
                                width: "0%",
                            }}
                            transition={{ type: "tween", duration: 0.85 }}
                        >
                        </motion.div>
                    );
                }
                return (
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                className="Content"
                                exit={{
                                    opacity: 0,
                                    // transform: "translateY(-100vh)",
                                    transition: { type: "spring", duration: 0.5 },
                                }}
                                style={styles.content}
                            >
                                <AnimatedSignature />
                                <LoadingBar />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )
            })()}
            {showTransitions && <Transitions />}
        </motion.div>
    );
};

const styles = {
    wrapper: {
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
    },

    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        top: "22%",
        textAlign: "center",
    },

};
export default Loading;
