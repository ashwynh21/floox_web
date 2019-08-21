import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTH extends PolymerElement {
    static get properties(){
        return {
            intro: {
                type: Boolean,
                value: false
            },
            outro: {
                type: Boolean,
                value: false
            },
            fade: {
                type: Boolean,
                value: false
            }
        }
    }
    static get template () {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
        <style>
        #text{
            width:100%;
        }
        @keyframes revealText {
          from { opacity: 0; transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0); }
          to   { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
        }
        @keyframes hideText {
          from { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
          to   { opacity: 0; transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0); }
        }
        </style>
        <div id="mask"><p id="text"><slot></slot></p></div>
    `;
    }

    ready() {
        super.ready();
        if(this.intro){
            this.init();
        }
    }

    anim(){
        if(this.intro){
            this.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);animation: revealText 1000ms cubic-bezier(0.7, 0, 0.3, 1) forwards;');
            this.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;');
            this.$.text.setAttribute('style','display: inline-block;opacity: 0;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: revealText 1000ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');

            if(this.fade){
                this.fad();
            }
        }
    }
    init(){
        const self = this;

        //initialize style
        this.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0)');
        this.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;');
        this.$.text.setAttribute('style','display: inline-block;opacity: 0;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;margin:0;');
    }
    out(){
        if(this.outro){
            this.setAttribute('style','position: relative;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);animation: hideText 500ms cubic-bezier(0.7, 0, 0.3, 1) forwards;');
            this.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;');
            this.$.text.setAttribute('style','display: inline-block;transform: translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: hideText 500ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');
        }
    }
}

// Register the element with the browser.
customElements.define('tkt-h', TKTH);
