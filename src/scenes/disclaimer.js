import k from "../kaplayCtx";

export default function disclaimer() {
  // console.log("The initial value of isMute before mainMenu is", k.isMute);
  k.add([
    k.text(
      `
        The main title music is thanks to the wonderful work of @Eric Matyas
        Follow 'https://soundimage.org/sample-page/' for more music and SFX
      `,
      { font: "brokecouch", size: 32 }
    ),
  ]);

  k.add([
    k.text("Press Space/Click/Touch to Start The Game", {
      font: "brokecouch",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  k.onButtonPress("jump", () => k.go("main-menu"));
}