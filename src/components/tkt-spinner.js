import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTSpinner extends PolymerElement {

    constructor() {
        super();
    }
    static get properties() {
        return {
            color: {
                type: String,
                value: '',
                notify: true,
                reflectToAttribute: true
            },
            val: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            },
            fin: {
                type: Function,
                value: null
            }
        }
    }
    static get template () {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
<style>
:host{
height:4px;
width:100%;

border-radius:2px;

background-color:rgba(0,0,0,0.1);
display:flex;
align-items:center;
justify-content: flex-start;
}
:host > div{
margin:0;
height:inherit;
transition-duration:0.5s;
-webkit-border-radius: inherit;-moz-border-radius: inherit;border-radius: inherit;
}
</style>
<div id="bar" style="background-color:{{color}}; width:{{val}}%"></div>
    `;
    }

    ready() {
        super.ready();
    }

    load() {
        const self = this;

        anime({
            targets: self.$.bar,
            width: '100%',
            duration: 1000,
            easing: 'linear',
            complete: function(anim){
                setTimeout((function(){
                    if(self.fin != null){
                        self.fin();
                    }
                }),500);
            }
        });
    }
}

// Register the element with the browser.
customElements.define('tkt-spinner', TKTSpinner);
