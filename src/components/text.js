import { PolymerElement, html } from '@polymer/polymer';

import '@polymer/paper-input/paper-input.js';

class TextArea extends PolymerElement {
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
                    display: flex;
                }
                textarea {
                    flex: 1;
                    border: 0 solid var(--color, transparent);
                    border-radius: var(--radius, 8px);
                    position: relative;
                    height: inherit;
                    resize: both;
                    display: block;
                    font-size: 14pt;
                    font-weight: lighter;
                    line-height: 28px;
                    width: min-content;
                    padding: 8px 16px;
                    background: var(--fill, white);
                    font-family: var(--font-family, Calibri), sans-serif;
                }
                textarea + p {
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
            <textarea wrap="soft" id="container" value="{{value::input}}" tabindex$='[[tabindex]]' name='[[name]]' placeholder="[[label]]"></textarea>
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

customElements.define('floox-text', TextArea);
