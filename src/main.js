import k from "./kaplayCtx";
import disclaimer from "./scenes/disclaimer";
import game from "./scenes/game";
import gameover from "./scenes/gameover";
import mainMenu from "./scenes/mainMenu";
import cutscene from "./scenes/cutscene";



k.loadSprite("sceneSonic", "graphics/Still Obese.png");


k.loadSprite("dialogue1", "graphics/Dialogue Box 01.png");
k.loadSprite("dialogue2", "graphics/Dialogue Box 02.png");
k.loadSprite("dialogue3", "graphics/Dialogue Box 03.png");
k.loadSprite("dialogue4", "graphics/Dialogue Box 04.png");
k.loadSprite("dialogue5", "graphics/Dialogue Box 05.png");
k.loadSprite("dialogue6", "graphics/Dialogue Box 06.png");
k.loadSprite("dialogue7", "graphics/Dialogue Box 07.png");
k.loadSprite("dialogue8", "graphics/Dialogue Box 08.png");


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
k.loadSound("sceneMusic", "graphics/goldenGleam.mp3");


k.scene("disclaimer", disclaimer);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("gameover", gameover);
k.scene("cutscene", cutscene);

k.go("disclaimer");