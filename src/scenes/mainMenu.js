import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function mainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);

  let mCounter = 0;

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

  
  k.add([
    k.text("Press M to turn music OFF/ON", { font: "brokecouch", size: 64 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 350),
  ]);

  k.onButtonPress("jump", () => {
    mainMusic.paused = true;
    k.go("cutscene");
  });

  k.onButtonPress("mute", () => {
    mCounter += 1;
    // console.log("The mute button has been pressed ", mCounter, " amount of times");
    if (mCounter % 2 != 0 ) {
      mainMusic.paused = true;
      k.isMute = true;
      // console.log("The music has been muted!");
      // console.log("The current value of isMute is", k.isMute);
    } else {
      mainMusic.paused = false;
      k.isMute = false;
      // console.log("The music has been unmuted!");
      // console.log("The current value of isMute is", k.isMute);
    }
  } )

}
