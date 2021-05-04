import { PolymerElement, html } from "@polymer/polymer/polymer-element";

import '@polymer/paper-button';

class Button extends PolymerElement {
    static get properties() {
        return {
            border: {
                type: Boolean,
                value: false,
            },
            raised: {
                type: Boolean,
                value: false,
            },
        };
    }
    static get template () {
        return html`
            <style>
                :host {
                    font-family: Roboto, sans-serif;
                    height: 40px;
                }
                paper-button {
                    transition: transform 0.256s;
                    text-transform: none;
                    border-radius: 44px;
                    background: var(--fill, white);
                    --paper-button-ink-color: var(--splash, #0006) !important;
                    justify-content: var(--align, center);
                    border-color: var(--border-color, #0002);
                    border-style: solid;
                    border-width: 0;
                    width: 100%;
                }
                paper-button:hover {
                    transform: scale(1.05)
                }
                p {
                    color: var(--color, black);
                    text-align: var(--align, center);
                    display: flex;
                    align-items: center;
                    margin: 0;
                }
            </style>
            
            <div id="container">
                <paper-button id="button">
                    <p id="text"><slot/></p>
                </paper-button>
            </div>
        `;
    }

    ready() {
        super.ready();

        this.styler();
    }

    styler() {
        let s = '';
        if (this.border) {
            s += 'border-width: 1px;';
        }
        if (this.raised) {
            s += 'box-shadow: 0 1px 4px 1px #0002;';
        }
        this.$.button.setAttribute('style', s);
    }
}

customElements.define('floox-button', Button);
