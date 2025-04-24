import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";

export default function game() {
  const citySfx = k.play("city", { volume: 0.2, loop: true });
  k.setGravity(3100);
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];


  const sonic = makeSonic(k.vec2(300, 745));
  sonic.setControls();
  sonic.setEvents();

  const controlsText = k.add([
    k.text("Press Space/Click/Touch to Jump!", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  const dismissControlsAction = k.onButtonPress("jump", () => {
    k.destroy(controlsText);
    dismissControlsAction.cancel();
  });

  let miles = 31;

  // Adding color to the miles text (blue)
  const milesText = k.add([
    k.text(`MILES : ${miles}`, {
        font: "mania",
        size: 72,
    }),
    k.color(0, 100, 255), // Blue color
    k.pos(20, 80),
    k.anchor("topleft"),
  ]);

  // Adding color to the BMI text (green for "HEALTHY")
  const bmiText = k.add([
    k.text("BMI LEVEL : HEALTHY", {
        font: "mania",
        size: 72,
    }),
    k.color(0, 200, 0), // Green color for "HEALTHY"
    k.pos(20, 20),
    k.anchor("topleft"),
  ]);

  let score = 0;
  let scoreMultiplier = 0;
  let knockbackDirection = 1;
  

  sonic.onCollide("enemy", (enemy) => {
    // First check: if sonic is already invincible, skip handling the collision
    if (sonic.isInvincible) return;
    
    // Normal collision logic (when not invincible)
    if (!sonic.isGrounded()) {
      // Your jumping attack code
      k.play("destroy", { volume: 0.5 });
        k.play("hyper-ring", { volume: 0.5 });
        k.destroy(enemy);
        sonic.play("jump");
        sonic.jump();
        scoreMultiplier += 1;
        score += 10 * scoreMultiplier;
        if (scoreMultiplier === 1)
          sonic.ringCollectUI.text = `+${10 * scoreMultiplier}`;
        if (scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;
        k.wait(1, () => {
          sonic.ringCollectUI.text = "";
        });
      return;
    }
    
    // Getting hit logic
    k.play("hurt", { volume: 0.5 });
    k.destroy(enemy);
    
    // Make sonic invincible and transparent
    sonic.isInvincible = true;
    sonic.opacity = 0.5;
    sonic.fatCounter -= 1;
    console.log(sonic.fatCounter);
    
    // Knockback effect
    knockbackDirection = -1;
    sonic.tween(
      sonic.pos.x,
      sonic.pos.x + (knockbackDirection * 100),
      0.75,
      (value) => sonic.pos.x = value
    );
    
    // Reset after animation completes
    k.wait(0.75, () => {
      sonic.opacity = 1;
      sonic.isInvincible = false;
      console.log(sonic.pos.x);
      k.wait(10, () => {
        sonic.opacity = 0.5;
        sonic.isInvincible = true;
        knockbackDirection = 1;
        sonic.fatCounter += 1;
        console.log(sonic.fatCounter);
        sonic.tween(
          sonic.pos.x,
          sonic.pos.x + (knockbackDirection * 100),
          0.75,
          (value) => sonic.pos.x = value
        );
        k.wait(0.75, () => {
          sonic.opacity = 1;
          sonic.isInvincible = false;
          console.log(sonic.pos.x);
        });
      });
    });

  });


  let gameSpeed = 300;

  k.loop(1, () => {
    gameSpeed += 40;
  });

  // Set up a timed event to decrease miles every 10 seconds
  k.loop(10, () => {
    if (miles > 0) {
        miles -= 1;
        milesText.text = `MILES : ${miles}`;
    }
  });

  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1950, 773));
    motobug.onUpdate(() => {
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(0.5, 2.5);

    k.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug();

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 832),
    k.body({ isStatic: true }),
    "platform",
  ]);


// onUpdate() for checking all conditions every frame
k.onUpdate(() => {
  if (sonic.isGrounded()) scoreMultiplier = 0;
  
  if (sonic.fatCounter === 2) {
    bmiText.text = `BMI LEVEL: FAT`
    bmiText.color = k.rgb(255, 255, 0);
  } else if (sonic.fatCounter === 1) {
    bmiText.text = `BMI LEVEL: OBESE`
    bmiText.color = k.rgb(255, 0, 0);
  } else if (sonic.fatCounter == 0) {
    k.go("gameover", citySfx);
  }
  
  if (bgPieces[1].pos.x < 0) {
    bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
    bgPieces.push(bgPieces.shift());
  }
  
  bgPieces[0].move(-100, 0);
  bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);
  
  // for jump effect
  bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
  bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);
  
  if (platforms[1].pos.x < 0) {
    platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
    platforms.push(platforms.shift());
  }
  
  platforms[0].move(-gameSpeed, 0);
  platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);

});

}