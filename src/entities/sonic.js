import k from "../kaplayCtx";


export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(2),
    k.area({
      shape: new k.Rect(k.vec2(2, 10), 80, 100)
    }),
    k.anchor("center"),
    k.pos(pos),
    k.timer(),
    k.body({ jumpForce: 1600 }),
    {
      fatCounter: 3,
      isInvincible: false,
      ringCollectUI: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  sonic.ringCollectUI = sonic.add([
    k.text("", { font: "mania", size: 40 }),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -5),
  ]);

  return sonic;
}