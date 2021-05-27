import { PolymerElement, html } from '@polymer/polymer';

import '@polymer/paper-input/paper-input.js';

class Input extends PolymerElement {
    static get properties() {
        return {
            name: {
                type: String,
                value: '',
            },
            label: {
                type: String,
                value: '',
            },
            type: {
                type: String,
                value: 'text',
            },
            value: {
                type: String,
                value: '',
            },
            valid: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
                observer: 'validate',
            },
            tabindex: {
                type: Number,
                value: 0,
            },
            raised: {
                type: Boolean,
                value: false,
            },
            border: {
                type: Boolean,
                value: false,
            }
        };
    }

    static get template() {
        return html`
            <style>
                :host {
                    cursor: pointer;
                    margin: inherit;
                    position: relative;
                }
                :host > div {
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-content: center;
                    
                    border: 0px solid var(--color, transparent);
                    border-radius: var(--radius, 4px);
                    position: relative;
                }
                input {
                    height: 32px;
                    padding: 8px 16px;
                    border: none;
                    background: var(--fill, white);
                    border-radius: var(--radius, 4px);
                    font-family: var(--font-family, Calibri), sans-serif;
                }
                input + p {
                    font-family: var(--font-family, Calibri), sans-serif;
                    width: fit-content;
                    color: var(--color, black);
                    margin: 0;
                    background: white;
                    
                    padding: 2px;
                    position: absolute;
                    transform: translate(18px, 0) scale(1);
                    
                    text-shadow: 0 0 8px white;
                    
                    pointer-events: none;
                    transition: transform 0.256s;
                }
                input:hover + p, input:focus + p, input:hover + p {
                    transform: translate(8px, -24px) scale(0.9);
                }
            </style>
            <div id='container'>
                <input value="{{value::input}}" tabindex$='[[tabindex]]' name='[[name]]' type='[[type]]'/>
                <p id="ashlabel">[[label]]</p>
            </div>
      `;
    }

    constructor() {
        super();
        this.addEventListener('input', this.valueChange);
    }

    ready() {
        super.ready();

        let s = ''
        if (this.raised) {
            s += 'box-shadow: 0 0 3px 1px #00000008;';
        }
        if (!this.border) {
            s += 'border: none';
        }
        this.$.container
            .setAttribute('style', s);
    }

    valueChange() {
        if (this.value.length > 0) {
            this.$.container
                .querySelector('#ashlabel')
                .setAttribute('style', `transform: translate(8px, -24px) scale(0.9)`);
        } else {
            this.$.container
                .querySelector('#ashlabel')
                .setAttribute('style', ``);
        }
    }

    validate(value) {
        if(!value) {
            this.$.container.setAttribute('style', 'box-shadow: 0 0 3px 1px #8003;');
            this.$.ashlabel.setAttribute('style', 'color: #8008;');
        }
    }
}

customElements.define('floox-input', Input);
