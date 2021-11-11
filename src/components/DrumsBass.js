class DrumsBass extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: relative;
        transform: translate(0, 40px);
      }

      .drum {
        cursor: url("drumstick.png"), auto;
        width: 160px;
        height: 160px;
        background: #E5E5E5;
        border-radius: 50%;
        border: 8px solid #B7B5B6;
        box-shadow:
          20px -20px 10px #CECCCD inset,
          10px -10px 0 2px #CA210E;
      }

      .drum::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-image: url("avocado.svg");
        background-size: 105px;
        background-repeat: no-repeat;
        background-position: center;
        opacity: 0.75;
      }

      .animated {
        animation: move 1s ease;
      }

      @keyframes move {
        0% { transform: translateX(4px) }
        50% { transform: translateX(-4px) }
        100% { transform: translateX(0) }
      }
    `;
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
    this.drum.classList.remove("animated");
    this.startTimer = setTimeout(() => this.drum.classList.add("animated"), 10);
    this.endTimer = setTimeout(() => this.drum.classList.remove("animated"), 1250);
  }

  connectedCallback() {
    this.type = this.getAttribute("type") ?? "kick";
    this.sound = new Audio(`sounds/${this.type}.mp3`);
    this.meow = new Audio(`sounds/${this.type}-meow.mp3`);
    this.render();
    this.drum = this.shadowRoot.querySelector(".drum");
    this.drum.addEventListener("click", () => this.hit());
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DrumsBass.styles}</style>
    <div class="drum"></div>
    `;
  }
}

customElements.define("drums-bass", DrumsBass);
