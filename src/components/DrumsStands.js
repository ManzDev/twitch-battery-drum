class DrumsStands extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100px;
        height: 225px;
      }

      :host(.short) .base-foot {
        height: 175px;
      }

      :host(.short) .leg {
        height: 65px;
      }

      .container {
        position: relative;
        left: 45%;
      }

      .base-foot {
        width: 8px;
        height: 225px;
        background: #888;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .junction {
        background: #323232;
        width: 12px;
        height: 10px;
      }

      .junction.big {
        width: 20px;
      }

      .legs-container {
        position: absolute;
        width: 100px;
        height: 100px;
        bottom: 0;
      }

      .leg {
        width: 8px;
        height: 85px;
        background: #9E9DA3;
        position: absolute;
        bottom: -3px;
        z-index: -1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
      }

      .leg.left {
        transform: rotate(25deg);
        left: 25px;
      }

      .leg.right {
        transform: rotate(-25deg);
        right: 25px;
      }

      .leg.left .junction {
        transform: rotate(-25deg) translateY(1px);
      }

      .leg.right .junction {
        transform: rotate(25deg) translateY(1px);
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${DrumsStands.styles}</style>
    <div class="container">
      <div class="base-foot">
        <div class="junction"></div>
        <div class="junction"></div>
        <div class="big junction"></div>
        <div class="legs-container">
          <div class="left leg">
            <div class="junction"></div>
          </div>
          <div class="right leg">
            <div class="junction"></div>
          </div>
        </div>
        <div class="big junction"></div>
      </div>
    </div>`;
  }
}

customElements.define("drums-stands", DrumsStands);
