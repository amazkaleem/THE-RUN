import kaplay from "kaplay";

const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0],
  global: false,
  isMute: false,
  buttons: {
    jump: {
      keyboard: ["space"],
      mouse: "left",
    },
    skip:{
      keyboard: ["s"],
    },
    mute:{
      keyboard: ["m"],
    }
  },
  touchToMouse: true,
  debugKey: "d",
  debug: true,
});


k.isMute = false; //isMute is NOT a built-in property of the kaplay() and so initialize it after creating kaplay() object and also within its definition to use it!
export default k;