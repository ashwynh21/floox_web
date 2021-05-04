import { PolymerElement, html } from '@polymer/polymer';

class Rating extends PolymerElement {
    static get properties() {
        return {
            value: {
                type: Number,
                value: 0,
                reflectToAttribute: true,
                notify: true,
                observer: 'update'
            }
        }
    }
    static get template() {
        return html`
            <style>
                :host {
                    position: relative;
                    cursor: pointer;
                    height: var(--height, 28px);
                    width: var(--width, 221px);
                }
                input {
                    cursor: pointer;
                    position: absolute;
                    height: var(--height, 28px);
                    width: var(--width, 221px);
                    opacity: 0
                }
                svg {
                    pointer-events: none;
                    width: var(--width, 221px);
                    height: var(--height, 28px);
                }
            </style>
            <input type="range" min="1" max="100" value="{{value::input}}">
            <svg id="stars" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="221" height="31.53" viewBox="0 0 221 31.53">
              <defs>
                <clipPath id="clip-path">
                  <rect width="154" height="28" transform="translate(960 814)" fill="#fff"/>
                </clipPath>
              </defs>
              <g transform="translate(-958.679 -812.236)">
                <g>
                  <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(957.179 810.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1004.179 810.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1051.179 810.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1098.179 810.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1145.179 810.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                </g>
                <g clip-path="url(#clip-path)">
                  <g>
                    <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(957.179 810.736)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1004.179 810.736)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1051.179 810.736)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1098.179 810.736)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="M18,3l4.635,9.39L33,13.9l-7.5,7.3,1.77,10.32L18,26.655,8.73,31.53,10.5,21.21,3,13.9,13.365,12.39Z" transform="translate(1145.179 810.736)" fill="#fff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  </g>
                </g>
              </g>
            </svg>
        `;
    }

    constructor(props) {
        super(props);
    }

    update(value) {
        this.$.stars.querySelector('#clip-path').children[0].setAttribute('width', value / 100 * 221);
    }
}

customElements.define('floox-rating', Rating);
