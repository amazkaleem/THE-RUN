import k from "../kaplayCtx";


export default function cutscene() {

    const sceneBack = k.add([
        k.sprite("finalBack"),
        k.pos(0, 0),
    ]);

    const op1 = k.add([
        k.text("Press Space/Click/Touch to Play Cutscene", { font: "brokecouch", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y -100),
    ]);

    const op2 = k.add([
        k.text("Press S to Skip Cutscene", { font: "brokecouch", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 100),
    ]);

    // Add a full-screen black rectangle with 0 opacity
    const fade = k.add([
        k.rect(k.width(), k.height()),
        k.pos(0, 0),
        k.color(0, 0, 0),
        k.opacity(0),
        { z: 1000 }, // ensure it's on top
    ]);

    let sceneMusic;
    let count = 0;
    let newDialogue;
    let instructor;
    let sonic;

    k.onButtonPress("jump", () => {

        k.destroy(op1);
        k.destroy(op2);

        if (count < 1) {

            sceneMusic = k.play("sceneMusic", { volume: 2, loop: true });

            k.play("sound1", { volume: 0.5 });

            k.shake(20);

            console.log(k.center());
            sonic = k.add([
                k.sprite("sceneSonic"),
                k.pos(k.center().x, k.center().y - 125),
                k.area(),
                k.scale(0.5),
                k.anchor("center"),
            ]);

            instructor = k.add([
                k.sprite("Instructor angry!"),
                k.pos(-30, 850),
                k.offscreen(),
                k.area(),
                k.timer(),
                k.anchor("center"),
            ])

            instructor.tween(
                instructor.pos.x,
                instructor.pos.x + 350,
                0.175,
                (value) => instructor.pos.x = value,
            )

            newDialogue = k.add([
                    k.sprite("dialogue1"),
                    k.pos(1930, 850),
                    k.offscreen(),
                    k.scale(1.25),
                    k.area(),
                    k.timer(),
                    k.anchor("center"),
            ])

            newDialogue.tween(
                newDialogue.pos.x,
                newDialogue.pos.x - 800,
                0.175,
                (value) => newDialogue.pos.x = value,
            );

            count += 1;

        } else {
            newDialogue.destroy();
            newDialogue = null;
            count += 1;
            if (count < 9) {
                newDialogue = k.add([
                    k.sprite(`dialogue${count}`),
                    k.pos(1930, 850),
                    k.offscreen(),
                    k.scale(1.25),
                    k.area(),
                    k.timer(),
                    k.anchor("center"),
                ])
                if (count === 6) {
                    instructor.destroy();
                    instructor = null;
                    instructor = k.add([
                        k.sprite("Instructor shocked!"),
                        k.pos(320, 850),
                        k.area(),
                        k.timer(),
                        k.anchor("center"),
                    ])
                } else if (count > 6) {
                    instructor.destroy();
                    instructor = null;
                    instructor = k.add([
                        k.sprite("Instructor angry!"),
                        k.pos(320, 850),
                        k.area(),
                        k.timer(),
                        k.anchor("center"),
                    ])
                }
                if (newDialogue) {
                    console.log("I am here!");
                    k.play(`sound${count}`);
                    newDialogue.tween(
                        newDialogue.pos.x,
                        newDialogue.pos.x - 800,
                        0.175,
                        (value) => newDialogue.pos.x = value,
                    );
                }
            } else {
                if (newDialogue) {
                    newDialogue.tween(
                        newDialogue.pos.x,
                        newDialogue.pos.x + 800,
                        0.175,
                        (value) => newDialogue.pos.x = value,
                    );
                }
                if (instructor) {
                    instructor.tween(
                        instructor.pos.x,
                        instructor.pos.x - 350,
                        0.175,
                        (value) => instructor.pos.x = value,
                    );
                }
                k.wait(0.2, () => {
                    if (instructor) instructor.destroy();
                    if (newDialogue) newDialogue.destroy();
                    if (sonic) sonic.destroy();
                    sonic = null;
                    sonic = k.add([
                        k.sprite("sonic", {anim : "run"}),
                        k.pos(k.center().x, k.center().y - 125),
                        k.area(),
                        k.timer(),
                        k.scale(2),
                        k.anchor("center"),
                    ]);
                    sonic.tween(
                        sonic.pos.x,
                        sonic.pos.x + 1390,
                        4,
                        (value) => sonic.pos.x = value,
                    )
                    k.wait(4, () => {
                        if (sonic) sonic.destroy();
                        // Tween opacity to 1 (fully black)
                        k.tween(
                            fade.opacity,
                            1,
                            3, // duration in seconds
                            (value) => fade.opacity = value
                        );

                        // Fade out music over 3 seconds
                        function fadeOutMusic(musicObj, duration = 3) {
                            const steps = 30;
                            const interval = duration / steps;
                            let currentStep = 0;
                            const initialVolume = musicObj.volume;

                            function step() {
                                currentStep++;
                                const newVolume = initialVolume * (1 - currentStep / steps);
                                musicObj.volume = Math.max(0, newVolume);
                                if (currentStep < steps) {
                                    k.wait(interval, step);
                                } else {
                                    musicObj.paused = true; // or musicObj.stop();
                                }
                            }
                            step();
                        }
                        // After fade completes, go to the next scene
                        k.wait(3, () => {
                            sceneMusic.paused = true;
                            k.go("game");
                        });
                    });
                });
            }
        }
    });


    k.onButtonPress("skip", () => {
        k.go("game");
    })
}