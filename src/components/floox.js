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
                
                .flat > g > g > line {
                    fill: white;
                    stroke: white;
                    filter: none;
                }
                .flat > g > g > rect {
                    stroke: transparent;
                    fill: white;
                    filter: none;
                }
            </style>
            <a href="[[href]]">
                <svg id="groups"  xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                    <g transform="translate(10, 14)">
                        <g>
                            <line y1="37.55" transform="translate(22.62 8.483)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                            <rect width="10.665" height="28.05" transform="translate(17.288 13.233)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                        </g>
                        <g>
                            <line  y2="30.918" transform="translate(6.332 30.059)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                            <rect  width="10.665" height="22.046" transform="translate(1 34.495)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                        </g>
                        <g>
                            <line y2="34.413" transform="translate(56.428, 1)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                            <rect width="10.665" height="24.914" transform="translate(51.096 5.75)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                        </g>
                        <g>
                            <line y1="28.633" transform="translate(40.387 26.026)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                            <rect width="10.665" height="19.357" transform="translate(35.055 30.663)" fill="#98cbfe" stroke="#5086b6" stroke-miterlimit="10" stroke-width="2"/>
                        </g>
                    </g>
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
