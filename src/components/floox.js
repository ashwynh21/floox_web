import { PolymerElement, html } from "@polymer/polymer";

class Floox extends PolymerElement {
    static get properties() {
        return {
            color: {
                type: String,
            },
            flat: {
                type: Boolean,
                value: false,
            },
            href: {
                type: String,
                value: ''
            }
        }
    }
    static get template() {
        return html`
            <style>
                :host {
                    cursor: pointer;
                }
                svg line, svg rect {
                  filter: var(--filter, drop-shadow(0 0 2px #00000008));
                }
                svg {
                    height: var(--height, auto);
                    width: var(--width, auto);
                    transition: transform 0.256s;
                }
                svg:hover {
                    transform: scale(1.05)
                }
                svg > g > g { transition: transform 0.256s; transform-origin: center; }
                svg > g > g:hover {
                    transform: scale(1.05)
                }
                .st0 { fill: #000405; }
                .st1 { fill: #00ADF1; }
                .st2 { fill: none; }
                
                .flat > * {
                    stroke: white;
                    fill: white;
                    filter: none;
                }
            </style>
            <a href="[[href]]">
                <svg id="groups"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.5 66.2">
                    <polygon class="st0" points="9.3,4.2 9.3,62 28,62 28,41.7 43.9,41.7 43.9,30.1 28,30.1 28,21.2 51.5,21.2 51.5,4.2 "/>
                    <polygon class="st0" points="51.5,61.9 107.8,61.9 107.8,43.3 70.5,43.3 70.5,4.2 51.5,4.2 "/>
                    <path class="st0" d="M129.1,33.1c0,6.9-5.6,12.5-12.5,12.5s-12.5-5.6-12.5-12.5s5.6-12.5,12.5-12.5S129.1,26.2,129.1,33.1zM116.6,2.1C99.5,2.1,85.7,16,85.7,33.1S99.5,64,116.6,64s30.9-13.9,30.9-30.9S133.7,2.1,116.6,2.1z"/>
                    <path class="st0" d="M173,33.1c0,6.9-5.6,12.5-12.5,12.5S148,40,148,33.1s5.6-12.5,12.5-12.5S173,26.2,173,33.1z M160.5,2.1c-17.1,0-30.9,13.9-30.9,30.9S143.4,64,160.5,64s30.9-13.9,30.9-30.9S177.6,2.1,160.5,2.1z"/>
                    <polygon class="st1" points="209.2,32.9 198.8,51 192.3,62.1 171.4,62.1 188.3,32.9 171.7,4 192.6,4 198.8,14.8 "/>
                    <polygon class="st0" points="225.9,4 209.2,32.9 198.8,14.8 205,4 "/>
                    <polygon class="st0" points="226.1,62.1 205.2,62.1 198.8,51 209.2,32.9 "/>
                    <polygon class="st1" points="263.7,33.3 253.2,51.4 247,62.1 226.1,62.1 242.8,33.3 225.9,4 246.8,4 253.2,15.1 "/>
                </svg>
            </a>
        `;
    }

    ready() {
        super.ready();

        if (this.flat) {
            this.$.groups.classList.add('flat');
        }
    }
}

customElements.define('floox-icon', Floox);
