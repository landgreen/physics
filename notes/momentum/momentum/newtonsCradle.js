newtonsCradle();

function newtonsCradle() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        canvas: document.getElementById("newtons-cradle"),
        engine: engine,
        options: {
            wireframes: false,
            width: 590,
            height: 350,
            showVelocity: false,
            background: '#fff'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var cradle = Composites.newtonsCradle(180, 70, 5, 30, 200);
    World.add(world, cradle);
    Body.translate(cradle.bodies[0], {
        x: -180,
        y: -100
    });
    cradle.bodies[0].render.fillStyle = "#49f"
    cradle.bodies[1].render.fillStyle = "#f46"
    cradle.bodies[2].render.fillStyle = "#fa0"
    cradle.bodies[3].render.fillStyle = "#3bb"
    cradle.bodies[4].render.fillStyle = "#a8f"

    for (let i = 0; i < 5; i++) {
        cradle.constraints[i].render.strokeStyle = "#222"
        // cradle.bodies[i].render.fillStyle = randomColor({
        //     luminosity: "light",
        //     hue: "blue"
        // })
        // cradle.bodies[i].render.fillStyle = "#39f"
        // cradle.bodies[i].render.strokeStyle = "#fff"
        // cradle.bodies[i].render.lineWidth = 2
        // cradle.bodies[i].frictionAir = 0
    }
    // console.log(cradle.constraints[0].render.strokeStyle)
    // console.log(cradle.bodies)


    // cradle = Composites.newtonsCradle(280, 380, 7, 20, 140);
    // World.add(world, cradle);
    // Body.translate(cradle.bodies[0], {
    //     x: -140,
    //     y: -100
    // });

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: {
            x: 0,
            y: 0
        },
        max: {
            x: 590,
            y: 350
        }
    });

    document.getElementById("newtons-cradle").style.overflow = "scroll";
};