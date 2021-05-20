import { PolymerElement, html} from "@polymer/polymer";

class Navigation extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                padding: 24px 0;
                
                justify-content: space-around;
                align-items: center;
                gap: 10%;
            }
            ::slotted(div) { display: flex; align-items: center; gap: 8px; }
            
            ::slotted(div > a) {
                text-decoration: none;
            }
        </style>
        
        <slot/>
        `;
    }
}

customElements.define('floox-nav', Navigation);
