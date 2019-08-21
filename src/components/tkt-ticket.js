import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTTicket extends PolymerElement {
    static get template () {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
            <style>
            :host{
            max-width:256px;
            position:relative;
            display:flex;
            cursor:pointer;
            
            justify-content: center;
            }
            :host > div{
            width:40%;
            height:32px;
            border-radius:20px;
            background-color:#FFB50C;
            position:absolute;
            align-self:center;
            margin:auto;
            
            display:flex;
            align-items: center;
            justify-content:center;
            }
            :host > svg{
            transition-duration:0.5s;
            }
            
            </style>
            <svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 396.7 224.2" style="enable-background:new 0 0 396.7 224.2;" xml:space="preserve">
                <path id="Path_11850_1_" style="opacity:0.2;fill:#A09C9A;enable-background:new    ;" d="M388.4,212.2v-8.2h-2.1
                c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1
                c-2.1-0.3-3.5-2.2-3.2-4.2c0.2-1.7,1.5-3,3.2-3.2h2.1v-5.4c-21.4-2.6-38.1-22.1-38.1-45.6s16.7-43,38.1-45.6v-5.8h-2.1
                c-2.1-0.3-3.5-2.2-3.2-4.2c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1
                c-1.9-0.1-3.4-1.8-3.3-3.7l0,0c-0.1-1.9,1.3-3.6,3.3-3.7h2.1v-8.2H17V24h2.1c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H17v8.2
                h2.1c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H17v8.2h2.1c2.1,0.3,3.5,2.2,3.2,4.2c-0.2,1.7-1.5,3-3.2,3.2H17v5.4
                c21.4,2.6,38.1,22.1,38.1,45.6l0,0c0,23.5-16.7,43-38.1,45.6v5.8h2.1c2.1,0.3,3.5,2.2,3.2,4.2c-0.2,1.7-1.5,3-3.2,3.2H17v8.2h2.1
                c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H17v8.2h2.1c1.9,0.1,3.4,1.8,3.3,3.7l0,0c0.1,1.9-1.3,3.6-3.3,3.7H17v8.2
                L388.4,212.2L388.4,212.2z"/>
                <g>
                    <defs>
                        <path id="Path_11850" d="M379.7,204.6v-8.2h-2.1c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1
                        c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1c-2.1-0.3-3.5-2.2-3.2-4.2c0.2-1.7,1.5-3,3.2-3.2h2.1v-5.4
                        c-21.4-2.6-38.1-22.1-38.1-45.6s16.7-43,38.1-45.6v-5.8h-2.1c-2.1-0.3-3.5-2.2-3.2-4.2c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1
                        c-2.1-0.3-3.5-2.2-3.2-4.3c0.2-1.7,1.5-3,3.2-3.2h2.1v-8.2h-2.1c-1.9-0.1-3.4-1.8-3.3-3.7l0,0c-0.1-1.9,1.3-3.6,3.3-3.7h2.1V8.2
                        H8.3v8.2h2.1c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H8.3V32h2.1c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H8.3v8.2
                        h2.1c2.1,0.3,3.5,2.2,3.2,4.2c-0.2,1.7-1.5,3-3.2,3.2H8.3v5.4c21.4,2.6,38.1,22.1,38.1,45.6l0,0c0,23.5-16.7,43-38.1,45.6v5.8h2.1
                        c2.1,0.3,3.5,2.2,3.2,4.2c-0.2,1.7-1.5,3-3.2,3.2H8.3v8.2h2.1c2.1,0.3,3.5,2.2,3.2,4.3c-0.2,1.7-1.5,3-3.2,3.2H8.3v8.2h2.1
                        c1.9,0.1,3.4,1.8,3.3,3.7l0,0c0.1,1.9-1.3,3.6-3.3,3.7H8.3v8.2L379.7,204.6L379.7,204.6z"/>
                    </defs>
                    <clipPath id="Path_11850_2_">
                        <use xlink:href="#Path_11850"  style="overflow:visible;"/>
                    </clipPath>
                    <g id="img" style="clip-path:url(#Path_11850_2_);enable-background:new;">
                        <image style="overflow:visible;" width="3840" height="2160" id="image"  transform="matrix(0.1127 0 0 0.1127 -34.5713 -31.2895)">
                        </image>
                    </g>
                </g>
            </svg>
            <div style="background-color:[[background]]">
                <p style="color:[[color]]"><slot></slot></p>
            </div>
    `;
    }
    static get properties(){
        return {
            color: {
                type: String,
                value: '#FFF'
            },
            background: {
                type: String,
                vlaue: '#FFB50C'
            },
            url: {
                type: String,
                value: ''
            },
            intro: {
                type: Boolean,
                value: false
            }
        }
    }

    ready() {
        super.ready();

        this.$.image.setAttribute('href', this.url);
        this.init();
    }
    anim(){
        const self = this;

        if(self.intro){
            this.setAttribute('style', 'transition-duration:1s;opacity:1');
        }
    }
    init(){
        if(this.intro){
            this.setAttribute('style', 'transition-duration:1s;opacity:0');
        }
    }
    out(){
        this.setAttribute('style', 'transition-duration:0.25s;opacity:0');
    }
}

// Register the element with the browser.
customElements.define('tkt-ticket', TKTTicket);
