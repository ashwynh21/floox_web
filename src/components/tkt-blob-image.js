import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';
import * as d3 from 'd3';

export class TKTBlobImage extends PolymerElement {
  constructor() {
    super();
  }
  static get template() {
    return html`
    <style>
    :host{
    overflow: visible;
    min-width:256px;
    min-height:256px;
    
    display:flex;
    }
    svg{
    width:100%;
    height:100%;
    
    display:flex;
    justify-content: center;
    align-items:center;
    
    overflow:visible;
    }
    #img{
    display:flex;
    width:100%;
    height:100%;
    overflow:visible;
    }
    #image{
    align-self:center;
    justify-self: center;
    margin:auto;
    transform: translateX(-30%);
    }
    #blob{
    filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.5));
    }
    </style>
    <svg id="svg">
      <clipPath id="mask">
          <use xlink:href="#blob"  style="overflow:visible;"/>
      </clipPath>
      <g id="img" style="clip-path:url(#mask);enable-background:new;">
          <image style="overflow:visible;" id="image">
          </image>
      </g>
    </svg>
    `;
  }
  static get properties(){
    return {
      tx: {
        type: Number,
        value: 0
      },
      ty: {
        type: Number,
        value: 0
      },
      url: {
        type: String,
        value: ''
      },
      intro: {
        type: Boolean,
        value: false
      }
    }
  }
  /*
      Overrides will go below
  */
  ready() {
    super.ready();

    if(this.intro){
      this.setAttribute('style', 'transform:scale(0.8); opacity:0; transition-duration:0.5s;');
    }
    this.init();
  }

  /*
      Methods will have to go below
  */
  rnd(max, negative) {
    return negative ? Math.random() * 2 * max - max : (Math.random()*0.25 + 0.75) * max;
  }
  styler(b) {
    return `fill: ${b.fill};`;
  }
  rndcolor() {
    return '#' + (0x1000000 + Math.random() * 0xFFFFFF).toString(16).substr(1, 6 );
  }
  blob(n, cx, cy, r, rnd1, rnd2) {
    const svg = this.$.svg;
    const line = d3.line().curve(d3.curveBasisClosed);

    const da = 2 * Math.PI / n;
    const points = this.blobPoints(n, cx, cy, r, rnd1, rnd2);
    const points2 = this.blobPoints(n, cx, cy, r, rnd1, rnd2);
    const d = line(points);
    const d2 = line(points2);
    const fill = '#FFB50C';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const b = { points, path, d2, fill };
    path.setAttributeNS(null, 'd', d);
    path.setAttributeNS(null, 'style', this.styler(b));
    path.setAttribute('id', 'blob');
    svg.prepend(path);

    return b;
  }
  blobPoints(n, cx, cy, r, rnd1, rnd2) {
    const da = 2 * Math.PI / n;
    const points = [];
    for (let i = 0; i < n; i++) {
      const a = i * da + this.rnd(rnd1, true);
      const s = r + this.rnd(rnd2, true);
      const x = Math.cos(a) * s + cx;
      const y = Math.sin(a) * s + cy;
      points.push([x, y]);
    }
    return points;
  }
  init() {
    const self = this;
    const height = self.offsetHeight/2;
    const width = self.offsetWidth/2;

    self.$.image.setAttribute('href', self.url);
    const line = d3.line().curve(d3.curveBasisClosed);

    const b = self.blob(Math.round(8), width, height, height - 64, 0.2, 50);
    self.$.image.setAttribute('height', 2*height);
    self.$.image.setAttribute('width', 3*width);
    b.animation = anime({
      targets: b.path,
      d: function(a){
        const points = self.blobPoints(8, width, height, height - 64, 0.2, 50);

        return line(points);
        },
      duration: 5000 + this.rnd(3000),
      easing: 'linear',
      complete: function(){
        Trial(self)
            .within({
              distance: 400,
              cord: 'center'
            },
            function(distance, el, event){
              function getOffset(el) {
                var _x = 0;
                var _y = 0;
                while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                  _x += el.offsetLeft - el.scrollLeft + el.offsetHeight/4;
                  _y += el.offsetTop - el.scrollTop + el.offsetHeight/4;
                  el = el.offsetParent;
                }
                return { top: _y, left: _x };
              }

              self.tx = (event.clientX - getOffset(self).left)/8;
              self.ty = (event.clientY - getOffset(self).top)/8;

              self.single(b);
            });
        self.anim(b);
      }
    });
  }
  anim(b){
    const self = this;
    const height = self.offsetHeight/2 + self.ty;
    const width = self.offsetWidth/2 + self.tx;

    const line = d3.line().curve(d3.curveBasisClosed);
    b.animation = anime({
      targets: b.path,
      d: function(a){
        const points = self.blobPoints(8, width, height, height - 96, 0.2, 50);

        return line(points);
      },
      duration: 4500 + this.rnd(3000),
      easing: 'linear',
      complete: function(){
        self.anim(b);
      }
    });
  }
  single(b){
    const self = this;
    const height = self.offsetHeight/2 + self.ty;
    const width = self.offsetWidth/2 + self.tx;

    const line = d3.line().curve(d3.curveBasisClosed);
    b.animation.pause();
    b.animation = anime({
      targets: b.path,
      d: function(a){
        const points = self.blobPoints(8, width, height, height - 96, 0.4, 75);

        return line(points);
      },
      duration: 8000,
      easing: 'linear',
      complete: function(){
        self.anim(b);
      }
    });
  }
  introduce(){
    const self = this;
    if(self.intro){
      self.setAttribute('style', 'transform:scale(1); opacity:1; transition-duration:0.5s;');
    }
  }
  out(){
    this.setAttribute('style', 'transform:scale(0.8); opacity:0; transition-duration:0.25s;');
  }
  //
}
// Register the element with the browser.
customElements.define('tkt-blob-image', TKTBlobImage);
