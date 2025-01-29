import React from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const SkillsContainer = ({ body, onClose, techData }) => {
  const { name, logo, expertise, description } = techData;

  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }} // Start with invisible
      animate={{ opacity: 1 }} // Fade in to full opacity
      exit={{ opacity: 0 }} // Fade out when closing
      transition={{ duration: 0.5 }} // Duration of the transition
      onClick={onClose} // Close the menu when clicked on overlay
    >
      <motion.div
        className="menu"
        initial={{ scale: 0.8 }} // Start scaled down
        animate={{ scale: 1 }} // Scale to normal size
        exit={{ scale: 0.8 }} // Scale back down on close
        transition={{ duration: 0.5 }} // Duration of scaling
        onClick={(e) => e.stopPropagation()} // Prevent closing if clicking inside the menu
      >
        <div className="tech-header">
          <img src={logo} alt={name} className="tech-logo" />
          <h2>{name}</h2>
        </div>

        <div className="expertise">
          <h3>Expertise Level</h3>
          <div className="expertise-bar">
            <div className="progress-bar" style={{ width: `${expertise}%` }} />
          </div>
          <span>{expertise}%</span>
        </div>

        <div className="description">
          <h3>About {name}</h3>
          <p>{description}</p>
        </div>

        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SkillsContainer;
