import { PolymerElement, html} from "@polymer/polymer";

class Navigation extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                padding: 24px 0;
                
                justify-content: center;
                align-items: center;
                gap: 128px;
            }
            ::slotted(div) { display: flex; align-items: center }
        </style>
        
        <slot/>
        `;
    }
}

customElements.define('floox-nav', Navigation);
