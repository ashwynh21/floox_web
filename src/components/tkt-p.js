import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTP extends PolymerElement {
    static get properties(){
        return {
            intro: {
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
        :host, #text, #mask{
        transition-duration:0.5s;
        }
        @keyframes revealText {
          from { opacity: 0; transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0); }
          to   { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
        }
        @keyframes hideText {
          from { opacity: 1; transform: translate(0%, 0%) matrix(1, 0, 0, 1, 0, 0); }
          to   { opacity: 0; transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0); }
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

    fad(){
        const self = this;
        self.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);animation: revealText 1000ms cubic-bezier(0.7, 0, 0.3, 1) forwards;');
        self.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;text-align: start;');
        self.$.text.setAttribute('style','color:#00000066;background: url("../manifest/rect.png") no-repeat;background-position: -100% 0%; background-size: 50% 100%; -webkit-background-clip: text;transition-duration:1s;display: inline-block;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: revealText 1000ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');

        setTimeout(function(){
            self.$.text.setAttribute('style','background-size: 100% 100% !important;color:#00000066;background: url("../manifest/rect.png") no-repeat;background-position: -100% 0%; -webkit-background-clip: text;transition-duration:1s;display: inline-block;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: revealText 1000ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');
        },800);
    }
    anim(){
        if(this.intro){
            this.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);animation: revealText 750ms cubic-bezier(0.7, 0, 0.3, 1) forwards;');
            this.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;text-align: start;');
            this.$.text.setAttribute('style','display: inline-block;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: revealText 750ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');

            if(this.fade){
                this.fad();
            }
        }
    }
    out(){
        const self = this;

        self.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);animation: hideText 250ms cubic-bezier(0.7, 0, 0.3, 1) forwards;');
        self.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;text-align: start;');
        self.$.text.setAttribute('style','color:#00000066;background: url("../manifest/rect.png") no-repeat;background-position: -100% 0%; background-size: 50% 100%; -webkit-background-clip: text;transition-duration:0.25s;display: inline-block;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;animation: hideText 250ms cubic-bezier(0.7, 0, 0.3, 1) forwards;margin:0;');
    }
    init(){
        const self = this;

        //initialize style
        this.setAttribute('style','position: relative;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0); margin-bottom:64px;');
        this.$.mask.setAttribute('style','overflow: hidden;display: block;position: relative;text-align: start;');
        this.$.text.setAttribute('style','display: inline-block;opacity: 0;transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);will-change: opacity, transform;margin:0;');
    }
}

// Register the element with the browser.
customElements.define('tkt-p', TKTP);
