const h=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function u(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=u(e);fetch(e.href,s)}};h();class o extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
    <style>${o.styles}</style>
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
    </div>`}}customElements.define("drums-stands",o);class r extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){var t;this.type=(t=this.getAttribute("type"))!=null?t:"ride",this.sound=new Audio(`sounds/${this.type}.mp3`),this.meow=new Audio(`sounds/${this.type}-meow.mp3`),this.render(),this.ride=this.shadowRoot.querySelector(".ride"),this.ride.addEventListener("click",()=>this.hit())}playSound(){const t=document.body.classList.contains("cat-mode")?this.meow:this.sound;t.currentTime=0,t.play()}hit(){this.playSound(),clearTimeout(this.startTimer),clearTimeout(this.endTimer),this.ride.classList.remove("animated"),this.startTimer=setTimeout(()=>this.ride.classList.add("animated"),10),this.endTimer=setTimeout(()=>this.ride.classList.remove("animated"),1250)}render(){this.shadowRoot.innerHTML=`
    <style>${r.styles}</style>
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
    `}}customElements.define("drums-cymbal",r);class a extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.type="hihat",this.sound=new Audio(`sounds/${this.type}.mp3`),this.meow=new Audio(`sounds/${this.type}-meow.mp3`),this.render(),this.cymbals=this.shadowRoot.querySelector(".cymbals"),this.cymbals.addEventListener("click",()=>this.hit())}playSound(){const t=document.body.classList.contains("cat-mode")?this.meow:this.sound;t.currentTime=0,t.play()}hit(){this.playSound(),clearTimeout(this.startTimer),clearTimeout(this.endTimer),this.cymbals.classList.remove("animated"),this.startTimer=setTimeout(()=>this.cymbals.classList.add("animated"),10),this.endTimer=setTimeout(()=>this.cymbals.classList.remove("animated"),1250)}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="cymbals">
      <div class="cymbal top"></div>
      <div class="cymbal bottom"></div>
    </div>
    <drums-stands></drums-stands>
    `}}customElements.define("drums-hi-hat",a);class n extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){var t;this.type=(t=this.getAttribute("type"))!=null?t:"snare",this.sound=new Audio(`sounds/${this.type}.mp3`),this.meow=new Audio(`sounds/${this.type}-meow.mp3`),this.render(),this.tom=this.shadowRoot.querySelector(".drums"),this.tom.addEventListener("click",()=>this.hit())}playSound(){const t=document.body.classList.contains("cat-mode")?this.meow:this.sound;t.currentTime=0,t.play()}hit(){const t=this.tom.querySelector(".drum-top");this.playSound(),clearTimeout(this.startTimer),clearTimeout(this.endTimer),this.tom.classList.remove("animated"),t.classList.remove("active"),this.startTimer=setTimeout(()=>{this.tom.classList.add("animated"),t.classList.add("active")},10),this.endTimer=setTimeout(()=>this.tom.classList.remove("animated"),1250),setTimeout(()=>t.classList.remove("active"),250)}render(){this.shadowRoot.innerHTML=`
    <style>${n.styles}</style>
    <div class="drums">
      <div class="drum-top"></div>
      <div class="drum-base"></div>
      <div class="drum-bottom"></div>
    </div>
    <drums-stands class="short"></drums-stands>`}}customElements.define("drums-base",n);class d extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}playSound(){const t=document.body.classList.contains("cat-mode")?this.meow:this.sound;t.currentTime=0,t.play()}hit(){this.playSound(),clearTimeout(this.startTimer),clearTimeout(this.endTimer),this.drum.classList.remove("animated"),this.startTimer=setTimeout(()=>this.drum.classList.add("animated"),10),this.endTimer=setTimeout(()=>this.drum.classList.remove("animated"),1250)}connectedCallback(){var t;this.type=(t=this.getAttribute("type"))!=null?t:"kick",this.sound=new Audio(`sounds/${this.type}.mp3`),this.meow=new Audio(`sounds/${this.type}-meow.mp3`),this.render(),this.drum=this.shadowRoot.querySelector(".drum"),this.drum.addEventListener("click",()=>this.hit())}render(){this.shadowRoot.innerHTML=`
    <style>${d.styles}</style>
    <div class="drum"></div>
    `}}customElements.define("drums-bass",d);const m={Q:document.querySelector("[type='crash']"),W:document.querySelector("[type='floor-tom']"),E:document.querySelector("[type='tom1']"),R:document.querySelector("[type='kick']"),U:document.querySelector("[type='tom2']"),I:document.querySelector("[type='snare']"),O:document.querySelector("drums-hi-hat"),P:document.querySelector("[type='ride']")},p=Object.keys(m);document.addEventListener("keydown",l=>{const t=l.key.toUpperCase();p.includes(t)&&m[t].hit(),(t==="G"||t==="C")&&document.body.classList.toggle("cat-mode")});
