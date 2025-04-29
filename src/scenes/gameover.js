import k from "../kaplayCtx";

export default function gameover(citySfx) {
  citySfx.paused = true;

  const finalBack = k.add([
    k.sprite("finalBack"),
    k.pos(0, 0),
  ])
  let bestScore = k.getData("best-score");
  let currentScore = k.getData("current-score");
  const currentMiles = k.getData("current-miles");
  const currentBMI = k.getData("current-bmi");

  const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = "F";
  let bestRank = "F";
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }


  if (currentRank === "F" || currentRank === "E" || currentRank === "D") {
    k.play("boo!", { volume: 0.6});
  } else if (currentRank === "C" || currentRank === "B") {
    k.play("Nice Work!", { volume: 0.6});
  } else if (currentRank === "A" || currentRank === "S" ) {
    k.play("Wow!", { volume: 0.6});
  }

  //Defined above the first if condition so that they exist and are accessible
  const mileInfo = k.add([
    k.text(`Miles Covered: ${currentMiles}`, {
      font: "brokecouch",
      size: 64,
    }),
    k.anchor("center"),
    k.color(54, 69, 79),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  const bmiInfo = k.add([
    k.text("Your BMI is : ", {
      font: "brokecouch",
      size: 64,
    }),
    k.anchor("center"),
    k.color(54, 69, 79),
    k.pos(k.center().x, k.center().y + 200),
  ]);



  //Something is WRONG HERE!
  if (currentBMI === 3) {
    currentScore += 10;
    bmiInfo.text = `Your BMI is : HEALTHY`;
    bmiInfo.color = k.rgb(34, 139, 34);
  } else if (currentBMI === 2) {
    if (currentScore > 0) {
      currentScore -= 10;
    }
    bmiInfo.text = `Your BMI is : FAT`;
    bmiInfo.color = k.rgb(252, 245, 95);
  } else if (currentBMI === 1 ) {
    if (currentScore > 0) {
      currentScore -= 10;
    } else if (currentScore > 10) {
      currentScore -= 20;
    }
    bmiInfo.text = `Your BMI is : OBESE`;
    bmiInfo.color = k.rgb(230, 0, 18);
  }

  if (bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  k.add([
    k.text("GAME OVER", { font: "brokecouch", size: 96 }),
    k.anchor("center"),
    k.color(54, 69, 79),
    k.pos(k.center().x, k.center().y - 400),
  ]);
  k.add([
    k.text(`BEST SCORE : ${bestScore}`, {
      font: "brokecouch",
      size: 64,
    }),
    k.anchor("center"),
    k.color(54, 69, 79),
    k.pos(k.center().x - 400, k.center().y - 300),
  ]);
  k.add([
    k.text(`CURRENT SCORE : ${currentScore}`, {
      font: "brokecouch",
      size: 64,
    }),
    k.anchor("center"),
    k.color(54, 69, 79),
    k.pos(k.center().x + 400, k.center().y - 300),
  ]);

  const bestRankBox = k.add([
    k.rect(200, 200, { radius: 2 }),
    k.color(108, 171, 221),
    k.area(),
    k.anchor("center"),
    k.outline(6, k.Color.fromArray([54, 69, 79])),
    k.pos(k.center().x - 400, k.center().y - 100),
  ]);

  bestRankBox.add([
    k.text(bestRank, { font: "brokecouch", size: 100 }),
    k.anchor("center"),
    k.color(54, 69, 79),
  ]);

  const currentRankBox = k.add([
    k.rect(200, 200, { radius: 2 }),
    k.color(108, 171, 221),
    k.area(),
    k.anchor("center"),
    k.outline(6, k.Color.fromArray([54, 69, 79])),
    k.pos(k.center().x + 400, k.center().y - 100),
  ]);

  currentRankBox.add([
    k.text(currentRank, { font: "brokecouch", size: 100 }),
    k.anchor("center"),
    k.color(54, 69, 79),
  ]);


  k.wait(1, () => {
    k.add([
      k.text("Press Space/Click/Touch to Play Again", {
        font: "brokecouch",
        size: 64,
      }),
      k.anchor("center"),
      k.color(54, 69, 69),
      k.pos(k.center().x, k.center().y + 300),
    ]);
    k.onButtonPress("jump", () => k.go("game"));
  });
}