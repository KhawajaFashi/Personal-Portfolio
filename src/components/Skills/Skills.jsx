import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./Skills.css";
import img from "../../assets/Skills_img/javascript.svg";
import SkillsContainer from "./SkillsContainer";
import imageList from "../../utils/Images";


const Skills = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const runnerRef = useRef(null);
    const mouseConstraintRef = useRef(null); // Store mouse constraint
    const [selectedBody, setSelectedBody] = useState(null);
    const [techStack, setTechStack] = useState(null);
    const [ImageCount, setImageCount] = useState(0);

    fetch("http://localhost:5000/api/data")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("There was an error:", error);
        });

    // console.log(imageList);
    const TechStack = {
        name: imageList[ImageCount].name, // Or any other tech name
        logo: imageList[ImageCount].path, // First image path as logo
        expertise: 85, // 0-100% scale
        description:
            "I have been working with JavaScript for over 5 years, building dynamic and interactive web applications. I specialize in front-end frameworks like React and Angular, and I'm comfortable with Node.js for server-side development.",
    };
    useEffect(() => {
        // if (!techStack || !techStack.logo)
        //     return;
        // Create the engine and runner
        engineRef.current = Matter.Engine.create();
        runnerRef.current = Matter.Runner.create();
        const engine = engineRef.current;
        const runner = runnerRef.current;
        const world = engine.world;
        engine.positionIterations = 16; // Default is 6, increases accuracy in positioning
        engine.velocityIterations = 16; // Default is 6, improves how forces are applied
        // engine.constraintIterations = 5;

        // Set up renderer
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: 790,
                height: 560,
                wireframes: false,
            }
        });

        // Create physics bodies
        let imgIndex = 0; // Initialize local counter

        const stack = Matter.Composites.stack(200, 20, 7, 4, 0, 0, (x, y) => {
            const body = Matter.Bodies.circle(x, y, 45, {
                isStatic: false,
                density: 0.1,
                friction: 0.1,
                restitution: 0.2,
                slop: 0,
                render: {
                    sprite: {
                        texture: imageList[imgIndex].path, // Assign image from list
                        xScale: 0.84,
                        yScale: 0.84
                    }
                }
            });

            // Update image index
            imgIndex = (imgIndex + 1) % imageList.length; // Loop through images

            return body;
        });

        Matter.Composite.add(world, stack);


        Matter.Composite.add(world, stack);
        Matter.Composite.add(world, [
            Matter.Bodies.rectangle(400, 580, 800, 50, { isStatic: true }),
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
                console.log("Clicked bodies", clickedBodies[0]);
                if (clickedBodies.length > 0) {
                    setSelectedBody(clickedBodies[0]); // Open menu
                    setImageCount((clickedBodies[0].id - 2) % imageList.length);
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
            Matter.World.clear(world, false);
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
        // console.log("Close menu", mouseConstraintRef.current);
        if (mouseConstraint && mouseConstraint.constraint) {
            mouseConstraint.constraint.body = null; // Detach the body from the mouse
            mouseConstraint.constraint.point = null;
            mouseConstraint.mouse.button = -1;
        }
    };

    return (
        <div className="skills-container pt-28">
            <h2>Skills</h2>
            <div ref={sceneRef} className="matter-container"></div>
            {selectedBody && <SkillsContainer body={selectedBody} onClose={closeMenu} techData={TechStack} />}
        </div>
    );
};

export default Skills;
