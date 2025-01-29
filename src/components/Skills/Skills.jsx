import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./Skills.css";
import img from "../../assets/Skills_img/javascript.svg";
import SkillsContainer from "./SkillsContainer";


const Skills = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const runnerRef = useRef(null);
    const mouseConstraintRef = useRef(null); // Store mouse constraint
    const [selectedBody, setSelectedBody] = useState(null);
    const [techStack, setTechStack] = useState(null);
    const imageFiles = import.meta.glob('./assets/Skills_img/*.svg');

    // Create an array of image paths by dynamically importing them
    const loadImages = async () => {
        const imagePaths = await Promise.all(
            Object.keys(imageFiles).map(key => imageFiles[key]())
        );
        console.log(imageFiles, imagePaths);
        // Assuming you want to set the first image as the logo
        setTechStack({
            name: "JavaScript", // Or any other tech name
            logo: imagePaths[0], // First image path as logo
            expertise: 85, // 0-100% scale
            description:
                "I have been working with JavaScript for over 5 years, building dynamic and interactive web applications. I specialize in front-end frameworks like React and Angular, and I'm comfortable with Node.js for server-side development.",
        });
    };
    loadImages();
    useEffect(() => {
        if (!techStack || !techStack.logo)
            return;
        // Create the engine and runner
        engineRef.current = Matter.Engine.create();
        runnerRef.current = Matter.Runner.create();
        const engine = engineRef.current;
        const runner = runnerRef.current;
        const world = engine.world;

        // Set up renderer
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
            }
        });

        // Create physics bodies
        const stack = Matter.Composites.stack(20, 20, 10, 5, 0, 0, (x, y) =>
            Matter.Bodies.circle(x, y, Matter.Common.random(25, 50), {
                isStatic: false,
                density: 0.01,
                friction: 0.1,
                restitution: 0.8,
                render: {
                    sprite: {
                        texture: techStack.logo,
                        xScale: 2,
                        yScale: 2
                    }
                }
            })
        );

        Matter.Composite.add(world, stack);
        Matter.Composite.add(world, [
            Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

        // Mouse interaction setup
        const mouse = Matter.Mouse.create(render.canvas);
        mouseConstraintRef.current = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Matter.Composite.add(world, mouseConstraintRef.current);

        // Handle mouse down event
        Matter.Events.on(mouseConstraintRef.current, "mousedown", (event) => {
            if (!selectedBody) {
                const mousePosition = event.mouse.position;
                const clickedBodies = Matter.Query.point(stack.bodies, mousePosition);

                if (clickedBodies.length > 0) {
                    setSelectedBody(clickedBodies[0]); // Open menu
                    Matter.Runner.stop(runner); // Pause physics
                }
            }
        });

        // Run physics
        Matter.Render.run(render);
        Matter.Runner.run(runner, engine);

        return () => {
            Matter.Engine.clear(engine);
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        };
    }, []); // Run once on mount

    // Close menu and resume physics
    const closeMenu = () => {
        setSelectedBody(null);
        // Resume physics
        if (runnerRef.current && engineRef.current) {
            Matter.Runner.run(runnerRef.current, engineRef.current);
        }

        // Release the mouse from the selected body (do not nullify the entire constraint)
        const mouseConstraint = mouseConstraintRef.current;
        console.log("Close menu", mouseConstraintRef.current);
        if (mouseConstraint && mouseConstraint.constraint) {
            mouseConstraint.constraint.body = null; // Detach the body from the mouse
            mouseConstraint.constraint.point = null;
            mouseConstraint.mouse.button = -1;
        }
    };

    return (
        <div className="skills-container">
            <h2>Skills</h2>
            <div ref={sceneRef} className="matter-container"></div>
            {selectedBody && <SkillsContainer body={selectedBody} onClose={closeMenu} techData={techStack} />}
        </div>
    );
};

export default Skills;
