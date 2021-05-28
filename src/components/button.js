import { PolymerElement, html } from "@polymer/polymer/polymer-element";

import '@polymer/paper-button';
import '@polymer/paper-spinner/paper-spinner';

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
                    border-radius: 8px;
                    
                    --paper-button-ink-color: var(--splash, #0006) !important;
                    background-image: linear-gradient(to top right, var(--fill, white), var(--alt, transparent));
                    
                    justify-content: var(--align, center);
                    border-color: var(--border-color, #0002);
                    border-style: solid;
                    border-width: 0;
                    width: 100%;
                }
                paper-button:hover {
                    transform: scale(1.05)
                }
                #text {
                    color: var(--color, black);
                    text-align: var(--align, center);
                    display: flex;
                    align-items: center;
                    margin: 0;
                }
            </style>
            
            <div id="container">
                <paper-button id="button">
                    <div id="text"><slot/></div>
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
            s += 'box-shadow: 0 1px 2px 1px #00000008;';
        }
        this.$.button.setAttribute('style', s);
    }
}

customElements.define('floox-button', Button);
