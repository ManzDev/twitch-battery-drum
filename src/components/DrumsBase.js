import "./DrumsStands.js";

class DrumsBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: relative;
      }

      .drums {
        --gradient-drum: linear-gradient(to right, #A01906 20%, #B41D0A 20% 40%, #CA210E 40% 60%, #E52613 60% 80%, #E63911 80% 100%);
        --scale: scaleX(1);
        --y: 0px;
        --x: 0px;
        --rz: 0deg;

        width: 85px;
        cursor: url("drumstick.png"), auto;
        position: absolute;
        left: 5px;
        z-index: 5;
        transform-origin: 50% 100%;
        transform: var(--scale) translate(var(--x), var(--y)) rotateZ(var(--rz));
      }

      .drum-top {
        width: 100%;
        height: 15px;
        border: 5px solid #D3D3D3;
        background: #fff;
        border-radius: 50%;
        transform: translate(-3px, 15px);
      }

      .active {
        background-image: radial-gradient(#0001 7% , #0002 20%,#0001 40% ,#fff 60%);
      }

      .drum-base {
        background: var(--gradient-drum);
        width: 105%;
        height: 36px;
        transform: translate(-1px, 2px);
        position: relative;
        z-index: -1;
      }

      .drum-bottom {
        width: 105%;
        height: 25px;
        border: 5px solid #D3D3D3;
        background: var(--gradient-drum);
        border-radius: 50%;
        position: relative;
        z-index: -2;
        transform: translate(-6px, -15px);
      }

      /* Floor Tom */

      :host([type="floor-tom"]) {
        margin: 0 20px;
      }

      :host([type="floor-tom"]) .drums {
        --scale: scaleX(1.3);
        --y: 25px;
      }

      :host([type="floor-tom"]) .drum-base {
        height: 72px;
      }

      /* Tom1 / Tom2 */

      :host([type="tom1"]),
      :host([type="tom2"]) {
        margin: 0 20px;
      }

      :host([type="tom1"]) .drums {
        --rz: 25deg;
        --x: -15px;
        --y: -35px;
      }

      :host([type="tom2"]) .drums {
        --rz: -25deg;
        --x: 15px;
        --y: -35px;
      }

      .animated {
        animation: move 1s ease;
      }

      @keyframes move {
        0% { transform: var(--scale) translate(var(--x), calc(var(--y) + 2px)) rotateZ(var(--rz)); }
        50% { transform: var(--scale) translate(calc(var(--x)), calc(var(--y) - 2px)) rotateZ(var(--rz)); }
        100% { transform: var(--scale) translate(var(--x), var(--y)) rotateZ(var(--rz)); }
      }
    `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type") ?? "snare";
    this.sound = new Audio(`sounds/${this.type}.mp3`);
    this.meow = new Audio(`sounds/${this.type}-meow.mp3`);
    this.render();
    this.tom = this.shadowRoot.querySelector(".drums");
    this.tom.addEventListener("click", () => this.hit());
  }

  playSound() {
    const sound = document.body.classList.contains("cat-mode") ? this.meow : this.sound;
    sound.currentTime = 0;
    sound.play();
  }

  hit() {
    const drumTop = this.tom.querySelector(".drum-top");
    this.playSound();
    clearTimeout(this.startTimer);
    clearTimeout(this.endTimer);
    this.tom.classList.remove("animated");
    drumTop.classList.remove("active");
    this.startTimer = setTimeout(() => {
      this.tom.classList.add("animated");
      drumTop.classList.add("active");
    }, 10);
    this.endTimer = setTimeout(() => this.tom.classList.remove("animated"), 1250);
    setTimeout(() => drumTop.classList.remove("active"), 250);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DrumsBase.styles}</style>
    <div class="drums">
      <div class="drum-top"></div>
      <div class="drum-base"></div>
      <div class="drum-bottom"></div>
    </div>
    <drums-stands class="short"></drums-stands>`;
  }
}

customElements.define("drums-base", DrumsBase);
