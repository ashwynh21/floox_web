import { PolymerElement, html } from "@polymer/polymer";

class Pill extends PolymerElement {
    static get template() {
        return html`
            <style>
                paper-button {
                    text-transform: none;
                    height: 52px;
                    border-radius: 12px;
                    
                    box-shadow: 0 0 4px 1px #00000011;
                    display: flex;
                    padding: 0 24px;
                    gap: var(--spacing, 16px);
                    background: var(--fill, white);
                    justify-content: center;
                }
                ::slotted > * {
                    text-align: center;
                    flex: 1;
                    position: relative;
                }
            </style>
            <paper-button>
                <slot/>
            </paper-button>
        `;
    }
}

customElements.define('floox-pill', Pill);
