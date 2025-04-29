import k from "../kaplayCtx";


export default function cutscene() {

    const sceneBack = k.add([
        k.sprite("finalBack"),
        k.pos(0, 0),
    ]);

    // const sceneMusic = k.play("sceneMusic", { volume: 0.8, loop: true });

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

    k.onButtonPress("jump", () => {
        k.loadBean();
        const sonic = k.add([
            k.sprite("sonic"),
            k.pos(k.center()),
            k.area(),
            k.opacity(0),
        ]);

        const bean = k.add([
            k.sprite("bean"),
            k.pos(-30, 900),
            k.offscreen(),
            k.area(),
        ])

        let count = 0;


    });
    
}