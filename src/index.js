import "./components/DrumsCymbal.js";
import "./components/DrumsHiHat.js";
import "./components/DrumsBase.js";
import "./components/DrumsBass.js";

const INSTRUMENTS = {
  Q: document.querySelector("[type='crash']"),
  W: document.querySelector("[type='floor-tom']"),
  E: document.querySelector("[type='tom1']"),
  R: document.querySelector("[type='kick']"),
  U: document.querySelector("[type='tom2']"),
  I: document.querySelector("[type='snare']"),
  O: document.querySelector("drums-hi-hat"),
  P: document.querySelector("[type='ride']")
};
const keys = Object.keys(INSTRUMENTS);

document.addEventListener("keydown", (ev) => {
  const key = ev.key.toUpperCase();
  keys.includes(key) && INSTRUMENTS[key].hit();

  if (key === "G" || key === "C") { document.body.classList.toggle("cat-mode"); }
});
