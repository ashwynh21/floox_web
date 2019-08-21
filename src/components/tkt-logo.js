import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTLogo extends PolymerElement {
    static get properties() {
        return {
            shadow: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            intro: {
                type: Boolean,
                value: false,
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
        max-width: 144px;
        max-height:144px;
        margin:64px;
        
        display:flex;
        flex-flow:column;
        align-items:center;
        cursor:pointer;
        }
        :host[shadow] > #shadow{
        display:flex;
        }
        :host > #shadow{
        width:144px;
        height:4px;
        border-radius:50%;
        background-color: rgba(0,0,0,0.025);
        box-shadow:0 0 4px 1px rgba(0,0,0,0.05);
        margin-top:28px;
        }
        :host > #fade{
        background-color: rgba(0,0,0,0.025);
        min-width:1px;
        min-height:1px;
        border-radius:50%;
        position:absolute;
        margin:auto;
        margin-top:64px;
        }
        </style>
        <div id="fade"></div>
        <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
 viewBox="0 0 201 199.9" style="enable-background:new 0 0 201 199.9;" xml:space="preserve">
<path id="fill" style="fill:#FCB315;" d="M143.3,108.2l-82.9,82.9c-4.1-4.1-10.7-4.1-14.8,0l-8.1-8.1c5.7-5.7,5.7-14.9,0-20.6
c-5.7-5.7-14.9-5.7-20.6,0l-8.1-8.1c4.1-4.1,4.1-10.7,0-14.8l82.9-82.9L108,72.9c-2.1,5.2-1,11.5,3.2,15.7
c4.2,4.2,10.5,5.3,15.7,3.2L143.3,108.2z"/>
<g>
<path id="stroke" style="fill:#005781;" d="M91.1,64l11.8,11.8c-1.5,5.9,0.2,12.3,4.6,16.7c3.3,3.3,7.7,5.1,12.4,5.1c1.4,0,2.9-0.2,4.2-0.5
l11.8,11.8l-75.5,75.5c-2-1.2-4.4-1.8-6.8-1.8c-2.4,0-4.8,0.6-6.8,1.8l-3.4-3.4c1.9-2.9,2.9-6.2,2.9-9.7c0-4.7-1.8-9.1-5.1-12.4
c-3.3-3.3-7.7-5.1-12.4-5.1c-3.5,0-6.9,1-9.7,2.9l-3.4-3.4c1.2-2.1,1.8-4.4,1.8-6.8c0-2.4-0.6-4.8-1.8-6.8L91.1,64 M91.1,55.5
c-0.9,0-1.8,0.3-2.5,1L8.5,136.6c-1.4,1.4-1.4,3.6,0,5c2.6,2.6,2.6,6.7,0,9.3c-1.4,1.4-1.4,3.6,0,5l7.8,7.8c0.7,0.7,1.6,1,2.5,1
s1.8-0.3,2.5-1c2.1-2.1,4.8-3.1,7.5-3.1s5.4,1,7.5,3.1c4.1,4.1,4.1,10.8,0,15c-1.4,1.4-1.4,3.6,0,5l7.8,7.8c0.7,0.7,1.6,1,2.5,1
c0.9,0,1.8-0.3,2.5-1c1.3-1.3,3-1.9,4.7-1.9s3.4,0.6,4.7,1.9c0.7,0.7,1.6,1,2.5,1c0.9,0,1.8-0.3,2.5-1l80.1-80.1
c1.4-1.4,1.4-3.6,0-5l-15.8-15.8c-0.7-0.7-1.6-1-2.5-1c-0.4,0-0.9,0.1-1.3,0.2c-1.3,0.5-2.6,0.7-3.9,0.7c-2.8,0-5.5-1.1-7.5-3.1
c-3-3-3.9-7.5-2.3-11.4c0.5-1.3,0.2-2.8-0.8-3.8L93.6,56.6C92.9,55.9,92,55.5,91.1,55.5L91.1,55.5z"/>
</g>
<g>
<path style="fill:#FFFFFF;" d="M118.5,114.2L85.7,81.5c-0.5-0.5-1.3-0.5-1.7,0l-25.1,25.1c-0.5,0.5-0.5,1.3,0,1.7l32.7,32.7
c0.5,0.5,1.3,0.5,1.7,0l25.1-25.1C118.9,115.5,118.9,114.7,118.5,114.2z"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="79.4" cy="146.2" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="66.4" cy="133.6" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="53.6" cy="120.8" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="55" cy="145" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="42.2" cy="132.1" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="67.8" cy="157.8" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="30.8" cy="143.5" r="5.2"/>
</g>
<g>
<circle style="fill:#FFFFFF;" cx="56.4" cy="169.1" r="5.2"/>
</g>
<polygon style="opacity:0.32;fill:#F1F1F2;" points="119.3,115.1 92.5,142 80.2,129.7 87.1,82.8 "/>
<path id="arrow" style="fill:#005781;" d="M72.3,7.4h100.1c11.7,0,21.1,9.5,21.1,21.1v100.1c0,18.8-22.8,28.2-36.1,14.9L57.4,43.5
C44.1,30.2,53.5,7.4,72.3,7.4z"/>
<path id="accent" style="fill:#0C4772;" d="M184.9,11.5L74.7,60.8L57.4,43.5C44.1,30.2,53.5,7.4,72.3,7.4l100.1,0C177.1,7.4,181.4,9,184.9,11.5z
"/>
</svg>
        <div id="shadow"></div>
    `;
    }

    ready() {
        super.ready();

        this.introduce();
        if(!this.shadow){
            this.$.shadow.setAttribute('style','display:none;');
        }
        if(!this.intro){
            this.$.fade.setAttribute('style','display:none');
        }
    }

    introduce(){
        const self = this;
        const time = 400;
        self.discolor();

        let logo_anim = anime.timeline({
            targets: self.$.logo
        }).add({
            duration: 0,
            translateZ: -32,
            translateY: -32,
            scale: 0.75,
            opacity: 0,
            rotateX: '-10deg'
        }).add({
            duration: time,
            translateY: -16,
            translateZ: 0,
            scale: 1,
            opacity: 0.5,
            easing: 'linear',
            rotateX: '-0deg',
            complete: function(a){
                if(!self.intro){
                    self.encolor();
                    anime.timeline({
                        targets: self.$.logo,
                        delay: 150
                    }).add({
                        duration: 3*time,
                        delay: 150,
                        translateY: 0,
                        translateZ: 0,
                        scale: 1,
                        opacity: 1,
                        rotateX: '0deg'
                    });
                }
            }
        });
        let shadow_anim = anime.timeline({
            targets: self.$.shadow,
        }).add({
            duration:0,
            scale: 0,
            opacity: 0
        }).add({
            duration: time,
            scale: 1.25,
            opacity: 1,
            easing: 'linear',
            complete: function(a){
            }
        });
    }
    discolor(){
        const self = this;

        function col(el, col){
            el.setAttribute('style', 'transition-duration: 0.0s; fill: ' + col);
        }

        col(self.$.fill, '#B8B8B8');
        col(self.$.stroke, '#424242');
        col(self.$.arrow, '#424242');
        col(self.$.accent, '#3A3A3A');
    }
    encolor(){
        const self = this;

        function col(el, col){
            el.setAttribute('style', 'transition-duration: 0.7s; fill: ' + col);
        }

        col(self.$.fill, '#FCB315');
        col(self.$.stroke, '#005781');
        col(self.$.arrow, '#005781');
        col(self.$.accent, '#0C4772');
    }

    load(){
        if(this.intro){
            const self = this;
            const time = 400;

            self.encolor();
            anime.timeline({
                targets: self.$.logo,
                delay: 150
            }).add({
                duration: 3*time,
                delay: 150,
                translateY: 0,
                translateZ: 0,
                scale: 1,
                opacity: 1,
                rotateX: '0deg'
            });

            anime.timeline({
                targets: [self.$.arrow, self.$.accent]
            }).add({
                duration:75,
                rotateX: '-135deg',
                filter: 'drop-shadow(0px 16px 8px rgba(0,0,0,1))'
            }).add({
                duration: 100,
                delay: 150,
                easing: 'linear',
                rotateX: '0deg',
                filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))'
            });

            anime({
                targets: self.$.fade,
                duration:700,
                delay:200,
                scale:700,
                easing:'easeOutExpo'
            });
            anime({
                targets: self.$.fade,
                opacity:0,
                duration:500,
                delay: 300,
                easing: 'linear'
            });

            anime.timeline({
                targets: self.$.shadow,
                delay: 150
            }).add({
                duration: 3*time,
                delay: 200,
                scale: 1,
                opacity: 1,
                complete: function(){
                    if(self.fin != null){
                        self.fin();
                    }
                }
            });
        }
    }
}

// Register the element with the browser.
customElements.define('tkt-logo', TKTLogo);
