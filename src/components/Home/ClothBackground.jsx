import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const ClothBackground = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composites = Matter.Composites,
            Bodies = Matter.Bodies,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer inside the div
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: "transparent",
                wireframes: true,
                wireframeBackground: "gray"
            },
        });

        renderRef.current = render;
        Render.run(render);
        const getZoomLevel = () => {
            return Math.round(window.devicePixelRatio * 100);
        };

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);
        engine.timing.timeScale = 1;
        const updateGridSize = () => {
            const circleRadius = 10;  // Adjust if needed
            const spacing = 10; // Adjust spacing if required

            const circleDiameter = 2 * circleRadius;
            const zoomLevel = getZoomLevel();
            let columns = Math.floor(window.innerWidth / (circleDiameter + spacing)) + 1;
            let rows = Math.floor(window.innerHeight / (circleDiameter + spacing))+1;
            if (zoomLevel <= 100)
                columns += 1;
            if (zoomLevel < 75 || zoomLevel===90)
                rows -= 1;
            return { rows, columns };
        };
        let cloth;
        // Create cloth
        const createCloth = function () {
            if (cloth) Matter.Composite.remove(world, cloth);
            let { rows, columns } = updateGridSize();
            cloth = Composites.stack(0, 0, columns, rows, 10, 10, (x, y) => {
                return Bodies.circle(x, y, 10, {
                    friction: 1.5,
                    restitution: 0.1,
                    render: { visible: false },
                });
            });

            Composites.mesh(cloth, columns, rows, false, {
                stiffness: 1.3,
                render: { type: "line", anchors: false },
            });

            // Pin the top row
            for (let i = 0; i < columns; i++) {
                cloth.bodies[i].isStatic = true;
            }

            for (let j = columns; j < columns * rows; j += columns) {
                cloth.bodies[j].isStatic = true;
                cloth.bodies[j - 1].isStatic = true;
            }

            for (let i = cloth.bodies.length - 1, j = 0; j < columns * 2; j++, i--) {
                cloth.bodies[i].isStatic = true;
            }

            Composite.add(world, cloth);

        }
        createCloth();
        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.98,
                render: { visible: false },
            },
        });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;
        Events.on(mouseConstraint, 'mousemove', function (event) {
            //For Matter.Query.point pass "array of bodies" and "mouse position"
            var foundPhysics = Matter.Query.point(cloth.bodies, event.mouse.position);
            if (foundPhysics[0]) {
                if (foundPhysics[0].isStatic == false)
                    foundPhysics[0].position = { x: foundPhysics[0].position.x + 40, y: foundPhysics[0].position.y + 40 };
            }
            //Your custom code here
            console.log(foundPhysics[0]); //returns a shape corrisponding to the mouse position

        });
        mouse.element.removeEventListener('wheel', mouse.mousewheel);
        // 🔥 Handle Zoom and Resize 🔥
        let zoomLevel = 1;
        const updateCanvasSize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            render.options.width = window.innerWidth;
            render.options.height = window.innerHeight;
            Render.world(render);
            createCloth();
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("wheel", (event) => {
            zoomLevel += event.deltaY * -0.01;
            zoomLevel = Math.max(0.5, Math.min(zoomLevel, 2)); // Restrict zoom level
            updateCanvasSize();
        });

        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Composite.clear(world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    return <div ref={sceneRef} className="absolute top-0 left-0 w-[98.75vw] h-screen bg-transparent overflow-hidden" id="canva" style={{
        mixBlendMode: "color-burn",
        opacity: 0.5
    }}
    />;
};

export default ClothBackground;
