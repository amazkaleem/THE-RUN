import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";
import cutscene from "./scenes/cutscene";

k.loadSprite("sceneSonic", "graphics/Still Obese.png");

const dialogueKeys = [
  "dialogue1",
  "dialogue2",
  "dialogue3",
  "dialogue4",
  "dialogue5",
  "dialogue6",
  "dialogue7",
  "dialogue8",
];

const soundKeys = [
  "sound1",
  "sound2",
  "sound3",
  "sound4",
  "sound5",
  "sound6",
  "sound7",
  "sound8",
];

dialogueKeys.forEach((key, i) => {
  k.loadSprite(key, `graphics/Dialogue Box 0${i + 1}.png`);
});

soundKeys.forEach((key, i) => {
  k.loadSound(key, `sounds/dialogueSounds/dialogueSound0${i + 1}.wav`);
});


k.loadSprite("mainTitle", "graphics/Main Title.png");
k.loadSprite("chemical-bg", "graphics/Cheeseworld.png");
k.loadSprite("finalBack", "graphics/Game Over Back.png");
k.loadSprite("platforms", "graphics/Platform(alt).png");
k.loadSprite("sonic", "graphics/Obese Boy.png", {
  sliceX: 7,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 6, loop: true, speed: 20 },
    jump: { from: 7, to: 7 },
  },
});



k.loadSprite("cheese", "graphics/Flying Cheese.png");
k.loadSprite("Cheesecake", "graphics/Flying Cheese Cake.png");
k.loadSprite("Instructor shocked!", "graphics/Instructor Shocked.png");
k.loadSprite("Instructor angry!", "graphics/Instructor Angry.png");


k.loadFont("mania", "fonts/mania.ttf");
k.loadFont("brokecouch", "fonts/bakso-sapi.ttf");

k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("eat", "sounds/Eating.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("cuddle", "sounds/PixelTown.mp3");
k.loadSound("boo!", "sounds/BOO!.wav");
k.loadSound("Nice Work!", "sounds/NICE WORK!.wav");
k.loadSound("Wow!", "sounds/WOW!.mp3");
k.loadSound("mainMusic", "sounds/The-Happy-Lush.mp3");
k.loadSound("sceneMusic", "sounds/Golden Gleam.mp3");


k.scene("disclaimer", disclaimer);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);
k.scene("cutscene", cutscene);

k.go("disclaimer");