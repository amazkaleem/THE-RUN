import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";
import { makeMotobug } from "../entities/motobug";

export default function game() {
  const citySfx = k.play("cuddle", { volume: 0.8, loop: true });
  k.setGravity(3100);
  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(1.5), k.opacity(0.9)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(1.5),
      k.opacity(0.9),
    ]),
  ];

  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 810)]),
    k.add([k.sprite("platforms"), k.pos(1920, 810)]),
  ];


  let sonic = makeSonic(k.vec2(300, 745));
  sonic.setControls();
  sonic.setEvents();

  const controlsText = k.add([
    k.text("Press Space/Click/Touch to Jump!", {
      font: "brokecouch",
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
  let milesCovered;

  // Adding color to the miles text (blue)
  const milesText = k.add([
    k.text(`MILES LEFT : ${miles}`, {
        font: "brokecouch",
        size: 72,
    }),
    k.color(54, 69, 79), // Charcoal color
    k.pos(20, 100),
    k.anchor("topleft"),
    k.area(),
  ]);

  // Adding color to the BMI text (green for "HEALTHY")
  const bmiText = k.add([
    k.text("BMI LEVEL : HEALTHY", {
        font: "brokecouch",
        size: 72,
    }),
    k.color(0, 200, 0), // Green color for "HEALTHY"
    k.pos(20, 20),
    k.anchor("topleft"),
    k.area()
  ]);

  // const newRect = k.add([
  //   k.pos(0, 745),
  //   k.rect(1920, 3),
  // ]);

  let score = 0;
  let scoreMultiplier = 0;
  let knockbackDirection = 1;

  

  sonic.onCollide("enemy", (enemy) => {
    // First check: if sonic is already invincible, skip handling the collision
    if (sonic.isInvincible) return;
    
    // Normal collision logic (when not invincible)
    if (!sonic.isGrounded() && sonic.pos.y < 680) {
      // Your jumping attack code
      console.log(sonic.pos.y);
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
    k.play("eat", { volume: 0.4 });
    console.log("Player ate cheese at: ", sonic.pos.y);
    k.destroy(enemy);
    
    // Make sonic invincible and transparent
    sonic.isInvincible = true;
    sonic.fatCounter -= 1;
    sonic.opacity = 0.5;
    
    if (score > 0) {
      score -= 10;
      // console.log(score);
    }
  
    // Knockback effect
    knockbackDirection = -1;
    // newX = sonic.pos.x + (knockbackDirection * 100);
    sonic.tween(
      sonic.pos.x,
      sonic.pos.x + (knockbackDirection * 100),
      0.75,
      (value) => sonic.pos.x = value
    );
    
    // Reset after animation completes
    k.wait(0.75, () => {
      sonic.jumpForce -= 300;
      sonic.opacity = 1;
      sonic.isInvincible = false;

      k.wait(10, () => {
        sonic.opacity = 0.5;
        sonic.isInvincible = true;
        knockbackDirection = 1;
        sonic.fatCounter += 1;
        sonic.tween(
          sonic.pos.x,
          sonic.pos.x + (knockbackDirection * 100),
          0.75,
          (value) => sonic.pos.x = value
        );
        k.wait(0.75, () => {
          sonic.jumpForce += 300;
          sonic.opacity = 1;
          sonic.isInvincible = false;
        });
      });
    });
    k.setData("current-score", score);
  });


  let gameSpeed = 300;

  k.loop(1, () => {
    gameSpeed += 30;
  });

  // let miles = 31;
  // let milesCovered;

  // Set up a timed event to decrease miles every 10 seconds
  k.loop(10, () => {
    if (miles > 0) {
        miles -= 1;
        milesText.text = `MILES LEFT : ${miles}`;
        milesCovered = 30 - miles;
        k.setData("current-miles", milesCovered);

        if ( milesCovered === 10 || milesCovered === 15 ) {
          citySfx.speed += 0.15;
        } else if (milesCovered === 20) {
          citySfx.speed += 0.2;
        }

        if (milesCovered === 10 || milesCovered === 20 || milesCovered === 30) {
          score += 10;
        }
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
    k.pos(0, 870),
    k.body({ isStatic: true }),
    "platform",
  ]);


// onUpdate() for checking all conditions every frame
k.onUpdate(() => {
  if (sonic.isGrounded()) scoreMultiplier = 0;

  if (miles == 0) k.go("gameover", citySfx);
  
  if (sonic.fatCounter === 2) {
    bmiText.text = `BMI LEVEL: FAT`;
    bmiText.color = k.rgb(252, 245, 95);
    k.setData("current-bmi", sonic.fatCounter);
  } else if (sonic.fatCounter === 1) {
    bmiText.text = `BMI LEVEL: OBESE`;
    bmiText.color = k.rgb(230, 0, 18);
    k.setData("current-bmi", sonic.fatCounter);
  } else if (sonic.fatCounter === 3) {
    bmiText.text = `BMI LEVEL: HEALTHY`;
    bmiText.color = k.rgb(34, 139, 34);
    k.setData("current-bmi", sonic.fatCounter);
  } else if(sonic.fatCounter === 0) {
    k.go("gameover", citySfx);
  }

  
  if (bgPieces[1].pos.x < 0) {
    bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 1.5, 0);
    bgPieces.push(bgPieces.shift());
  }
  
  bgPieces[0].move(-100, 0);
  bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 1.5, 0);

  bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
  bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);
  
  if (platforms[1].pos.x < 0) {
    platforms[0].moveTo(platforms[1].pos.x + platforms[1].width, 810);
    platforms.push(platforms.shift());
  }
  
  platforms[0].move(-gameSpeed, 0);
  platforms[1].moveTo(platforms[0].pos.x + platforms[1].width, 810);

});

}