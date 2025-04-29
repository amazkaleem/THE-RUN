import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function mainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);

  const mainMusic = k.play("mainMusic", { volume: 0.7, loop: true });

  // const bgPieceWidth = 1920;
  const background = k.add([
      k.sprite("mainTitle"), 
      k.pos(0, 0),
    ]);



  k.add([
    k.text("Press Space/Click/Touch to Play", { font: "brokecouch", size: 64 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onButtonPress("jump", () => {
    mainMusic.paused = true;
    k.go("cutscene");
  });

}
