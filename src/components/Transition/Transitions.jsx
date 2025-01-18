import React from 'react';
import { motion } from 'framer-motion';

const Transitions = () => {
    const styles = {
        container: {
            position: "absolute",
            top: 0,
            width: "20%",
            height: "100%",
            backgroundColor: "black",
            borderTopLeftRadius: "9vw",
            borderTopRightRadius: "9vw",
        },
    };
    const duration_var = 1.3;
    const left_var = 14.2857142857;
    return (
        <div className='overflow-hidden w-full h-screen absolute top-0 left-0'>
            <motion.div
                style={{ ...styles.container, left: 0 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.05 }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var * 2 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.1 }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var * 3 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.15 }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var * 4 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.2 }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var * 5 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.25 }}
            />
            <motion.div
                style={{ ...styles.container, left: left_var * 6 + "%" }}
                initial={{ transform: "translateY(100vh)" }}
                animate={{ transform: "translateY(-100vh)" }}
                transition={{ duration: duration_var, delay: 0.3 }}
            />
        </div>
    )
}

export default Transitions