import React, { useEffect, useRef } from "react";
import Matter from "matter-js";

const ClothBackground = () => {
    const sceneRef = useRef(null);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composite = Matter.Composite,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composites = Matter.Composites,
            Bodies = Matter.Bodies;

        // Create engine
        const engine = Engine.create(),
            world = engine.world;

        // Create renderer inside the div
        const render = Render.create({
            element: sceneRef.current, // Attach to our div
            engine: engine,
            options: {
                width: window.innerWidth - 21,
                height: window.innerHeight,
                background: "transparent", // Make it blend with the page
                wireframes: true,
                wireframeBackground: "gray"
            },
        });

        // ✅ Prevent the canvas from blocking interactions
        // render.canvas.style.pointerEvents = "none"; 
        // render.canvas.style.pointerEvents = "auto";
        // render.canvas.style.touchAction = "none";
        render.canvas.scroll
        Render.run(render);
        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);
        engine.timing.timeScale = 1;

        // Create cloth
        let rows = 26, columns = 58;
        const cloth = Composites.stack(0, 0, columns, rows, 10, 10, (x, y) => {
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

        for (var i = 0; i < columns; i++) {
            cloth.bodies[i].isStatic = true;
        }

        // for (let i = 1; i < rows - 1; i++) {
        // cloth.bodies[i].isStatic = true;
        for (let j = columns; j < columns * rows; j += columns) {
            cloth.bodies[j].isStatic = true;
            cloth.bodies[j - 1].isStatic = true;
            console.log(cloth.bodies[j].isStatic);
        }


        for (let i = cloth.bodies.length - 1, j = 0; j < columns * 2; j++, i--) {
            cloth.bodies[i].isStatic = true;
        }

        Composite.add(world, cloth);

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
        Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
            //For Matter.Query.point pass "array of bodies" and "mouse position"
            var foundPhysics = Matter.Query.point(cloth.bodies, event.mouse.position);
            if (foundPhysics[0]) {
                if (foundPhysics[0].isStatic == false)
                    foundPhysics[0].position = { x: foundPhysics[0].position.x + 50, y: foundPhysics[0].position.y + 50 };
            }
            //Your custom code here
            console.log(foundPhysics[0]); //returns a shape corrisponding to the mouse position

        });
        mouse.element.removeEventListener('wheel', mouse.mousewheel);
        // const allowHover = (event) => {

        // };
        // window.addEventListener("hover", allowHover, { passive: false });
        // Cleanup function to prevent memory leaks
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Composite.clear(world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
            // window.removeEventListener("wheel", allowScrolling);
            // render.textures = {};
        };
    }, []);


    return <div ref={sceneRef} className="absolute top-0 left-0 w-[98vw] h-screen bg-transparent " id="canva" style={{
        mixBlendMode: "color-burn"
    }}
    />;
};

export default ClothBackground;
