import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

export class TKTMenu extends PolymerElement {
  static get properties() {
    return {
      state: {
        type: String, notify: true, value: 'open'
      }
    }
  }

  constructor() {
    super();
  }

  static get template() {
    return html`
    <style>
        :host{
        min-width:32px;
        min-height:32px;
        transform:scale(1.4);
        }
    </style>
    <?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" xml:space="preserve">
      <polyline id="top" style="fill:none;stroke:#FFB50C;stroke-width:1.4;stroke-linecap:round;stroke-miterlimit:10;" points="1.5,12.5 15.5,12.5 29.5,12.5 "/>
      <polyline id="bottom" style="fill:none;stroke:#FFB50C;stroke-width:1.4;stroke-linecap:round;stroke-miterlimit:10;" points="1.5,20.5 7.5,20.5 13.5,20.5 "/>
    </svg>
    `;
  }
  /*
      Overrides will have to go here
  */
  ready() {
    super.ready();

    this.onmouseover = this._mouseover;
    this.onmouseout = this._mouseout;
    this.onclick = this._click;
  }
  //
  _click(){
    if (this.state === 'open') {
      anime({
        targets: [ this.$.top ],
        stroke: '#ca0000',
        duration: 1000,
        points: '5.6,6.6 15.5,16.5 25.4,26.4'
      });
      anime({
        targets: [ this.$.bottom ],
        stroke: '#ca0000',
        duration: 1000,
        points: '25.4,6.6 15.5,16.5 5.6,26.4'
      });

      this.state = 'close';
    } else {
      anime({
        duration: 750,
        stroke: '#FFB50C',
        targets: [ this.$.bottom],
        points: '1.5,20.5 7.5,20.5 13.5,20.5'
      });
      anime({
        duration: 750,
        stroke: '#FFB50C',
        targets: [ this.$.top],
        points: '1.5,12.5 15.5,12.5 29.5,12.5'
      });

      this.state = 'open';
    }
  }
  _mouseover() {
    if (this.state === 'open') {
      anime({
        targets: [ this.$.top ],
        duration: 500,
        points: '1.5,12.4 11.5,12.4 21.5,12.4'
      });
      anime({
        targets: [ this.$.bottom ],
        duration: 500,
        points: '1.5,20.4 11.5,20.4 21.5,20.4'
      });
    }
  }
  _mouseout() {
    if (this.state === 'open') {
      anime({
        duration: 500,
        easing: 'easeOutCubic',
        targets: [ this.$.bottom],
        points: '1.5,20.5 7.5,20.5 13.5,20.5'
      });
      anime({
        duration: 500,
        easing: 'easeOutCubic',
        targets: [ this.$.top],
        points: '1.5,12.5 15.5,12.5 29.5,12.5'
      });
    }
  }

  toggle() {
    if (this.state === 'open') {
      this.state = 'close';
    } else {
      this.state = 'open';
    }
  }
}

// Register the element with the browser.
customElements.define('tkt-menu', TKTMenu);
