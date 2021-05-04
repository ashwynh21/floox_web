import { PolymerElement, html } from "@polymer/polymer";

class Menu extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                gap: 32px;
            }
        </style>
        <slot/>
        `;
    }
}

customElements.define('floox-menu', Menu);
