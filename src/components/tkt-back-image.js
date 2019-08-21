import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import anime from 'animejs';

class TKTBackImage extends PolymerElement {
    static get properties(){
        return {
            url: {
                type: String,
                value: ''
            },
            color: {
                type: String,
                value: '#FFF'
            },
            text: {
                type: String,
                value: ''
            }
        }

    }
    static get template () {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html`
        <style>
            :host > div{
            width:100vw;
            height:100vh;
            overflow:hidden;
            }
            :host > div > svg{
            width:100%;
            }
            #image{
            transform-origin: center;
            }
            #text{
            position:absolute;
            -webkit-transform-origin: center;-moz-transform-origin: center;-ms-transform-origin: center;-o-transform-origin: center;transform-origin: center;
            }
        </style>
        <div>
            <?xml version="1.0" encoding="utf-8"?>
            <!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
            <svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 1920 1080" style="enable-background:new 0 0 1920 1080;" xml:space="preserve">
            <g>
            <defs>
            <rect id="rect" x="2.5" y="0.5" width="1917" height="1079"/>
            </defs>
            <clipPath id="SVGID_2_">
            <use xlink:href="#rect"  style="overflow:visible;"/>
            </clipPath>
            <g style="clip-path:url(#SVGID_2_);">
            <image id="image" style="overflow:visible;" width="1920" height="1080">
            </image>
            </g>
            <rect id="paint" x="2.5" y="0.5" style="clip-path:url(#SVGID_2_);fill:#FFFFFF;" width="0" height="1079"/>
            <g id="pane" style="clip-path:url(#SVGID_2_);">
            <defs>
            <text id="text" style="font-family:'Consolas-Bold, sans-serif'; font-size:454.6938px;"><slot></slot></text>
            </defs>
            <clipPath id="pattern">
            <use xlink:href="#text"  style="overflow:visible;"/>
            </clipPath>
            <g style="clip-path:url(#pattern);">
            <path style="fill:{{color}}; transform:translateX(256px);" d="M0,0.5h1.2v1079H0V0.5z M6,1079.5h1.2V0.5H6V1079.5z M12,1079.5h1.2V0.5
H12V1079.5z M18,1079.5h1.2V0.5H18V1079.5z M24,1079.5h1.2V0.5H24V1079.5z M30,1079.5h1.2V0.5H30V1079.5z M35.9,1079.5h1.2V0.5
h-1.2V1079.5z M41.9,1079.5h1.2V0.5h-1.2V1079.5z M47.9,1079.5h1.2V0.5h-1.2V1079.5z M53.9,1079.5h1.2V0.5h-1.2V1079.5z
 M59.9,1079.5h1.2V0.5h-1.2V1079.5z M65.9,1079.5h1.2V0.5h-1.2V1079.5z M71.9,1079.5h1.2V0.5h-1.2V1079.5z M77.9,1079.5h1.2V0.5
h-1.2V1079.5z M83.9,1079.5h1.2V0.5h-1.2V1079.5z M89.9,1079.5h1.2V0.5h-1.2V1079.5z M95.8,1079.5h1.2V0.5h-1.2V1079.5z
 M101.8,1079.5h1.2V0.5h-1.2V1079.5z M107.8,1079.5h1.2V0.5h-1.2V1079.5z M113.8,1079.5h1.2V0.5h-1.2V1079.5z M119.8,1079.5h1.2
V0.5h-1.2V1079.5z M125.8,1079.5h1.2V0.5h-1.2V1079.5z M131.8,1079.5h1.2V0.5h-1.2V1079.5z M137.8,1079.5h1.2V0.5h-1.2V1079.5z
 M143.8,1079.5h1.2V0.5h-1.2V1079.5z M149.8,1079.5h1.2V0.5h-1.2V1079.5z M155.7,1079.5h1.2V0.5h-1.2V1079.5z M161.7,1079.5h1.2
V0.5h-1.2V1079.5z M167.7,1079.5h1.2V0.5h-1.2V1079.5z M173.7,1079.5h1.2V0.5h-1.2V1079.5z M179.7,1079.5h1.2V0.5h-1.2V1079.5z
 M185.7,1079.5h1.2V0.5h-1.2V1079.5z M191.7,1079.5h1.2V0.5h-1.2V1079.5z M197.7,1079.5h1.2V0.5h-1.2V1079.5z M203.7,1079.5h1.2
V0.5h-1.2V1079.5z M209.7,1079.5h1.2V0.5h-1.2V1079.5z M215.6,1079.5h1.2V0.5h-1.2V1079.5z M221.6,1079.5h1.2V0.5h-1.2V1079.5z
 M227.6,1079.5h1.2V0.5h-1.2V1079.5z M233.6,1079.5h1.2V0.5h-1.2V1079.5z M239.6,1079.5h1.2V0.5h-1.2V1079.5z M245.6,1079.5h1.2
V0.5h-1.2V1079.5z M251.6,1079.5h1.2V0.5h-1.2V1079.5z M257.6,1079.5h1.2V0.5h-1.2V1079.5z M263.6,1079.5h1.2V0.5h-1.2V1079.5z
 M269.6,1079.5h1.2V0.5h-1.2V1079.5z M275.5,1079.5h1.2V0.5h-1.2V1079.5z M281.5,1079.5h1.2V0.5h-1.2V1079.5z M287.5,1079.5h1.2
V0.5h-1.2V1079.5z M293.5,1079.5h1.2V0.5h-1.2V1079.5z M299.5,1079.5h1.2V0.5h-1.2V1079.5z M305.5,1079.5h1.2V0.5h-1.2V1079.5z
 M311.5,1079.5h1.2V0.5h-1.2V1079.5z M317.5,1079.5h1.2V0.5h-1.2V1079.5z M323.5,1079.5h1.2V0.5h-1.2V1079.5z M329.5,1079.5h1.2
V0.5h-1.2V1079.5z M335.4,1079.5h1.2V0.5h-1.2V1079.5z M341.4,1079.5h1.2V0.5h-1.2V1079.5z M347.4,1079.5h1.2V0.5h-1.2V1079.5z
 M353.4,1079.5h1.2V0.5h-1.2V1079.5z M359.4,1079.5h1.2V0.5h-1.2V1079.5z M365.4,1079.5h1.2V0.5h-1.2V1079.5z M371.4,1079.5h1.2
V0.5h-1.2V1079.5z M377.4,1079.5h1.2V0.5h-1.2V1079.5z M383.4,1079.5h1.2V0.5h-1.2V1079.5z M389.4,1079.5h1.2V0.5h-1.2V1079.5z
 M395.3,1079.5h1.2V0.5h-1.2V1079.5z M401.3,1079.5h1.2V0.5h-1.2V1079.5z M407.3,1079.5h1.2V0.5h-1.2V1079.5z M413.3,1079.5h1.2
V0.5h-1.2V1079.5z M419.3,1079.5h1.2V0.5h-1.2V1079.5z M425.3,1079.5h1.2V0.5h-1.2V1079.5z M431.3,1079.5h1.2V0.5h-1.2V1079.5z
 M437.3,1079.5h1.2V0.5h-1.2V1079.5z M443.3,1079.5h1.2V0.5h-1.2V1079.5z M449.3,1079.5h1.2V0.5h-1.2V1079.5z M455.2,1079.5h1.2
V0.5h-1.2V1079.5z M461.2,1079.5h1.2V0.5h-1.2V1079.5z M467.2,1079.5h1.2V0.5h-1.2V1079.5z M473.2,1079.5h1.2V0.5h-1.2V1079.5z
 M479.2,1079.5h1.2V0.5h-1.2V1079.5z M478.5,0.5h1.2v1079h-1.2V0.5z M484.5,1079.5h1.2V0.5h-1.2V1079.5z M490.5,1079.5h1.2V0.5
h-1.2V1079.5z M496.5,1079.5h1.2V0.5h-1.2V1079.5z M502.5,1079.5h1.2V0.5h-1.2V1079.5z M508.5,1079.5h1.2V0.5h-1.2V1079.5z
 M514.5,1079.5h1.2V0.5h-1.2V1079.5z M520.5,1079.5h1.2V0.5h-1.2V1079.5z M526.5,1079.5h1.2V0.5h-1.2V1079.5z M532.5,1079.5h1.2
V0.5h-1.2V1079.5z M538.4,1079.5h1.2V0.5h-1.2V1079.5z M544.4,1079.5h1.2V0.5h-1.2V1079.5z M550.4,1079.5h1.2V0.5h-1.2V1079.5z
 M556.4,1079.5h1.2V0.5h-1.2V1079.5z M562.4,1079.5h1.2V0.5h-1.2V1079.5z M568.4,1079.5h1.2V0.5h-1.2V1079.5z M574.4,1079.5h1.2
V0.5h-1.2V1079.5z M580.4,1079.5h1.2V0.5h-1.2V1079.5z M586.4,1079.5h1.2V0.5h-1.2V1079.5z M592.4,1079.5h1.2V0.5h-1.2V1079.5z
 M598.3,1079.5h1.2V0.5h-1.2V1079.5z M604.3,1079.5h1.2V0.5h-1.2V1079.5z M610.3,1079.5h1.2V0.5h-1.2V1079.5z M616.3,1079.5h1.2
V0.5h-1.2V1079.5z M622.3,1079.5h1.2V0.5h-1.2V1079.5z M628.3,1079.5h1.2V0.5h-1.2V1079.5z M634.3,1079.5h1.2V0.5h-1.2V1079.5z
 M640.3,1079.5h1.2V0.5h-1.2V1079.5z M646.3,1079.5h1.2V0.5h-1.2V1079.5z M652.3,1079.5h1.2V0.5h-1.2V1079.5z M658.2,1079.5h1.2
V0.5h-1.2V1079.5z M664.2,1079.5h1.2V0.5h-1.2V1079.5z M670.2,1079.5h1.2V0.5h-1.2V1079.5z M676.2,1079.5h1.2V0.5h-1.2V1079.5z
 M682.2,1079.5h1.2V0.5h-1.2V1079.5z M688.2,1079.5h1.2V0.5h-1.2V1079.5z M694.2,1079.5h1.2V0.5h-1.2V1079.5z M700.2,1079.5h1.2
V0.5h-1.2V1079.5z M706.2,1079.5h1.2V0.5h-1.2V1079.5z M712.2,1079.5h1.2V0.5h-1.2V1079.5z M718.1,1079.5h1.2V0.5h-1.2V1079.5z
 M724.1,1079.5h1.2V0.5h-1.2V1079.5z M730.1,1079.5h1.2V0.5h-1.2V1079.5z M736.1,1079.5h1.2V0.5h-1.2V1079.5z M742.1,1079.5h1.2
V0.5h-1.2V1079.5z M748.1,1079.5h1.2V0.5h-1.2V1079.5z M754.1,1079.5h1.2V0.5h-1.2V1079.5z M760.1,1079.5h1.2V0.5h-1.2V1079.5z
 M766.1,1079.5h1.2V0.5h-1.2V1079.5z M772.1,1079.5h1.2V0.5h-1.2V1079.5z M778.1,1079.5h1.2V0.5h-1.2V1079.5z M784,1079.5h1.2V0.5
H784V1079.5z M790,1079.5h1.2V0.5H790V1079.5z M796,1079.5h1.2V0.5H796V1079.5z M802,1079.5h1.2V0.5H802V1079.5z M808,1079.5h1.2
V0.5H808V1079.5z M814,1079.5h1.2V0.5H814V1079.5z M820,1079.5h1.2V0.5H820V1079.5z M826,1079.5h1.2V0.5H826V1079.5z M832,1079.5
h1.2V0.5H832V1079.5z M838,1079.5h1.2V0.5H838V1079.5z M843.9,1079.5h1.2V0.5h-1.2V1079.5z M849.9,1079.5h1.2V0.5h-1.2V1079.5z
 M855.9,1079.5h1.2V0.5h-1.2V1079.5z M861.9,1079.5h1.2V0.5h-1.2V1079.5z M867.9,1079.5h1.2V0.5h-1.2V1079.5z M873.9,1079.5h1.2
V0.5h-1.2V1079.5z M879.9,1079.5h1.2V0.5h-1.2V1079.5z M885.9,1079.5h1.2V0.5h-1.2V1079.5z M891.9,1079.5h1.2V0.5h-1.2V1079.5z
 M897.9,1079.5h1.2V0.5h-1.2V1079.5z M903.8,1079.5h1.2V0.5h-1.2V1079.5z M909.8,1079.5h1.2V0.5h-1.2V1079.5z M915.8,1079.5h1.2
V0.5h-1.2V1079.5z M921.8,1079.5h1.2V0.5h-1.2V1079.5z M927.8,1079.5h1.2V0.5h-1.2V1079.5z M933.8,1079.5h1.2V0.5h-1.2V1079.5z
 M939.8,1079.5h1.2V0.5h-1.2V1079.5z M945.8,1079.5h1.2V0.5h-1.2V1079.5z M951.8,1079.5h1.2V0.5h-1.2V1079.5z M957.8,1079.5h1.2
V0.5h-1.2V1079.5z"/>
            <rect id="patt" x="962" y="1" style="fill:#FFFFFF;" width="958" height="1078"/>
            </g>
            </g>
            </g>
            </svg>
        </div>
    `;
    }

    ready() {
        super.ready();

        this.$.image.setAttribute('href', this.url);
        this.$.text.textContent = this.text;

        //
        var text_length = this.$.text.offsetWidth/2;

        anime({
            targets: this.$.rect,
            translateX: '-150vw'
        });
        anime({
            targets: this.$.image,
            scale: 1.05,
            translateX: 0
        });
        anime({
            targets: this.$.text,
            rotateY: 0,
            rotateZ: 0,
            translateX: 826.4077,
            translateY: 603.4365,
            scale: 0.8,
            opacity: 0
        });
        anime({
            targets: this.$.patt,
            translateX: 8
        });
    }

    intro(){
        const self = this;

        anime.timeline({
        }).add({
            targets: this.$.rect,
            translateX: '0vw',
            duration: 550,
            easing: 'easeOutCubic'
        }).add({
            targets: this.$.image,
            scale: 1,
            translateX: 32,
            delay:0,
            duration: 500,
            easing: 'easeOutBack'
        });
        anime({
            targets: this.$.image,
            translateX: 32,
            scale: 1.05,
            delay:450,
            duration: 1000,
            easing: 'easeOutCubic'
        });
        anime({
            targets: this.$.paint,
            delay: 500,
            duration: 500,
            width: '980px',
            easing: 'easeOutQuart'
        });
        anime({
            targets: this.$.text,
            rotateY: 0,
            rotateZ: 0,
            translateX: 826.4077,
            translateY: 603.4365,
            scale: 1,
            opacity: 1,
            delay: 750,
            duration: 500,
            easing: 'easeOutCubic'
        });

        Trial(self.$.svg).within({
            distance: 1080,
            cord: 'center'
        },_.throttle(function(d,e,v){
            function getOffset(el) {
                var _x = 0;
                var _y = 0;
                while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
                    _x += el.offsetLeft - el.scrollLeft + el.offsetHeight/4;
                    _y += el.offsetTop - el.scrollTop + el.offsetHeight/4;
                    el = el.offsetParent;
                }
                return { top: _y, left: _x };
            }

            const tx = -(v.clientX - getOffset(self.$.text).left)/8;
            const ty = -(v.clientY - getOffset(self.$.text).top)/8;

            const max = 128;

            anime({
                targets: self.$.paint,
                width: 988 + (tx/1200)*360,
                duration:400,
                easing: 'easeOutCubic'
            });
            anime({
                targets: self.$.patt,
                translateX: (tx/1200)*360 + 28,
                duration:400,
                easing: 'easeOutCubic'
            });
            anime({
                targets: self.$.text,
                rotateY: (tx/900)*25,
                rotateX: (ty/1200)*25,
                translateX: 840.4077,
                translateY: 603.4365 - (ty/1200)*440,
                translateZ: 128,
                scale: 1,
                duration:500,
                perspective: '240px',
                opacity:1,
                easing: 'easeOutCubic'
            });
        }, 150), {trailing: false});
    }
    outro(){
        const self = this;

        anime.timeline({

        }).add({
            targets: this.$.text,
            rotateY: 0,
            rotateZ: 0,
            translateX: 826.4077,
            translateY: 603.4365,
            translateZ: 0,
            scale: 0.95,
            opacity: 0,
            duration: 400,
            easing: 'easeOutCubic'
        });
        anime({
            targets: this.$.paint,
            duration: 400,
            width: '0px',
            easing: 'easeOutQuart'
        });
        anime.timeline({
        }).add({
            targets: this.$.image,
            scale: 1.05,
            duration: 600,
            easing: 'easeOutBack'
        }).add({
            targets: this.$.rect,
            translateX: '-150vw',
            duration: 650,
            easing: 'easeOutCubic'
        });
        anime({
            targets: this.$.image,
            scale: 1.05,
            translateX: 0,
            duration: 1000,
            easing: 'easeOutCubic'
        })
    }
}

// Register the element with the browser.
customElements.define('tkt-back-image', TKTBackImage);
