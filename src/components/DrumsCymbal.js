import "./DrumsStands.js";

class DrumsCymbal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host([reversed]) {
        transform: scaleX(-1);
      }

      .container {
        position: relative;
        transform: translate(40px, -5px)
      }

      .med-stand {
        background: #888;
        width: 6px;
        height: 150px;
        position: absolute;
        transform:
          translateY(-76px)
          rotate(-50deg)
          translateY(-25px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .junction {
        background: #323232;
        width: 8px;
        height: 20px;
        position: absolute;
        transform:
          translateY(30px);
      }

      .top-end {
        background: #888;
        width: 6px;
        height: 16px;
        align-self: flex-start;
        transform:
          translate(5px, -10px)
          rotate(52deg);
      }

      .ride {
        --rotate: -2deg;

        background: #E7B92F;
        width: 132px;
        height: 32px;
        position: absolute;
        border-radius: 50%;
        top: -91px;
        left: -138px;
        z-index: -1;
        box-shadow: -18px -4px 2px #C9A024 inset;
        transform: rotate(var(--rotate));
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: url("drumstick.png"), auto;
      }

      .inner-gap {
        width: 32px;
        height: 10px;
        border-top: 3px solid #C9A024;
        border-radius: 50%;
      }

      .animated {
        animation: moveRide 1s ease;
      }

      @keyframes moveRide {
        0% { transform: rotate(-8deg); }
        50% { transform: rotate(8deg); }
        100% { transform: rotate(-2deg); }
      }
    `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type") ?? "ride";
    this.sound = new Audio(`sounds/${this.type}.mp3`);
    this.meow = new Audio(`sounds/${this.type}-meow.mp3`);
    this.render();
    this.ride = this.shadowRoot.querySelector(".ride");
    this.ride.addEventListener("click", () => this.hit());
  }

  playSound() {
    const sound = document.body.classList.contains("cat-mode") ? this.meow : this.sound;
    sound.currentTime = 0;
    sound.play();
  }

  hit() {
    this.playSound();
    clearTimeout(this.startTimer);
    clearTimeout(this.endTimer);
    this.ride.classList.remove("animated");
    this.startTimer = setTimeout(() => this.ride.classList.add("animated"), 10);
    this.endTimer = setTimeout(() => this.ride.classList.remove("animated"), 1250);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DrumsCymbal.styles}</style>
    <div class="container">
      <div class="med-stand">
        <div class="junction"></div>
        <div class="top-end"></div>
      </div>
      <div class="ride">
        <div class="inner-gap"></div>
      </div>
    </div>
    <drums-stands></drums-stands>
    `;
  }
}

customElements.define("drums-cymbal", DrumsCymbal);
