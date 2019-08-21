import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class TKTElement extends PolymerElement {
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <p>You like pie.</p>
    `;
  }
}

// Register the element with the browser.
customElements.define('base-element', TKTElement);
