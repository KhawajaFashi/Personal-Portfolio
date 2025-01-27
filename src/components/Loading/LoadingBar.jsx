import React, { useState, useEffect } from "react";

const LoadingBar = () => {
    const [progress, setProgress] = useState(0); // Start at 60%

    useEffect(() => {
        const jumpIntervals = [
            { delay: 2000, increment: 60 }, // First jump after 2 seconds, increment by 10%
            { delay: 1500, increment: 10 }, // Jump after 3 seconds (to make it feel real), increment by 30%
            { delay: 1000, increment: 30 }, // Final jump after 1 second, increment by 60%
        ];

        let currentProgress = 0;

        // Run jumps with dynamic intervals
        const runJump = (index) => {
            if (index >= jumpIntervals.length || currentProgress >= 100) return;

            const { delay, increment } = jumpIntervals[index];

            // Wait for the delay and then update progress
            setTimeout(() => {
                currentProgress += increment; // Increase progress by the increment
                if (currentProgress >= 100) {
                    currentProgress = 100;
                }
                setProgress(currentProgress); // Update the state
                runJump(index + 1); // Move to the next jump
            }, delay);
        };

        // Start the jumping process
        runJump(0);

        return () => clearTimeout(runJump);
    }, []);

    return (
        <div style={styles.container}>
            <p style={styles.HeadingText}>Journey is Starting </p>
            <div style={styles.progressBar}>
                <div style={{ ...styles.progress, width: `${progress}%` }} />
            </div>
        </div>
        // <>
        //     {/* Sketchfab Embed */}
        //     <div className="sketchfab-embed-wrapper" style={styles.iframeContainer}>
        //         <iframe
        //             title="GOKU SS ABSOLUTE"
        //             src="https://sketchfab.com/models/a10d82b854154981ae1d2f6acfdc948d/embed?autostart=1&preload=1&ui_theme=dark"
        //             allow="autoplay; fullscreen; xr-spatial-tracking"
        //             allowFullScreen
        //             style={styles.iframe}
        //         />
        //         <p style={styles.sketchfabText}>
        //             <a
        //                 href="https://sketchfab.com/3d-models/goku-ss-absolute-a10d82b854154981ae1d2f6acfdc948d?utm_medium=embed&utm_campaign=share-popup&utm_content=a10d82b854154981ae1d2f6acfdc948d"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 style={styles.sketchfabLink}
        //             >
        //                 GOKU SS ABSOLUTE
        //             </a>{" "}
        //             by{" "}
        //             <a
        //                 href="https://sketchfab.com/artaru0660?utm_medium=embed&utm_campaign=share-popup&utm_content=a10d82b854154981ae1d2f6acfdc948d"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 style={styles.sketchfabLink}
        //             >
        //                 AKIN
        //             </a>{" "}
        //             on{" "}
        //             <a
        //                 href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=a10d82b854154981ae1d2f6acfdc948d"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //                 style={styles.sketchfabLink}
        //             >
        //                 Sketchfab
        //             </a>
        //         </p>
        //     </div>
        // </>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "3.5em auto 1em auto",
    },
    progressBar: {
        width: "26em",
        height: "3px",
        backgroundColor: "#ddd",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "1em auto 1em auto",
    },
    progress: {
        height: "100%",
        backgroundColor: "#000",
        borderRadius: "10px 0 0 10px",
        transition: "width 0.3s ease-out", // Smooth transition
    },
    HeadingText: {
        fontSize: "16px",
        color: "#333",
        marginTop: "10px",
    },
};

export default LoadingBar;
