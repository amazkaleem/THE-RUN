import k from "../kaplayCtx";

export function makeMotobug(pos) {
  let thisEnemy = Math.round(k.rand(0, 1));

  let enemy;

  if (thisEnemy === 0) {
    enemy = k.add([
      k.sprite("cheese"),
      k.area({ shape: new k.Rect(k.vec2(5, 0), 120, 70) }),
      // k.scale(2),
      k.anchor("center"),
      k.pos(pos),
      k.offscreen(),
      "enemy",
    ]);
  } else {
    enemy = k.add([
      k.sprite("Cheesecake"),
      k.area({ shape: new k.Rect(k.vec2(0, 0), 115, 100) }),
      // k.scale(2),
      k.anchor("center"),
      k.pos(pos),
      k.offscreen(),
      "enemy",
    ]);
  }

  return enemy;
}