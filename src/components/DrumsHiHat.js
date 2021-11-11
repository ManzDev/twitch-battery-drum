import "./DrumsStands.js";

class DrumsHiHat extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .cymbals  {
        position: absolute;
        cursor: url("drumstick.png"), auto;
      }

      .cymbal {
        width: 100px;
        height: 25px;
        background: #E7B92F;
        position: relative;
        z-index: 5;
      }

      .cymbal.top {
        border-radius: 50% 50% 0% 0% / 100% 100% 0% 0%;
        clip-path: polygon(0 100%, 50% 50%, 100% 100%);
        border-bottom: 1px solid #D6A52E;
        transform: translateY(-3px)
      }

      .cymbal.bottom {
        border-top: 1px solid #D6A52E;
        border-radius: 0% 0% 50% 50% / 0% 0% 100% 100%;
        clip-path: polygon(0 0, 50% 50%, 100% 0%);
      }

      .cymbals.animated .cymbal.top {
        animation: moveCymbal 0.25s ease;
      }

      @keyframes moveCymbal {
        0%, 100% { transform: translateY(-3px); }
        50% { transform: translateY(0px); }
      }
    `;
  }

  connectedCallback() {
    this.type = "hihat";
    this.sound = new Audio(`sounds/${this.type}.mp3`);
    this.meow = new Audio(`sounds/${this.type}-meow.mp3`);
    this.render();
    this.cymbals = this.shadowRoot.querySelector(".cymbals");
    this.cymbals.addEventListener("click", () => this.hit());
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
    this.cymbals.classList.remove("animated");
    this.startTimer = setTimeout(() => this.cymbals.classList.add("animated"), 10);
    this.endTimer = setTimeout(() => this.cymbals.classList.remove("animated"), 1250);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DrumsHiHat.styles}</style>
    <div class="cymbals">
      <div class="cymbal top"></div>
      <div class="cymbal bottom"></div>
    </div>
    <drums-stands></drums-stands>
    `;
  }
}

customElements.define("drums-hi-hat", DrumsHiHat);
