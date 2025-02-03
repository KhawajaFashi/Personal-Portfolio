import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import "./Skills.css";
import SkillsContainer from "./SkillsContainer";
import imageList from "../../utils/Images";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const Skills = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const runnerRef = useRef(null);
    const mouseConstraintRef = useRef(null); // Store mouse constraint
    const [selectedBody, setSelectedBody] = useState(null);
    const [loading, setLoading] = useState(false);
    const [TechStack, setTechStack] = useState({
        name: imageList[0].name, // Or any other tech name
        logo: imageList[0].path, // First image path as logo
        expertise: imageList[0].expertise, // 0-100% scale
        description:
            "",
    })
    // const [response, setResponse] = useState("");

    const sendMessage = async (message, ImageCount) => {
        setLoading(true)
        if (!message) {
            console.error("Message is empty before sending!");
            return;
        }

        console.log("Sending message:", message);

        try {
            const response = await axios.post("http://127.0.0.1:5000/", { message }, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Response from backend:", response.data.response);

            setTechStack(() => ({
                name: imageList[ImageCount].name, // Or any other tech name
                logo: imageList[ImageCount].path, // First image path as logo
                expertise: imageList[ImageCount].expertise, // 0-100% scale
                description: response.data.response, // Set new description from backend
            }));
            // TechStack.description = response.data.response;
            setLoading(false)
        } catch (error) {
            console.error("Error sending request:", error);
            TechStack.description = error;
        }
    };

    useEffect(() => {
        // Create the engine and runner
        engineRef.current = Matter.Engine.create();
        runnerRef.current = Matter.Runner.create();
        const engine = engineRef.current;
        const runner = runnerRef.current;
        const world = engine.world;
        engine.positionIterations = 16; // Default is 6, increases accuracy in positioning
        engine.velocityIterations = 16; // Default is 6, improves how forces are applied
        engine.constraintIterations = 10; // Default is 2
        engine.timing.timeScale = 0.7;
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

        const stack = Matter.Composites.stack(200, 20, 7, 2, 0, 0, (x, y) => {
            const body = Matter.Bodies.circle(x, y, 45, {
                isStatic: false,
                density: 0.001,
                friction: 0.1,
                frictionAir: 0.01,
                frictionStatic: 0.5,
                restitution: 0,
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
            Matter.Bodies.rectangle(400, 580, 800, 200, {
                isStatic: true,
                render: {
                    visible: false
                },
            }),
            Matter.Bodies.rectangle(800, 300, 150, 600, {
                isStatic: true,
                render: {
                    visible: false
                },
            }),
            Matter.Bodies.rectangle(0, 300, 150, 600, {
                isStatic: true,
                render: {
                    visible: false
                },
            })
        ]);

        // Mouse interaction setup
        const mouse = Matter.Mouse.create(render.canvas);
        mouseConstraintRef.current = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Matter.Composite.add(world, mouseConstraintRef.current);
        Matter.Events.on(mouseConstraintRef.current, 'mousemove', function (event) {
            //For Matter.Query.point pass "array of bodies" and "mouse position"
            let foundPhysics = Matter.Query.point(stack.bodies, event.mouse.position);
            if (foundPhysics[0]) {
                foundPhysics[0].position = { x: foundPhysics[0].position.x, y: foundPhysics[0].position.y - 2 };
            }
        });
        const element = stack.bodies[0];
        console.log("element: ", element);

        mouse.element.removeEventListener('wheel', mouse.mousewheel);

        // Handle mouse down event
        Matter.Events.on(mouseConstraintRef.current, "mousedown", async (event) => {
            if (!selectedBody) {
                const mousePosition = event.mouse.position;
                const clickedBodies = Matter.Query.point(stack.bodies, mousePosition);
                console.log("Clicked bodies", clickedBodies[0]);
                if (clickedBodies.length > 0) {
                    const message = imageList[(clickedBodies[0].id - 2) % imageList.length].name;
                    await sendMessage(message, (clickedBodies[0].id - 2) % imageList.length);
                    setSelectedBody(clickedBodies[0]); // Open menu
                    console.log("After Send Message: ", TechStack, "\n Response: ");
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
            <h2 className="text-6xl mb-10">Skills</h2>
            <div ref={sceneRef} className="matter-container"></div>
            {loading ? (
                <div className="absolute top-[40%] left-[48%]">
                    <HashLoader
                        color="white"
                        size={100}
                    />
                </div>
            ) : (
                selectedBody && (
                    <SkillsContainer onClose={closeMenu} techData={TechStack} />
                )
            )}
        </div>
    );
};

export default Skills;
